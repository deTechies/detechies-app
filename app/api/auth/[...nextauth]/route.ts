import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

declare module "next-auth" {
    interface Session {
      accessToken: string;
        userId: string;
    }
  }
  
const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log(url, baseUrl);
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        console.log(account);
        token.accessToken = account.access_token;
        token.id = user.id;
        
        if(user){
            console.log(user)
        }
        //token.expires_at =  Math.floor(Date.now() / 1000 + account.expires_in)
        //token.refresh_token =  account.refresh_token
      }
      return token;
    },
    async session({ session, token }) {
      // Add the access_token to the session object

      if (token) {
        session.accessToken = token.accessToken as string;
        session.userId = token.id as string;
      }
      
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
