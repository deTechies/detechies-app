import Image from "next/image";

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
  }
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

  //const {data} = await getUserConnections(address);
  return (
    <section className={`w-full flex flex-wrap items-start justify-between gap-[20px]`}>

      {networks.map((network: any, key: number) => (
        <div
          key={key}
          className="flex border p-4 pb-[20px] border-border-div rounded-sm items-center gap-4 bg-background-layer-1 grow"
        >
          <Image
            src={network.image}
            alt={network.name}
            width={48}
            height={48}
            className="rounded-sm shrink-0"
          />
          <div className="flex flex-col gap-2">
            <span className="text-title_s capitalize">
              {network.name}
            </span>
            <span className="text-label_s text-text-secondary">
              Coming soon
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
