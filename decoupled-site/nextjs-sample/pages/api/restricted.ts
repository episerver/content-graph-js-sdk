import { useSession } from "next-auth/client"
import { authOptions } from "./auth/[...nextauth]"

export default async (req: any, res: any) => {
  const [session] = useSession();

  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    })
  } else {
    res.send({
      error: "You must be signed in to view the protected content on this page.",
    })
  }
}