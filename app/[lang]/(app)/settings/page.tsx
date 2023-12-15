import { API_URL } from "@/lib/constants"
import { getSessionToken } from "@/lib/data/project"
import UpdateProfile from "./update-profile"


export default  async function SettingsPAge() {

    const session  =await getSessionToken()
    
    const moreDAta = await fetch(`${API_URL}/${session?.web3.address}`, 
    {
        headers: {
            "Authorization": `Bearer ${session?.web3.accessToken}`
        }
    })
    
    
  return (
    <main>
      <UpdateProfile />
        
        </main>
  )
}
