"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import PaginationControls from "@/components/PaginationControls"
import Card from "@/components/Card"


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
    <main className="min-h-screen flex items-center justify-center px-24 py-12 max-md:px-3 max-md:py-3 mt-10 max-md:mt-15">
      <div>
        <div className="mb-5">
          <PaginationControls 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          />
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {movies.map((movie)=>(
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <Card data={movie} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/> 
              </Link>              
            ))}
          </div>
        )}
      

      <div className="mt-5">
        <PaginationControls 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  </main>
  )
}