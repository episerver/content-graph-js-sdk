import NextAuth, { Session } from "next-auth"
import OktaProvider from 'next-auth/providers/okta'
import AzureADProvider from "next-auth/providers/azure-ad";
import EPiserverOidcProvider from "@/providers/EPiserverOidcProvider";
import refreshAccessToken from "@/lib/refreshAccessToken";
import { baseUrl } from "@/Constants";

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
          logo: `${baseUrl}/optimizely.png`,
          logoDark: `${baseUrl}/optimizely.png`,
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
    }),
  ],
  callbacks: {
    async jwt({token, user, account}: any){
        if (account) {
          return {
            accessToken: account.access_token,
            accessTokenExpires: account.expires_at * 1000,
            user,
            refreshToken: account.refresh_token,
            provider: account.provider,
          }
        }

        if (Date.now() < token.accessTokenExpires) {
          return token
        }

        return await refreshAccessToken(token)
    },
    async session(session: Session){
        return session
    }
  }
}

export default NextAuth(authOptions)