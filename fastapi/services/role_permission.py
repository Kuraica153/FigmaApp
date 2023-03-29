from sqlalchemy.orm import Session
from repositories.role_permission_repo import RolePermissionRepo
from models.role import RolePermissionModel
from schemas.role import RolePermissionCreate
from utils.app_exceptions import AppException

class RolePermissionService(object):

    def __init__(self, db: Session):
        self.db = db
        self.repo = RolePermissionRepo(RolePermissionModel, db)

    def create(self, role_id, permission_id):
        role_permission = self.repo.get_by_role_permission(role_id, permission_id)

        if role_permission:
            return role_permission

        obj = RolePermissionCreate(role_id=role_id, permission_id=permission_id)

        return self.repo.create(obj)
