import { ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { getMoviesByGenres } from './tmdb'
// This is a temporary solutions until I develop a better way to handle the recommendation logic. 
// The plan is to implement a Embeddings model to create a vector representation of the movies and 
// then use a vector database to find the most similar movies based on the user's mood. 
// This will allow for more accurate and personalized recommendations.  
const model= new ChatGoogleGenerativeAI({
    model: 'gemini-2.5-flash',
    apiKey: process.env.Gemini_API_KEY!
})
const promptTemplate = ChatPromptTemplate.fromTemplate( `
    You are a film curator. A user feels: "{mood}".

    Map this mood to:
    - 1-2 genres from ONLY this list: Action, Adventure, Comedy, Crime, Documentary, Drama, Fantasy, Horror, Romance, Science Fiction, Thriller, War, Western
    - 5-6 vibe keywords (e.g. "feel-good", "tense", "mind-bending", "cozy")
    - 1-2 genres to avoid from the same list

    Be direct. "funny" = Comedy. "scared" = Horror. Don't overthink.

    Return ONLY valid JSON, no markdown:
    {{"genres": ["Drama"], "keywords": ["bittersweet", "reflective"], "avoid": ["Horror"]}}`)
const promptTemplate2 = ChatPromptTemplate.fromTemplate(`
    You are a film curator. A user feels: "{mood}". Vibe keywords: {keywords}

    Movies from TMDB:
    {movies}

    Rank these movies by how well they match the mood and keywords.
    Rules:
    - Prioritize tone/theme match over popularity
    - Avoid genres that feel like: {avoid}
    - Drop only movies that completely contradict the mood (e.g. don't drop a comedy if the mood is "sad", just rank it lower)
    - Return at least 15 movies (prefer 20+ if possible). Do not return fewer than 10 unless absolutely necessary. Maximum of 50 movies. Anything below that is fine
    - No kids movies
    - R-rated is fine if the tone fits
    - Exclude animated films and kids movies regardless of their genre tags.

    Return ONLY a JSON array, start with [ end with ]:
    [{{"id": 123, "title": "Movie Title", "reason": "one sentence why it fits"}}]
    `)
const chain = promptTemplate.pipe(model)
const personalizer = promptTemplate2.pipe(model)
export async function getMoodGenres(mood: string){
    const response = await chain.invoke({mood})
    const content = (response.content as string).replace(/```json|```/g, '').trim()
    const firstBrace = content.indexOf('{')
    const cleaned = content.slice(firstBrace)
    const parsed = JSON.parse(cleaned)
    const movies = (await getMoviesByGenres(parsed.genres)).filter((m: any) => m.release_date >= '2015-01-01')
    const slimMovies = movies.map((m: any) => ({
        id: m.id,
        title: m.title,
        overview: m.overview,
        genre_ids: m.genre_ids,
        vote_average: m.vote_average,
        popularity: m.popularity,
        release_date: m.release_date
    }))
    const personalizedResponse = await personalizer.invoke({
        mood, 
        keywords: parsed.keywords.join(', '), 
        movies: JSON.stringify(slimMovies),
        avoid: parsed.avoid.join(', ')
    })
    const personalizedContent = (personalizedResponse.content as string).replace(/```json|```/g, '').trim()
    const firstBracket = personalizedContent.indexOf('[')
    const cleanedPersonalized = personalizedContent.slice(firstBracket)
    const personalizedParsed = JSON.parse(cleanedPersonalized)
    const rankedMovies = personalizedParsed.map((ranked: any) => {
    const original = movies.find((m: any) => m.id === ranked.id)
    return original ? { ...original, reason: ranked.reason } : null
    }).filter(Boolean)
    console.log(movies)
    console.log(rankedMovies)
    return { genres: parsed.genres, keywords: parsed.keywords, movies: rankedMovies }
}