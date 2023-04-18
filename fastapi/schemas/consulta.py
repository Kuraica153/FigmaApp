from pydantic import BaseModel, constr, validator, Extra
from typing import List, Optional
from .medicacion import Medicacion as MedicacionSchema
from .procedimiento import Procedimiento as ProcedimientoSchema
from .expediente import Expediente
from datetime import date

class MedicacionCreate(BaseModel, extra=Extra.forbid):
    medicamento: constr(max_length=100)
    dosis: constr(max_length=10)
    frecuencia: constr(max_length=25)
    duracion: constr(max_length=25)


class ProcedimientoCreate(BaseModel, extra=Extra.forbid):
    procedimiento: constr(max_length=500)

class MedicacionServiceSchema(MedicacionCreate):
    consulta_id: Optional[int]

class Medicacion(MedicacionServiceSchema):
    id: int
    
    class Config:
        orm_mode = True

class ProcedimientoServiceSchema(ProcedimientoCreate):
    consulta_id: Optional[int]

class Procedimiento(ProcedimientoServiceSchema):
    id: int
    
    class Config:
        orm_mode = True
    
class ConsultaCreate(BaseModel):
    motivo_visita: constr(max_length=500)
    complicaciones: Optional[constr(max_length=500)]
    tratamiento: Optional[constr(max_length=500)]
    medicacion: Optional[List[MedicacionCreate]]
    procedimientos: Optional[List[ProcedimientoCreate]]
    expediente_id: int

class Consulta(ConsultaCreate):
    id: int
    medicacion: Optional[List[MedicacionSchema]]
    procedimientos: Optional[List[ProcedimientoSchema]]
    expediente: Optional[Expediente]
    created_at: date
    updated_at: Optional[date]
    deleted_at: Optional[date]
    created_by: Optional[int]
    updated_by: Optional[int]
    deleted_by: Optional[int]

    class Config:
        orm_mode = True

