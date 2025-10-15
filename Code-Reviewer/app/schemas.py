# app/schemas.py
from sqlalchemy import Column, Integer, String, JSON
from .database import Base # <-- The import is now relative to the 'app' package

class Review(Base):
    __tablename__ = "reviews"
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(String, unique=True, index=True)
    status = Column(String, default="PENDING")
    report = Column(JSON, nullable=True)