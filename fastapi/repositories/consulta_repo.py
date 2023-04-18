from .base_repo import BaseRepo

class ConsultaRepo(BaseRepo):
    
    def get_by_expediente(self, expediente_id):
        return self.db.query(self.model).filter(self.model.expediente_id == expediente_id).all()