import { getSessionToken } from "@/lib/data/project"


export default  async function SettingsPAge() {

    const session  =await getSessionToken()
  return (
    <div>{
        JSON.stringify(
            session
        )}</div>
  )
}
