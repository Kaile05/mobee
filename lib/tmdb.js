const API_KEY = process.env.TMDB_API_KEY
const API_URL = 'https://api.themoviedb.org/3'

export async function getCasts(id) {
  const res = await fetch(`${API_URL}/movie/${id}/credits?api_key=${API_KEY}`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch casts')
  return res.json()
}

export async function getMovie(id) {
  const res = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch movie')
  return res.json()
}

export async function getPerson(id) {
  const res = await fetch(`${API_URL}/person/${id}?api_key=${API_KEY}`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch person details')
  return res.json()
}

export async function getPersonCredits(id) {
  const res = await fetch(`${API_URL}/person/${id}/movie_credits?api_key=${API_KEY}`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error("Failed to fetch person credits")
  return res.json()
}

export async function getMovieReviews(id) {
  const res = await fetch(`${API_URL}/movie/${id}/reviews?api_key=${API_KEY}`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error("Failed to fetch reviews")
  return res.json()
}
