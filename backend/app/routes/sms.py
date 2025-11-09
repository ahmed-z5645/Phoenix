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
    print(request)
    print("HELPPPPPPPP")
    form = await request.form()
    print(form)
    body = form.get("Body")
    print(body)
    # sender = form.get("From")

    if body:
        body = body.replace("\u2028", " ").replace("\u2029", " ").strip()

    try:
        print("-2")
        data = json.loads(body)
        print("-1")
        print(data)
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
        print("0")
        print(incident)
        print("1")
        print("2")
        print("3")
        print(incident)
        response = supabase.table("incidents").insert(incident.dict()).execute()
        print("4")
        print(response)
        return {"status": "success",
                "id": incident.id}
    except (json.JSONDecodeError, ValidationError) as e:
        #consider putting something in db about how someone from sender number couldnt make it through
        return {"status": "error", 
                "message": "Invalid or malformed JSON"}