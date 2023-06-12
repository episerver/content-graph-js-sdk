import { graphql } from "gatsby"
import React from "react"
import { Layout } from "../components/layout"
import { Book } from "../models/book"
import { BookList } from "../components/book"
import { BookNode } from "../models/bookNode"

type BookProps = {
    data: {
        optimizely: {
            BookProduct: Book[],
            BookNode: BookNode[]
        }
    }
}

const BookProduct: React.FC<BookProps> = ({
    data: {
        optimizely: { BookProduct, BookNode }
    }, }) => {

    const node = BookNode.pop();

    return (
        <Layout>
            <BookList books={BookProduct} category={node} />
        </Layout>
    )
}

export default BookProduct;


export const pageQuery = graphql`
    query BookProductQuery($parentLinkId: Int) {
        optimizely {
            BookProduct(where: {ParentLink: {Id: {eq: $parentLinkId}} }) {
                Name
                Code
                Author
                Description
                DisplayName
                Url
                Status
                Publisher
                ContentLink {
                    GuidValue
                    Id
                    ProviderName
                    Url
                    WorkId
                }
                ParentLink {
                    GuidValue
                    Id
                    ProviderName
                    Url
                    WorkId
                }
            }
            BookNode(
                where: {
                    ContentLink: {
                        Id: {
                            eq: $parentLinkId
                            }
                        }
                    }
            ) {
                Name
                Code
                NodeDescription
                ContentLink {
                    GuidValue
                    Id
                    ProviderName
                    Url
                    WorkId
                }
                ParentLink {
                    GuidValue
                    Id
                    ProviderName
                    Url
                    WorkId
                }
            }
        }
    }
`