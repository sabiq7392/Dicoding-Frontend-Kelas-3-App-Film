import { $ } from "./helper.js";
"use strict";

class PageControl {
    static newPage({ page, hero, floatContainer, searchResult }){
        $("html").id = page;
    
        $("#main").innerHTML = `
            <hero-section class="${hero}"></hero-section>
    
            <div id="floatContainer" class="float-container ${floatContainer}" >
                <popular-movies></popular-movies>
                <top-rated-movies></top-rated-movies>
                <trending-movies></trending-movies>
            </div>
    
            <search-result id="searchResult" class="${searchResult}"></search-result>
        `;
    }
    
    static isSearchPage() { return $("html").getAttribute("id") == "searchPage" }
}

export { PageControl };