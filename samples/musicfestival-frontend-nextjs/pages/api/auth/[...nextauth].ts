import NextAuth, { Session } from "next-auth"
import OktaProvider from 'next-auth/providers/okta'
import AzureADProvider from "next-auth/providers/azure-ad";
import EPiserverOidcProvider from "@/providers/EPiserverOidcProvider";
import { JWT } from "next-auth/jwt";
import refreshAccessToken from "@/lib/refreshAccessToken";

const prod = process.env.NODE_ENV === 'production'

export const authOptions: any = {
  providers: [
    OktaProvider({
        name: "Opti ID",
        clientId: `${process.env.OKTA_CLIENT_ID}`,
        issuer: `${process.env.OKTA_ISSUER}`,
        clientSecret: '',
        authorization: {
          params: {
            scope: "openid email profile offline_access"
          }
        },
        checks: ['pkce', 'state', 'nonce'],
        client: {
          token_endpoint_auth_method: 'none'
        },
        style: {
          logo: `${prod ? process.env.NEXTAUTH_URL : process.env.VERCEL_URL}/optimizely.png`,
          logoDark: `${prod ? process.env.NEXTAUTH_URL : process.env.VERCEL_URL}/optimizely.png`,
          bg: "#fff",
          text: "#000",
          bgDark: "#000",
          textDark: "#fff",
        }
      }),
    AzureADProvider({
      clientId: `${process.env.AZURE_AD_CLIENT_ID}`,
      clientSecret: `${process.env.AZURE_AD_CLIENT_SECRET}`,
      tenantId: `${process.env.AZURE_AD_TENANT_ID}`,
      authorization: {
        params: {
          scope: "openid profile email offline_access",
        },
      },
    }),
    EPiserverOidcProvider({
      clientId: `${process.env.NEXT_PUBLIC_EPISERVER_CLIENT_ID}`,
      authorization: { params: { scope: "openid profile offline_access email roles epi_content_delivery" } },
      clientSecret: '',
      checks: ['pkce', 'state', 'nonce'],
      client: {
        token_endpoint_auth_method: 'none'
      },
    }),
  ],
  callbacks: {
    async jwt({token,  account}: any){
        if (account) {
          const accessTokenParsed = JSON.parse(Buffer.from(account.access_token.split('.')[1], 'base64').toString());

          return {
            accessToken: account.access_token,
            accessTokenExpires: Date.now() + account.expires_in * 1000,
            user: accessTokenParsed,
          }
        }

        if (Date.now() < token.accessTokenExpires || !token.accessTokenExpires) {
          return token
        }

        return refreshAccessToken(token)
    },
    async session(session: Session, token: JWT){
        session = {...token, ...session}
        return session
      }
  }
}

export default NextAuth(authOptions)