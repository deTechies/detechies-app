import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function GET() {
  const session = await getServerSession(authOptions) as any;
  
  //how to 
  
  console.log(session)
  
  
  return NextResponse.json({ ...session?.web3.user });
}