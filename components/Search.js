import Link from "next/link"
import { useState } from "react"
import Card from "./Card"

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)

  async function handleSearch() {
    if (!searchTerm.trim()) return

    setLoading(true)
    try {
      const res = await fetch(
        `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`
      )
      const data = await res.json()
      setSearchResult(data.results)
    } catch (error) {
      console.error("Search failed", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-6 px-4 sm:px-6 md:px-12">
      <h1 className="text-center text-2xl font-semibold mb-6">Catch the Reel Buzz..</h1>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-6">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search a movie..."
          className="bg-white text-black py-3 px-4 rounded-lg w-full sm:w-[300px] md:w-[400px] focus:outline-none focus:ring-2 focus:ring-[#d4aa7d]"
        />

        <button
          onClick={handleSearch}
          className="bg-[#d4aa7d] text-white py-3 px-6 rounded-lg hover:bg-[#c59d5f] transition"
        >
          Search
        </button>
      </div>

      {loading && (
        <p className="text-center text-gray-500 mb-4">Searching...</p>
      )}


      {searchResult.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Search Results</h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {searchResult.map((movie) => (
              <Link href={`/movie/${movie.id}`} key={movie.id} className="cursor-pointer">
                <Card data={movie} src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}/>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
