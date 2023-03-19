from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from configs.database import Base

class UserModel(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, index=True)
    first_name = Column(String(55))
    last_name = Column(String(55))
    password = Column(String)
    role_id = Column(Integer, ForeignKey("role.id"))
    role = relationship("RoleModel", back_populates="users", foreign_keys=[role_id])

    created_by_id = Column(Integer, ForeignKey("user.id"))
    updated_by_id = Column(Integer, ForeignKey("user.id"))
    deleted_by_id = Column(Integer, ForeignKey("user.id"))
    created_by = relationship("UserModel", foreign_keys=[created_by_id])
    updated_by = relationship("UserModel", foreign_keys=[updated_by_id])
    deleted_by = relationship("UserModel", foreign_keys=[deleted_by_id])
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow, nullable=True)
    deleted_at = Column(DateTime)


