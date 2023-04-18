from pydantic import BaseModel, constr
from typing import List, Optional
from datetime import date
from .medicamento import Medicamento

class MedicacionCreate(BaseModel):
    medicamento_id: int
    dosis: constr(max_length=10)
    frecuencia: constr(max_length=25)
    duracion: constr(max_length=25)
    consulta_id: int

class Medicacion(MedicacionCreate):
    id: int
    medicamento: Optional[Medicamento]
    
    class Config:
        orm_mode = True