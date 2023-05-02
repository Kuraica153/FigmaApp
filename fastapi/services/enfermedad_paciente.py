from sqlalchemy.orm import Session
from repositories.enfermedad_paciente_repo import EnfermedadPacienteRepo
from models.paciente import EnfermedadPacienteModel
from utils.app_exceptions import AppException
from schemas.paciente import EnfermedadPaciente

class EnfermedadPacienteService(object):

    def __init__(self, db: Session):
        self.db = db
        self.repo = EnfermedadPacienteRepo(EnfermedadPacienteModel, db)

    def create(self, paciente_id, enfermedad_id):
        enfermedad_paciente = self.repo.get_by_paciente_enfermedad(paciente_id, enfermedad_id)

        if enfermedad_paciente:
            return enfermedad_paciente

        enfermedad_paciente = EnfermedadPaciente(paciente_id=paciente_id, enfermedad_id=enfermedad_id)
        
        return self.repo.create(enfermedad_paciente)

    def delete_by_paciente_id(self, paciente_id):
        return self.repo.delete_by_paciente_id(paciente_id)