import { $ } from "../helper/helper.js";
import { Slider } from "../dom/slider.js";
import { Movies } from "../fetch/fetch.js";
"use strict";

class HeroSection extends HTMLElement {
    connectedCallback() {
        this.#render();

    }

    #render() {
        this.innerHTML = `
            <div id="heroSlider" class="hero slider-main">
                <div id="heroContainer" class="hero__container container"></div>

                <div class="vignette-effect-top-bottom"></div>
                <div class="vignette-effect-left-right"></div>

                <button class="button-slider button-previous"><i class="bi bi-caret-left"></i></button>
                <button class="button-slider button-next"><i class="bi bi-caret-right"></i></button>
            </div>
        `;
        this.#slider();
        this.#movies();
    }

    #slider() {
        const container = "#heroContainer";

        const slider = new Slider({
            container: $(container),
            btnNext: $(`${container} ~ .button-next`),
            btnPrevious: $(`${container} ~ .button-previous`)
        });

        slider.do();
    }

    #movies() {
        const movies = new Movies();
        movies.get({ type: "upcoming" });
    }
}

customElements.define("hero-section", HeroSection);