import { getPerson, getPersonCredits } from "@/lib/tmdb";
import Image from "next/image";
import Overview from "@/components/Overview";
import Card from "@/components/Card";
import Link from "next/link";

export default async function PersonPage({ params }) {
  const person = await getPerson(params.personId);
  const creditData = await getPersonCredits(params.personId);
  const credits = creditData.cast

  return (
    <main className="py-6 px-4 sm:px-6 md:px-12 mt-12 min-h-screen flex flex-col items-center">

      <section className="bg-[#2f2f2f] flex space-x-1.5 p-3 shadow-xs min-md:w-3/4">
        <div>
          {person.profile_path ? (
            <Image 
              src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
              alt={person.name}
              width={150}
              height={225}
              className="rounded object-cover mx-auto"
            />
          ) : (
            <div className="w-[150px] h-[225px] bg-[#d4aa7d] rounded-lg mx-auto flex items-center justify-center text-sm"> 
              No Image
            </div>
          )}
        </div>

        <div className="p-3">
          <h1 className="text-3xl max-md:text-sm font-semibold mb-2"><strong>{person.name}</strong></h1>
          <p className="max-md:text-sm text-lg"><strong>Birthday:</strong> {person.birthday}</p>
          <p className="max-md:text-sm text-lg"><strong>Place of Birth:</strong> {person.place_of_birth}</p>
          <p className="max-md:text-sm text-lg"><strong>Known For:</strong> {person.known_for_department}</p>
        </div>
      </section>

      <section className="bg-[#2f2f2f] flex flex-col space-x-1.5 mt-3 p-3 shadow-xs min-md:w-3/4">
        <h2 className="max-md:text-sm text-2xl font-semibold">Biography</h2>
        <Overview overview={person.biography}/>
      </section>

      <section className="bg-[#2f2f2f] flex flex-col space-x-1.5 mt-3 p-3 shadow-xs min-md:w-3/4">
        <h2 className="max-md:text-sm text-2xl font-semibold">Known for</h2>
        <div className="grid grid-cols-2 min-md:grid-cols-5 gap-1.5">
          {credits.slice(0,10).map((credit)=>(
          <Link href={`/movie/${credit.id}`} key={credit.id}>
            <Card data={credit} src={`https://image.tmdb.org/t/p/w300${credit.poster_path || credit.profile_path}`}/>
          </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
