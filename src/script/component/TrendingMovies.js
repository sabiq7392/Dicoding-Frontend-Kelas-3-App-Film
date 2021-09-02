import { $ } from "../helper/helper.js";
import { Slider } from "../dom/slider.js";
import { Movies } from "../fetch/fetch.js";
import { PageControl } from "../helper/pageControl.js";
"use strict";

class TrendingMovies extends HTMLElement {
    connectedCallback() {
        this.#render();
    }

    #render() {
        this.innerHTML = PageControl.renderContainerSlider({
            title: "Trending Movies",
            header: "trending-movies__title",
            slider: {
                itID: "trendingMoviesSlider",
                itClass: "trending-movies"
            },
            container: {
                itID: "trendingMoviesContainer",
                itClass: "trending-movies__container"
            }
        });
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