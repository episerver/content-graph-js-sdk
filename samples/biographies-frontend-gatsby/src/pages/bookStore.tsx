import { graphql, Link } from "gatsby"
import React from "react"
import { BookList } from "../components/book"
import { Category } from "../components/category"
import { Layout } from "../components/layout"
import { Book } from "../models/book"
import { BookNode } from "../models/bookNode"
import styles from "./bookStore.module.css"

type BookStoreProps = {
    data: {
        optimizely: { BookNode: BookNode[], BookProduct: Book[] }
    }
}

const BookStorePage: React.FC<BookStoreProps> = ({
    data: {
        optimizely: { BookNode, BookProduct }
    }
}) => {

    return (
        <Layout>
            <img src="https://source.unsplash.com/YLSwjSy7stw/1024x600" />
            <div className={styles.container}>
                <Category nodes={BookNode} />
                <BookList books={BookProduct} />
            </div>
        </Layout>
    )
}

export default BookStorePage

export const pageQuery = graphql`
  query {
    optimizely {
        BookNode{
            Name
            Code
            NodeDescription
            ContentLink {
                Id
                WorkId
                ProviderName
                Url
                GuidValue
            }
            ParentLink {
                Id
                WorkId
                GuidValue
                ProviderName
                Url
            }
        }
        BookProduct {
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
      
    }
  }
`