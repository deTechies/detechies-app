import { serverApi } from "@/lib/data/general";
import ConnectionsList from "./connections";

export default async function UsersSettings() {
  const result = await serverApi("/socials/user/me");
  return (
    <main>
      <pre>{JSON.stringify(result, null, 2)}</pre>
      <ConnectionsList connections={result.data} />
    </main>
  );
}
