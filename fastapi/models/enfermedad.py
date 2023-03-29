from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum, Float, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .audit import AuditBase

class EnfermedadModel(AuditBase):
    __tablename__ = 'enfermedad'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(25))
