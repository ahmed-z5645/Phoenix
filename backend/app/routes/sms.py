from fastapi import APIRouter, Request
from app.models import Incident
from app.database import supabase
from pydantic import ValidationError
import uuid
import json
import math

#for geolocations
import requests
from urllib.parse import quote  # for URL encoding the address string
import os
from dotenv import load_dotenv
load_dotenv()

# for message sending:
from twilio.rest import Client
from datetime import datetime, timezone, timedelta

MAPBOX_TOKEN: str = os.getenv("MAPBOX_TOKEN")
TWILIO_SID: str = os.getenv("TWILIO_SID")
TWILIO_AUTH: str = os.getenv("TWILIO_AUTH")
TWILIO_NUM: str = os.getenv("TWILIO_NUM")

router = APIRouter()

#fire formula lowkey
def haversine(lat1, lon1, lat2, lon2):
    # convert degrees to radians
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    
    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    
    R = 6371  # Radius of Earth in km
    distance = R * c
    return distance

def geocode_address(address: str):
    # Construct the API URL for forward geocoding
    # URL-encode the address to handle spaces and special characters
    url = f"https://api.mapbox.com/geocoding/v5/mapbox.places/{quote(address)}.json"
    params = {"access_token": MAPBOX_TOKEN}
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an error for bad status codes (4xx/5xx)
    except requests.RequestException as e:
        # If the HTTP request failed or returned an error status, log and return None
        print(f"Geocoding request failed: {e}")
        return None
 
    data = response.json()
    features = data.get("features")
    if not features:
        # No results found for the address
        return None
 
    # Extract the first result's coordinates.
    # Mapbox returns [longitude, latitude], so unpack accordingly.
    lon, lat = features[0]["center"]
    return (lat, lon)

@router.post("/sms")
async def receive_sms(request: Request):

    # Initialize client
    client = Client(TWILIO_SID, TWILIO_AUTH)

    # get form from Twilio!
    form = await request.form()
    body = form.get("Body")
    sender = form.get("From")

    if body:
        body = body.replace("\u2028", " ").replace("\u2029", " ").strip()

    try:
        data = json.loads(body)

        #SECTION1: REPORT = 0 IF NEW INCIDENT, 1 IF NEW HELPER
        if (data["report"] == "0"):
        
            lat_str, lon_str = data["coords"].split(",")

            if lat_str == NULL or lon_str == NULL:
                # perform geocoding
                geocoded = geocode_address(data["location"])
                if geocoded is None:
                    return {"status": "error", 
                            "message": "Could not geocode address"}
                lat, lon = geocoded
            
            lat = float(lat)
            lon = float(lon)

            incident = Incident(
                id=f"INC{uuid.uuid4().hex[:6].upper()}",
                type=data["type"],
                name=data["name"],
                location=data["location"],
                lat=lat,
                lon=lon,
                status=data["status"]
            )
            incident_dict = incident.dict()
            # Convert datetime to ISO string
            if "created_at" in incident_dict:
                incident_dict["created_at"] = incident_dict["created_at"].isoformat()

            response = supabase.table("incidents").insert(incident_dict).execute()

            # NEED TO SEARCH DB FOR ALL APPLICABLE REPONDERS AND SEND THEM A TEXT
            # Compute timestamp for 1 hour ago
            one_hour_ago = datetime.now(timezone.utc) - timedelta(hours=1)
            one_hour_ago_iso = one_hour_ago.isoformat()

            # Query helpers table for recent entries
            # Occupation "FR" or "C" AND created_at within last hour
            # Supabase uses filter chaining for "OR" by calling .or_()
            helpers_response = supabase.table("helpers") \
                .select("*") \
                .or_(f"occupation.eq.FR,occupation.eq.C") \
                .gte("created_at", one_hour_ago_iso) \
                .execute()

            helpers = helpers_response.data

            # Send SMS to each matching helper
            for helper in helpers:
                try:
                    client.messages.create(
                        body=f"New incident reported: {incident.type} at {incident.location}. Status: {incident.status}",
                        from_=TWILIO_NUM,
                        to=helper["phone"]
                    )
                except Exception as e:
                    print(f"Failed to send SMS to {helper['phone']}: {e}")


            # Send a message to the reporter in distress
            client.messages.create(
                body="Thank you for your report. Help has been notified",
                from_=TWILIO_NUM,
                to=sender
            )

            return {"status": "success",
                    "id": incident.id}
        
        else:
            
            # Geocode if coords not provided
            if "coords" in data and data["coords"]:
                lat_str, lon_str = data["coords"].split(",")
                lat = float(lat_str.strip())
                lon = float(lon_str.strip())
            else:
                geocoded = geocode_address(data["location"])
                if geocoded is None:
                    return {"status": "error", "message": "Could not geocode address"}
                lat, lon = geocoded

            helper_id = f"HELP{uuid.uuid4().hex[:6].upper()}"
            helper_dict = {
                "id": helper_id,
                "phone": sender,
                "name": data.get("name", ""),
                "location": data.get("location", ""),
                "occupation": data.get("occupation", ""),
                "lat": lat,
                "lon": lon,
                "report": 0,  # initialize to 0
                "created_at": datetime.now(timezone.utc).isoformat()
            }

            supabase.table("helpers").insert(helper_dict).execute()

            # Send confirmation text
            client.messages.create(
                body=f"Thank you, {data.get('name', 'helper')}! You are now on duty for the next hour.",
                from_=TWILIO_NUM,
                to=sender
            )

            return {"status": "success", "id": helper_id}

    except (json.JSONDecodeError, ValidationError) as e:
        return {"status": "error", 
                "message": "Invalid or malformed JSON"}

