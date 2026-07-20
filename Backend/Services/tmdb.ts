import express from 'express';
import axios from 'axios';
axios.interceptors.request.use(request => {
  console.log('TMDB Request params:', JSON.stringify(request.params, null, 2))
  return request
})
const genreMap: Record<string, number> = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Fantasy: 14,
  Horror: 27,
  Mystery: 9648,
  Romance: 10749,
  "Science Fiction": 878,
  Thriller: 53,
  War: 10752,
  Western: 37
}
export async function getMoviesByGenres(genres: string[]) {
  const genreIds = genres.map(g => genreMap[g]).filter(Boolean).join('|')
  
  const params = {
    api_key: process.env.TMDB_API_KEY,
    with_genres: genreIds,
    sort_by: 'popularity.desc',
    'release_date.gte': '2015-01-01',
    'vote_count.gte': 1000,
    without_genres: '16,10751,10762',
    'vote_average.gte': 6.5
  }

  const pages = await Promise.all([1,2,3,4,5,6,7,8,9,10].map(page =>
  fetchWithRetry('https://api.themoviedb.org/3/discover/movie', { ...params, page })
))

  return pages.flatMap(p => p.data.results)
}
async function fetchWithRetry(url: string, params: any, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      return await axios.get(url, { params })
    } catch (e) {
      if (i === retries - 1) throw e
      await new Promise(r => setTimeout(r, 1000))
    }
  }
}