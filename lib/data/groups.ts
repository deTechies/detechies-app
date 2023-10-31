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
    
    console.log(data);
    
    const isMember  = data.members.find((member: any) => member.address === session?.web3?.address.toLowerCase());
    const isOwner = data.creator === session?.web3?.address.toLowerCase();
    return {...data, isMember: isMember, isOwner: isOwner};
}

export async function getPendingMembers(address: string){
    const response = await fetch(`${API_URL}/polybase/company/request?address=${address}&status=open`);
    const data = await response.json();
    
    return data;
}