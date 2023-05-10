import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchButton from "../components/SearchButton";
import { SearchQuery, useSearchQuery } from "../generated";
import { generateGQLSearchQueryVars } from "../helpers/queryCacheHelper";
import { getImageUrl, isEditOrPreviewMode } from "../helpers/urlHelper";
import ReactPaginate from 'react-paginate';

const singleKeyUrl = process.env.REACT_APP_CONTENT_GRAPH_GATEWAY_URL as string

function SearchPage() {
    const [token, setToken] = useState("")
    const [itemOffset, setItemOffset] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [searchParams] = useSearchParams()
    const endOffset = itemOffset + itemsPerPage;
    const modeEdit = isEditOrPreviewMode()
    let data: SearchQuery | undefined = undefined
    let sortOption: string = "ASC"
    let queryString: string | null
    let resultNumber : number
    let variables: any
    let options: {value: string; key: string}[] = [
        {value: "ASC", key: "ASC"},
        {value: "DESC", key: "DESC"}
    ]
    let itemsPerPageOptions: {value: number; key: string}[] = [
        {value: 10, key: "10"},
        {value: 15, key: "15"}
    ]

    queryString = searchParams.get("q")
    if(queryString === undefined || queryString == 'undefined'){
        queryString = ""
    }
    variables = generateGQLSearchQueryVars(token, window.location.pathname, queryString, sortOption);

    const { data : searchQueryData } = useSearchQuery({ endpoint: singleKeyUrl }, variables, { staleTime: 2000, enabled: !modeEdit || !!token });
    data = searchQueryData
    resultNumber = data?.ArtistDetailsPage?.items?.length ?? 0

    const currentItems = data?.ArtistDetailsPage?.items?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(resultNumber / itemsPerPage);

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % resultNumber;
        setItemOffset(newOffset);
      };

    const handleItemsChange = (event: any) => {
        setItemsPerPage(event.target.value);
      };

    return (
        <div>
            <Header />
            <div className="search-container">
                <div className="back-button">
                    <a href={window.location.origin} className="home-link">
                        <span>Back to Landing page</span>
                    </a>
                </div>
                <div className="search-panel">
                    <SearchButton />
                </div>
                <div className="search-description">
                    <h6>Your search for <span className="search-term">{queryString}</span> resulted in <span className="search-term">{resultNumber}</span> hits</h6>
                </div>
                {/* <div className="search-sorting">
                    <span></span>
                    <select onChange={e => handleChange(e)} className="Button">
                        {
                            options.map((option) => {
                                return (
                                    <option key={option.key} value={option.key}>{option.value}</option>
                                )
                            })
                        }
                    </select>
                </div> */}
                <div className="result-block">
                    <div className="search-results">
                        {
                            currentItems?.map((content, idx) => {
                                return (
                                    <div className="result" key={idx}>
                                        <div className="card">
                                            <div className="round">
                                                <img className="ConditionalImage"
                                                    src={getImageUrl(content?.ArtistPhoto ?? '')}
                                                    alt={content?.ArtistName ?? ''} />
                                            </div>
                                            <div className="info">
                                                <a href={content?.RelativePath ?? ''} className="EPiLink">
                                                    <p className="result-name">{content?.ArtistName}</p>
                                                </a>
                                            </div>
                                        </div>                             
                                        <div>
                                            <p className="result-description">{content?.ArtistDescription}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="search-pagination-block">
                        <table>
                            <tr>
                                <td>
                                    <span>Items per page: </span>
                                    <select className="Button" onChange={handleItemsChange}>
                                        {
                                            itemsPerPageOptions.map((option) => {
                                                return (
                                                    <option key={option.key} value={option.key}>{option.value}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </td>
                                <td className="search-pagination">
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel=">"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={5}
                                        pageCount={pageCount}
                                        previousLabel="<"
                                        renderOnZeroPageCount={null}
                                    />
                                </td>
                            </tr>
                        </table>   
                    </div>
                </div>
            </div>
            <Footer content={null}/>
        </div>
    );
}

export default SearchPage;