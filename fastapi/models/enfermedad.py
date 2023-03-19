from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum, Float, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from configs.database import Base

class Enfermedad(Base):
    __tablename__ = 'enfermedad'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(25))
    fecha_diagnostico = Column(Date)

    created_by_id = Column(Integer, ForeignKey("user.id"))
    updated_by_id = Column(Integer, ForeignKey("user.id"))
    deleted_by_id = Column(Integer, ForeignKey("user.id"))
    created_by = relationship("UserModel", foreign_keys=[created_by_id])
    updated_by = relationship("UserModel", foreign_keys=[updated_by_id])
    deleted_by = relationship("UserModel", foreign_keys=[deleted_by_id])
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow, nullable=True)
    deleted_at = Column(DateTime)