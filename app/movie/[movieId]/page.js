
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

export async function getMovie(id){
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
  if(!res.ok) throw new Error('Failed to fetch movie')
  return res.json()
}

export default async function MovieDetailPage({ params }) {
  const movie = await getMovie(params.movieId)

  return(
    <div className="py-6 px-4 sm:px-6 md:px-12 ">
      <div className="flex max-sm:flex-col min-h-screen justify-center items-center overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="mb-4 rounded-lg object-contain w-[260px] h-[340px]"
          
        />
        <div>
          <h1>
            {movie.title}
          </h1>
          <p><strong>Release:</strong> {movie.release_date}</p>
          <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
          <p><strong>Runtime:</strong> {movie.runtime} mins</p>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average} / 10</p>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  )
}