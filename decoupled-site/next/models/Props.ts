import { ArtistContainerPageQuery, ArtistDetailsPageQuery } from "@/generated/graphql"

export type ArtistContainerPageProps = {
    error: any,
    content: ArtistContainerPageQuery
}

export type ArtistDetailsPageProps = {
    error: any,
    content: ArtistDetailsPageQuery
}
