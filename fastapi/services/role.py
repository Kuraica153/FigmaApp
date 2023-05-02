from sqlalchemy.orm import Session
from repositories.role_repo import RoleRepo
from services.role_permission import RolePermissionService
from models.role import RoleModel
from utils.app_exceptions import AppException

class RoleService(object):

    def __init__(self, db: Session):
        self.db = db
        self.repo = RoleRepo(RoleModel, db)

    def get_all(self):
        return self.repo.get_all()

    def get_by_id(self, id):
        
        role = self.repo.get_by_id(id)

        if not role:
            raise AppException.NotFound(detail=f"No se ha encontrado el rol con el id: {id}")
        
        return role

    def create(self, obj_in):


        role = self.repo.get_by_name(obj_in.name)

        if role:
            raise AppException.Conflict(detail=f"Ya existe un rol con el nombre: {obj_in.name}")

        # Remove the permissions attribute from the object
        permissions = obj_in.permissions
        del obj_in.permissions

        role = self.repo.create(obj_in)

        if permissions:
            for permission in permissions:
                RolePermissionService(self.db).create(role.id, permission.id)

        return role

    def update(self, id, obj_in):
        role = self.repo.get_by_id(id) 

        if not role:
            raise AppException.NotFound(detail=f"No se ha encontrado el rol con el id: {id}")
        
        # Remove the permissions attribute from the object
        permissions = obj_in.permissions
        del obj_in.permissions

        RolePermissionService(self.db).delete_by_role_id(role.id)

        if permissions:
            for permission in permissions:
                RolePermissionService(self.db).create(role.id, permission.id)

        role = self.repo.update(role, obj_in)

        return role

    def delete(self, id):
        role = self.repo.get_by_id(id)

        if not role:
            raise AppException.NotFound(detail=f"No se ha encontrado el rol con el id: {id}")
        
        return self.repo.delete(id)