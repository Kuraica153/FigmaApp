from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class MedicamentoCreate(BaseModel):
    nombre: str

class Medicamento(MedicamentoCreate):
    id: int

    class Config:
        orm_mode = True