from sqlalchemy.orm import Session
from ..models.empresa import Empresa

def get_empresa_by_id(db: Session, empresa_id: int):
    return db.query(Empresa).filter(Empresa.id == empresa_id).first()

def create_empresa(db: Session, nome: str, endereco: str):
    empresa = Empresa(nome=nome, endereco=endereco)
    db.add(empresa)
    db.commit()
    db.refresh(empresa)
    return empresa
