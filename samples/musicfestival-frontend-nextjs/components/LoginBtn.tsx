import { Session } from "next-auth"
import { useSession, signIn, signOut } from "next-auth/react"

export type ExtendedSession = Session & {
  token?: any
}

export default function Component() {
  const { data: session, status } = useSession()
  const extendedSession: ExtendedSession = session as ExtendedSession
  if (extendedSession && status === "authenticated") {
    const userName = extendedSession.token?.user?.name || extendedSession.token?.name
    return (
      <div className="btn">
        <button onClick={() => signOut()}>{userName}</button>
      </div>
    )
  }
  return (
    <div className="btn">
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}