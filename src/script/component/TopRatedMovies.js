import { $ } from "../helper/helper.js";
import { Slider } from "../dom/slider.js";
import { Movies } from "../fetch/fetch.js";
import { PageControl } from "../helper/pageControl.js";
"use strict";

class TopRatedMovies extends HTMLElement {
    connectedCallback() {
        this.#render();

    }

    #render() {
        this.innerHTML = PageControl.renderContainerSlider({
            title: "Top Rated Movies",
            header: "top-rated-movies__title",
            slider: {
                itID: "topRatedMoviesSlider",
                itClass: "top-rated-movies"
            },
            container: {
                itID: "topRatedMoviesContainer",
                itClass: "top-rated-movies__container"
            }
        });
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


