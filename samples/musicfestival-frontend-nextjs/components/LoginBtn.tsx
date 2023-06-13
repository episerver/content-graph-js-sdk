import { Session } from "next-auth"
import { useSession, signIn, signOut } from "next-auth/react"

type ExtendedSession = Session & {
  token: any
}

export default function Component() {
  const { data: session } = useSession()
  const extendedSession: ExtendedSession = session as ExtendedSession
  if (extendedSession) {
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