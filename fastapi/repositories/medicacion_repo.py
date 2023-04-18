from .base_repo import BaseRepo

class MedicacionRepo(BaseRepo):
    
    def get_by_medicamento(self, medicamento_id):
        return self.db.query(self.model).filter(self.model.medicamento_id == medicamento_id).all()