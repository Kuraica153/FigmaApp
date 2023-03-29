from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Table
from datetime import datetime
from sqlalchemy.orm import relationship
from .audit import AuditBase

from configs.database import Base

class RoleModel(AuditBase):
    __tablename__ = "role"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, index=True)
    permissions = relationship("PermissionModel", secondary="role_permission", back_populates="roles")
    users = relationship("UserModel", back_populates="role", foreign_keys="UserModel.role_id")


class PermissionModel(AuditBase):
    __tablename__ = "permission"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, index=True)
    description = Column(String)
    roles = relationship("RoleModel", secondary="role_permission", back_populates="permissions")

class RolePermissionModel(AuditBase):
    __tablename__ = 'role_permission'
    id = Column(Integer, primary_key=True)
    role_id = Column(Integer, ForeignKey("role.id"))
    permission_id = Column(Integer, ForeignKey("permission.id"))