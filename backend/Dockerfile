# Use a lightweight Python image
FROM python:3.12-slim

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Set working directory
WORKDIR /app

# Install dependencies first (for caching)
RUN uv pip install --system fastapi uvicorn

# Copy the application code
COPY main.py .

# Expose the port FastAPI runs on
EXPOSE 8001

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
