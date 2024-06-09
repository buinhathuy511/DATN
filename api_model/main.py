from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import prediction
from pydantic import BaseModel
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequestDTO(BaseModel):
    content: str

@app.post("/prediction")
def get_prediction(request: RequestDTO):
    return prediction(request.content)