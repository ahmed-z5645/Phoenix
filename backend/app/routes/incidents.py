from fastapi import APIRouter
from app.database import supabase

router = APIRouter()

@router.get("/incidents")
async def get_incidents():
    # return ALL incidents (for now)
    response = supabase.table("incidents").select("*").execute()
    return response.data
