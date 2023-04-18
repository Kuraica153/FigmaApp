from sqlalchemy.orm import Session
from repositories.medicamento_repo import MedicamentoRepo
from models.medicamento import MedicamentoModel
from utils.app_exceptions import AppException

class MedicamentoService(object):

    def __init__(self, db: Session):
        self.db = db
        self.repo = MedicamentoRepo(MedicamentoModel, db)

    def get_all(self):
        return self.repo.get_all()
    
    def get_by_id(self, id):
        medicamento = self.repo.get_by_id(id)
        if not medicamento:
            raise AppException.NotFound(detail=f"No se ha encontrado la medicamento con el id: {id}")
        return medicamento
    
    def get_by_name(self, nombre):
        print(nombre)
        medicamento = self.repo.get_by_name(nombre)
        if not medicamento:
            raise AppException.NotFound(detail=f"No se ha encontrado la medicamento con el nombre: {nombre}")
        return medicamento

    def create(self, obj_in):
        medicamento = self.repo.get_by_name(obj_in.nombre)
        if medicamento:
            return medicamento
        return self.repo.create(obj_in)
    
    def update(self, id, obj_in):
        medicamento = self.repo.get_by_id(id)
        if not medicamento:
            raise AppException.NotFound(detail=f"No se ha encontrado la medicamento con el id: {id}")
        return self.repo.update(medicamento, obj_in)
    
    def delete(self, id):
        medicamento = self.repo.get_by_id(id)
        if not medicamento:
            raise AppException.NotFound(detail=f"No se ha encontrado la medicamento con el id: {id}")
        return self.repo.delete(medicamento)