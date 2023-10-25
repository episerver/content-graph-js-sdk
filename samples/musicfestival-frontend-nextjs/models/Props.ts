import { ArtistContainerPageQuery, ArtistDetailsPageQuery, StartQuery } from "@/generated/graphql"

export type ArtistContainerPageProps = {
    error: any,
    content: ArtistContainerPageQuery
}

export type ArtistDetailsPageProps = {
    error: any,
    content: ArtistDetailsPageQuery
}

export type StartPageProps = {
    error: any,
    content: StartQuery,
}
