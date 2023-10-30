import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { API_URL } from "../constants";


export async function getGroups(search?: string){
    const response = await fetch(`${API_URL}/group/all`);
    const data = await response.json();
    
    if(search){
        return data.filter((group: any) => group.name.toLowerCase().includes(search.toLowerCase()));
    }
    return data;   
}

export async function getGroupDetail(address: string){
    const response = await fetch(`${API_URL}/group/single/${address}`);
    const data = await response.json();
    const session = await getServerSession(authOptions) as any;
    
    const isMember  = data.members.find((member: any) => member.address === session?.web3?.address);
    const isOwner = data.owner === session?.web3?.address;
    return {...data, isMember: isMember, isOwner: isOwner};
}