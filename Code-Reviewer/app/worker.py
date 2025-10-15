# app/worker.py

import os
import google.generativeai as genai
from celery import Celery
from .database import SessionLocal
from .schemas import Review

# Initialize Celery
celery_app = Celery('tasks', broker='redis://redis:6379/0')

# Configure Google GenAI
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# System prompt for code review
SYSTEM_PROMPT = """You are a practical code reviewer. Provide concise, actionable feedback in this exact format:

## 🔍 Key Issues
- List 3-5 main issues as bullet points
- Focus on bugs, security, performance, and maintainability

## 💡 Suggestions
- 2-3 specific improvements with brief explanations

## ✅ Improved Code
```python
# Show the improved version with key changes
# Keep it focused on the main fixes
Keep responses under 300 words. Be direct and practical.
"""

@celery_app.task
def perform_code_review(job_id: str):
    db = SessionLocal()
    try:
        review_job = db.query(Review).filter(Review.job_id == job_id).first()
        if not review_job:
            return

        code_to_review = review_job.report.get('code')
        if not code_to_review:
            review_job.status = 'FAILED'
            review_job.report = {"error": "No code provided for review."}
            db.commit()
            return

        model = genai.GenerativeModel('gemini-2.5-flash')

        full_prompt = f"""{SYSTEM_PROMPT}
        Please review this Python code and provide concise feedback:

        python      {code_to_review}        """

        response = model.generate_content(full_prompt)
        review_html = response.text

        review_job.status = 'COMPLETED'
        review_job.report = {"result": review_html}
        db.commit()

    except Exception as e:
        if 'review_job' in locals() and review_job:
            review_job.status = 'FAILED'
            review_job.report = {"error": str(e)}
            db.commit()
    finally:
        db.close()