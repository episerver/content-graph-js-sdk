import { useRouter } from 'next/router';
import { useSession } from "next-auth/react"
import { ExtendedSession } from '@/components/LoginBtn';
import { GetStaticProps } from 'next';
import { ContextProps } from '@/models/Props';

export const getStaticProps: GetStaticProps =async () => ({ props: { context: {host: process.env.NEXTAUTH_URL || ''} } });

export default function LoginCallbackPage(props: ContextProps) {
    const { update } = useSession()
    const router = useRouter();
    const { query } = router;
    const {code} = query;

    const handleGetAccessToken = async (props: ContextProps) => {
        const originalUrl = props.context.host;
        const redirect_uri = originalUrl + 'login-callback';
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_AUTHORITY}/api/episerver/connect/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: `${code}`,
                redirect_uri: redirect_uri,
                client_id: 'frontend',
                code_verifier: `123`,
            }),
        });

        const data = await response.json();

        if (response.status == 200) {
            update({...data, token: {accessToken: data.access_token, refreshToken: data.refresh_token}} as ExtendedSession)
            console.log('data: ', data);
            // sessionStorage.setItem('accessToken', data.access_token); // save accessToken to sessionStorage   
        }        
    };

    if (code) {
        handleGetAccessToken(props).then(() => {
            router.push('/');
        });
    }

    return <></>;
};

;
