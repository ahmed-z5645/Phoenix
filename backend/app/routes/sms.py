from fastapi import APIRouter, Request
from app.models import Incident
from app.database import supabase
from pydantic import ValidationError
import uuid
import json

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
        lat = float(lat_str.strip())
        lon = float(lon_str.strip())
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
        #consider putting something in db about how someone from sender number couldnt make it through
        return {"status": "error", 
                "message": "Invalid or malformed JSON"}