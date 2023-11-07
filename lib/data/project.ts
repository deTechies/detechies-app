import { API_URL } from "../constants"

export async function getSingleProject(address:string) {
    const res = await fetch(`${API_URL}/project/single/${address}`, { next: { revalidate: 60 } })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    
    console.log(res)
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}

export async function getProjects() {
    const res = await fetch(`${API_URL}/project/all`, { next: { revalidate: 60 } })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}
   