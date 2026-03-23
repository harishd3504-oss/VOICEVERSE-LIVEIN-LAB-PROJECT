from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from .database import Base

class FileType(str, enum.Enum):
    TEXT = "text"
    IMAGE = "image"
    AUDIO = "audio"
    VIDEO = "video"
    PPT = "ppt"
    PDF = "pdf"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String, nullable=True)
    preferred_language = Column(String, default="en")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    files = relationship("File", back_populates="owner")
    conversions = relationship("ConversionRequest", back_populates="owner")

class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    file_path = Column(String)
    file_type = Column(String) # Stored as string, validated via FileType enum logic
    file_size = Column(Integer)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    owner = relationship("User", back_populates="files")
    conversions = relationship("ConversionRequest", back_populates="source_file")

class ConversionRequest(Base):
    __tablename__ = "conversions"

    id = Column(Integer, primary_key=True, index=True)
    source_file_id = Column(Integer, ForeignKey("files.id"))
    target_language = Column(String)
    conversion_type = Column(String) # e.g., "speech-to-text", "translation", "text-to-speech"
    status = Column(String, default="pending") # pending, processing, completed, failed
    result_content = Column(String, nullable=True) # Text result or path to result file
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    source_file = relationship("File", back_populates="conversions")
    owner = relationship("User", back_populates="conversions")
