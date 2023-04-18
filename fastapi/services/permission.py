from sqlalchemy.orm import Session
from repositories.role_repo import PermissionRepo
from models.role import PermissionModel
from utils.app_exceptions import AppException

class PermissionService(object):

    def __init__(self, db: Session):
        self.db = db
        self.repo = PermissionRepo(PermissionModel, db)

    def get_all(self):
        return self.repo.get_all()

    def get_by_id(self, id):
        permission = self.repo.get_by_id(id)
        if not permission:
            raise AppException.NotFound(detail=f"No se ha encontrado el permiso con el id: {id}")
        return permission

    def create(self, obj_in):
        return self.repo.create(obj_in)

    def update(self, id, obj_in):
        role = self.repo.get_by_id(id)
        return self.repo.update(role, obj_in)

    def delete(self, id):
        return self.repo.delete(id)