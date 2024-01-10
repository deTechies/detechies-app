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
        avatar: string[];
        user_settings: {
          language: string;
          theme: string;
        }
      };
    };
    github?: {
      id: string;
      expires: string;
    };
    twitter: {
      account:any, 
      user:any
    }
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
      twitter: {
        account:any, 
        user:any
      }
    };
  }
}


const handler = NextAuth(authOptions) as any;

export { handler as GET, handler as POST };

