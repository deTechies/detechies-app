import { API_URL } from "../constants"

export async function getSingleProject(address:string) {
    const res = await fetch(`${API_URL}/project/single/${address}`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }
   