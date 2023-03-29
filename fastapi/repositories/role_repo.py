from .base_repo import BaseRepo

class RoleRepo(BaseRepo):
    
    def get_by_name(self, name):
        return self.db.query(self.model).filter(self.model.name == name).first()

class PermissionRepo(BaseRepo):
    pass