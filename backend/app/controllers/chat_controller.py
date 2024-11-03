from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..models.usuario import User
from ..core.security import get_current_user
from ..utils.redis_manager import RedisManager

router = APIRouter()

# Armazena as conexões WebSocket ativas para cada empresa
connections = {}

@router.websocket("/ws/{empresa_id}")
async def websocket_endpoint(websocket: WebSocket, empresa_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    await websocket.accept()
    if empresa_id not in connections:
        connections[empresa_id] = []
    connections[empresa_id].append(websocket)
    
    try:
        while True:
            data = await websocket.receive_text()
            # Publicar a mensagem no Redis para persistência e broadcast
            await RedisManager.publish_message(f"empresa_{empresa_id}", f"{current_user.name}: {data}")
            # Enviar para todos os WebSockets conectados
            for connection in connections[empresa_id]:
                await connection.send_text(f"{current_user.name}: {data}")
    except WebSocketDisconnect:
        connections[empresa_id].remove(websocket)
        if not connections[empresa_id]:
            del connections[empresa_id]
