import { Session } from "next-auth"
import { useSession, signIn, signOut } from "next-auth/react"

export type ExtendedSession = Session & {
  token?: any
}

export default function Component() {
  const { data: session } = useSession()
  console.log('LoginBtn', session)
  const extendedSession: ExtendedSession = session as ExtendedSession
  if (extendedSession) {
    console.log('LoginBtn', extendedSession)
    return (
      <div className="btn">
        <button onClick={() => signOut()}>{extendedSession.token?.token?.user?.name}</button>
      </div>
    )
  }
  return (
    <div className="btn">
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}