import { getSessionToken } from "@/lib/data/project"


export default  async function SettingsPAge() {

    const session  =await getSessionToken()
    
    const moreDAta = await fetch(`"https://api.careerbadge.online/users/${session?.web3.address}`, 
    {
        headers: {
            "Authorization": `Bearer ${session?.web3.accessToken}`
        }
    })
    
    
  return (
    <main>
    <div>{
        JSON.stringify(
            session
        )}</div>
          <div>{
        JSON.stringify(
            moreDAta
        )}</div>
        
        </main>
  )
}
