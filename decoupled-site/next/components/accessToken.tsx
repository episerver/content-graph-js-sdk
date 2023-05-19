import { useSession } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  const { accessToken }: any = session || {}

  return <div>Access Token: {accessToken}</div>
}