import Link from "next/link"
import Image from "next/image"

export default function Carousel({movies, sectionTitle}){
  return(
    <section className="py-6 px-4 sm:px-6 md:px-12">
      <h2 className="font-montserrat text-3xl font-bold py-2 my-3 max-sm:text-center">{sectionTitle}</h2>
      <ul className="grid grid-flow-col auto-cols-[200px] overflow-x-auto gap-3 custom-scrollbar">
        {movies.slice(0,10).map((movie)=>(
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                width={250}
                height={350}
                className="rounded-lg object-cover cursor-pointer"
              />
            ) : (
              <div className="w-[150px] h-[225px] bg-[#d4aa7d] rounded-lg mx-auto flex items-center justify-center text-sm">
                  No Image
              </div>
            )}
          </Link>
        ))}
      </ul>
    </section>
  )
}