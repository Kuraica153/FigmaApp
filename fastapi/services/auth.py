from sqlalchemy.orm import Session
from repositories.user_repo import UserRepo
from models.user import UserModel
from utils.app_exceptions import AppException

class AuthService(object):

    def __init__(self, db: Session):
        self.db = db
        self.repo = UserRepo(UserModel, db)

    def login(self, obj_in):
        
        user = self.repo.login(obj_in.username, obj_in.password)

        if not user:
            raise AppException.NotFound(detail=f"El usuario o la contraseña son incorrectos")
        
        return user
