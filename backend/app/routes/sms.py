from fastapi import APIRouter, Request
from app.models import Incident
from app.database import supabase
from pydantic import ValidationError
import uuid
import json

#for geolocations
import requests
from urllib.parse import quote  # for URL encoding the address string
import os
from dotenv import load_dotenv

load_dotenv()

MAPBOX_TOKEN: str = os.getenv("MAPBOX_TOKEN")

router = APIRouter()

@router.post("/sms")
async def receive_sms(request: Request):
    # get form from Twilio!
    form = await request.form()
    body = form.get("Body")
    # sender = form.get("From")

    if body:
        body = body.replace("\u2028", " ").replace("\u2029", " ").strip()

    try:
        data = json.loads(body)
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
        return {"status": "success",
                "id": incident.id}
    except (json.JSONDecodeError, ValidationError) as e:
        return {"status": "error", 
                "message": "Invalid or malformed JSON"}

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