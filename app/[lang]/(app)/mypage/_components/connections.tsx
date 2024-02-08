"use client";
import ConnectionCard from "./connections-card";
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
  {
    image: "/icons/instagram.png",
    name: "instagram",
    link: "https://www.instagram.com/",
  },
  {
    image: "/icons/github.png",
    name: "github",
    link: "https://www.github.com/",
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

export default function Connections({
  address,
  row,
  github,
}: {
  address: string;
  row?: boolean;
  github?: string[];
}) {
  //const {data, loading, error} = useFetchData<Data>(`/nextid/user/profile/ethereum/${address}`);

  //const {data} = await getUserConnections(address);
  return (
    <section className={`flex flex-wrap justify-between gap-5`}>
      {networks.map((network: any, key: number) => (
        <ConnectionCard
          key={key}
          logoSrc={network.image}
          logoAlt={network.name}
          label={network.name}
          sublabel={"Coming soon"}
        />
      ))}
    </section>
  );
}
