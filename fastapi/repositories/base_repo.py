from sqlalchemy.orm import Session


class BaseRepo(object):
    """Base repository class for all repositories to inherit from."""

    def __init__(self, model: object, db: Session):
        self.model = model
        self.db = db

    def get_all(self):
        return self.db.query(self.model).all()
    
    def get_by_id(self, id):
        return self.db.query(self.model).filter(self.model.id == id).first()
    
    def create(self, obj_in):
        obj = self.model(**obj_in.dict())
        self.db.add(obj)
        self.db.commit()
        self.db.refresh(obj)
        return obj
    
    def update(self, obj, obj_in):
        for field in obj_in.dict(exclude_unset=True):
            setattr(obj, field, getattr(obj_in, field))
        self.db.add(obj)
        self.db.commit()
        self.db.refresh(obj)
        return obj
    
    def delete(self, id):
        obj = self.db.query(self.model).filter(self.model.id == id).first()
        self.db.delete(obj)
        self.db.commit()
        return True
