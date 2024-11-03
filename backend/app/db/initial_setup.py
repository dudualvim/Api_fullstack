from app.db.database import SessionLocal, engine
from app.models import Base, User 
from app.core.security import get_password_hash
from app.core.enums import UserRole
import time

def init_db():
    print("Starting database initialization...")
    try:
        print("Creating all tables...")
        Base.metadata.create_all(bind=engine)
        print("Database tables created successfully!")
    except Exception as e:
        print(f"Error creating tables: {e}")
        raise

def create_initial_superadmin():
    print("Creating initial superadmin...")
    db = SessionLocal()
    try:
        # Verifica se já existe um superadmin
        existing_superadmin = db.query(User).filter(User.role == UserRole.SUPERADMIN).first()
        if not existing_superadmin:
            superadmin = User(
                name="SuperAdmin",
                email="admin@example.com",
                password=get_password_hash("adminpassword"),
                role=UserRole.SUPERADMIN
            )
            db.add(superadmin)
            db.commit()
            print("Superadmin created successfully!")
        else:
            print("Superadmin already exists.")
    except Exception as e:
        print(f"Error creating superadmin: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
    create_initial_superadmin()