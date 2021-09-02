import { $, $query } from "../helper/helper.js"
import { PageControl } from "../helper/pageControl.js";
"use strict";

class SearchResult extends HTMLElement {
    connectedCallback() {
        this.#render();
    }

    #render() {
        this.innerHTML = `
            <div id="searchResultWrapper" class="search-result-wrapper">
                <header>
                    <h1>Search Result :</h1>
                    <button id="buttonCloseSearchResult" class="button-close"><i class="bi bi-x-lg"></i></button>
                </header>

                <div id="searchResultContainer" class="container"></div>
            </div>
        `;

        this.#buttonClose();
    }

    #buttonClose() {
        const button = $("#buttonCloseSearchResult");
        const hide = "d-none";
        const show = null;

        $query(button).onClick(() => {
            PageControl.newPage({
                page: "mainPage",
                hero: show,
                floatContainer: show,
                searchResult: hide
            });
        });
    }

}

customElements.define("search-result", SearchResult);