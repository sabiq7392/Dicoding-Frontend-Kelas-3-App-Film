import { $, $query, $media } from "../helper/helper.js";
import { css } from "../helper/cssShadow.js";
import { PageControl } from "../helper/pageControl.js";

"use strict";

class NavbarTop extends HTMLElement {
    constructor() {
        super();
        this.navbar = $("#navbarTop");
        this.height = $("#navbarTop").offsetHeight;
        this.src = this.getAttribute("src") || null;
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
                            <svg viewBox="0 0 137 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M33.624 0.879997V34H30.264V7.552L18.456 34H16.008L4.2 7.648V34H0.84V0.879997H4.392L17.208 29.584L30.024 0.879997H33.624ZM60.6863 26.032H45.4223L42.4943 34H38.9423L51.1823 0.879997H54.9743L67.1663 34H63.6143L60.6863 26.032ZM59.6783 23.248L53.0543 5.104L46.4303 23.248H59.6783ZM109.855 0.303999V34H101.647V13.792L94.1108 34H87.4868L79.9028 13.744V34H71.6948V0.303999H81.3907L90.8468 23.632L100.207 0.303999H109.855ZM123.965 6.88V13.696H134.957V20.032H123.965V27.424H136.397V34H115.757V0.303999H136.397V6.88H123.965Z" fill="#00A8CC"/>
                            </svg>
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
        const hide = "d-none";
        const show = null;

        $query(button).onClick(() => {
            if ($query(button).containClass(["active"])) {
                $query(button)
                    .removeClass(["active"])
                    .addClass(["d-none"]);

                $query(triggered.logo)
                    .removeClass(["d-none"]);

                $query(triggered.navbarTop)
                    .removeClass(["active"]);

                $query(triggered.input)
                    .removeClass(["active"])
                    .addClass(["d-none"]);
            } 

            if (PageControl.isSearchPage()) {
                PageControl.newPage({
                    page: "mainPage",
                    hero: show,
                    floatContainer: show,
                    searchResult: hide
                });
            }
        });
    }
}

customElements.define("navbar-top", NavbarTop);

export { NavbarTop };