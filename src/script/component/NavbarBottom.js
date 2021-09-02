"use strict";

class NavbarBottom extends HTMLElement {
    connectedCallback() {
        this.#render();
    }
    
    #render() {
        this.innerHTML = `
            <nav>
                <ul id="navbarMenuBottom">
                    <li>
                        <a href="index.html" class="active">
                            <i class="bi bi-house"></i>
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="#popularMoviesSlider">
                            <i class="bi bi-hand-thumbs-up"></i>
                            <span>Popular</span>
                        </a>
                    </li>
                    <li>
                        <a href="#topRatedMoviesSlider">   
                            <i class="bi bi-award"></i>
                            <span>Top Rated</span>
                        </a>
                    </li>
                    <li>
                        <a href="#trendingMoviesSlider">
                            <i class="bi bi-bar-chart"></i>
                            <span>Trending</span>
                        </a>
                    </li>
                </ul>
            </nav>
        `;
    }
}

customElements.define("navbar-bottom", NavbarBottom);