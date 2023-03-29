from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum, Float, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .audit import AuditBase

from configs.database import Base

class PacienteModel(AuditBase):
    __tablename__ = 'paciente'

    id = Column(Integer, primary_key=True)
    first_name = Column(String(55))
    last_name = Column(String(55))
    dob = Column(Date)
    gender = Column(Enum('M', 'F', 'O', name='gender'))
    height = Column(Integer)
    weight = Column(Float)
    phone = Column(String(15))
    email = Column(String(55))
    address = Column(String(100))
    alergias_medicamentos = relationship("MedicamentoModel", secondary="alergia_medicamento", back_populates="alergia_paciente")
    enfermedad_paciente = relationship("EnfermedadModel", secondary="enfermedad_paciente")
    expediente = relationship("ExpedienteModel", back_populates="paciente")

class EnfermedadPacienteModel(AuditBase):
    __tablename__ = 'enfermedad_paciente'

    id = Column(Integer, primary_key=True)
    paciente_id = Column(Integer, ForeignKey("paciente.id"))
    enfermedad_id = Column(Integer, ForeignKey("enfermedad.id"))