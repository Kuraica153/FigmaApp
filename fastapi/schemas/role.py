from pydantic import BaseModel
from typing import List, Optional

class PermissionCreate(BaseModel):
    name: str
    description: str

class Permission(PermissionCreate):
    id: int

    class Config:
        orm_mode = True

class RoleCreate(BaseModel):
    name: str
    permissions: Optional[List[Permission]]

    class Config:
        orm_mode = True

class Role(RoleCreate):
    id: int

    class Config:
        orm_mode = True

class RolePermissionCreate(BaseModel):
    role_id: int
    permission_id: int

    class Config:
        orm_mode = True
