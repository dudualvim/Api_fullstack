# backend/app/core/enums.py
from enum import Enum

class UserRole(str, Enum):
    SUPERADMIN = "superadmin"
    ADMIN = "admin"
    OPERADOR = "operador"
