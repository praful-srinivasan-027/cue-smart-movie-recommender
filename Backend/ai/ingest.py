import time
from upload import upload_movies
from embed import embed_text, embed_batch
from dotenv import load_dotenv
from concurrent.futures import ThreadPoolExecutor
import requests
import os

load_dotenv()  
TMDB_API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"
session = requests.Session()

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
    while True:
        try:
            response = session.get(url, params=params, timeout=20)
            if response.status_code == 404:
                print(f"Movie {movie_id} not found.")
                return None
            
            if response.status_code == 429:
                retry_after = response.headers.get("Retry-After")
                if retry_after:
                    wait = int(retry_after)
                else:
                    wait = 10
                print(f"Rate limited. Retrying in {wait}s...")
                time.sleep(wait)
                continue

            if response.status_code >= 500:
                print(f"TMDB returned {response.status_code}. Retrying...")
                time.sleep(5)
                continue

            response.raise_for_status()
            return response.json()
        
        except (
            requests.exceptions.ConnectionError,
            requests.exceptions.Timeout,
            requests.exceptions.ChunkedEncodingError,
        ) as e:
            print(f"{e}. Retrying in 5 seconds...")
            time.sleep(5)
        
        except requests.exceptions.RequestException:
            # Things like 401, 403, malformed requests
            raise

def get_movies(page=1):
    """
    Fetch a list of popular movies from TMDB.

    Args:
        page (int): The page number to fetch. Defaults to 1.

    Returns:
        list: A list of dictionaries, each containing basic information about a popular movie.
    """
    url=f"{BASE_URL}/discover/movie"
    params = {
        "api_key": TMDB_API_KEY,
        "page": page,
        "sort_by": "popularity.desc"
    }
    while True:
        try:
            response = session.get(url, params=params, timeout=20)
            if response.status_code == 429:
                retry_after = response.headers.get("Retry-After")
                if retry_after:
                    wait = int(retry_after)
                else:
                    wait = 10
                print(f"Rate limited. Retrying in {wait}s...")
                time.sleep(wait)
                continue

            if response.status_code >= 500:
                print(f"TMDB returned {response.status_code}. Retrying...")
                time.sleep(5)
                continue

            response.raise_for_status()
            return response.json().get("results", [])
        
        except (
            requests.exceptions.ConnectionError,
            requests.exceptions.Timeout,
            requests.exceptions.ChunkedEncodingError,
        ) as e:
            print(f"{e}. Retrying in 5 seconds...")
            time.sleep(5)
        
        except requests.exceptions.RequestException:
            # Things like 401, 403, malformed requests
            raise

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
    for page in range(45, 3000):  # Fetch first 2 pages of popular movies
        movies = get_movies(page)
        detailed_movies = []
        documents = []
        with ThreadPoolExecutor(max_workers=10) as executor:
            results = list(executor.map(lambda movie: get_movie(movie["id"]), movies))
            for detailed_movie in results:
                if detailed_movie:
                    detailed_movies.append(detailed_movie)
                    document = build_document(detailed_movie)
                    documents.append(document)
        embedding = embed_batch(documents)
        upload_movies(detailed_movies, embedding)
        print(f"Uploaded movies with embeddings.")