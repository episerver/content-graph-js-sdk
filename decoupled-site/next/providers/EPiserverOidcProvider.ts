export default function EPiserverOidcProvider (options: Record<string, any>) {
      return {
        id: "optimizely_cms",
        name: "Musicfestival",
        type: "oauth",
        version: "2.0",
        wellKnown: `${process.env.NEXT_PUBLIC_LOGIN_AUTHORITY}/.well-known/openid-configuration`,
        authorization: { params: { 
            scope: "openid email profile offline_access roles",
            grant_type: "authorization_code",
            redirect_uri: `${process.env.NEXTAUTH_URL}`,
        } },
        // authorization: "http://localhost:8082/api/episerver/connect/authorize?response_type=code",
        accessTokenUrl: `${process.env.NEXT_PUBLIC_LOGIN_AUTHORITY}/api/episerver/connect/token`,
        jwks_endpoint: `${process.env.NEXT_PUBLIC_LOGIN_AUTHORITY}/.well-known/jwks`,
        userinfo: `${process.env.NEXT_PUBLIC_LOGIN_AUTHORITY}/api/episerver/connect/userinfo`,
        state: true,
        protection: "state",
        checks: ["pkce", "state", "nonce"],
        style: {
            logo: `${process.env.NEXTAUTH_URL}/optimizely.png`,
            logoDark: `${process.env.NEXTAUTH_URL}/optimizely.png`,
        },
        profile(profile: any, tokens: any) {
            return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email
                   };
           },
        options,
      }
}