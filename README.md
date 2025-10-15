# 🤖 AI Code Review Assistant by Utkarsh Pathak

A full-stack web application that provides AI-powered code reviews for Python code. Get instant, intelligent feedback on your code quality, best practices, and potential improvements.

## 🚀 Features

- **AI-Powered Code Analysis** - Uses Google Gemini AI to review your Python code
- **Instant Feedback** - Get detailed code reviews in seconds
- **Clean UI** - Modern, responsive interface built with React and Tailwind CSS
- **Async Processing** - Background job processing with Celery and Redis
- **Dockerized** - Easy deployment with Docker Compose

## 🛠️ Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- Monaco Editor for code editing
- Sonner for toast notifications

### Backend
- FastAPI (Python)
- PostgreSQL database
- Celery for async tasks
- Redis as message broker
- Google Gemini AI for code analysis

## 📦 Project Structure
PRJ/
├── Frontend/ # React frontend application
│ ├── src/
│ ├── public/
│ └── package.json
└── Code-Reviewer/ # FastAPI backend
├── app/
│ ├── api/ # API routes
│ ├── models.py # Database models
│ ├── schemas.py # Pydantic schemas
│ ├── worker.py # Celery worker tasks
│ └── main.py # FastAPI app
├── docker-compose.yml
├── Dockerfile
└── requirements.txt

## 🏃‍♂️ Quick Start

### Prerequisites
- Docker and Docker Compose
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/code-review-app.git
   cd code-review-app
2. Set up environment variables
  cd Code-Reviewer
  cp .env.example .env
Edit .env and add your Google Gemini API key:
3. Run with Docker
   docker-compose up --build

## **🎯 Usage**
Open the frontend in your browser
Paste your Python code in the editor
Click "Review My Code"
Get instant AI-powered feedback including:
Key issues identified
Specific suggestions for improvement
Improved code examples

## **🎨 UI Preview**
The application features a modern dark theme with:
Real-time code editor with syntax highlighting
Clean, responsive design
Loading states and progress indicators
Keyboard shortcuts (Ctrl+K to toggle pages)

## **🔧 API Endpoints**
POST /api/v1/review - Submit code for review
GET /api/v1/review/{job_id} - Get review status and results

## **🐳 Docker Services**
The application runs in multiple containers:
backend - FastAPI application
worker - Celery worker for AI processing
db - PostgreSQL database
redis - Redis message broker
