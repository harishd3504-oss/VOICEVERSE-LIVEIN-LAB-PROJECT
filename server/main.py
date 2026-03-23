from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import auth, files, conversion

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LinguaSkill API",
    version="1.0.0",
    description="Backend API for LinguaSkill - AI-powered multilingual platform",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update this with frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(files.router)
app.include_router(conversion.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to LinguaSkill API", "docs_url": "/docs"}

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "LinguaSkill Backend"}
