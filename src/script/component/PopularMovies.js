import { $ } from "../helper/helper.js";
import { Slider } from "../dom/slider.js";
import { Movies } from "../fetch/fetch.js";
import { PageControl } from "../helper/pageControl.js";
"use strict";

class PopularMovies extends HTMLElement {
    connectedCallback() {
        this.#render();
    }

    async #render() {
        this.innerHTML = PageControl.renderContainerSlider({
            title: "Popular Movies",
            header: "popular-movies__title",
            slider: {
                itID: "popularMoviesSlider",
                itClass: "popular-movies"
            },
            container: {
                itID: "popularMoviesContainer",
                itClass: "popular-movies__container"
            }
        })
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