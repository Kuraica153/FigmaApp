from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum, Float, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .audit import AuditBase

class ConsultaModel(AuditBase):
    __tablename__ = 'consulta'
    id = Column(Integer, primary_key=True)

    motivo_visita = Column(String(500))
    complicaciones = Column(String(500))
    tratamiento = Column(String(500))
    expediente_id = Column(Integer, ForeignKey("expediente.id"))
    expediente = relationship("ExpedienteModel", back_populates="consultas", uselist=False)
    medicacion = relationship("MedicacionModel")
    procedimientos = relationship("ProcedimientoModel", back_populates="consulta")

class ProcedimientoModel(AuditBase):
    __tablename__ = 'procedimiento'
    id = Column(Integer, primary_key=True)

    nombre = Column(String(100))
    costo = Column(Float)
    consulta_id = Column(Integer, ForeignKey("consulta.id"))
    consulta = relationship("ConsultaModel", back_populates="procedimientos")