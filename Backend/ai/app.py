from fastapi import FastAPI
from ai.embed import embed_text, embed_batch
from pydantic import BaseModel

app = FastAPI()
class EmbedRequest(BaseModel):
    text:str

@app.post("/embed")
def create_embedding(request: EmbedRequest):
    """
    Create an embedding for the given text.

    Args:
        request (EmbedRequest): A request object containing the text to be embedded.
    
    Returns:
        dict: A dictionary containing the embedding vector.
    """
    embedding = embed_text(request.text)
    return {"embedding": embedding}