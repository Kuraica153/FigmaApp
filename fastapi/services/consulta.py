from sqlalchemy.orm import Session
from repositories.consulta_repo import ConsultaRepo
from models.consulta import ConsultaModel
from utils.app_exceptions import AppException
from services.medicacion import MedicacionService
from services.procedimiento import ProcedimientoService
from schemas.consulta import MedicacionServiceSchema, ProcedimientoServiceSchema

class ConsultaService(object):

    def __init__(self, db: Session):
        self.db = db
        self.repo = ConsultaRepo(ConsultaModel, db)

    def get_all(self):
        return self.repo.get_all()
    
    def get_by_id(self, id):
        consulta = self.repo.get_by_id(id)
        if not consulta:
            raise AppException.NotFound(detail=f"No se ha encontrado la consulta con el id: {id}")
        return consulta
    
    def create(self, obj_in):
        
        if obj_in.medicacion:
            medicaciones = obj_in.medicacion
            del obj_in.medicacion

        if obj_in.procedimientos:
            procedimientos = obj_in.procedimientos
            del obj_in.procedimientos

        consulta = self.repo.create(obj_in)

        if medicaciones:
            for medicacion in medicaciones:
                # Convert the medicacion to a MedicacionService object
                obj = medicacion.__dict__
                obj['consulta_id'] = consulta.id
                obj = MedicacionServiceSchema(**obj)
                MedicacionService(self.db).create(obj)

        if procedimientos:
            for procedimiento in procedimientos:
                # Convert the procedimiento to a ProcedimientoService object
                obj = ProcedimientoServiceSchema(**procedimiento.__dict__)
                obj.consulta_id = consulta.id
                ProcedimientoService(self.db).create(obj)

        return consulta
    
    def update(self, id, obj_in):
        raise AppException.NotImplemented(detail=f"El método update no está implementado")