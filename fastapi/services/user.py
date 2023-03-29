from sqlalchemy.orm import Session
from repositories.user_repo import UserRepo
from models.user import UserModel
from utils.app_exceptions import AppException

class UserService(object):

    def __init__(self, db: Session):
        self.db = db
        self.repo = UserRepo(UserModel, db)

    def get_all(self):
        return self.repo.get_all()

    def get_by_id(self, id):

        user = self.repo.get_by_id(id)

        if not self.repo.get_by_id(id):
            raise AppException.NotFound(detail=f"No se ha encontrado el usuario con el id: {id}")
        
        return user

    def create(self, obj_in):

        user = self.repo.get_by_username(obj_in.username)

        if user:
            raise AppException.Conflict(detail=f"Ya existe un usuario con el nombre de usuario: {obj_in.username}")

        return self.repo.create(obj_in)

    def update(self, id, obj_in):
        
        user = self.repo.get_by_id(id)

        if not user:
            raise AppException.NotFound(detail=f"No se ha encontrado el usuario con el id: {id}")
        
        if not obj_in.password or obj_in.password == "":
            obj_in.password = user.password

        return self.repo.update(user, obj_in)

    def delete(self, id):

        user = self.repo.get_by_id(id)

        if not user:
            raise AppException.NotFound(detail=f"No se ha encontrado el usuario con el id: {id}")
        
        return self.repo.delete(id)