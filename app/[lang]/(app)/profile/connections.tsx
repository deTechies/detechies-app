import ConnectGithub from "@/components/connections/github";
import { getUserConnections } from "@/lib/data/user";
import Image from "next/image";
import Link from "next/link";

const networks = [
  {
    image: "/icons/ens.png",
    name: "ENS",
    link: "https://app.ens.domains/name/",
  },
  {
    image: "/icons/twitter.png",
    name: "twitter",
    link: "https://twitter.com/",
  },
];
interface Identity {
  platform: string;
  identity: string;
}

interface Neighbor {
  identity: Identity;
}

interface Data {
  neighbor: Neighbor[];
  updatedAt: number;
}

export default async function Connections({
  address,
  row,
  github,
}: {
  address: string;
  row?: boolean;
  github?: string[];
}) {
  //const {data, loading, error} = useFetchData<Data>(`/nextid/user/profile/ethereum/${address}`);

  const data = await getUserConnections(address);
  return (
    <section className={`grid  md:grid-cols-3 sm:grid-cols-2 gap-4`}>
      <div className="flex border p-4 border-border-div rounded-sm items-center gap-4 bg-background-layer-1">
        <Image
          src="/icons/github.png"
          alt="github"
          width={44}
          height={44}
          className="rounded-sm"
        />
        <div className="flex flex-col gap-1">
          <span className="font-medium text-sm text-text-primary capitalize">
            Github
          </span>
          {github ? (
            <Link
              className="text-sm text-text-secondary font-light"
              href={`
                        https://github.com`}
            >
              {github[0]}
            </Link>
          ) : (
            <ConnectGithub />
          )}
        </div>
      </div>

      {networks.map((network: any, key: number) => (
        <div
          key={key}
          className="flex border p-4 border-border-div rounded-sm items-center gap-4 bg-background-layer-1"
        >
          <Image
            src={network.image}
            alt={network.name}
            width={44}
            height={44}
            className="rounded-sm"
          />
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm text-text-primary capitalize">
              {network.name}
            </span>
           
          </div>
        </div>
      ))}
      <span className="text-xs tracking-wider text-text-secondary col-span-3 font-light  text-right">
        Last updated: Never
      </span>
    </section>
  );
}
