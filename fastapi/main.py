from fastapi import FastAPI
from configs.database import create_tables
from routers import role, permission, user

create_tables()

app = FastAPI()

app.include_router(role.router)
app.include_router(permission.router)
app.include_router(user.router)



