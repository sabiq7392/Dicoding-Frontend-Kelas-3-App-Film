import { $, $all, $query, $window, $media } from "../helper/helper.js";
import { css } from "../helper/cssShadow.js";
import { NavbarTop } from "./NavbarTop.js";
import { Movies } from "../fetch/fetch.js";
"use strict";

class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
        this.hide = "d-none";
        this.show = null;
        this.triggered = {
            logo: $(".logo"),
            buttonBack: $("#buttonBack"),
            navbarTop: $("#navbarTop"),
            main: $("#main"),
            page: $("html")
        };
    }

    connectedCallback() {
        this.btnStyle = this.getAttribute("btnStyle") || null;
        this.#render();
    }

    #render() {
        this.shadowDOM.innerHTML = `
            ${css.style}
                @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')

                .container {
                    position: relative;
                    width: 300px;
                }

                .wrapper-input-search {
                    display: flex;
                    place-items: center;
                }

                input, button {
                    height: ${css.sizeSearch};
                    border: none!important;
                }

                input {
                    padding: 0 16px;
                    width: 23vw;
                    background: ${css.colorContainer};
                    outline: none;
                    color: #f8f8f8;
                    font-size: 14px;
                    font-family: 'Nunito Sans', sans-serif;
                    border-radius: ${css.sizeSearch};
                }

                ${css.media({ screen: "tablet" })}
                    input.active {
                        display: block!important;
                        width: 70vw!important;
                    }
                ${css.endMedia}

                button {
                    display: grid;
                    place-items: center;
                    background: #303030;
                    color: #f8f8f8;
                    width: ${css.sizeSearch};
                    outline: none;
                    cursor: pointer;
                    z-index: 100;
                    transition: 200ms;
                    border-radius: 50%;
                }
                
                button:hover, button:focus {
                    filter: brightness(130%);
                }

                .d-none {
                    display: none!important;
                }
            ${css.endStyle}

            ${css.html}
            <div id="container" class="container" style="background: ${css.colorContainer}; border-radius: ${css.sizeSearch};">
                <form id="formSearch" action="index.html">
                    <div class="wrapper-input-search">
                        <input id="inputSearch" type="search" placeholder="Search Movie">
                        <button id="submitSearch" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
            ${css.endHtml}
        `;
            
        const seacrhBar = {
            container: this.shadowDOM.querySelector("#container"),
            form:  this.shadowDOM.querySelector("#formSearch"),
            input: this.shadowDOM.querySelector("#inputSearch"),
            button: this.shadowDOM.querySelector("#submitSearch")
        }; 
        const { container, form, input, button,  } = seacrhBar;   

        this.#submit({
            form: form,
            input: input
        });

        this.#resize({ input: input });

        this.#click({
            input: input,
            button: button
        });

        this.#focus({
            input: input,
            container: container
        });

        this.#ruleStyleBasedScreen({ input: input });

        NavbarTop.buttonBack({ inputSearch: input });
    }

    #resize({ input }) {
        const triggered = this.triggered;

        $window().onResize(() => {
            if (!$media("desktop")) {
                if (!$query(input).containClass(["d-none"])) {
                    hide({ what: input }); 
                }

            } else {
                show({ what: input });
                show({ what: triggered.logo });
                hide({ what: triggered.buttonBack });
            }
        });

        const hide = ({ what }) => {
            $query(what)
                .addClass(["d-none"])
                .removeClass(["active"]);
        }

        const show = ({ what }) => {
            $query(what)
                .removeClass(["d-none"]);
        }
    }

    #click({ input, button }) {
        const triggered = this.triggered;

        $query(button).onClick(() => {
            if ($query(input).containClass(["d-none"])) {
                show({ what: input });
                show({ what: triggered.buttonBack });
                hide({ what: triggered.logo });
                changeBackgroundColorNavbar();
            } 
        });

        const show = ({ what }) => {
            $query(what)
                .removeClass(["d-none"])
                .addClass(["active"]);
        }

        const hide = ({ what }) => {
            $query(what)
                .addClass(["d-none"]);
        }

        const changeBackgroundColorNavbar = () => {
            $query(triggered.navbarTop)
                .addClass(["active"]);
        }
    }

    #focus({ input, container }) {
        $query(input).onFocus(() => {
            container.style.outline = "1px solid #1768AC";
        })

        $query(input).onBlur(() => {
            container.style.outline = "none";
        });
    }

    #submit({ form, input }) {
        $query(form).onSubmit((event) => {
            event.preventDefault();
            if (input.value) {
                showSearchResult({ from: input });

                this.#changeURLMenuNavbars({ 
                    navbar: "bottom",
                    url: "index.html" 
                });

                this.#changeURLMenuNavbars({
                    navbar: "top",
                    url: "index.html"
                });
            }
        });

        const showSearchResult = ({ from }) => {
            this.#movies({ keyword: from.value });
            $query(this.triggered.navbarTop).addClass(["active"]);
        }
    }

    #movies({ keyword }) {
        const movies = new Movies();
        movies.get({ 
            type: "search",
            keyword: keyword
        });
    }

    #ruleStyleBasedScreen({ input }) {
        !$media("desktop") ? $query(input).addClass(["d-none"]) : $query(input).removeClass(["d-none"]);
    }

    #changeURLMenuNavbars({ navbar, url }){
        let menus;
        navbar === "bottom" ? menus = $all("#navbarMenuBottom a") : menus = $all("#navbarMenuTop a");
        menus.forEach(menu => menu.setAttribute("href", url));
    }
}

customElements.define("search-bar", SearchBar);     