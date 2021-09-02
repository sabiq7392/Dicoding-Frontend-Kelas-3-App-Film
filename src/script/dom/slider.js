import { $, $query } from "../helper/helper.js";
"use strict";

class Slider {
    constructor({ container, btnNext, btnPrevious }) {
        this.container = container;
        this.containerContents = container.children;

        this.btnNext = btnNext;
        this.btnPrevious = btnPrevious;
        // this.btnChoose = btnChoose;

        this.position = 0;
        this.count = 0;

        this.speed = 15;
    }

    do() {
        this.#buttonNext();
        this.#buttonPrevious();
    }

    #buttonNext() {

        $query(this.btnNext).onClick(() => {

            const lastContentHero = $("#heroContainer").lastElementChild;
            const lastContentHeroNotActive = !($query(lastContentHero).containClass(["active"]));
            let endPosition;

            if (this.container == $("#heroContainer") && lastContentHeroNotActive) {
                this.#contentHero("show-next");

            } else {
                endPosition = this.container.scrollWidth - this.container.offsetWidth;
                const speed = endPosition / this.speed;

                if (this.position <= endPosition) {
                    this.#moveSlide({
                        direction: "forward",
                        speed: speed
                    });
                }

                console.log(`End Position ${endPosition}`);
                console.log(this.position);
            }

            this.position > endPosition ? this.#resetPosition(endPosition) : false;
        });

        this.#animateButton({
            button: this.btnNext,
            before: "bi-caret-right",
            after: "bi-caret-right-fill"
        });
    }

    #buttonPrevious() {
        $query(this.btnPrevious).onClick(() => {
            const firstSlide = 0;
            const startPosition = 0;

            if (this.container == $("#heroContainer") && this.count > firstSlide) {
                this.#contentHero("show-previous");

            } else if (this.container != $("#heroContainer") && this.position >= startPosition) {
                const endPosition = this.container.scrollWidth - this.container.offsetWidth;
                const speed = endPosition / this.speed;

                this.#moveSlide({
                    direction: "reverse",
                    speed: speed
                });

                console.log(this.position);

            } else {
                console.log(this.container);
            }

            this.position < startPosition ? this.#resetPosition() : false;
        });

        this.#animateButton({
            button: this.btnPrevious,
            before: "bi-caret-left",
            after: "bi-caret-left-fill"
        });
    }

    #animateButton({ button, before, after }) {
        $query(button).onHover(() => {
            const icon = button.firstElementChild;
            $query(icon)
                .addClass([after])
                .removeClass([before]);
        });

        $query(button).offHover(() => {
            const icon = button.firstElementChild;
            $query(icon)
                .addClass([before])
                .removeClass([after]);
        });
    }

    #moveSlide({ direction = "forward", speed }) {
        direction == "reverse" ? this.position -= speed : this.position += speed;
        this.container.scrollTo({
            left: this.position,
            top: 0
        });
    }

    #resetPosition(reset = 0) {
        this.position = reset;
    }

    #contentHero(slide = "show-previous") {
        if (slide === "show-next") {
            this.count++;
            let nextSlide = this.count;
            let previousSlide = this.count - 1;
            let animation = slide;

            this.#processContentHero({
                show: nextSlide,
                hide: previousSlide,
                animation: animation
            });

        } else {
            this.count--;
            let nextSlide = this.count + 1;
            let previousSlide = this.count;
            let animation = slide;

            this.#processContentHero({
                show: previousSlide,
                hide: nextSlide,
                animation: animation
            });
        }
    }

    #processContentHero({ show, hide, animation }) {
        $query(this.containerContents[show])
            .addClass(["active", animation]);

        $query(this.containerContents[hide])
            .removeClass(["active", "show-next", "show-previous"]);
    }
}

export { Slider };