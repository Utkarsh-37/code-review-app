# database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 1. Define the database URL. This tells SQLAlchemy how to connect to our DB.
# Format: "postgresql://USER:PASSWORD@HOST/DB_NAME"
DATABASE_URL = "postgresql://myuser:mypassword@db/codereviews"

# 2. Create the SQLAlchemy engine.
engine = create_engine(DATABASE_URL)

# 3. Create a SessionLocal class. Each instance of a SessionLocal will be a database session.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. Create a Base class. Our database model class will inherit from this.
Base = declarative_base()

def get_db():
    """
    This is a dependency for our API endpoints.
    It creates a new database session for each request and makes sure
    to close it when it's done.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()