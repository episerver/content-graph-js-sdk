import { useArtistDetailsQuery, useStartQuery } from '@/generated/graphql'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Header from '../../components/Header'
import { subcribeContentSavedEvent } from '../../helpers/contentSavedEvent'
import { generateGQLQueryVars, updateStartQueryCache } from '../../helpers/queryCacheHelper'
import { isEditOrPreviewMode } from '../../helpers/urlHelper'
import { ContentSavedMessage } from '../../models/ContentSavedMessage'
import ArtistContainerPage from '../../pages/ArtistContainerPage'


let previousSavedMessage: any = null;
const singleKeyUrl = process.env.NEXT_PUBLIC_CONTENT_GRAPH_ENDPOINT as string
const hmacKeyUrl = process.env.NEXT_PUBLIC_CG_PROXY_URL as string

export default function ArtistDetailsPage() {
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

    const { error, data } = useArtistDetailsQuery({ endpoint: url, fetchParams: { headers: headers } }, variables);
    console.log('data', data)
    // const content = data?.ArtistDetailsPage?.items?[0] : null;

    if (error) return <p>Error</p>

    return (
        <div className="App">
            <Header />
            {/* <ArtistDetailsPage content={content}/> */}
        </div>
    )
}