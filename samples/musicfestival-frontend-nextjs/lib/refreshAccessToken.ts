import { Account } from "next-auth";

const providerConfig: { [key: string]: { tokenUrl: string; clientId?: string; clientSecret?: string } } = {
    "https://sts.windows.net/7c4a1b79-4b8e-4ac7-b7e1-c5c3c5a4c139/": {
      tokenUrl: "https://sts.windows.net/7c4a1b79-4b8e-4ac7-b7e1-c5c3c5a4c139/oauth2/token",
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
      clientSecret: process.env.NEXTAUTH_SECRET,
    },
  };
  
 export default async function refreshAccessToken(token: any) {
    // console.log('token', token)
    try {
        // const payload = JSON.parse(Buffer.from(token.accessToken.split('.')[1], 'base64').toString());
        // const {iss} = payload
        // console.log('payload', payload)
        // const provider = payload.provider; // assuming the provider information is stored under 'provider'
        const { tokenUrl, clientId, clientSecret } = providerConfig["https://sts.windows.net/7c4a1b79-4b8e-4ac7-b7e1-c5c3c5a4c139/"];

        const url = `${tokenUrl}` +
                    new URLSearchParams({
                        client_id: `${clientId}`,
                        client_secret: `${clientSecret}`,
                        grant_type: "refresh_token",
                        refresh_token: token.refreshToken ?? '',
                    });
    
        const response = await fetch(url, {method: "POST", headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },});
          
          console.log('refreshedTokens', JSON.stringify(response))
    
        if (!response.ok) {
            throw new Error('Failed to refresh access token');
        }
        const refreshedTokens = await response.json();
        console.log('refreshedTokens', JSON.stringify(refreshedTokens))
        const  { access_token, expires_in, refreshToken } = refreshedTokens;
    
        // account.access_token = access_token;
        // account.expires_at = Date.now() + expires_in;
        // account.refresh_token = refresh_token;

        return {
            ...token,
            access_token: access_token,
            acessTokenExpires: Date.now() + expires_in * 1000,
            refresh_token: refreshToken ?? token.refreshToken,
        };
    } catch (error) {
        console.log(error);
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        }
    }
  }