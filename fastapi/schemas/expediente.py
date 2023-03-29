from pydantic import BaseModel
from .paciente import PacienteCreate, Paciente
from typing import List, Optional
from datetime import date

class ExpedienteCreate(BaseModel):
    paciente: PacienteCreate

class ExpedienteModelSchema(BaseModel):
    paciente_id: int

    class Config:
        orm_mode = True

class Expediente(ExpedienteModelSchema):
    id: int
    paciente: Paciente
    
    class Config:
        orm_mode = True
