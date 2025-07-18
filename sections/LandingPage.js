'use client'

import { useEffect, useState } from "react"
import Search from "@/components/Search"
import Carousel from "@/components/Carousel"

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

export default function LandingPage(){

  const [popularMovies, setPopularMovies] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function fetchMovies() {
      try {
        const [popularRes, trendingRes] = await Promise.all([
          fetch(`${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`),
          fetch(`${API_BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
        ])
        
        const popularData = await popularRes.json()
        const trendingData = await trendingRes.json()

        console.log(trendingData.results)
        console.log(popularData.results)

        setPopularMovies(popularData.results)
        setTrendingMovies(trendingData.results)

      } catch (error) {
        console.error("Failed to fetch Movies.", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }
  
  ,[])
  return(
    <main className="py-6 px-12 mt-10 min-h-screen">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Search />
          <Carousel movies={popularMovies} sectionTitle="Popular Movies"/>
          <Carousel movies={trendingMovies} sectionTitle="Trending Movies"/>
        </div>
      )}
    </main>
  )
}