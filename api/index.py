from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from agent import get_agent_executor
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Google Ads Assistant API")

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    chat_history: Optional[List[dict]] = []

class ChatResponse(BaseModel):
    response: str

agent_executor = get_agent_executor()

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Convert dict chat history to LangChain messages if needed
        # For now, we'll just pass empty list to keep it simple for v1
        result = agent_executor.invoke({
            "input": request.message,
            "chat_history": []
        })
        return ChatResponse(response=result["output"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
