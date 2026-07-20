from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

def embed_text(text):
    """
    Embed the given text using the SentenceTransformer model.

    Args:
        text (str): The text to be embedded.

    Returns:
        list: A list of floats representing the embedding vector.
    """
    embedding = model.encode(text)
    return embedding.tolist()

def embed_batch(texts):
    """
    Embed a batch of texts using the SentenceTransformer model.

    Args:
        texts (list): A list of strings to be embedded.

    Returns:
        list: A list of lists, where each inner list is an embedding vector.
    """
    embeddings = model.encode(texts, 
                            batch_size=32, 
                            show_progress_bar=True, 
                            normalize_embeddings=True)
    return embeddings.tolist()

if __name__ == "__main__":
    text = """
    Interstellar

    Genres:
    Science Fiction, Adventure

    Overview:
    A team of explorers travel through a wormhole...
    """

    vector = embed_text(text)

    print(f"Dimensions: {len(vector)}")
    print(vector[:5])