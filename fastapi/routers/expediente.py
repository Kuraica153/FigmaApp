from fastapi import APIRouter, Depends, HTTPException

from configs.database import get_db

from services.expediente import ExpedienteService
from schemas.expediente import Expediente, ExpedienteCreate
from schemas.paciente import PacienteCreate

router = APIRouter(
    prefix="/expedientes",
    tags=["expedientes"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=list[Expediente], summary="Get all users")
async def get_all(db=Depends(get_db)):
    return ExpedienteService(db).get_all() 

@router.get("/{id}", response_model=Expediente, summary="Get user by id")
async def get_by_id(id: int, db=Depends(get_db)):
    return ExpedienteService(db).get_by_id(id)

# Search by paciente first name and last name
@router.get("/paciente/{first_name}/{last_name}", response_model=Expediente, summary="Get expediente by paciente first name and last name")
async def get_by_paciente(first_name: str, last_name: str, db=Depends(get_db)):
    return ExpedienteService(db).get_by_paciente_id(first_name, last_name)


@router.post("/", response_model=Expediente, status_code=201, summary="Create a new expediente")
async def create(obj_in: PacienteCreate, db=Depends(get_db)):
    return ExpedienteService(db).create(obj_in)

@router.put("/{id}", response_model=Expediente, summary="Update a expediente")
async def update(id: int, obj_in: ExpedienteCreate, db=Depends(get_db)):
    return ExpedienteService(db).update(id, obj_in)

@router.delete("/{id}", response_model=bool, summary="Delete a expediente")
async def delete(id: int, db=Depends(get_db)):
    return ExpedienteService(db).delete(id)
