from sqlalchemy.orm import Session
from repositories.medicacion_repo import MedicacionRepo
from models.medicamento import MedicacionModel
from services.medicamento import MedicamentoService
from utils.app_exceptions import AppException
from schemas.medicamento import MedicamentoCreate
from schemas.medicacion import MedicacionCreate as MedicacionCreateSchema

class MedicacionService(object):

    def __init__(self, db: Session):
        self.db = db
        self.repo = MedicacionRepo(MedicacionModel, db)

    def get_all(self):
        return self.repo.get_all()
    
    def get_by_id(self, id):
        medicacion = self.repo.get_by_id(id)
        if not medicacion:
            raise AppException.NotFound(detail=f"No se ha encontrado la medicacion con el id: {id}")
        return medicacion
    
    def create(self, obj_in):
        
        try:
            medicamento = MedicamentoService(self.db).get_by_name(obj_in.medicamento)
        except AppException.NotFound:
            medicamento = MedicamentoService(self.db).create(MedicamentoCreate(nombre=obj_in.medicamento))

        del obj_in.medicamento

        obj = obj_in.__dict__

        obj['medicamento_id'] = medicamento.id

        return self.repo.create(MedicacionCreateSchema(**obj))
    
    def update(self, id, obj_in):
        raise AppException.NotImplemented(detail=f"El método update no está implementado")