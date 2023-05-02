from .base_repo import BaseRepo

class AlergiaMedicamentoRepo(BaseRepo):
    
    def get_by_paciente_medicamento(self, paciente_id, medicamento_id):
        return self.db.query(self.model).filter(self.model.paciente_id == paciente_id, self.model.medicamento_id == medicamento_id).first()
    
    def delete_by_paciente_id(self, paciente_id):
        return self.db.query(self.model).filter(self.model.paciente_id == paciente_id).delete()