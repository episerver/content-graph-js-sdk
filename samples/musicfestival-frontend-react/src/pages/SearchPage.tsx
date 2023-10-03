import { memo, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchButton from "../components/SearchButton";
import {
    ArtistAutocompleteQuery,
    ArtistSearchQuery,
    OtherContentSearchQuery,
    useArtistAutocompleteQuery,
    useArtistSearchQuery,
    useOtherContentSearchQuery
} from "../generated";
import { generateGQLSearchQueryVars, updateSearchQueryCache } from "../helpers/queryCacheHelper";
import {getImageUrl, getRankingFromSearchParams, isEditOrPreviewMode} from "../helpers/urlHelper";
import ReactPaginate from 'react-paginate';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContentSavedMessage } from "../models/ContentSavedMessage";
import authService from "../authService";
import { subcribeContentSavedEvent } from "../helpers/contentSavedEvent";

let previousSavedMessage: any = null;
const singleKeyUrl = process.env.REACT_APP_CONTENT_GRAPH_GATEWAY_URL as string
const hmacKeyUrl = process.env.REACT_APP_CG_CONTENT_URL as string

function SearchPage() {
    console.log("Start")
    const queryClient = useQueryClient()
    const ARTIST = "Artist"
    const OTHERCONTENT = "OtherContent"

    const [token, setToken] = useState("")
    const [itemOffset, setItemOffset] = useState(0)
    const [otherItemOffset, setOtherItemOffset] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [otherItemsPerPage, setOtherItemsPerPage] = useState(10)
    const [orderBy, setOrderBy] = useState("ASC")
    const [searchParams] = useSearchParams()
    const endOffset = itemOffset + itemsPerPage
    const endOffsetOther = otherItemOffset + otherItemsPerPage
    const modeEdit = isEditOrPreviewMode()
    let queryString = searchParams.get("q") ?? ""
    let filterQueryString = searchParams.get("f") ?? ""
    const [filterBy, setFilterBy] = useState(filterQueryString ?? ARTIST)
    const ranking = getRankingFromSearchParams(searchParams);
    
    let artistData: ArtistSearchQuery | undefined = undefined
    let otherData: OtherContentSearchQuery | undefined = undefined
    let autocompleteData : ArtistAutocompleteQuery | undefined = undefined
    let resultNumber : number
    let otherResultNumber : number
    let variables: any
    let options: string[] = ["ASC", "DESC"]
    let itemsPerPageOptions: number[] = [10, 15]
    let filterByOption: {value: string; key: string}[] = [
        {value: "Artists", key: "Artist"},
        {value: "Other Content", key: "OtherContent"}
    ]
    
    let headers = {}
    let url = singleKeyUrl

    const { mutate } = useMutation((obj: any) => obj, {
        onSuccess: (message: ContentSavedMessage) => {
            if (previousSavedMessage !== message) {
                previousSavedMessage = message;
                updateSearchQueryCache(queryClient, artistData, variables, message)
            }
        }
    })

    useEffect(() => {
        authService.getAccessToken().then((_token) => {
            _token && setToken(_token)
            modeEdit && !_token && !artistData && authService.login()
        })
    }, [])

    if (modeEdit) {
        if (token) {
            headers = { 'Authorization': 'Bearer ' + token }
        }
        url = hmacKeyUrl
        subcribeContentSavedEvent((message: any) => mutate(message))
    }

    variables = generateGQLSearchQueryVars(token, window.location.pathname, queryString, orderBy, ranking)

    const { data : searchQueryData } = useArtistSearchQuery({ endpoint: url, fetchParams: { headers: headers } }, variables, { staleTime: 2000, enabled: !modeEdit || !!token })
    artistData = searchQueryData
    resultNumber = artistData?.ArtistDetailsPage?.items?.length ?? 0
    const currentItems = artistData?.ArtistDetailsPage?.items?.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(resultNumber / itemsPerPage)

    const { data : otherContentSearchQueryData } = useOtherContentSearchQuery({ endpoint: url, fetchParams: { headers: headers } }, variables, { staleTime: 2000, enabled: !modeEdit || !!token })
    otherData = otherContentSearchQueryData
    otherResultNumber = otherData?.Content?.items?.length ?? 0
    const currentOtherItems = otherData?.Content?.items?.slice(otherItemOffset, endOffsetOther)
    const pageOtherCount = Math.ceil(otherResultNumber / itemsPerPage)

    const { data : artistAutocompleteData } = useArtistAutocompleteQuery({ endpoint: url, fetchParams: { headers: headers } }, variables, { staleTime: 2000, enabled: !modeEdit || !!token })
    autocompleteData = artistAutocompleteData

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % resultNumber
        setItemOffset(newOffset)
    }

    const handleItemsChange = (event: any) => {
        setItemsPerPage(event.target.value)
    }

    const handleOtherPageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % otherResultNumber
        setOtherItemOffset(newOffset)
    }

    const handleOtherItemsChange = (event: any) => {
        setOtherItemsPerPage(event.target.value)
    }

    const handleChange = (event: any) => {
        setOrderBy(event.target.value)
    }

    const handleFacetClick = (event: any) => {
        window.location.href = `${window.location.origin}/search?q=${event.target.innerText}&f=${filterBy}&r=${ranking}`
    }

    const handleFilterByChange = (event : any) => {
        setFilterBy(event.target.value)
        //setOtherItemsPerPage(event.target.value)
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
                        <SearchButton filterValue={filterBy}/>
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
                                            <a onClick={(event) => handleFacetClick(event)}>
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
                                            <a onClick={(event) => handleFacetClick(event)}>
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
                                    options.map((value, idx) => {
                                        return (
                                            <option key={idx} value={value}>{value}</option>
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
                                        autocompleteData?.ArtistDetailsPage?.autocomplete?.ArtistName?.map((name, idx) => {
                                            return (
                                                <div key={idx}>
                                                    <a onClick={(event) => handleFacetClick(event)}>
                                                        <i>{name}</i>
                                                    </a>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        autocompleteData?.ArtistDetailsPage?.autocomplete?.StageName?.map((name, idx) => {
                                            return (
                                                <div key={idx}>
                                                    <a onClick={(event) => handleFacetClick(event)}>
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
                                                        itemsPerPageOptions.map((option, idx) => {
                                                            return (
                                                                <option key={idx} value={option}>{option}</option>
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
                                                        itemsPerPageOptions.map((option, idx) => {
                                                            return (
                                                                <option key={idx} value={option}>{option}</option>
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

export default memo(SearchPage);