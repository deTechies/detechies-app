import { API_URL } from "@/lib/constants";
import { getUserSession } from "@/lib/data/user";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import NextAuth, {
  NextAuthOptions,
  Session,
  getServerSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import LinkedinProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET ?? "",
    }),
    LinkedinProvider({
      clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID ?? "",
      clientSecret:
        process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET ?? "bxJ6QsCRtBApPGcj",
      authorization: { params: { scope: "profile email openid w_member_social" } },
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
        };
      },
    }),
    TwitterProvider({
      clientId: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET ?? "",
      version: "2.0", // opt-in to Twitter OAuth 2.0
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

        if (res.ok && user.data) {
          return Promise.resolve(user.data);
        } else {
          return Promise.reject(new Error("Invalid SIWE credentials"));
        }
      },
    }),
  ],
  pages: {
    signIn: "/onboard",
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
      trigger,
      session,
    }: {
      token: any;
      account: any;
      user: any;
      trigger?: any;
      session?: any;
    }) {
      const expirationTime = new Date(
        Date.now() + 2 * 60 * 60 * 1000
      ).toISOString();

      if (account) {
        if (account.provider === "web3") {
          token.web3 = {
            user: { ...user.user, username: user.user.display_name },
            address: user.user.wallet,
            accessToken: user.token,
          };

          return token;
        }
        const sessionData = await getUserSession(); // Moved outside to avoid repetition
        switch (account.provider) {
          case "linkedin":
            console.log(user);
            console.log(account);
            token[account.provider] = {
              id: account.providerAccountId,
              accessToken: account.access_token,
              expires: expirationTime,
              account: account,
              user: user,
            };
            token.web3 = sessionData;
          case "github":
            token[account.provider] = {
              id: account.providerAccountId,
              accessToken: account.access_token,
              expires: expirationTime,
              account: account,
              user: {
                ...user,
                name: user.login,
              }
            };
            token.web3 = sessionData;
            break;
          case "twitter":
            token.twitter = { user, account };
            token.web3 = sessionData;
            break;
        }

        if (trigger === "update") {
          token.web3 = session?.web3 || {};
          return { ...token };
        }

        return token;
      }

      if (trigger === "update") {
        token.web3 = session.web3;
        return { ...token, ...session.web3 };
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      session.user = session.user || {};

      if (token.web3) {
        session.web3 = token.web3;
      }
      if (token.github) {
        session.github = token.github;
        session.web3.github = token.github;
      }
      if (token.twitter) {
        session.twitter = token.twitter;
        session.web3.twitter = token.twitter;
      }
      if (token.linkedin) {
        session.linkedin = token.linkedin;
        session.web3.linkedin = token.linkedin;
      }

      return session;
    },
  },
} satisfies NextAuthOptions;

export const { handlers, signOut } = NextAuth(authOptions);

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
