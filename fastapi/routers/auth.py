from fastapi import APIRouter, Depends, HTTPException

from configs.database import get_db

from services.auth import AuthService
from schemas.user import User, UserCredentials

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=User, status_code=200, summary="Autenticación de usuario")
async def create(obj_in: UserCredentials, db=Depends(get_db)):
    return AuthService(db).login(obj_in)

