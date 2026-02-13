# Use a lightweight Python image
FROM python:3.12-slim

# Install uv and nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Set working directory
WORKDIR /app

# Install dependencies first (for caching)
RUN uv pip install --system fastapi uvicorn

# Copy the application code
COPY main.py .

# Copy nginx configuration
COPY nginx-backend.conf /etc/nginx/sites-available/default

# Create startup script
RUN echo '#!/bin/bash\n\
nginx\n\
uvicorn main:app --host 127.0.0.1 --port 8001' > /start.sh && chmod +x /start.sh

# Expose nginx port
EXPOSE 80

# Command to run both nginx and uvicorn
CMD ["/start.sh"]
