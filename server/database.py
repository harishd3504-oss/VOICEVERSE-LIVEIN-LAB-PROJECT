from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLALEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"
# Using SQLite for ease of setup and local development without requiring a running Postgres server immediately.
# Switch to the above line for production/PostgreSQL.
SQLALCHEMY_DATABASE_URL = "sqlite:///./linguaskill.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
