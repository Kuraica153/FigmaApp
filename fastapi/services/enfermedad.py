from sqlalchemy.orm import Session
from repositories.enfermedad_repo import EnfermedadRepo
from models.enfermedad import EnfermedadModel
from utils.app_exceptions import AppException

class EnfermedadService(object):

    def __init__(self, db: Session):
        self.db = db
        self.repo = EnfermedadRepo(EnfermedadModel, db)

    def get_all(self):
        return self.repo.get_all()
    
    def get_by_id(self, id):
        enfermedad = self.repo.get_by_id(id)
        if not enfermedad:
            raise AppException.NotFound(detail=f"No se ha encontrado la enfermedad con el id: {id}")
        return enfermedad
    
    def create(self, obj_in):
        enfermedad = self.repo.get_by_name(obj_in.nombre)
        if enfermedad:
            return enfermedad
        return self.repo.create(obj_in)
    
    def update(self, id, obj_in):
        enfermedad = self.repo.get_by_id(id)
        if not enfermedad:
            raise AppException.NotFound(detail=f"No se ha encontrado la enfermedad con el id: {id}")
        return self.repo.update(enfermedad, obj_in)
    
    def delete(self, id):
        enfermedad = self.repo.get_by_id(id)
        if not enfermedad:
            raise AppException.NotFound(detail=f"No se ha encontrado la enfermedad con el id: {id}")
        return self.repo.delete(enfermedad)