import { $ } from "../helper/helper.js";
import { Slider } from "../dom/slider.js";
import { Movies } from "../fetch/fetch.js";
"use strict";

class TrendingMovies extends HTMLElement {
    connectedCallback() {
        this.#render();
    }

    #render() {
        this.innerHTML = `
            <div id="trendingMoviesSlider" class="trending-movies slider-overflow">
                <header class="trending-movies__title left-line">
                    <h1>Trending Movies</h1>
                </header>

                <div id="trendingMoviesContainer" class="trending-movies__container container">

                </div>

                <button class="button-slider button-previous"><i class="bi bi-caret-left"></i></button>
                <button class="button-slider button-next"><i class="bi bi-caret-right"></i></button>
            </div>
        `;
        this.#movies();
        this.#slider();
    }

    #movies() {
        const movies = new Movies();
        movies.get({ type: "trending" });
    }

    #slider() {
        const container = "#trendingMoviesContainer";
        const slider = new Slider({
            container: $(container),
            btnNext: $(`${container} ~ .button-next`),
            btnPrevious: $(`${container} ~ .button-previous`),
        });

        slider.do();
    }


}

customElements.define("trending-movies", TrendingMovies);