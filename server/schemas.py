from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str
    full_name: Optional[str] = None

class UserLogin(UserBase):
    password: str

class UserUpdate(BaseModel):
    preferred_language: Optional[str] = None
    full_name: Optional[str] = None

class User(UserBase):
    id: int
    full_name: Optional[str] = None
    preferred_language: str
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class FileBase(BaseModel):
    filename: str
    file_type: str

class File(FileBase):
    id: int
    file_size: int
    created_at: datetime
    owner_id: int

    class Config:
        from_attributes = True

class ConversionBase(BaseModel):
    target_language: str
    conversion_type: str

class ConversionCreate(ConversionBase):
    source_file_id: int

class Conversion(ConversionBase):
    id: int
    status: str
    result_content: Optional[str] = None
    created_at: datetime
    source_file_id: int
    owner_id: int

    class Config:
        from_attributes = True
