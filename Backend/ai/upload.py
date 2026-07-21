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

def upload_movies(movies, embeddings):
    """
    Upload movies and their embeddings to the Qdrant collection.

    Args:
        movies (list): A list of dictionaries containing detailed information about each movie.
        embeddings (list): A list of lists of floats representing the embedding vectors for each movie.

    Returns:
        None
    """
    if not client.collection_exists(COLLECTIONS):
        create_collection()
    points = []
    for movie, embedding in zip(movies, embeddings):
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
            id=movie["id"],
            vector=embedding,
            payload=payload
        )
        points.append(point)
    client.upsert(
        collection_name=COLLECTIONS,
        points=points
    )