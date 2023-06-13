import { generateGQLQueryVars } from "./queryCacheHelper"
import { Start } from "../graphql/Start.graphql"
import { gql } from "graphql-tag"
import { StartPageProps } from "@/models/Props";

const singleKeyUrl = process.env.NEXT_PUBLIC_CONTENT_GRAPH_ENDPOINT as string

export async function getStartPage(token: string, pathname: string) {
    let headers = {}
    let url = singleKeyUrl

    const variables = generateGQLQueryVars(token, pathname)

    const parsedGQL = gql`${Start}`
    
    const res = await fetch(url, {
        headers,
        method: "POST",
        body: JSON.stringify({
            query: parsedGQL.loc?.source.body,
            variables: variables
        })

    })
    
    const json = await res.json()

    const {error, content}: StartPageProps = {error: json.errors || null, content: json.data || null}

    return {error, content}
}
