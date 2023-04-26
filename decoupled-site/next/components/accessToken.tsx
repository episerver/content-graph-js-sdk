import { useSession } from "next-auth/client"

export default function Component() {
  const [session] = useSession()
  const { accessToken }: any = session || {}

  return <div>Access Token: {accessToken}</div>
}