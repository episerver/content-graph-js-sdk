import { ContentReference } from "./contentReference";

export type BookNode = {
    Name: string,
    Code: string,
    NodeDescription: string,
    ContentLink: ContentReference,
    ParentLink: ContentReference
}
