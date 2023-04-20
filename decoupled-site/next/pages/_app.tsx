import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const client = new QueryClient();

export default function App({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
    <QueryClientProvider {...session} client={client}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
