from sqlalchemy.orm import Session
from repositories.paciente_repo import PacienteRepo
from models.paciente import PacienteModel
from utils.app_exceptions import AppException

class PacienteService(object):

    def __init__(self, db: Session):
        self.db = db
        self.repo = PacienteRepo(PacienteModel, db)

    def get_all(self):
        return self.repo.get_all()
    
    def get_by_id(self, id):
        paciente = self.repo.get_by_id(id)
        if not paciente:
            raise AppException.NotFound(detail=f"No se ha encontrado el paciente con el id: {id}")
        return paciente
    
    def create(self, obj_in):
        paciente = self.repo.get_by_name(obj_in.first_name, obj_in.last_name)
        if paciente:
            raise AppException.Conflict(detail=f"Ya existe un paciente con el nombre: {obj_in.first_name} {obj_in.last_name}")
        return self.repo.create(obj_in)
    
    def update(self, id, obj_in):
        paciente = self.repo.get_by_id(id)
        if not paciente:
            raise AppException.NotFound(detail=f"No se ha encontrado el paciente con el id: {id}")
        return self.repo.update(paciente, obj_in)