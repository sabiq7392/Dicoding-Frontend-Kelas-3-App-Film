import { $ } from "../helper/helper.js";
import { Slider } from "../dom/slider.js";
import { Movies } from "../fetch/fetch.js";
"use strict";

class PopularMovies extends HTMLElement {
    connectedCallback() {
        this.#render();
    }

    async #render() {
        this.innerHTML = `
            <div id="popularMoviesSlider" class="popular-movies slider-overflow">
                <header class="popular-movies__title left-line">
                    <h1>Popular Movies</h1>
                </header>

                <div id="popularMoviesContainer" class="popular-movies__container container"></div>

                <button class="button-slider button-previous"><i class="bi bi-caret-left"></i></button>
                <button class="button-slider button-next"><i class="bi bi-caret-right"></i></button>
            </div>
        `;
        this.#slider()
        this.#movies()
    }

    #slider() {
        const container = "#popularMoviesContainer";

        const slider = new Slider({
            container: $(container),
            btnNext: $(`${container} ~ .button-next`),
            btnPrevious: $(`${container} ~ .button-previous`)
        });

        slider.do();
    }

    #movies() {
        const movies = new Movies();
        movies.get({ type: "popular" });
    }
}

customElements.define("popular-movies", PopularMovies);