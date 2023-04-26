import { generateGQLQueryVars } from "./queryCacheHelper"
import { ArtistDetailsPage } from "../graphql/ArtistDetailsPage.graphql"
import { gql } from "graphql-tag"
import { ArtistDetailsPageProps } from "@/models/Props";

const singleKeyUrl = process.env.NEXT_PUBLIC_CONTENT_GRAPH_ENDPOINT as string

export async function getArtistDetailPage(token: string, pathname: string) {
    let headers = {}
    let url = singleKeyUrl

    const variables = generateGQLQueryVars(token, pathname)

    const parsedGQL = gql`${ArtistDetailsPage}`
    
    const res = await fetch(url, {
        headers,
        method: "POST",
        body: JSON.stringify({
            query: parsedGQL.loc?.source.body,
            variables: variables
        })

    })
    
    const json = await res.json()

    const {error, content}: ArtistDetailsPageProps = {error: json.errors || null, content: json.data || null}

    return {error, content}
}
