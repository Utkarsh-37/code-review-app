# app/api/reviews.py
import uuid
from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, models, database  # Use '..' to go up one level
from ..worker import perform_code_review

# APIRouter is like a mini-FastAPI app, used for organizing endpoints
router = APIRouter()

@router.post("/review", status_code=202)
def handle_code_review(file: UploadFile = File(...), db: Session = Depends(database.get_db)):
    code_content = file.file.read()
    code_as_string = code_content.decode('utf-8')
    job_id = str(uuid.uuid4())
    
    new_review = schemas.Review(
        job_id=job_id, status='PENDING', report={'code': code_as_string}
    )
    db.add(new_review)
    db.commit()
    
    perform_code_review.delay(job_id)
    return {"job_id": job_id, "message": "Code review has started."}

@router.get("/review/{job_id}", response_model=models.ReviewResponse)
def get_review_status(job_id: str, db: Session = Depends(database.get_db)):
    review_job = db.query(schemas.Review).filter(schemas.Review.job_id == job_id).first()
    if not review_job:
        raise HTTPException(status_code=404, detail="Job not found.")
    return review_job