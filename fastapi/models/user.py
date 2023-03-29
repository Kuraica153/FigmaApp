from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .audit import AuditBase


class UserModel(AuditBase):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, index=True)
    first_name = Column(String(55))
    last_name = Column(String(55))
    password = Column(String)
    role_id = Column(Integer, ForeignKey("role.id"))
    role = relationship("RoleModel", back_populates="users", foreign_keys=[role_id])
