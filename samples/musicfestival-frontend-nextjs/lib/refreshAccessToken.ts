import { Account } from "next-auth";

const providerConfig: { [key: string]: { tokenUrl: string; clientId?: string; clientSecret?: string } } = {
    "azure-ad": {
      tokenUrl: `https://sts.windows.net/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`,
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
    },
    "okta": {
      tokenUrl: `${process.env.OKTA_ISSUER}/oauth2/v1/token`,
      clientId: process.env.OKTA_CLIENT_ID,
    },
    "optimizely_cms": {
      tokenUrl: `${process.env.NEXT_PUBLIC_LOGIN_AUTHORITY}/api/episerver/connect/token`,
      clientId: process.env.NEXT_PUBLIC_EPISERVER_CLIENT_ID,
    },
  };
  
 export default async function refreshAccessToken(token: any) {
    try {
        if (!token.refreshToken) throw new Error('No refresh token available');
        const { provider } = token;
        const { tokenUrl, clientId, clientSecret } = providerConfig[provider];

        const data = {
            client_id: `${clientId}`,
            client_secret: `${clientSecret ?? ''}`,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken,
        }
    
        const response = await fetch(tokenUrl, {
            method: "POST", 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data),
          },
        );

        const refreshedTokens = await response.json();
    
        if (!response.ok) {
            throw refreshedTokens;
        }

        const  { access_token, expires_in, refresh_token } = refreshedTokens;

        token = {
            ...token,
            accessToken: access_token,
            accessTokenExpires: Date.now() + expires_in * 1000,
            refreshToken: refresh_token ?? token.refreshToken,
        }
        return token;
    } catch (error) {
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        }
    }
  }