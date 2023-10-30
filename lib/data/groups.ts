import { API_URL } from "../constants";


export async function getGroups(search?: string){
    const response = await fetch(`${API_URL}/group/all`);
    const data = await response.json();
    
    if(search){
        return data.filter((group: any) => group.name.toLowerCase().includes(search.toLowerCase()));
    }
    return data;
    
}