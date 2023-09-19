import {useEffect, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {ArtistAutocompleteQuery, Ranking, useArtistAutocompleteQuery} from "../generated";
import {generateGQLSearchQueryVars} from "../helpers/queryCacheHelper";
import {isEditOrPreviewMode} from "../helpers/urlHelper";
import {capitalize} from "../helpers/string.utils";

type CustomString = string | number | readonly string[] | undefined

function SearchButton({filterValue}: any): JSX.Element {
    const isFirstLoad = useRef(true);
    const singleKeyUrl = process.env.REACT_APP_CONTENT_GRAPH_GATEWAY_URL as string
    const ARTIST = "Artist"
    const [searchParams] = useSearchParams()
    const [token, setToken] = useState("")
    const [isShown, setIsShown] = useState(false)
    const [searchValue, setSearchValue] = useState<CustomString>(searchParams.get("q")?.toString() ?? "")
    const [ranking, setRanking] = useState<Ranking>(Ranking[capitalize(searchParams.get("r")?.toString().toLowerCase() || "") as keyof typeof Ranking] || Ranking.Relevance)
    const [orderBy] = useState("ASC")
    let autocompleteData: ArtistAutocompleteQuery | undefined = undefined

    let modeEdit = isEditOrPreviewMode()
    let variables = generateGQLSearchQueryVars(token, window.location.pathname, searchValue as string | null, orderBy, ranking);
    const {data: artistAutocompleteData} = useArtistAutocompleteQuery({endpoint: singleKeyUrl}, variables, {
        staleTime: 2000,
        enabled: !modeEdit || !!token
    })
    autocompleteData = artistAutocompleteData

    const onSearch = (event: any) => {
        window.location.href = `${window.location.origin}/search?q=${searchValue}&f=${filterValue ?? ARTIST}&r=${ranking}`;
    }

    const onPressSearch = (event: any) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            onSearch(event);
        }
    }

    const onValueChange = (event: any) => {
        setSearchValue(event.target.value);
        event.target.value !== undefined ? setIsShown(true) : setIsShown(false);
    }

    const onAutoClick = (event: any) => {
        setSearchValue(event.target.textContent);
        window.location.href = `${window.location.origin}/search?q=${event.target.textContent}&f=${filterValue ?? ARTIST}&r=${ranking}`;
    }

    const onChangeSearchType = (event: any) => {
        if (event.target.checked) {
            setRanking(Ranking.Semantic);
        } else {
            setRanking(Ranking.Relevance);
        }
    }

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
        } else {
            if (searchValue) {
                window.location.href = `${window.location.origin}/search?q=${searchValue}&f=${filterValue ?? ARTIST}&r=${ranking}`;
            }
        }
    }, [ranking]);

    return (
        <div className="d-flex Grid--alignMiddle">
            <div className="nav-table-cell autocomplete me-3">
                <input className="search-input"
                       type="text"
                       id="search-input"
                       placeholder="Search"
                       onKeyUp={onPressSearch}
                       value={searchValue}
                       onChange={onValueChange}
                       onFocus={() => setIsShown(true)}
                       onBlur={() =>
                           setTimeout(() => {
                               setIsShown(false);
                           }, 150)
                       }/>
                <a className="search-icon" onClick={onSearch}>
                    <i className="fa fa-search"></i>
                </a>
                <div className="autocomplete-block" style={isShown ? {display: "inherit"} : {display: "none"}}>
                    {
                        autocompleteData?.ArtistDetailsPage?.autocomplete?.ArtistName?.map((name, idx) => {
                            return (
                                <div key={idx} onClick={onAutoClick}>{name}</div>
                            )
                        })
                    }
                    {
                        autocompleteData?.ArtistDetailsPage?.autocomplete?.StageName?.map((name, idx) => {
                            return (
                                <div key={idx} onClick={onAutoClick}>{name}</div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <div className="switch_box">
                    <input type="checkbox" className="switch_input" onChange={onChangeSearchType}
                           checked={ranking === Ranking.Semantic}></input>
                    <label className="fw-semibold mb-0 ms-2">Neural Search</label>
                </div>
            </div>
        </div>
    );
}

export default SearchButton;