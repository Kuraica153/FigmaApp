from fastapi import APIRouter, Depends, HTTPException

from configs.database import get_db

from services.user import UserService
from schemas.user import User, UserCreate

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=list[User], summary="Get all users")
async def get_all(db=Depends(get_db)):
    return UserService(db).get_all() 

@router.get("/{id}", response_model=User, summary="Get user by id")
async def get_by_id(id: int, db=Depends(get_db)):
    return UserService(db).get_by_id(id)

@router.post("/", response_model=User, status_code=201, summary="Create a new user")
async def create(obj_in: UserCreate, db=Depends(get_db)):
    return UserService(db).create(obj_in)

@router.put("/{id}", response_model=User, summary="Update a user")
async def update(id: int, obj_in: UserCreate, db=Depends(get_db)):
    return UserService(db).update(id, obj_in)

@router.delete("/{id}", response_model=User, summary="Delete a user")
async def delete(id: int, db=Depends(get_db)):
    return UserService(db).delete(id)
