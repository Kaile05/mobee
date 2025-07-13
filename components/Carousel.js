import Link from "next/link"

export default function Carousel({movies, sectionTitle}){
  return(
    <section className="py-6 px-4 sm:px-6 md:px-12">
      <h2 className="font-montserrat text-3xl font-bold py-2 my-3 max-sm:text-center">{sectionTitle}</h2>
      <ul className="grid grid-flow-col auto-cols-[200px] overflow-x-auto gap-3 custom-scrollbar">
        {movies.slice(0,10).map((movie)=>(
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg object-cover cursor-pointer"
            />
          </Link>
        ))}
      </ul>
    </section>
  )
}