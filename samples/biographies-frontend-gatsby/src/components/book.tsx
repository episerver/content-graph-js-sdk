import React from "react"
import { Book } from "../models/book"
import { BookNode } from "../models/bookNode"
import styles from "./book.module.css"

type BookProps = {
    book: Book,
    category?: BookNode
}

type BookListProps = {
    books: Book[],
    category?: BookNode
}


export const BookItem: React.FC<BookProps> = ({ book, category }) => {

    return (
        <div>
            <h3>{book.Name}</h3>
            <span>Category: {category?.Name}</span><br />
            <span>Author: {book.Author}</span><br />
            <span>Publisher: {book.Publisher}</span><br />
            <span>Status: {book.Status}</span><br />
            <div dangerouslySetInnerHTML={{ __html: book.Description }} />
        </div>
    )
}

export const BookListItem: React.FC<BookProps> = ({ book, category }) => {

    return (
        <div className={styles.item}>
            <h3>{book.Name}</h3>
            <img src="https://source.unsplash.com/random/150x200" /><br />
            <span>Author: {book.Author}</span><br />
            <span>Publisher: {book.Publisher}</span><br />
            <span>Status: {book.Status}</span><br />
        </div>
    )
}

export const BookList: React.FC<BookListProps> = ({ books = [], category }) => {
    return (
        <div>
            <h1>{category ? category.Name : "All categories"}</h1>
            <div className={styles.container}>
                {
                    books.map((book, i) => (
                        <BookListItem key={i} book={book} category={category} />
                    ))
                }
            </div>
        </div>
    )
}