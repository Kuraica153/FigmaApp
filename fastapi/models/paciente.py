from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum, Float, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from configs.database import Base

class PacienteModel(Base):
    __tablename__ = 'paciente'

    id = Column(Integer, primary_key=True)
    first_name = Column(String(55))
    last_name = Column(String(55))
    dob = Column(Date)
    sexo = Column(Enum('M', 'F', 'O', name='sexo'))
    height = Column(Integer)
    weight = Column(Float)
    phone = Column(String(15))
    email = Column(String(55))
    alergias_medicamentos = relationship("MedicamentoModel", secondary="alergia_medicamento", back_populates="alergia_paciente")
    expediente = relationship("ExpedienteModel", back_populates="paciente")

    created_by_id = Column(Integer, ForeignKey("user.id"))
    updated_by_id = Column(Integer, ForeignKey("user.id"))
    deleted_by_id = Column(Integer, ForeignKey("user.id"))
    created_by = relationship("UserModel", foreign_keys=[created_by_id])
    updated_by = relationship("UserModel", foreign_keys=[updated_by_id])
    deleted_by = relationship("UserModel", foreign_keys=[deleted_by_id])
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow, nullable=True)
    deleted_at = Column(DateTime)