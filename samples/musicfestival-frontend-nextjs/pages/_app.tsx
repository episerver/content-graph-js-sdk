import '@/styles/globals.css'
import NextApp from 'next/app'
import { SessionProvider } from "next-auth/react"
import { withApplicationInsights } from 'next-applicationinsights';

class App extends NextApp {
  render() {
    const { Component, pageProps: { session, ...pageProps } } = this.props

    return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
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


