from pydantic import BaseModel, Field

from datetime import datetime, timezone

class Incident(BaseModel):
    id: str = Field(..., description="Unique incident ID")
    id: str = Field(..., description="Unique incident ID")
    type: str
    name: str
    location: str
    lat: float
    lon: float
    status: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
