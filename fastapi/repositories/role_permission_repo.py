from .base_repo import BaseRepo

class RolePermissionRepo(BaseRepo):
    
    def get_by_role_permission(self, role_id, permission_id):
        return self.db.query(self.model).filter(self.model.role_id == role_id, self.model.permission_id == permission_id).first()