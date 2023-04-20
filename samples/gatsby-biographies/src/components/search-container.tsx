import React, { Component, FormEvent, ChangeEvent } from "react"
import axios from "axios"
import * as JsSearch from "js-search"
import styles from "./search-container.module.css"

class SearchContainer extends Component {
    state = {
        data: [],
        search: new JsSearch.Search("Name"),
        searchResults: [],
        isLoading: true,
        isError: false,
        searchQuery: "",
    }

    componentDidMount = async () => {
        try {
            const host = window.location.origin
            const bookData = await axios.get(`${host}/page-data/bookStore/page-data.json`)
            const bioData = await axios.get(`${host}/page-data/index/page-data.json`)
            const data = [
                ...bookData.data.result.data.optimizely.BookProduct,
                ...bioData.data.result.data.optimizely.BiographyPage
            ]
            this.setState({ data: data })
            this.rebuildIndex()
        } catch (error) {
            this.setState({ isError: true })
            console.log("====================================")
            console.log(`Something bad happened while fetching the data\n${error}`)
            console.log("====================================")
        }
    }

    rebuildIndex = () => {
        const { data } = this.state

        const fields = ["Name", "Description", "Author", "FamousQuote", "MainBody"]
        const dataToSearch = new JsSearch.Search(fields)

        dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()

        dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()

        dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex(fields)

        const indices = [...fields, "Born", "Die"]
        indices.forEach(v => {
            dataToSearch.addIndex(v)
        })

        dataToSearch.addDocuments(data)
        this.setState({ search: dataToSearch, isLoading: false })
    }

    searchData = (e: ChangeEvent<HTMLInputElement>) => {
        const { search } = this.state
        const queryResult = search.search(e.target.value)
        this.setState({ searchQuery: e.target.value, searchResults: queryResult })
    }

    handleSubmit = (e: FormEvent) => {
        e.preventDefault()
    }

    render() {
        const { data, searchResults, searchQuery } = this.state
        const queryResults = searchQuery === "" ? [] : searchResults
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        id="Search"
                        value={searchQuery}
                        onChange={this.searchData}
                        placeholder="Enter your search here"
                        className={styles.search}
                    />
                </form>
                <hr />
                Result: {queryResults.length > 0 ? queryResults.length : "Empty"}
                <ul className={styles.ul}>
                    {queryResults.map((item: any, i: number) => {
                        return (
                            <li key={i}>
                                <h3>{item.Name}</h3>
                                {item.Born ? (
                                    <span><strong>Born: </strong>{new Date(item.Born).toLocaleDateString("en-US")}&nbsp;</span>
                                ) : ""}
                                {item.Die ? (
                                    <span><strong>Die: </strong>{new Date(item.Die).toLocaleDateString("en-US")}</span>
                                ) : ""}
                                {item.Author ? (
                                    <h5>Author: {item.Author}</h5>
                                ) : ""}
                                {item.Description ? (
                                    <div className={styles.description} dangerouslySetInnerHTML={{ __html: item.Description }}></div>
                                ) : ""}
                                {item.FamousQuote ? (
                                    <blockquote>{item.FamousQuote}</blockquote>
                                ) : ""}
                                {item.MainBody ? (
                                    <div>
                                        <h4>Summary:</h4>
                                        <div className={styles.summary} dangerouslySetInnerHTML={{ __html: item.MainBody.substring(0, 500) + "..." }}></div>
                                    </div>
                                ) : ""}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
export default SearchContainer