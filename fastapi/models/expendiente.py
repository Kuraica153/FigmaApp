from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum, Float, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from configs.database import Base

class ExpedienteModel(Base):
    __tablename__ = 'expediente'
    id = Column(Integer, primary_key=True)
    paciente_id = Column(Integer, ForeignKey("paciente.id"))
    paciente = relationship("PacienteModel", back_populates="expediente")
    consultas = relationship("ConsultaModel", back_populates="expediente")
    
    created_by_id = Column(Integer, ForeignKey("user.id"))
    updated_by_id = Column(Integer, ForeignKey("user.id"))
    deleted_by_id = Column(Integer, ForeignKey("user.id"))
    created_by = relationship("UserModel", foreign_keys=[created_by_id])
    updated_by = relationship("UserModel", foreign_keys=[updated_by_id])
    deleted_by = relationship("UserModel", foreign_keys=[deleted_by_id])
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow, nullable=True)
    deleted_at = Column(DateTime)