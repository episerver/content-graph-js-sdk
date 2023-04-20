import { useStartQuery } from "@/generated/graphql"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NextPage } from 'next'
import { useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { subcribeContentSavedEvent } from "./helpers/contentSavedEvent"
import { generateGQLQueryVars, updateStartQueryCache } from "./helpers/queryCacheHelper"
import { isEditOrPreviewMode } from "./helpers/urlHelper"
import { ContentSavedMessage } from "./models/ContentSavedMessage"
import ArtistContainerPage from "./pages/ArtistContainerPage"
import ArtistDetailsPage from "./pages/ArtistDetailsPage"
import { BlockPage } from "./pages/BlockPage"
import LandingPage from "./pages/LandingPage"
import { useRouter } from 'next/router'

let previousSavedMessage: any = null;
const singleKeyUrl = process.env.NEXT_PUBLIC_CONTENT_GRAPH_ENDPOINT as string
const hmacKeyUrl = process.env.NEXT_PUBLIC_CG_PROXY_URL as string

const Home: NextPage = () => {
    const router = useRouter()
    const { pathname } = router
    const queryClient = useQueryClient()
    const [token, setToken] = useState('')
    const modeEdit = isEditOrPreviewMode()
    let headers = {}
    let url = singleKeyUrl

    const { mutate } = useMutation((obj: any) => obj, {
        onSuccess: (message: ContentSavedMessage) => {
            if (previousSavedMessage !== message) {
                previousSavedMessage = message;
                updateStartQueryCache(queryClient, data, variables, message)
            }
        }
    });

    if (modeEdit) {
        if (token) {
            headers = { 'Authorization': 'Bearer ' + token };
        }
        url = hmacKeyUrl
        subcribeContentSavedEvent((message: any) => mutate(message))
    }
    
    const variables = generateGQLQueryVars(token, pathname)

    const { error, data } = useStartQuery({ endpoint: url, fetchParams: { headers: headers } }, variables);

    if (error) return <p>Error</p>

    return (
        <div className="App">
            <Header />
            <div className='LandingPage'>
                {
                    data?.Content?.items?.map((content, idx) => {
                        if (content?.__typename === 'LandingPage') {                            
                            return (
                                <div key={idx}>
                                    <LandingPage content={content} key={idx} />
                                    <Footer content={content} />
                                </div>
                            )
                        }
                        else if (content?.__typename === 'ArtistContainerPage') {
                            return (
                                <ArtistContainerPage content={content} key={idx} />
                            )
                        }
                        else if (content?.__typename === 'ArtistDetailsPage') {
                            return (
                                <ArtistDetailsPage content={content} key={idx} />
                            )
                        }
                        return <BlockPage content={content} key={idx} />
                    })
                }
            </div>
        </div>
    )
}

export default Home