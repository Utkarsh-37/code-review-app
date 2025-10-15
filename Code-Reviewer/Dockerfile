# Dockerfile

FROM python:3.11-slim
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# --- Add this new line ---
COPY index.html .

# This line copies the rest of your app code
COPY ./app /app/app