"use strict";

class Dom {
    $(element) { return document.querySelector(element) }

    $all(element) { return document.querySelectorAll(element) }

    $query(element) {
        const query = element;
        return {
            show() {
                query.style.display = " ";
                return this;
            },

            hide() {
                query.style.display = "none";
                return this;
            },
            // == For a element & multiple class ==
            toggleClass(classlist) {
                query.classList.toggle(...classlist);
                return this;
            },
            addClass(classlist) {
                query.classList.add(...classlist);
                return this;
            },
            removeClass(classlist) {
                query.classList.remove(...classlist);
                return this;
            },
            containClass(classlist) {
                return query.classList.contains(...classlist);
            },

            // == Listerner == 
            onClick(listener, options) {
                query.addEventListener("click", listener, options);
                return this;
            },

            onHover(listener, options) {
                query.addEventListener("mouseover", listener, options);
                return this;
            },

            offHover(listener, options) {
                query.addEventListener("mouseout", listener, options);
                return this;
            },

            onFocus(listener, options) {
                query.addEventListener("focus", listener, options);
                return this;
            },

            onBlur(listener, options) {
                query.addEventListener("blur", listener, options);
                return this;
            },

            animationEnd(listener, options) {
                query.addEventListener("animationend", listener, options);
                return this;
            },

            onKeyUp(listener, options) {
                query.addEventListener("keyup", listener, options);
                return this;
            },

            onSubmit(listener, options) {
                query.addEventListener("submit", listener, options);
                return this;
            },


        }
    }

    $media(screen) {
        switch (screen) {
            case "phone":
                screen = '(max-width: 767px)';
                break;
            
            case "tablet":
                screen = '(max-width: 1023px)';
                break;

            case "desktop":
                screen = '(min-width: 1023px)';
                break;

            default:
                console.log(screen);
                break;
        }
        return window.matchMedia(screen).matches;
    }

    $window() {
        return {
            onMedia(screen) { 
                $media (screen); 
                return this; 
            },
            
            onResize(listener, options) {
                window.addEventListener("resize", listener, options);
                return this;
            }
        }
    }
}

const dom = new Dom();

const $ = (element) => { return dom.$(element) }

const $all = (element) => { return dom.$all(element) }

const $query = (element) => { return dom.$query(element) }

const $window = () => { return dom.$window() }

const $media = (screen) => { return dom.$media(screen) }
    
// const $newPage = ({ page, hero, floatContainer, searchResult }) => { 
//     return dom.$newPage(page, hero, floatContainer, searchResult);
// }

const $countObjectSize = (obj) => {
    let size = 0;
    for (let key in obj) obj.hasOwnProperty(key) ? size++ : false;
    return size;
};

export { dom, $, $query, $all, $window, $media, $countObjectSize };
