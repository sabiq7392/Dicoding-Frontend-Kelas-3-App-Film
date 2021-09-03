import { $, $query, $media } from "../helper/helper.js";
import { css } from "../helper/cssShadow.js";
import { PageControl } from "../helper/pageControl.js";
import logoImg  from '../../img/mame-logo.svg';

"use strict";

class NavbarTop extends HTMLElement {
    constructor() {
        super();
        this.navbar = $("#navbarTop");
        this.height = $("#navbarTop").offsetHeight;
    }

    connectedCallback() {
        this.#render();
    }

    #render() {
        this.innerHTML = `
            <nav>
                <div id="wrapper" class="navbar-container">
                    <div class="logo">
                        <a href="index.html">
                            <img src="${logoImg}">
                        </a>
                    </div>
                    
                    <ul id="navbarMenuTop">
                        <li><a href="index.html" class="active">Home</a></li>
                        <li><a href="#popularMoviesSlider">Popular</a></li>
                        <li><a href="#topRatedMoviesSlider">Top Rated</a></li>
                        <li><a href="#trendingMoviesSlider">Trending</a></li>
                    </ul>

                    <button id="buttonBack" class="button-back d-none">
                        <i class="bi bi-arrow-left"></i>
                    </button>

                    <search-bar id="searchBar" class="search-bar"></search-bar>
                </div>
            </nav>
        `;
        this.#changeColor();
    }

    #changeColor() {
        window.onscroll = () => {
            if (document.body.scrollTop > this.height || document.documentElement.scrollTop > this.height) {
                this.navbar.style.background = css.colorNavbar.changed;

            } else {
                if (!$media("desktop")) {
                    this.navbar.style.background = css.colorNavbar.transparent;
                } else {
                    this.navbar.style.background = css.colorNavbar.default;
                }
            }
        }
    }

    static buttonBack({ inputSearch }) {
        const button = $("#buttonBack");
        const triggered = {
            logo: $(".logo"),
            navbarTop: $("#navbarTop"),
            input: inputSearch
        };


        $query(button).onClick(() => {
            if ($query(button).containClass(["active"])) {

                hide({ what: button });
                hide({ what: triggered.input });
                show({ what: triggered.logo });
                changeBackgroundColorNavbar();
            } 

            if (PageControl.isSearchPage()) {
                const hide = "d-none";
                const show = null;

                PageControl.newPage({
                    page: "mainPage",
                    hero: show,
                    floatContainer: show,
                    searchResult: hide
                });
            }
        });

        const show = ({ what }) => {
            $query(what)
                .removeClass(["d-none"]);
        }

        const hide = ({ what }) => {
            $query(what)
                .removeClass(["active"])
                .addClass(["d-none"]);
        }

        const changeBackgroundColorNavbar = () => {
            $query(triggered.navbarTop)
                .removeClass(["active"]);
        }
    }
}

customElements.define("navbar-top", NavbarTop);

export { NavbarTop };