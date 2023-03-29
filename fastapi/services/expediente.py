from sqlalchemy.orm import Session
from repositories.expediente_repo import ExpedienteRepo
from models.expediente import ExpedienteModel
from utils.app_exceptions import AppException
from .paciente import PacienteService
from .enfermedad import EnfermedadService
from .medicamento import MedicamentoService
from .enfermedad_paciente import EnfermedadPacienteService
from .alergia_medicamento import AlergiaMedicamentoService
from schemas.expediente import ExpedienteModelSchema

class ExpedienteService(object):

    def __init__(self, db: Session):
        self.db = db
        self.repo = ExpedienteRepo(ExpedienteModel, db)

    def get_all(self):
        return self.repo.get_all()
    
    def get_by_id(self, id):
        expediente = self.repo.get_by_id(id)
        if not expediente:
            raise AppException.NotFound(detail=f"No se ha encontrado la expediente con el id: {id}")
        return expediente
    
    def create(self, obj_in):
        
        # Get the attributes from the object
        paciente = obj_in
        enfermedades_paciente = paciente.enfermedad_paciente
        alergias_medicamento = paciente.alergias_medicamentos
        # Remove the extra attributes from the object
        del paciente.enfermedad_paciente
        del paciente.alergias_medicamentos
        # Create the paciente
        paciente = PacienteService(self.db).create(paciente)
        # Create the enfermedad_paciente
        enfermedades = []
        if enfermedades_paciente:
            for enfermedad in enfermedades_paciente:
                enfermedades.append(EnfermedadService(self.db).create(enfermedad))
            for enfermedad in enfermedades:
                EnfermedadPacienteService(self.db).create(paciente.id, enfermedad.id)

        # Create the alergias_medicamento
        alergias = []
        if alergias_medicamento:
            for alergia in alergias_medicamento:
                alergias.append(MedicamentoService(self.db).create(alergia))
            for alergia in alergias:
                AlergiaMedicamentoService(self.db).create(paciente.id, alergia.id)

        # Create the expediente
        expediente = ExpedienteModelSchema(
            paciente_id=paciente.id,
        )

        return self.repo.create(expediente)
    
    def update(self, id, obj_in):
        expediente = self.repo.get_by_id(id)
        if not expediente:
            raise AppException.NotFound(detail=f"No se ha encontrado la expediente con el id: {id}")
        return self.repo.update(expediente, obj_in)
    
    def delete(self, id):
        expediente = self.repo.get_by_id(id)
        if not expediente:
            raise AppException.NotFound(detail=f"No se ha encontrado la expediente con el id: {id}")
        return self.repo.delete(expediente.id)