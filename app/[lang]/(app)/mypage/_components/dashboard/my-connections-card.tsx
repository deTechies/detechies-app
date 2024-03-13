import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import { serverApi } from "@/lib/data/general";
import Image from "next/image";
import Link from "next/link";


export default async function MyConnections({ address }: { address: string }) {
  //please get me the connections
  const { data: connections } = await serverApi(`/socials/user/${address}`);
  return (
    <Card>
      <CardHeader>Connections</CardHeader>
      <CardContent>
        {connections?.length > 0 ? (
          <div className="flex flex-col gap-3">
            {connections.map((connection: any, index: number) => (
              <div key={index} className="flex gap-4 items-center">
                <figure className="relative w-8 h-8"> 
                  {" "}
                  <Image
                    src={"/icons/" + connection.social + ".png"}
                    fill={true}
                    sizes={"48"}
                    alt={connection.social}
                    className="aspect-square"
                  />
                </figure>

                <Link href={`https://${connection.social}.com/${connection.user_id}`} target="_blank">{connection.display_name}</Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No connections</p>
        )}
      </CardContent>
    </Card>
  );
}
