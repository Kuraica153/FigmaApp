from fastapi import FastAPI
from configs.database import create_tables
from routers import role, permission, user, expediente
from fastapi.middleware.cors import CORSMiddleware

create_tables()

# CORS

origins = [ 'http://localhost:5173' ]

app = FastAPI()

app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins, 
    allow_methods=["*"], 
    allow_headers=["*"]
)

app.include_router(role.router)
app.include_router(permission.router)
app.include_router(user.router)
app.include_router(expediente.router)



