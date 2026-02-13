# Use a lightweight Python image
FROM python:3.12-slim

# Install uv and nginx
RUN apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Set working directory
WORKDIR /app

# Install Python dependencies
RUN uv pip install --system fastapi uvicorn

# Copy application code
COPY main.py .

# Configure nginx
RUN echo 'server {\n\
    listen 80;\n\
    server_name localhost;\n\
    \n\
    location /purr-posal/api/ {\n\
        rewrite ^/purr-posal/api/(.*) /$1 break;\n\
        proxy_pass http://127.0.0.1:8001;\n\
        proxy_set_header Host $host;\n\
        proxy_set_header X-Real-IP $remote_addr;\n\
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n\
        proxy_set_header X-Forwarded-Proto $scheme;\n\
    }\n\
}' > /etc/nginx/sites-available/default

# Create entrypoint script
RUN echo '#!/bin/bash\n\
set -e\n\
nginx\n\
exec uvicorn main:app --host 127.0.0.1 --port 8001' > /entrypoint.sh && \
    chmod +x /entrypoint.sh

# Expose nginx port
EXPOSE 80

# Run the entrypoint
ENTRYPOINT ["/entrypoint.sh"]
