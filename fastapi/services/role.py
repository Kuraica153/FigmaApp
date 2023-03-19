from sqlalchemy.orm import Session
from repositories.role_repo import RoleRepo
from models.role import RoleModel

class RoleService(object):

    def __init__(self, db: Session):
        self.db = db
        self.repo = RoleRepo(RoleModel, db)

    def get_all(self):
        return self.repo.get_all()

    def get_by_id(self, id):
        return self.repo.get_by_id(id)

    def create(self, obj_in):
        return self.repo.create(obj_in)

    def update(self, id, obj_in):
        role = self.repo.get_by_id(id)
        return self.repo.update(role, obj_in)

    def delete(self, id):
        return self.repo.delete(id)