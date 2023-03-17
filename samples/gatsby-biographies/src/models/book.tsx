import { ContentReference } from "./contentReference"

export type Book = {
    Name: string,
    Code: string,
    Author: string,
    Description: string,
    DisplayName: string,
    Url: string,
    Status: string,
    Publisher: string,
    ContentLink: ContentReference,
    ParentLink: ContentReference
}