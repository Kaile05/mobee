import Image from "next/image"
import MovieOverview from "@/components/MovieOverview"
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

export async function getCasts(id){
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
  if(!res.ok) throw new Error(`Failed to fetch Casts`)
  return res.json()
}

export async function getMovie(id){
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
  if(!res.ok) throw new Error('Failed to fetch movie')
  return res.json()
}

export default async function MovieDetailPage({ params }) {
  const movie = await getMovie(params.movieId)
  const credits = await getCasts(params.movieId)
  const cast = credits.cast.slice(0,10)

  return(
    <main className="py-6 px-4 sm:px-6 md:px-12 max-md:mt-12">
      <section
        className="min-h-screen bg-cover bg-center relative rounded-2xl"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
      >
        <div className="md:absolute inset-0 bg-black/80 backdrop-blur-lg">
          <div className="flex max-md:flex-col justify-center items-center h-full z-10 ">
            {movie.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={250}
                height={350}
                className="mx-4 rounded-lg object-contain max-md:mt-6 shadow-2xl"         
              />
            )}
            <div className="py-3 px-6">
              <h1 className="text-3xl mb-3">
                <strong>{movie.title}</strong>
              </h1>
              <p><strong>Release:</strong> {movie.release_date}</p>
              <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
              <p><strong>Runtime:</strong> {movie.runtime} mins</p>
              <p><strong>Rating:</strong> ⭐ {movie.vote_average} / 10</p>
              <MovieOverview overview={movie.overview}></MovieOverview>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-3 bg-[#2f2f2f] shadow-2xl">
        <div className="grid grid-flow-col auto-cols-[180px] overflow-x-auto gap-1.5 custom-scrollbar p-3">
          {cast.map((actor)=>(
            <div key={actor.id} className="p-3 border border-gray-800 rounded shadow-2xl">
              {actor.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                  width={150}
                  height={100}
                  className="rounded object-cover mx-auto"
                />
              ) : (
                <div className="w-[150px] h-[225px] bg-[#d4aa7d] rounded-lg mx-auto flex items-center justify-center text-sm">
                  No Image
                </div>
              )}

              <div className="text-center text-white mt-1.5">
                <p className="text-sm font-semibold">{actor.name}</p>
                <p className="text-xs text-gray-100">{actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}