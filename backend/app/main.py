# backend/app/main.py
from fastapi import FastAPI
from .controllers import auth_controller, empresa_controller, usuario_controller, chat_controller
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_controller.router, prefix="/auth", tags=["auth"])
app.include_router(empresa_controller.router, prefix="/empresa", tags=["empresa"])
app.include_router(usuario_controller.router, prefix="/usuario", tags=["usuario"])
app.include_router(chat_controller.router, prefix="/chat")

