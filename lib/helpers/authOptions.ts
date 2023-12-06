import { API_URL } from "@/lib/constants";
import { getUserSession } from "@/lib/data/user";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
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
          signature: { label: "Signed Message", type: "text" }, // aka signature
          address: { label: "Address", type: "text" },
        },
        authorize: async (credentials) => {
          const res = await fetch(`${API_URL}/users/auth`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
  
          const user = await res.json();
          console.log("whowe the reuslt");
          console.log(user);
  
          if (res.ok && user) {
            return Promise.resolve(user);
          } else {
            return Promise.reject(new Error("Invalid SIWE credentials"));
          }
        },
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
  
        if (account) {
          if (account.provider === "github") {
            const session = await getUserSession();
  
            token.web3 = session;
            console.log(account, user, token);
            token.github = {
              id: account.providerAccountId,
              accessToken: account.access_token,
              expires: expirationTime,
            };
          } else if (account.provider === "web3") {
            token.web3 = {
              user: {
                ...user.user,
                username: user.user.display_name,
              },
              address: user.user.wallet,
              accessToken: user.token,
            };
          }
        }
  
        return token;
      },
      async session({ session, token }: { session: Session; token: any }) {
  
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
  } satisfies NextAuthOptions;
  

  export const {handlers, signOut} = NextAuth(authOptions);