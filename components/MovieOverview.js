'use client'
import { useState } from 'react'

export default function MovieOverview({ overview }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const limit = 150

  const toggleOverview = () => setIsExpanded(!isExpanded)

  return (
    <div className="mt-3 text-white text-xs md:text-sm">
      <p>
        {isExpanded ? overview : `${overview.slice(0, limit)}...`}
      </p>
      {overview.length > limit && (
        <button
          onClick={toggleOverview}
          className="text-[#d4aa7d] mt-1 hover:underline"
        >
          {isExpanded ? 'See Less' : 'See More'}
        </button>
      )}
    </div>
  )
}
