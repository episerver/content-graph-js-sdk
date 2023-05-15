import '@/styles/globals.css'
import NextApp from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { withApplicationInsights } from 'next-applicationinsights';


const client = new QueryClient();

class App extends NextApp {
  render() {
    const { Component, pageProps: { session, ...pageProps } } = this.props

    return (
      <QueryClientProvider {...session} client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    )
  }
}

const Component = process.env.NEXT_PUBLIC_APPINSIGHTS_CONN_STR
  ? withApplicationInsights({
    connectionString: process.env.NEXT_PUBLIC_APPINSIGHTS_CONN_STR,
    isEnabled: process.env.NODE_ENV === 'production'
  })(App)
  : App

export default Component


