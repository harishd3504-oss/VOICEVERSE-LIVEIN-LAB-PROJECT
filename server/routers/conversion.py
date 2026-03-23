from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from .. import schemas, models, auth_utils, database
import time
import asyncio

router = APIRouter(tags=["Conversion"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Mock AI processing background task
async def process_conversion(conversion_id: int, db: Session):
    # Simulate processing delay
    await asyncio.sleep(5) 
    
    # Update conversion status
    # Need to create a new session or pass one that is thread-safe for background tasks?
    # SQLAlchemy sessions are not thread-safe, but here we are in async context. 
    # Best practice: create a new session locally.
    
    local_db = database.SessionLocal()
    try:
        conversion = local_db.query(models.ConversionRequest).filter(models.ConversionRequest.id == conversion_id).first()

        if conversion:
            source_file = local_db.query(models.File).filter(models.File.id == conversion.source_file_id).first()

            file_path = source_file.file_path

            with open(file_path, "r", encoding="utf-8") as f:
                text = f.read()

            conversion.status = "completed"
            conversion.result_content = text

            local_db.commit()
    finally:
        local_db.close()


@router.post("/convert", response_model=schemas.Conversion)
async def create_conversion_request(
    conversion: schemas.ConversionCreate,
    background_tasks: BackgroundTasks,
    current_user: models.User = Depends(auth_utils.get_current_user),
    db: Session = Depends(get_db)
):
    # Check if file exists and belongs to user
    source_file = db.query(models.File).filter(models.File.id == conversion.source_file_id, models.File.owner_id == current_user.id).first()
    if not source_file:
        raise HTTPException(status_code=404, detail="Source file not found")

    new_conversion = models.ConversionRequest(
        source_file_id=conversion.source_file_id,
        target_language=conversion.target_language,
        conversion_type=conversion.conversion_type,
        owner_id=current_user.id,
        status="processing"
    )
    db.add(new_conversion)
    db.commit()
    db.refresh(new_conversion)

    # Trigger background processing
    background_tasks.add_task(process_conversion, new_conversion.id, db)

    return new_conversion

@router.get("/conversions", response_model=list[schemas.Conversion])
def get_conversions(skip: int = 0, limit: int = 100, current_user: models.User = Depends(auth_utils.get_current_user), db: Session = Depends(get_db)):
    conversions = db.query(models.ConversionRequest).filter(models.ConversionRequest.owner_id == current_user.id).offset(skip).limit(limit).all()
    return conversions