import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost")
    SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")

config = Config()
