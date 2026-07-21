import axios from 'axios'
import { QdrantClient } from '@qdrant/js-client-rest'
const getMoodGenresFromEmbedding = async (mood: string) => {
    const response = await axios.post("http://127.0.0.1:8000/embed", {text: mood})
    const embedding = response.data.embedding
    const client = new QdrantClient({
        url: process.env.QDRANT_URL,
        apiKey: process.env.QDRANT_API_KEY
    })
    const results = await client.search("movies",{
        vector: embedding,
        limit: 50,
        with_payload: true
    })
    return results;
}

export { getMoodGenresFromEmbedding }