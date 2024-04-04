import { Card, CardHeader } from "@/components/metronic/card/card";
import { serverApi } from "@/lib/data/general";
import ConnectionsList from "./connections";

export default async function AddConnections() {
  const result = await serverApi("/socials/user/me");
  return (
    <Card>
      <CardHeader>Socials</CardHeader>
      <ConnectionsList connections={[]} />
    </Card>
  );
}
