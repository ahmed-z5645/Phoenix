from fastapi import APIRouter, Request
from app.models import Incident
from app.database import supabase
from pydantic import ValidationError
import json

router = APIRouter()

@router.post("/sms")
async def receive_sms(request: Request):
    # get form from Twilio!
    form = await request.form()
    body = form.get("Body")
    sender = form.get("From")

    try:
        data = json.loads(body)
        incident = Incident(**data) #unpacking i'm lowkey goated at python (sorry judges im not concieted, im just excited)
        incident.id = f"INC{uuid.uuid4().hex[:6].upper()}"
        supabase.table("incidents").insert(incident.dict()).execute()
        return {"status": "success",
                "id": incident.id}
    except (json.JSONDecodeError, ValidationError) as e:
        #consider putting something in db about how someone from sender number couldnt make it through
        return {"status": "error", 
                "message": "Invalid or malformed JSON"}