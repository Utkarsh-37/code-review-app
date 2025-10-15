# app/models.py
from pydantic import BaseModel
from typing import Optional, Any

class ReviewResponse(BaseModel):
    job_id: str
    status: str
    report: Optional[Any] = None

    class Config:
        from_attributes = True # Formerly orm_mode = True