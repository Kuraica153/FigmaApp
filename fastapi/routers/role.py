from fastapi import APIRouter, Depends, HTTPException

from configs.database import get_db

from services.role import RoleService
from schemas.role import Role, RoleCreate

router = APIRouter(
    prefix="/roles",
    tags=["roles"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=list[Role], summary="Get all roles")
async def get_all(db=Depends(get_db)):
    return RoleService(db).get_all()

@router.get("/{id}", response_model=Role, summary="Get role by id")
async def get_by_id(id: int, db=Depends(get_db)):
    return RoleService(db).get_by_id(id)

@router.post("/", response_model=Role, status_code=201, summary="Create a new role")
async def create(obj_in: RoleCreate, db=Depends(get_db)):
    return RoleService(db).create(obj_in)

@router.put("/{id}", response_model=Role, summary="Update a role")
async def update(id: int, obj_in: RoleCreate, db=Depends(get_db)):
    return RoleService(db).update(id, obj_in)

@router.delete("/{id}", response_model=bool, summary="Delete a role")
async def delete(id: int, db=Depends(get_db)):
    return RoleService(db).delete(id)
