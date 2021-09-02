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

    static renderContainerSlider({ title, header, slider, container }) {
        return `
            <div id="${slider.itID}" class="slider-overflow ${slider.itClass}">
                <header class="${header}">
                    <h1>${title}</h1>
                </header>

                <div id="${container.itID}" class="container ${container.itClass}"></div>

                <button class="button-slider button-previous"><i class="bi bi-caret-left"></i></button>
                <button class="button-slider button-next"><i class="bi bi-caret-right"></i></button>
            </div>
        `;
    }
}

export { PageControl };