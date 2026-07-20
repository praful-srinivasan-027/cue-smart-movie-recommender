from qdrant_db import client
from qdrant_client.models import VectorParams, Distance, PointStruct
COLLECTIONS = "movies"

def create_collection():
    """
    Create a collection in Qdrant for storing movie embeddings.

    Returns:
        None
    """
    if client.collection_exists(COLLECTIONS):
        return 
    client.create_collection(
        collection_name=COLLECTIONS,
        vectors_config=VectorParams(
            size=384, 
            distance=Distance.COSINE
        ),
    )

def upload_movie(movie, embedding):
    """
    Upload a movie and its embedding to the Qdrant collection.

    Args:
        movie (dict): A dictionary containing detailed information about the movie.
        embedding (list): A list of floats representing the embedding vector.
    
    Returns:
        None
    """
    if not client.collection_exists(COLLECTIONS):
        create_collection()
    payload = {
        "title": movie.get("title"),
        "overview": movie.get("overview"),
        "genres": [
            genre["name"]
            for genre in movie.get("genres", [])
        ],
        "poster_path": movie.get("poster_path"),
        "release_date": movie.get("release_date"),
        "vote_average": movie.get("vote_average"),
        "vote_count": movie.get("vote_count"),
        "popularity": movie.get("popularity"),
    }
    point = PointStruct(
        id=movie.get("id"),
        vector=embedding,
        payload=payload
    )
    client.upsert(
        collection_name=COLLECTIONS,
        points=[point]
    )