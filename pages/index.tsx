import { GetStaticProps } from "next";
import Link from "next/link";

type Pokemon = {
  id: number;
  name: string;
  image: string;
};

type Props = {
  data: Pokemon[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetch(
    "https://dataset-ssr-ssg.s3.eu-north-1.amazonaws.com/pokemon-main/index.json"
  );

  if (!res.ok) {
    console.error("Failed to fetch data:", res.statusText);
    return {
      props: {
        data: [],
      },
    };
  }

  const data: Pokemon[] = await res.json();
  const currentPokemons = data.slice(0, 12);
  return {
    props: {
      data: currentPokemons,
    },
  };
};

const Page: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center my-[40px]">
      <h1 className="text-tertiary-800 text-[28px] w-full text-center font-bold mb-[20px]">
        Pokemon List
      </h1>
      <main className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((pokemon) => (
          <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`}>
            <div className="max-w-sm bg-white border border-neutral-400 rounded-lg shadow hover:border-tertiary-800">
              <div className="flex items-center justify-center h-48 rounded-t-lg overflow-hidden my-[10%]">
                <img
                  className="w-[40%]"
                  src={`https://dataset-ssr-ssg.s3.eu-north-1.amazonaws.com/pokemon-main/${pokemon.image}`}
                  alt={pokemon.name}
                />
              </div>

              <div className="bg-neutral-150 border-t border-neutral-400 rounded-b-lg">
                <p className="p-[10px] text-tertiary-800">
                  {pokemon.id}. {pokemon.name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default Page;
