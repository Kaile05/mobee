import Image from "next/image"

export default function Card({data, src,}){
  return(
    <>
      <div className="bg-[#2f2f2f] rounded-sm relative group overflow-hidden cursor-pointer shadow-md">
        {data.poster_path ? (
          <Image 
            src={src} 
            alt={data.title} 
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
          <h1 className="text-xs md:text-sm font-semibold max-md:truncate ">{data.title}</h1>
          <span className="text-xs">{data.release_date}</span>
        </div>
      </div>           
    </>
  )
}