import Image from "next/image"
import Overview from "@/components/Overview"
import { getCasts, getMovie, getMovieReviews } from "@/lib/tmdb"
import Link from "next/link"

export default async function MovieDetailPage({ params }) {
  const movie = await getMovie(params.movieId)
  const credits = await getCasts(params.movieId)
  const cast = credits.cast.slice(0,10)
  const reviewsData = await getMovieReviews(params.movieId)
  const reviews = reviewsData.results

  return(
    <main className="py-6 px-4 sm:px-6 md:px-12 max-md:mt-12">
      <section
        className="min-h-screen bg-cover bg-center relative rounded-2xl"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
      >
        <div className="inset-0 bg-black/80 backdrop-blur-lg min-h-screen">
          <div className="flex max-md:flex-col justify-center items-center h-full z-10 ">
            {movie.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={250}
                height={350}
                className="mx-4 rounded-lg object-contain mt-8 min-md:mt-15 min-md:ml-15 shadow-2xl"         
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
              <Overview overview={movie.overview}></Overview>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-3 bg-[#2f2f2f] shadow-2xl">
        <h2 className="px-3 pt-3 font-semibold text-2xl">Casts</h2>
        <div className="grid grid-flow-col auto-cols-[180px] overflow-x-auto gap-1.5 custom-scrollbar p-3">
          {cast.map((actor)=>(
            <Link href={`/person/${actor.id}`} key={actor.id} className="p-3 border border-gray-800 rounded shadow-2xl">
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
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews available.</p>
        ) : (
          <div className="grid grid-cols-3 gap-3 p-3 max-md:grid-cols-1">
            {reviews.slice(0,3).map(review => (
              <div key={review.id} className="bg-[#2f2f2f] p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">By <span className="font-semibold">{review.author}</span></p>
                <p className="text-sm mt-2">{review.content.slice(0, 300)}{review.content.length > 300 && "..."}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}