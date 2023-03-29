from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum, Float, DateTime, Table
from sqlalchemy.orm import relationship
from datetime import datetime
from .audit import AuditBase

class MedicamentoModel(AuditBase):
    __tablename__ = 'medicamento'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(55))
    alergia_paciente = relationship("PacienteModel", secondary='alergia_medicamento', back_populates="alergias_medicamentos")
    medicacion = relationship("MedicacionModel", back_populates="medicamento")

class MedicacionModel(AuditBase):
    __tablename__ = 'medicacion'

    id = Column(Integer, primary_key=True)
    medicamento_id = Column(Integer, ForeignKey("medicamento.id"))
    medicamento = relationship("MedicamentoModel", back_populates="medicacion")
    dosis = Column(String(10))
    frecuencia = Column(String(25))
    duracion = Column(String(25))
    consulta_id = Column(Integer, ForeignKey("consulta.id"))

class AlergiaMedicamentoModel(AuditBase):
    __tablename__ = 'alergia_medicamento'

    id = Column(Integer, primary_key=True)
    paciente_id = Column(Integer, ForeignKey("paciente.id"))
    medicamento_id = Column(Integer, ForeignKey("medicamento.id"))