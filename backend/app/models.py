from pydantic import BaseModel, Field

from datetime import datetime

class Incident(BaseModel):
    id: str = Field(..., description="Unique incident ID")
    type: str
    name: str
    location: str
    coords: str
    status: str
    timestamp: datetime = datetime.utcnow()
