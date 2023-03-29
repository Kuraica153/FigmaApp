from .base_repo import BaseRepo

class PacienteRepo(BaseRepo):

    def get_by_name(self, first_name, last_name):
        return self.db.query(self.model).filter(self.model.first_name == first_name, self.model.last_name == last_name).first()
    
    def get_by_first_name(self, first_name):
        return self.db.query(self.model).filter(self.model.first_name == first_name).first()