# backend/app/models/__init__.py
from .base import Base
from .usuario import User
from .empresa import Empresa

# This ensures all models are registered with SQLAlchemy
__all__ = ['Base', 'User', 'Empresa']