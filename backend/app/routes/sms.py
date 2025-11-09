from fastapi import APIRouter, Request
from app.models import Incident
from app.database import supabase
from pydantic import ValidationError
import json

router = APIRouter()

@router.post("/sms")
async def receive_sms(request: Request):

    try:
        return {"status": "success",
                "id": "INSERT ID HERE"}
    except (json.JSONDecodeError, ValidationError) as e:
        #consider putting something in db about how someone from X number couldnt make it through
        return {"status": "error", 
                "message": "Invalid or malformed JSON"}