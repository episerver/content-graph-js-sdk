import NextAuth, { Session } from "next-auth"
import OktaProvider from 'next-auth/providers/okta'
import AzureADProvider from "next-auth/providers/azure-ad";
import EPiserverOidcProvider from "@/providers/EPiserverOidcProvider";
const prod = process.env.NODE_ENV === 'production'
export const authOptions: any = {
  providers: [
    OktaProvider({
        name: "Opti ID",
        clientId: `${process.env.OKTA_CLIENT_ID}`,
        issuer: `${process.env.OKTA_ISSUER}`,
        clientSecret: '',
        checks: ['pkce', 'state', 'nonce'],
        client: {
          token_endpoint_auth_method: 'none'
        },
        // authorization: { params: { scope: "openid profile email offline_access idx_instancepermissions" } },
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
    }),
    EPiserverOidcProvider({
      clientId: 'frontend',
      clientSecret: '',
      client: {
        token_endpoint_auth_method: 'client_secret_post'
      },
      code_verifier: '123',
    }),
  ],
  callbacks: {
    authorized({ req , token }:any) {
      if(token) return true // If there is a token, the user is authenticated
    },
    async signIn({ user, account, profile, email, credentials }: any) {
      console.log('signIn', user, account, profile, email, credentials)
      return true
    },
    async redirect({ url, baseUrl }: any) {
      console.log('redirect', url, baseUrl)
      return baseUrl
    },
    async jwt({token, account}: any ){
        console.log('jwt', token)
        if (account) {
          token.accessToken = account.access_token
        }
        return token
    },
    async session({session, token}: any){
        console.log('session', session)
        session.accessToken = token.accessToken
        return session
      }
  }
}

export default NextAuth(authOptions)