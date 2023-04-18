from fastapi import APIRouter, Depends

from configs.database import get_db

from services.consulta import ConsultaService
from schemas.consulta import Consulta, ConsultaCreate

router = APIRouter(
    prefix="/consultas",
    tags=["consultas"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=list[Consulta], summary="Get all roles")
async def get_all(db=Depends(get_db)):
    return ConsultaService(db).get_all()

@router.get("/{id}", response_model=Consulta, summary="Get role by id")
async def get_by_id(id: int, db=Depends(get_db)):
    return ConsultaService(db).get_by_id(id)

@router.post("/", response_model=Consulta, status_code=201, summary="Create a new role")
async def create(obj_in: ConsultaCreate, db=Depends(get_db)):
    return ConsultaService(db).create(obj_in)

@router.put("/{id}", response_model=Consulta, summary="Update a role")
async def update(id: int, obj_in: ConsultaCreate, db=Depends(get_db)):
    return ConsultaService(db).update(id, obj_in)

@router.delete("/{id}", response_model=bool, summary="Delete a role")
async def delete(id: int, db=Depends(get_db)):
    return ConsultaService(db).delete(id)
