import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type CustomString = string | number | readonly string[] | undefined

function SearchButton(): JSX.Element {
    const [searchParams] = useSearchParams()
    const [searchValue, setSearchValue] = useState<CustomString>(searchParams.get("q")?.toString())
    
    function search(event: any, action: string){
        if ((action == "keypress" && event.charCode === 13) || action == "buttonclick") {
            window.location.href = `${window.location.origin}/search?q=${searchValue}`
        }
    }

    function onValueChange(event: any){
        setSearchValue(event.target.value);
    }

    return (
        <div>
            <div className="nav-table-cell">
                <input className="search-input" type="text" id="search-input" placeholder="Search for Artists" 
                    onKeyPress={(event) => {search(event, 'keypress')}} value={searchValue} onChange={onValueChange} />
            </div>
            <div className="nav-table-cell">
                <button className="Button search-button" onClick={(event) => {search(event, 'buttonclick')}}><i className="fa fa-search"></i></button>
            </div>
        </div>
    );
}

export default SearchButton;