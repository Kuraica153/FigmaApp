from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum, Float, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from configs.database import Base

class ConsultaModel(Base):
    __tablename__ = 'consulta'
    id = Column(Integer, primary_key=True)

    motivo_visita = Column(String(500))
    complicaciones = Column(String(500))
    tratamiento = Column(String(500))
    expediente_id = Column(Integer, ForeignKey("expediente.id"))
    expediente = relationship("ExpedienteModel", back_populates="consultas", uselist=False)
    medicacion = relationship("MedicacionModel")
    procedimientos = relationship("ProcedimientoModel", back_populates="consulta")

    created_by_id = Column(Integer, ForeignKey("user.id"))
    updated_by_id = Column(Integer, ForeignKey("user.id"))
    deleted_by_id = Column(Integer, ForeignKey("user.id"))
    created_by = relationship("UserModel", foreign_keys=[created_by_id])
    updated_by = relationship("UserModel", foreign_keys=[updated_by_id])
    deleted_by = relationship("UserModel", foreign_keys=[deleted_by_id])
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow, nullable=True)
    deleted_at = Column(DateTime)

class ProcedimientoModel(Base):
    __tablename__ = 'procedimiento'
    id = Column(Integer, primary_key=True)

    nombre = Column(String(100))
    costo = Column(Float)
    consulta_id = Column(Integer, ForeignKey("consulta.id"))
    consulta = relationship("ConsultaModel", back_populates="procedimientos")

    created_by_id = Column(Integer, ForeignKey("user.id"))
    updated_by_id = Column(Integer, ForeignKey("user.id"))
    deleted_by_id = Column(Integer, ForeignKey("user.id"))
    created_by = relationship("UserModel", foreign_keys=[created_by_id])
    updated_by = relationship("UserModel", foreign_keys=[updated_by_id])
    deleted_by = relationship("UserModel", foreign_keys=[deleted_by_id])
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow, nullable=True)
    deleted_at = Column(DateTime)