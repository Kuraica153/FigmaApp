from pydantic import BaseModel, constr
from typing import List, Optional
from datetime import date
from .medicamento import Medicamento

class ProcedimientoCreate(BaseModel):
    procedimiento: constr(max_length=500)

class Procedimiento(ProcedimientoCreate):
    id: int

    class Config:
        orm_mode = True