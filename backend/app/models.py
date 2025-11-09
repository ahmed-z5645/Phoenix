from pydantic import BaseModel, Field

from datetime import datetime, timezone

class Incident(BaseModel):
    id: str = Field(..., description="Unique incident ID")
    type: str
    name: str
    location: str
    lat: float
    lon: float
    status: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Helper(BaseModel):
    id: str = Field(..., description="Unique helper ID")
    phone: str
    name: str
    location: str
    occupation: str  # FR or C
    lat: float
    lon: float
    report_count: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))