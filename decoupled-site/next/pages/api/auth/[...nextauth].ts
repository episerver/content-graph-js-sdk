import NextAuth, { Account, Session, User } from "next-auth"
import OktaProvider from 'next-auth/providers/okta'
import AzureADProvider from "next-auth/providers/azure-ad";
import { JWT } from "next-auth/jwt";


export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    OktaProvider({//api/auth/callback/okta
        clientId: process.env.OKTA_CLIENT_ID || '',
        clientSecret: process.env.OKTA_CLIENT_SECRET || '',
        issuer: process.env.OKTA_ISSUER || '',
        checks: ['pkce', 'state'],
      }),
      AzureADProvider({
        clientId: process.env.AZURE_AD_CLIENT_ID || '',
        clientSecret: process.env.AZURE_AD_CLIENT_SECRET || '',
        tenantId: process.env.AZURE_AD_TENANT_ID,
      }),
  ],
  // secret: process.env.NEXTAUTH_SECRET,
  // callbacks: {
  //   // async redirect({ url, baseUrl }: any) {
  //   //   // console.log('url', url)
  //   //   // console.log('baseUrl', baseUrl)
  //   //   // // Allows relative callback URLs
  //   //   // if (url.startsWith("/")) return Promise.resolve(`${baseUrl}${url}`)
  //   //   // // Allows callback URLs on the same origin
  //   //   // else if (new URL(url).origin === baseUrl) return Promise.resolve(url)
  //   //   return Promise.resolve('http://localhost:3000/login-callback')
  //   // },
  //   async jwt(token: JWT, account?: Account | null ){
  //       if (account) {
  //           console.log('account', account)
  //           token = {...token, accessToken: account.access_token}
  //       }
  //       console.log('jwt-token', token)
  //       return token
  //   },
  //   async session(session: Session, user: User, token: JWT){
  //     // const encodedToken = jwt.sign(token!, env.NEXTAUTH_SECRET, {
  //     //   algorithm: 'HS256',
  //     // });
  //       console.log('token', token)
  //       const newSession = {...session, accessToken: token.accessToken, token: token}
  //       return newSession
  //     }
  // }
}

export default NextAuth(authOptions)