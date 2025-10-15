# app/main.py
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware # Import CORS
from .database import engine
from . import schemas
from .api import reviews

schemas.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Code Review Assistant")

# --- ADD THIS CORS MIDDLEWARE BLOCK ---
# This allows your frontend (running on a different port) to talk to this backend.
origins = [
    "http://localhost:5173", # The default Vite/React dev server port
    "http://localhost:3000", # Another common port for React
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# --- END OF CORS BLOCK ---

app.include_router(reviews.router, prefix="/api/v1") # Good practice to prefix API routes

# We no longer need the root endpoint to serve index.html
# @app.get("/", response_class=HTMLResponse)
# async def show_upload_form(): ...