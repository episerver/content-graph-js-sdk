import SearchPage from "../pages/SearchPage";

function SearchButton() {
    let searchValue: string;

    function search(event: any){
        if (event.charCode === 13) {
            window.location.href = `${window.location.origin}/search?q=${searchValue}`
        }      
    }

    function onValueChange(event: any){
        searchValue = event.target.value;
    }

    return (
        <input className="Button search-button search-input" type="text" id="search-input" placeholder="Search" 
            onKeyPress={search} onChange={onValueChange}/>
    );
}

export default SearchButton;