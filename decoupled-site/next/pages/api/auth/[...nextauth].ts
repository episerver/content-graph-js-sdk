import NextAuth, { Account, Session, User } from "next-auth"
import OktaProvider from 'next-auth/providers/okta'
import AzureADProvider from "next-auth/providers/azure-ad";
import { JWT } from "next-auth/jwt";
// import { OktaProvider} from "@next-auth/okta"

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    OktaProvider({
        clientId: `${process.env.OKTA_CLIENT_ID}`,
        issuer: `${process.env.OKTA_ISSUER}`,
        clientSecret: '',
        checks: ['pkce', 'state', 'nonce'],
        client: {
          token_endpoint_auth_method: 'none'
        }
      }),
    AzureADProvider({
      clientId: `${process.env.AZURE_AD_CLIENT_ID}`,
      clientSecret: `${process.env.AZURE_AD_CLIENT_SECRET}`,
      tenantId: `${process.env.AZURE_AD_TENANT_ID}`,
    }),
  ],
  callbacks: {
    async jwt(token: JWT ){
        return token
    },
    async session(session: Session){
        return session
      }
  }
}

export default NextAuth(authOptions)