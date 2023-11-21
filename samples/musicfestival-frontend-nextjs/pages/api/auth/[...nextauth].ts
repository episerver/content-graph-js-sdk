import NextAuth, { Session } from "next-auth"
import OktaProvider from 'next-auth/providers/okta'
import AzureADProvider from "next-auth/providers/azure-ad";
import EPiserverOidcProvider from "@/providers/EPiserverOidcProvider";
import { JWT } from "next-auth/jwt";

const prod = process.env.NODE_ENV === 'production'
async function refreshAccessToken(account: any) {
  if(account.refresh_token) {
    const cmsTokenUrl = `${process.env.NEXT_PUBLIC_LOGIN_AUTHORITY}/api/episerver/connect/token`
    const azureTokenUrl = "https://login.microsoftonline.com/common/oauth2/v2.0/token"
    const optiIdTokenUrl = `${process.env.OKTA_ISSUER}/oauth2/v1/token`
    let tokenUrl
    let clientId
    let clientSecret

    switch(account.provider) {
      case "azure-ad": {
        tokenUrl = azureTokenUrl
        clientId = `${process.env.AZURE_AD_CLIENT_ID}`
        clientSecret = `${process.env.AZURE_AD_CLIENT_SECRET}`
        break
      }
      case "okta": {
        tokenUrl = optiIdTokenUrl
        clientId = `${process.env.OKTA_CLIENT_ID}`
        break
      }
      case "optimizely_cms": {
        tokenUrl = cmsTokenUrl
        clientId = `${process.env.NEXT_PUBLIC_EPISERVER_CLIENT_ID}`
        clientSecret = `${process.env.NEXTAUTH_SECRET}`
        break
      }
    }

    const url = `${tokenUrl}` +
                new URLSearchParams({
                  client_id: `${clientId}`,
                  client_secret: `${clientSecret}`,
                  grant_type: "refresh_token",
                  refresh_token: account.refresh_token,
                })

    const response = await fetch(url, {method: "POST"})
    const fetchResponse = await response.json()

    if (!response.ok) {
      throw fetchResponse
    }

    account.access_token = fetchResponse.access_token
    account.expires_at = Date.now() + fetchResponse.expires_in
    account.refresh_token = fetchResponse.refresh_token
  }

  return account
}

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
    async jwt({token, user, account}: any){
        if (account) {
          const accessTokenParsed = JSON.parse(Buffer.from(account.access_token.split('.')[1], 'base64').toString());
          token.user = accessTokenParsed
        }
        
        if (Date.now() > account.expires_at) {
          refreshAccessToken(account)
        }
        
        return token
    },
    async session(session: Session, token: JWT){
        session = {...token, ...session}
        return session
      }
  }
}

export default NextAuth(authOptions)