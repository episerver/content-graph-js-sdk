import { useSession, signIn, signOut } from "next-auth/client"

export default function Component() {
  const [ session ] = useSession()
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