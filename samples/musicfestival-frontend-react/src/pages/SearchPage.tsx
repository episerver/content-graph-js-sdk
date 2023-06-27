import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchButton from "../components/SearchButton";
import { ArtistAutocompleteQuery, ArtistSearchQuery, OtherContentSearchQuery, useArtistAutocompleteQuery, useArtistSearchQuery, useOtherContentSearchQuery } from "../generated";
import { generateGQLSearchQueryVars } from "../helpers/queryCacheHelper";
import { getImageUrl, isEditOrPreviewMode } from "../helpers/urlHelper";
import ReactPaginate from 'react-paginate';

function SearchPage() {
    const singleKeyUrl = process.env.REACT_APP_CONTENT_GRAPH_GATEWAY_URL as string
    const ARTIST = "Artist"
    const OTHERCONTENT = "OtherContent"
    const options: {value: string; key: string}[] = [
        {value: "ASC", key: "ASC"},
        {value: "DESC", key: "DESC"}
    ]
    const itemsPerPageOptions: {value: number; key: string}[] = [
        {value: 10, key: "10"},
        {value: 15, key: "15"}
    ]
    const filterByOption: {value: string; key: string}[] = [
        {value: "Artists", key: ARTIST},
        {value: "Other Content", key: OTHERCONTENT}
    ]

    const [token, setToken] = useState("")
    const [itemOffset, setItemOffset] = useState(0)
    const [otherItemOffset, setOtherItemOffset] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [otherItemsPerPage, setOtherItemsPerPage] = useState(10)
    const [orderBy, setOrderBy] = useState("ASC")
    const [searchParams] = useSearchParams()
    let queryString = searchParams.get("q") ?? ""
    let filterQueryString = searchParams.get("f") ?? ""
    const [filterBy, setFilterBy] = useState(filterQueryString ?? ARTIST)
    
    let artistData: ArtistSearchQuery | undefined = undefined
    let otherData: OtherContentSearchQuery | undefined = undefined
    let autocompleteData : ArtistAutocompleteQuery | undefined = undefined
    let resultNumber : number
    let otherResultNumber : number
    
    let modeEdit = isEditOrPreviewMode()
    let variables = generateGQLSearchQueryVars(token, window.location.pathname, queryString, orderBy);
    let endOffset = itemOffset + itemsPerPage
    let endOffsetOther = otherItemOffset + otherItemsPerPage

    const { data : searchQueryData } = useArtistSearchQuery({ endpoint: singleKeyUrl }, variables, { staleTime: 2000, enabled: !modeEdit || !!token });
    artistData = searchQueryData
    resultNumber = artistData?.ArtistDetailsPage?.items?.length ?? 0
    const currentItems = artistData?.ArtistDetailsPage?.items?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(resultNumber / itemsPerPage);

    const { data : otherContentSearchQueryData } = useOtherContentSearchQuery({ endpoint: singleKeyUrl }, variables, { staleTime: 2000, enabled: !modeEdit || !!token });
    otherData = otherContentSearchQueryData
    otherResultNumber = otherData?.Content?.items?.length ?? 0
    const currentOtherItems = otherData?.Content?.items?.slice(otherItemOffset, endOffsetOther);
    const pageOtherCount = Math.ceil(otherResultNumber / itemsPerPage);

    const { data : artistAutocompleteData } = useArtistAutocompleteQuery({ endpoint: singleKeyUrl }, variables, { staleTime: 2000, enabled: !modeEdit || !!token })
    autocompleteData = artistAutocompleteData

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % resultNumber;
        setItemOffset(newOffset);
    };

    const handleItemsChange = (event: any) => {
        setItemsPerPage(event.target.value);
    };

    const handleOtherPageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % otherResultNumber;
        setOtherItemOffset(newOffset);
    };

    const handleOtherItemsChange = (event: any) => {
        setOtherItemsPerPage(event.target.value);
    };

    const handleFilterByChange = (event : any) => {
        setFilterBy(event.target.value)
    };

    const handleChange = (event: any) => {
        setOrderBy(event.target.value);
    }

    const handleFacetClick = (event: any) => {
        window.location.href = `${window.location.origin}/search?q=${event.target.innerText}&f=${filterBy}`
    }

    return (
        <div>
            <Header />
            <div className="search-container">
                <div className="back-button">
                    <a href={window.location.origin} className="home-link">
                        <span>Back to Landing page</span>
                    </a>
                </div>
                <div className="search-zone">
                    <div style={{float: "left"}}>
                        <SearchButton />
                    </div>
                    <div style={{float: "right"}}>
                        <span>Search by: </span>
                        <select value={filterBy} className="Button" onChange={handleFilterByChange}>
                            {
                                filterByOption.map((option) => {
                                    return (
                                        <option key={option.key} value={option.key}>{option.value}</option>
                                    )
                                })
                            }
                        </select>
                        {/* <FilterByButton onHandleFilterByChange={handleFilterByChange}/> */}
                    </div>
                </div>
                <div className="search-panel">
                    <div className="left-panel">
                        <b>Filter by: </b>
                        <div className="facets" style={filterBy == ARTIST ? {display: "inherit"}: {display: "none"}}>
                            <b>Artist Name: </b>
                            {
                                artistData?.ArtistDetailsPage?.facets?.ArtistName?.map((artist, idx) => {
                                    return (
                                        <div key={idx} className="facet-item">
                                            <a key={artist?.name} onClick={(event) => handleFacetClick(event)}>
                                                <span>{artist?.name}</span>                                                                         
                                            </a>
                                            <b>{artist?.count}</b>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="facets" style={filterBy == ARTIST ? {display: "inherit"}: {display: "none"}}>
                            <b>Stage Name: </b>
                            {
                                artistData?.ArtistDetailsPage?.facets?.StageName?.map((artist, idx) => {
                                    return (
                                        <div key={idx} className="facet-item">
                                            <a key={artist?.name} onClick={(event) => handleFacetClick(event)}>
                                                <span>{artist?.name}</span>                                            
                                            </a>
                                            <b>{artist?.count}</b>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="facets" style={filterBy == OTHERCONTENT ? {display: "inherit"}: {display: "none"}}>
                            <b>Content: </b>
                            {
                                otherData?.Content?.facets?.Name?.map((content, idx) => {
                                    return (
                                        <div key={idx} className="facet-item">
                                            <a key={content?.name} onClick={(event) => handleFacetClick(event)}>
                                                <span>{content?.name}</span>
                                            </a>
                                            <b>{content?.count}</b>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="right-panel">
                        <div className="search-description">
                            <h6>Your search for <span className="search-term">{queryString}</span> resulted in <span className="search-term">{filterBy == ARTIST ? resultNumber : otherResultNumber}</span> hits</h6>                            
                        </div>
                        <div className="search-sorting">
                            <span>Sort: </span>
                            <select onChange={e => handleChange(e)} className="Button">
                                {
                                    options.map((option) => {
                                        return (
                                            <option key={option.key} value={option.key}>{option.value}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="result-block">
                            <div style={filterBy == ARTIST ? {display: "initial"}: {display: "none"}}>
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
                                <div className="search-description">
                                    <h6>People also search for: </h6>
                                    <br></br>
                                    {
                                        autocompleteData?.ArtistDetailsPage?.autocomplete?.ArtistName?.map((name) => {
                                            return (
                                                <div>
                                                    <a key={name} onClick={(event) => handleFacetClick(event)}>                                                    
                                                        <i>{name}</i>
                                                    </a>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        autocompleteData?.ArtistDetailsPage?.autocomplete?.StageName?.map((name) => {
                                            return (
                                                <div>
                                                    <a key={name} onClick={(event) => handleFacetClick(event)}>                                                    
                                                        <i>{name}</i>
                                                    </a>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="search-pagination-block">
                                    <table>
                                        <tbody>
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
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div style={filterBy == OTHERCONTENT ? {display: "initial"}: {display: "none"}}>
                                <div className="search-results">
                                    {
                                        currentOtherItems?.map((content, idx) => {
                                            return (
                                                <div className="result" key={idx}>
                                                    <div className="card">
                                                        <i className="fa fa-file"></i>
                                                        &nbsp;
                                                        <div className="info">
                                                            <a href={content?.RelativePath ?? ''} className="EPiLink">
                                                                <p className="result-name">{content?.Name}</p>
                                                            </a>
                                                        </div>
                                                    </div>                             
                                                    <div>
                                                        <p className="result-description">{content?.RelativePath}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="search-pagination-block">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <span>Items per page: </span>
                                                <select className="Button" onChange={handleOtherItemsChange}>
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
                                                    onPageChange={handleOtherPageClick}
                                                    pageRangeDisplayed={5}
                                                    pageCount={pageOtherCount}
                                                    previousLabel="<"
                                                    renderOnZeroPageCount={null}
                                                />
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer content={null}/>
            </div>
        </div>
    );
}

export default SearchPage;