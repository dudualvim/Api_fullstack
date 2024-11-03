from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..models.empresa import Empresa
from ..schemas.empresa_schemas import EmpresaCreate, EmpresaResponse
from ..core.security import get_current_user
from ..models.usuario import UserRole, User

router = APIRouter()

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_empresa(empresa: EmpresaCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.SUPERADMIN:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to create companies")
    
    new_empresa = Empresa(
        name=empresa.name,
        address=empresa.address,
        phone=empresa.phone,
        email=empresa.email,
        cnpj=empresa.cnpj,
    )
    db.add(new_empresa)
    db.commit()
    db.refresh(new_empresa)
    return {"msg": "Empresa Criada com Sucesso!", "company_id": new_empresa.id}



@router.put("/empresas/{empresa_id}", response_model=EmpresaResponse)
def update_empresa(
    empresa_id: int,
    empresa_update: EmpresaCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_empresa = db.query(Empresa).filter(Empresa.id == empresa_id).first()
    if not db_empresa:
        raise HTTPException(status_code=404, detail="Empresa não encontrada")
    
    for field, value in empresa_update.dict(exclude_unset=True).items():
        setattr(db_empresa, field, value)
    
    db.commit()
    db.refresh(db_empresa)
    return db_empresa


@router.get("/list", response_model=List[EmpresaResponse])
def list_empresas(db: Session = Depends(get_db)):
    empresas = db.query(Empresa).all()
    return empresas 