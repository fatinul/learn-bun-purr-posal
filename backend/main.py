import base64
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Valentine Link Generator")

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5174")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, you can restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/create")
async def create_link(request: Request, title: str, sender: str, receiver: str, message: str):
    # Combine strings with a pipe
    raw_string = f"{title}|{receiver}|{sender}|{message}"
    # Base64 Encode
    encoded_bytes = base64.urlsafe_b64encode(raw_string.encode("utf-8"))
    token = encoded_bytes.decode("utf-8")
    # Generate the link based on the frontend URL
    valentine_link = f"{FRONTEND_URL.rstrip('/')}/love/{token}"
    return {
        "status": "success",
        "link": valentine_link
    }

@app.get("/love/{token}")
async def get_valentine_message(token: str):
    try:
        # Decode the token
        decoded_bytes = base64.urlsafe_b64decode(token.encode("utf-8"))
        decoded_string = decoded_bytes.decode("utf-8")
        # Split back into receiver and sender
        title, receiver, sender, message = decoded_string.split("|")
        return {
            "title": f"{title}",
            "receiver": f"{receiver}",
            "sender": f"{sender}",
            "message": f"{message}",
        }
    except Exception:
        return JSONResponse(
            status_code=400, 
            content={"error": "Invalid or corrupted valentine token"}
        )
