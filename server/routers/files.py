from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from .. import schemas, models, auth_utils, database
import os
import uuid
from typing import List

router = APIRouter(tags=["Files"])


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


UPLOAD_DIR = "server/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {
    "text": ["txt", "md"],
    "image": ["jpg", "jpeg", "png"],
    "audio": ["mp3", "wav"],
    "video": ["mp4", "mkv"],
    "ppt": ["ppt", "pptx"],
    "pdf": ["pdf"]
}


@router.post("/upload", response_model=schemas.File)
async def upload_file(
    file: UploadFile = File(...),
    current_user: models.User = Depends(auth_utils.get_current_user),
    db: Session = Depends(get_db),
):
    # Validate file extension
    file_ext = file.filename.split(".")[-1].lower()

    all_extensions = []
    for ext_list in ALLOWED_EXTENSIONS.values():
        all_extensions.extend(ext_list)

    if file_ext not in all_extensions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File type not supported"
        )

    # Generate unique filename
    unique_filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    # Save file
    contents = await file.read()

    with open(file_path, "wb") as buffer:
        buffer.write(contents)

    file_size = len(contents)

    # Create DB entry
    file_ext = file.filename.split(".")[-1]
    new_file = models.File(
        filename=file.filename,
        file_path=file_path,
        file_size=file_size,
        file_type=file_ext,
        owner_id=current_user.id
    )

    db.add(new_file)
    db.commit()
    db.refresh(new_file)

    return new_file


@router.get("/files", response_model=List[schemas.File])
def get_files(
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(auth_utils.get_current_user),
    db: Session = Depends(get_db),
):
    files = (
        db.query(models.File)
        .filter(models.File.owner_id == current_user.id)
        .offset(skip)
        .limit(limit)
        .all()
    )

    return files
