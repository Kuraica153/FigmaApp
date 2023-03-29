from .base_repo import BaseRepo

class UserRepo(BaseRepo):
    
    def get_by_username(self, username):
        return self.db.query(self.model).filter(self.model.username == username).first()