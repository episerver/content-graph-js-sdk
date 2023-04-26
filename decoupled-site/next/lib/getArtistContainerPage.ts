import { generateGQLQueryVars } from "./queryCacheHelper"
import { ArtistContainerPage } from "../graphql/ArtistContainerPage.graphql"
import { ArtistDetailsPage } from "../graphql/fragments/ArtistDetailsPage.graphql"
import { gql } from "graphql-tag"
import { ArtistContainerPageProps } from "@/models/Props";


let previousSavedMessage: any = null;
const singleKeyUrl = process.env.NEXT_PUBLIC_CONTENT_GRAPH_ENDPOINT as string

export async function getArtistContainerPage(token: string, pathname: string) {
    let headers = {}
    let url = singleKeyUrl

    const variables = generateGQLQueryVars(token, pathname)

    const parsedGQL = gql`${ArtistContainerPage}`
    
    const res = await fetch(url, {
        headers,
        method: "POST",
        body: JSON.stringify({
            query: parsedGQL.loc?.source.body,
            variables: variables
        })

    })
    
    const json = await res.json()
    
    const {error, content}: ArtistContainerPageProps = {error: json.errors || null, content: json.data || null}

    return {error, content}
}
