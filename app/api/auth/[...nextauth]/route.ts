import { API_URL } from "@/lib/constants";
import { getUserSession } from "@/lib/data/user";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
declare module "next-auth" {
  interface Session {
    authToken: string
    web3: {
      address: string;
      user: {
        TBA: string;
        nft: string[];
        username: string;
        id: string;
      }
    }, 
    github?: {
      id: string;
      expires: string;
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
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      id: "web3",
      name: "web3",
      credentials: {
        message: { label: "Message", type: "text" },
        signedMessage: { label: "Signed Message", type: "text" }, // aka signature
      },
      authorize: async (credentials) => {

        const res = await fetch(`${API_URL}/auth/siwe`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        

        const user = await res.json();
        

        if (res.ok && user) {
          return Promise.resolve(user);
        } else {
          return Promise.reject(new Error('Invalid SIWE credentials'));
        }
      },
     /*  async authorize(credentials, req) {
        if (!credentials?.signedMessage || !credentials?.message) {
          return null;
        }

        try {
          // On the Client side, the SiweMessage()
          // will be constructed like this:
          //
          // const siwe = new SiweMessage({
          //   address: address,
          //   statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
          //   nonce: await getCsrfToken(),
          //   expirationTime: new Date(Date.now() + 2*60*60*1000).toString(),
          //   chainId: chain?.id
          // });
          //TODO: this is not working correctly

          const siwe = new SiweMessage(JSON.parse(credentials?.message));
          const result = await siwe.verify({
            signature: credentials.signedMessage,
            nonce: await getCsrfToken({ req }),
          });

          if (!result.success) throw new Error("Invalid Signature");

          if (result.data.statement !== process.env.NEXT_PUBLIC_SIGNIN_MESSAGE)
            throw new Error("Statement Mismatch");

          console.log("Returning");
          return {
            id: siwe.address,
            address: siwe.address,
            chain: siwe.chainId,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      }, */
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({
      token,
      account,
      user,
    }: {
      token: any;
      account: any;
      user: any;
    }) {
      const expirationTime = new Date(
        Date.now() + 2 * 60 * 60 * 1000
      ).toISOString();
      
     
      
  

      if(account){
        if (account.provider === "github") {
          const session = await getUserSession();
          
          token.web3 = session;
          console.log(account, user, token)
          token.github = {
            id: account.providerAccountId,
            accessToken: account.access_token,
            expires: expirationTime,
          };
        } else if (account.provider === "web3") {
          token.web3 = user.user;
          token.web3.accessToken = user.accessToken;

        }
      }
     

      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      // We'll directly place the `sessions` object from the token into the session.
      // This way, we have all the data from different providers in the session.

     
      session.user = session.user || {};
      if (token.github) {
        session = token;
      }
      if (token.web3) {
        session.web3 = token.web3;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
