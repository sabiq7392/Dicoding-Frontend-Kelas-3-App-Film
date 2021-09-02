import { $ } from "../helper/helper.js";
import { Slider } from "../dom/slider.js";
import { Movies } from "../fetch/fetch.js";
"use strict";

class TopRatedMovies extends HTMLElement {
    connectedCallback() {
        this.#render();

    }

    #render() {
        this.innerHTML = `
            <div id="topRatedMoviesSlider" class="top-rated-movies slider-overflow">
                <header class="top-rated-movies__title left-line">
                    <h1>Top Rated Movies</h1>
                </header>
                
                <div id="topRatedMoviesContainer" class="top-rated-movies__container container"></div>
                
                <button class="button-slider button-previous"><i class="bi bi-caret-left"></i></button>
                <button class="button-slider button-next"><i class="bi bi-caret-right"></i></button>
            </div>
        `;
        this.#slider();
        this.#movies();
    }

    #slider() {
        const container = "#topRatedMoviesContainer";

        const slider = new Slider({
            container: $(container),
            btnNext: $(`${container} ~ .button-next`),
            btnPrevious: $(`${container} ~ .button-previous`)
        });

        slider.do();
    }

    #movies() {
        const movies = new Movies();
        movies.get({ type: "top_rated" });
    }
}

customElements.define("top-rated-movies", TopRatedMovies);


