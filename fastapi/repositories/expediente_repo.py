from .base_repo import BaseRepo

class ExpedienteRepo(BaseRepo):
    
    def get_by_paciente_id(self, paciente_id):
        return self.db.query(self.model).filter(self.model.paciente_id == paciente_id).first()