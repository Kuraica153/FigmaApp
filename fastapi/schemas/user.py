from pydantic import BaseModel
from typing import Optional

class UserCredentials(BaseModel):
    username: str
    password: str

class UserCreate(UserCredentials):
    first_name: str
    last_name: str
    role_id: Optional[int]

class User(UserCreate):
    id: int
    role: Optional[str]

    class Config:
        orm_mode = True