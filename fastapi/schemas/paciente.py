from pydantic import BaseModel, constr
from typing import List, Optional, Union
from .enfermedad import EnfermedadCreate, Enfermedad
from .medicamento import MedicamentoCreate, Medicamento
from datetime import date

class PacienteCreate(BaseModel):
    first_name: str
    last_name: str
    dob: date
    gender: constr(regex='^(M|F|O)$')
    height: int
    weight: float
    phone: str
    email: constr(regex='^[\w-]+@([\w-]+\.)+[\w-]+$', min_length=5, max_length=55)
    address: str
    alergias_medicamentos: Optional[Optional[List[Union[MedicamentoCreate, Medicamento]]]]
    enfermedad_paciente: Optional[Optional[List[Union[EnfermedadCreate, Enfermedad]]]]

class Paciente(PacienteCreate):
    id: int

    class Config:
        orm_mode = True

class EnfermedadPaciente(BaseModel):
    id: Optional[int]
    paciente_id: int
    enfermedad_id: int

    class Config:
        orm_mode = True

class AlergiaMedicamentoPaciente(BaseModel):
    id: Optional[int]
    paciente_id: int
    medicamento_id: int

    class Config:
        orm_mode = True

class PacienteName(BaseModel):
    first_name: str
    last_name: str
