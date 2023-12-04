import { authOptions } from "@/lib/helpers/authOptions";
import NextAuth from "next-auth";
declare module "next-auth" {
  interface Session {
    authToken: string;
    web3: {
      address: string;
      accessToken: string;
      user: {
        TBA: string;
        nft: string[];
        username: string;
        id: string;
        email: string;
        verified: boolean;
      };
    };
    github?: {
      id: string;
      expires: string;
    };
  }

  interface JWT {
    sessions?: {
      github?: {
        id: string;
        expires: string;
      };
      web3?: {
        address: string;
        chainId: string;
        expires: string;
      };
    };
  }
}

//@ts-nocheck

//@ts-ignore
const handler = NextAuth(authOptions) as any;
//@ts-ignore
export { handler as GET, handler as POST };

