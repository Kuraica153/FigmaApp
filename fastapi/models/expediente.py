from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum, Float, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .audit import AuditBase

class ExpedienteModel(AuditBase):
    __tablename__ = 'expediente'
    id = Column(Integer, primary_key=True)
    paciente_id = Column(Integer, ForeignKey("paciente.id"))
    paciente = relationship("PacienteModel", back_populates="expediente")
    consultas = relationship("ConsultaModel", back_populates="expediente")