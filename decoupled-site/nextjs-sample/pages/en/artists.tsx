import { useStartQuery } from '@/generated/graphql'
import parse from 'html-react-parser'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Header from '../components/Header'
import { generateGQLQueryVars } from '../helpers/queryCacheHelper'
import { getImageUrl } from '../helpers/urlHelper'
import ArtistContainerPage from '../pages/ArtistContainerPage'

type ArtistDetailsPageProps = {
    content: any
}

// export async function getStaticProps() {
//     // const router = useRouter()
//     // const [token, setToken] = useState('')
//     // const { pathname } = router
//     const variables = generateGQLQueryVars('token', '/')

//     const { loading, error, data } = useStartQuery({ variables })

//     if (loading) return <p>Loading...</p>
//     if (error) return <p>Error: {error.message}</p>
//     return {
//       props: data,
//     }
//   }

export default function Artists() {
    const router = useRouter()
    const [token, setToken] = useState('')
    const { pathname } = router
    const variables = generateGQLQueryVars(token, pathname)

    const { loading, error, data } = useStartQuery({ variables })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>
    return (
        <div className="App">
            <Header />
            {
                data?.Content?.items?.map((content, idx) => {
                    return (
                        <ArtistContainerPage content={content} key={idx} />
                    )
                })
            }
        </div>
    )
}