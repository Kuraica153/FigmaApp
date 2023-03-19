from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum, Float, DateTime, Table
from sqlalchemy.orm import relationship
from datetime import datetime

from configs.database import Base

alergia_medicamento = Table('alergia_medicamento', Base.metadata,
    Column('id', Integer, primary_key=True),
    Column('paciente_id', Integer, ForeignKey('paciente.id')),
    Column('medicamento_id', Integer, ForeignKey('medicamento.id')),
    Column('created_by_id', Integer, ForeignKey('user.id')),
    Column('updated_by_id', Integer, ForeignKey('user.id')),
    Column('deleted_by_id', Integer, ForeignKey('user.id')),
    Column('created_at', DateTime, default=datetime.utcnow),
    Column('updated_at', DateTime, onupdate=datetime.utcnow, nullable=True),
    Column('deleted_at', DateTime)
)

class MedicamentoModel(Base):
    __tablename__ = 'medicamento'

    id = Column(Integer, primary_key=True)
    nome = Column(String(55))
    alergia_paciente = relationship("PacienteModel", secondary=alergia_medicamento, back_populates="alergias_medicamentos")
    medicacion = relationship("MedicacionModel", back_populates="medicamento")

    created_by_id = Column(Integer, ForeignKey("user.id"))
    updated_by_id = Column(Integer, ForeignKey("user.id"))
    deleted_by_id = Column(Integer, ForeignKey("user.id"))
    created_by = relationship("UserModel", foreign_keys=[created_by_id])
    updated_by = relationship("UserModel", foreign_keys=[updated_by_id])
    deleted_by = relationship("UserModel", foreign_keys=[deleted_by_id])
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow, nullable=True)
    deleted_at = Column(DateTime)

class MedicacionModel(Base):
    __tablename__ = 'medicacion'

    id = Column(Integer, primary_key=True)
    medicamento_id = Column(Integer, ForeignKey("medicamento.id"))
    medicamento = relationship("MedicamentoModel", back_populates="medicacion")
    dosis = Column(String(10))
    frecuencia = Column(String(25))
    duracion = Column(String(25))
    consulta_id = Column(Integer, ForeignKey("consulta.id"))

    created_by_id = Column(Integer, ForeignKey("user.id"))
    updated_by_id = Column(Integer, ForeignKey("user.id"))
    deleted_by_id = Column(Integer, ForeignKey("user.id"))
    created_by = relationship("UserModel", foreign_keys=[created_by_id])
    updated_by = relationship("UserModel", foreign_keys=[updated_by_id])
    deleted_by = relationship("UserModel", foreign_keys=[deleted_by_id])
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow, nullable=True)
    deleted_at = Column(DateTime)