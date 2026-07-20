from upload import upload_movie
from embed import embed_text, embed_batch
from dotenv import load_dotenv
import requests
import os

load_dotenv()  
TMDB_API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"

# As of now, this route is used to fetch the movie details and then embed the document. 
# But this is done only once batch wise to create the embeddings for all the movies in the database.
# Since this is done by the Admin, There is no fallback implemented for requests that fail. 
# TODO: Implement a fallback mechanism to handle failed requests and retry them if necessary.
 
def get_movie(movie_id):
    """
    Fetch detailed information about a specific movie from TMDB.

    Args:
        movie_id (int): The ID of the movie to fetch details for.

    Returns:
        dict: A dictionary containing detailed information about the movie.
    """
    url=f"{BASE_URL}/movie/{movie_id}"
    params = {
        "api_key": TMDB_API_KEY,
        "append_to_response": "keywords,reviews"
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def build_document(movie):
    """
    Build a document string from the movie details for embedding.

    Args:
        movie (dict): A dictionary containing detailed information about the movie.

    Returns:
        str: A string representation of the movie details suitable for embedding.
    """
    title = movie.get("title", "")
    genres = ", ".join([
        genre.get("name", "") for genre in movie.get("genres", [])
    ])
    overview = movie.get("overview", "")
    tagline = movie.get("tagline", "")
    keywords = ", ".join([
        keyword.get("name", "") for keyword in movie.get("keywords", {}).get("keywords", [])
    ])
    reviews = []
    for review in movie.get("reviews", {}).get("results", [])[:5]:
        reviews.append(review["content"])
    reviews = "\n".join(reviews)
    return f"""
    Title: 
    {title}

    Genres: 
    {genres}

    Overview: 
    {overview}

    Tagline: 
    {tagline}

    Keywords: 
    {keywords}

    Reviews: 
    {reviews}  
    """
if __name__ == "__main__":
    movie = get_movie(157336)      # Interstellar

    document = build_document(movie)

    vector = embed_text(document)

    upload_movie(movie, vector)

    print("Uploaded Interstellar!")