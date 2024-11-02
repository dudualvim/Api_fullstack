from sqlalchemy import Column, Integer, String, Enum, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .base import Base
from .empresa import Empresa 
from app.core.enums import UserRole  
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow)
    # Chave estrangeira para empresa
    empresa_id = Column(Integer, ForeignKey("empresas.id"))
    
    # Relacionamento com empresa
    empresa = relationship("Empresa", back_populates="users")
