from .base_repo import BaseRepo

class EnfermedadPacienteRepo(BaseRepo):
    
    def get_by_paciente_enfermedad(self, paciente_id, enfermedad_id):
        return self.db.query(self.model).filter(self.model.paciente_id == paciente_id, self.model.enfermedad_id == enfermedad_id).first()