import Link from "next/link"

export default function Nav() {
  return (
    <nav className="w-full fixed top-0 z-50 bg-[#2f2f2f] shadow-2xl">
      <div className="py-3 px-6 flex justify-center items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          Mo<span className="text-[#d4aa7d]">Bee</span>
        </Link>
      </div>
    </nav>
  )
}
