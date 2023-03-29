from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class EnfermedadCreate(BaseModel):
    nombre: str

class Enfermedad(EnfermedadCreate):
    id: int

    class Config:
        orm_mode = True