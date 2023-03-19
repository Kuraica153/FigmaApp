from fastapi import APIRouter, Depends, HTTPException

from configs.database import get_db

from services.permission import PermissionService
from schemas.role import Permission, PermissionCreate

router = APIRouter(
    prefix="/permissions",
    tags=["permissions"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=list[Permission], summary="Get all roles")
async def get_all(db=Depends(get_db)):
    return PermissionService(db).get_all() 

@router.get("/{id}", response_model=Permission, summary="Get role by id")
async def get_by_id(id: int, db=Depends(get_db)):
    return PermissionService(db).get_by_id(id)

@router.post("/", response_model=Permission, status_code=201, summary="Create a new role")
async def create(obj_in: PermissionCreate, db=Depends(get_db)):
    return PermissionService(db).create(obj_in)

@router.put("/{id}", response_model=Permission, summary="Update a role")
async def update(id: int, obj_in: PermissionCreate, db=Depends(get_db)):
    return PermissionService(db).update(id, obj_in)

@router.delete("/{id}", response_model=Permission, summary="Delete a role")
async def delete(id: int, db=Depends(get_db)):
    return PermissionService(db).delete(id)
