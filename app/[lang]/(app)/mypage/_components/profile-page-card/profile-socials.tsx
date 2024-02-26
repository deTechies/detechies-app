import { serverApi } from "@/lib/data/general";
import ConnectionsList from "../../settings/connections";

export default async function ProfileSocials() {
        const {data:socials} = await serverApi("/socials/user/me");
  return (
    <ConnectionsList connections={socials} />
  )
}
