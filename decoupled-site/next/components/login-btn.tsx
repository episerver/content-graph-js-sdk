// import { useSession, signIn, signOut } from "next-auth/client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session}= useSession()
  if (session) {
    return (
      <div className="btn">
        <button onClick={() => signOut()}>{session.user?.email}</button>
      </div>
    )
  }
  return (
    <div className="btn">
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}