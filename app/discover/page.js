"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

export default function DiscoverMovies(){

  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function fetchMovies() {
      try {
        const result = await fetch(`${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=${currentPage}`)
        const data = await result.json()
        console.log(data.results)
        setMovies(data.results)
        setTotalPages(Math.min(data.total_pages, 500))

      } catch (error) {
        console.error("Failed fetching movies.", error)

      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  },[currentPage])

  return(
    <main className="min-h-screen flex items-center justify-center px-12 py-6 max-md:px-3 max-md:py-3 mt-10 max-md:mt-15">
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {movies.map((movie)=>(
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <div key={movie.id} className="bg-[#2f2f2f] rounded-sm relative group overflow-hidden cursor-pointer shadow-md">
                  {movie.poster_path ? (
                    <Image 
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                      alt={movie.title} 
                      width={300} 
                      height={450} 
                      className="rounded-sm w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-[150px] h-[225px] bg-[#d4aa7d] rounded-lg mx-auto flex items-center justify-center text-sm"> 
                      No Image
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#000000] to-transparent md:p-4 max-md:px-2 md:translate-y-full translate-y-0 group-hover:translate-y-0 transition-transform duration-300 text-white">
                    <h1 className="text-xs md:text-sm font-semibold max-md:truncate ">{movie.title}</h1>
                    <span className="text-xs">{movie.release_date}</span>
                  </div>
                </div>             
              </Link>
            ))}
          </div>
        )}

      <div className="flex justify-center items-center mt-5">
        <div className="flex justify-evenly items-center gap-x-1.5 min-md:w-[50vw] bg-[#2f2f2f] py-1.5 px-3 rounded-2xl flex-wrap">
          <button
            onClick={()=>setCurrentPage(1)}
            disabled={currentPage === 1}
            className="disabled:opacity-50 max-md:text-sm text-md hover:text-[#d4aa7d] cursor-pointer"
          >
            First
          </button>

          <button
            onClick={()=>setCurrentPage(prev => prev - 1)}
            disabled={currentPage === 1}
            className="disabled:opacity-50 max-md:text-sm text-md hover:text-[#d4aa7d] cursor-pointer"
          >
            Previous
          </button>
          
          <p className="max-md:text-sm text-nowrap">Page <span className="text-[#d4aa7d]">{currentPage}</span> of <span className="text-[#d4aa7d]">{totalPages}</span></p>

          <button
            onClick={()=>setCurrentPage(prev => prev + 1)}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50 max-md:text-sm text-md hover:text-[#d4aa7d] cursor-pointer"
          >
            Next
          </button>
          <button
            onClick={()=>setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50 max-md:text-sm text-md hover:text-[#d4aa7d] cursor-pointer"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  </main>
  )
}