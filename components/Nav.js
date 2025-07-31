import Link from "next/link"

export default function Nav() {
  return (
    <nav className="w-full fixed top-0 z-100 bg-[#2f2f2f] shadow-xl">
      <div className="py-3 px-6 flex justify-between mx-auto items-center space-x-2.5">
        <Link href="/" className="text-2xl font-bold text-white">
          Mo<span className="text-[#d4aa7d]">Bee</span>
        </Link>
        <Link href="/discover" className="py-1.5 px-3 rounded bg-[#d4aa7d] text-md text-white hover:bg-[#c59d5f] transition">
          All Movies
        </Link>
      </div>
    </nav>
  )
}
