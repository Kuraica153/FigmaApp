from sqlalchemy.orm import Session
from repositories.alergia_medicamento import AlergiaMedicamentoRepo
from models.medicamento import AlergiaMedicamentoModel
from utils.app_exceptions import AppException
from schemas.paciente import AlergiaMedicamentoPaciente

class AlergiaMedicamentoService(object):

    def __init__(self, db: Session):
        self.db = db
        self.repo = AlergiaMedicamentoRepo(AlergiaMedicamentoModel, db)

    def create(self, paciente_id, medicamento_id):
        alergia_medicamento = self.repo.get_by_paciente_medicamento(paciente_id, medicamento_id)

        if alergia_medicamento:
            return alergia_medicamento

        alergia_medicamento = AlergiaMedicamentoPaciente(paciente_id=paciente_id, medicamento_id=medicamento_id)
        
        return self.repo.create(alergia_medicamento)
