from .base_repo import BaseRepo

class MedicamentoRepo(BaseRepo):
    
    def get_by_name(self, nombre):
        return self.db.query(self.model).filter(self.model.nombre == nombre).first()
