import { baseUrl } from "@/constants";

export default function EPiserverOidcProvider (options: Record<string, any>) {
      return {
        id: "optimizely_cms",
        name: "Musicfestival",
        type: "oauth",
        version: "2.0",
        wellKnown: `${process.env.NEXT_PUBLIC_LOGIN_AUTHORITY}/.well-known/openid-configuration`,
        authorization: { params: { 
            scope: "openid profile offline_access email roles",
            grant_type: "authorization_code",
            redirect_uri: `${process.env.NEXTAUTH_URL}api/auth/callback/optimizely_cms`,
        } },
        checks: ['pcke', 'state', 'none'],
        style: {
            logo: `${baseUrl}/optimizely.png`,
            logoDark: `${baseUrl}/optimizely.png`,
        },
        profile(profile: any, tokens: any) {
            const accessTokenParsed = JSON.parse(Buffer.from(tokens.access_token.split('.')[1], 'base64').toString());
            profile.id = profile.sub
            profile.name = profile.name ?? accessTokenParsed.name
            profile.email = profile.email ?? accessTokenParsed.email
            profile.role = profile.role ?? accessTokenParsed.role
            return profile
        },
        options,
      }
}