from pydantic import BaseModel

class RoleCreate(BaseModel):
    name: str

    class Config:
        orm_mode = True

class Role(RoleCreate):
    id: int
    permissions: list

    class Config:
        orm_mode = True

class PermissionCreate(BaseModel):
    name: str
    description: str

class Permission(PermissionCreate):
    id: int
    roles: list

    class Config:
        orm_mode = True