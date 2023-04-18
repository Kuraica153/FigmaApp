from sqlalchemy.orm import Session
from repositories.procedimiento_repo import ProcedimientoRepo
from models.consulta import ProcedimientoModel
from services.medicamento import MedicamentoService
from utils.app_exceptions import AppException

class ProcedimientoService(object):

    def __init__(self, db: Session):
        self.db = db
        self.repo = ProcedimientoRepo(ProcedimientoModel, db)

    def get_all(self):
        return self.repo.get_all()
    
    def get_by_id(self, id):
        procedimiento = self.repo.get_by_id(id)
        if not procedimiento:
            raise AppException.NotFound(detail=f"No se ha encontrado la procedimiento con el id: {id}")
        return procedimiento
    
    def create(self, obj_in):
        return self.repo.create(obj_in)
    
    def update(self, id, obj_in):
        raise AppException.NotImplemented(detail=f"El método update no está implementado")