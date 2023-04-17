import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchButton from "../components/SearchButton";
import { SearchQuery, useSearchQuery } from "../generated";
import { subcribeContentSavedEvent } from "../helpers/contentSavedEvent";
import { isEditOrPreviewMode } from "../helpers/urlHelper";
import { ContentSavedMessage } from "../models/ContentSavedMessage";

let previousSavedMessage: any = null;
const singleKeyUrl = process.env.REACT_APP_CONTENT_GRAPH_GATEWAY_URL as string
const hmacKeyUrl = process.env.REACT_APP_CG_PROXY_URL as string

type SearchContainerPageProps = {
    content: any
}

function SearchPage() {
    const queryClient = useQueryClient();
    const [token, setToken] = useState("")
    let data: SearchQuery | undefined = undefined
    const [searchParams, setSearchParams] = useSearchParams();
    let queryString = searchParams.get("q")
    let variables: any = {"locales": "en", "searchParam": queryString}
    let headers = {}
    let url = singleKeyUrl
    const modeEdit = isEditOrPreviewMode()
    let resultNumber : number | undefined

    const { mutate } = useMutation((obj: any) => obj, {
        onSuccess: (message: ContentSavedMessage) => {
            if (previousSavedMessage !== message) {
                previousSavedMessage = message;
            }
        }
    });

    if (modeEdit) {
        if (token) {
            headers = { 'Authorization': 'Bearer ' + token };
        }
        url = hmacKeyUrl
        subcribeContentSavedEvent((message: any) => mutate(message))
    }

    const { data : searchQueryData } = useSearchQuery({ endpoint: url, fetchParams: { headers: headers } }, variables, { staleTime: 2000, enabled: !modeEdit || !!token });
    data = searchQueryData
    resultNumber = data?.Content?.items?.length ?? 0

    return (
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
                <h5>Your search for <span className="search-term">{queryString}</span> resulted in <span className="search-term">{resultNumber}</span> hits</h5>
            </div>
            <div className="search-results">
                {
                    data?.Content?.items?.map((content, idx) => {
                        if(content?.__typename === "ArtistDetailsPage"){
                            return (
                                <div className="result" key={idx}>
                                    <a href={content?.RelativePath ?? ''} className="EPiLink">
                                        <div className="result-name">
                                            <p>{content?.Name}</p>
                                        </div>
                                    </a>
                                    <div>
                                        <p>{content?.ArtistDescription}</p>
                                    </div>
                                </div>
                            )
                        }
                        return (
                            <div className="result" key={idx}>
                                <a href={content?.RelativePath ?? ''} className="EPiLink">
                                    <div className="result-name">
                                        <p>{content?.Name}</p>
                                    </div>
                                </a>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default SearchPage;