import ConnectCard from "@/components/connections/connect-card";
import { CardContent } from "@/components/metronic/card/card";
import { auth } from "@/lib/helpers/authOptions";
import { Session } from "next-auth";
const networks = [
  {
    image: "/icons/twitter.png",
    name: "twitter",
    connection: "twitter",
    link: "https://twitter.com/",
  },
  {
    image: "/icons/linkedin.png",
    name: "Linkedin",
    connection: "linkedin",
    link: "https://www.linkedin.com/",
  },
  {
    image: "/icons/github.png",
    name: "github",
    connection: "github",
    link: "https://www.github.com/",
  },
];

export default async function ConnectionsList({
  connections,
}: {
  connections: any;
}) {
  //const {data, loading, error} = useFetchData<Data>(`/nextid/user/profile/ethereum/${address}`);

  const session = (await auth()) as Session;


  // we want to check if the session contains web3.[network] and if it does, we want to set the connected and verified to true
  // we also want to check if the session contains github or twitter and if it does, we want to set the connected and verified to true
  const isConnectionSaved = (network: string, display_name?: string) => {
    // Check if the connection is saved in the database
    const connection = connections.find(
      (conn: any) =>
        conn.social === network && conn.display_name === display_name
    );
    return connection;
  };

  const connected = networks.map((network) => {
    // Check for web3 connections

    // Check for GitHub connection
    if (network.name === "github") {
      if (session.web3?.github) {
        return {
          ...network,
          verified: isConnectionSaved(
            "github",
            session.web3?.github?.user.name
          ),
          connected: true, // Assuming there's a verified field; adjust as needed
          user: {
            display_name: session.web3.github.user.display_name, // Adjust according to your session structure
            id: session.web3.github.user.id,
          },
        };
      } else {
        return {
          ...network,
          connected: false,
          verified: isConnectionSaved("github"),
        };
      }
    }

    // Check for Twitter connection
    if (network.name === "twitter" && session.web3?.twitter) {
      return {
        ...network,
        verified: isConnectionSaved(
          network.name,
          session.web3.twitter.user.name
        ),
        connected: true, // Assuming there's a verified field; adjust as needed
        user: {
          display_name: session.web3.twitter.user.name, // Adjust according to your session structure
          id: session.web3.twitter.user.id,
        },
      };
    }

    if (network.name === "Linkedin" && session.web3?.linkedin) {
      return {
        ...network,
        verified: isConnectionSaved(
          network.name,
          session.web3.linkedin.user.name
        ),
        connected: true, // Assuming there's a verified field; adjust as needed
        user: {
          display_name: session.web3.linkedin.user.name, // Adjust according to your session structure
          id: session.web3.linkedin.user.id,
        },
      };
    }

    // Default case when no connection is found
    return {
      ...network,
      connected: false,
      verified: false,
    };
  });

  return (
    <CardContent className={`flex flex-col gap-5`}>
      {connected.map((item: any, key: number) => (
        <ConnectCard
          key={key}
          item={item}
          connected={item.connected}
          verified={item.verified}
          user={item.user}
        />
      ))}
    </CardContent>
  );
}
