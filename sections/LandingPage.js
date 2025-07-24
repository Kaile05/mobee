'use client'

import { useEffect, useState } from "react"
import Search from "@/components/Search"
import Carousel from "@/components/Carousel"

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

export default function LandingPage(){

  const [popularMovies, setPopularMovies] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function fetchMovies() {
      try {
        const [popularRes, trendingRes, upcomingRes] = await Promise.all([
          fetch(`${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`),
          fetch(`${API_BASE_URL}/trending/movie/day?api_key=${API_KEY}`),
          fetch(`${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
        ])
        
        const popularData = await popularRes.json()
        const trendingData = await trendingRes.json()
        const upcomingData = await upcomingRes.json()

        setPopularMovies(popularData.results)
        setTrendingMovies(trendingData.results)
        setUpcomingMovies(upcomingData.results)

      } catch (error) {
        console.error("Failed to fetch Movies.", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  },[])
  
  return(
    <main className="py-6 px-4 sm:px-6 md:px-12 mt-10 min-h-screen">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Search />
          <Carousel movies={popularMovies} sectionTitle="Popular Movies"/>
          <Carousel movies={upcomingMovies} sectionTitle="Upcoming Movies"/>
          <Carousel movies={trendingMovies} sectionTitle="Trending Movies"/>
        </div>
      )}
    </main>
  )
}