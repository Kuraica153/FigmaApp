from .base_repo import BaseRepo

class ExpedienteRepo(BaseRepo):
    
    def get_by_paciente_id(self, paciente_id):
        return self.model.query.filter_by(paciente_id=paciente_id).all()