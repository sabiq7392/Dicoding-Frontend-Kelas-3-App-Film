import { $, $query, $media } from "../helper/helper.js";
import { BASE_URL, IMG_URL, API_KEY, SEARCH, QUERY } from "../../config.js";
import { PageControl } from "../helper/pageControl.js";
"use strict";

class Movies {
    async get({ type, keyword }) {
        try {
            const response = await fetch(this.#url(type, keyword),{ method: "GET" });
            const responseJson = await response.json();
            const movies = responseJson.results;
            this.#render(movies, type);

        } catch (error) {
            alert(error);
        }
    }

    #url(type, keyword) {
        switch (type) {
            case "search":
                return `${BASE_URL}/${SEARCH}?${API_KEY}&${QUERY}=${keyword}`;

            case "trending":
                return `${BASE_URL}/${type}/movie/day?${API_KEY}`;

            default:
                return `${BASE_URL}/movie/${type}?${API_KEY}`;
        }
    }

    #render(movies, type) {
        if (type === "search") {
            const hide = "d-none";
            const show = null;

            PageControl.newPage({
                page: "searchPage",
                hero: hide,
                floatContainer: hide,
                searchResult: show
            });
            this.#errorNoResult({ error: movies });
        }

        movies.forEach(movie => {
            switch (type) {
                case "upcoming":
                    this.#heroSection(movie);
                    break;

                case "top_rated":
                    this.#cardSection({ 
                        container: "#topRatedMoviesContainer", 
                        movie: movie
                    });
                    break;

                case "popular":
                    this.#cardSection({
                        container: "#popularMoviesContainer", 
                        movie: movie
                    });
                    break;

                case "trending":
                    this.#cardSection({ 
                        container: "#trendingMoviesContainer", 
                        movie: movie
                    });
                    break;
                
                case "search":
                    this.#cardSection({
                        container: "#searchResultContainer", 
                        movie: movie
                    });
                    break;

                default:
                    console.log("there is no such movies like that, try upcoming, top_rated, popular, trending");
                    break;
            }
        });
    }

    #heroSection(movie) {
        let { id, backdrop_path, title, release_date, vote_average, poster_path } = movie;
        const container = $("#heroContainer");

        this.#removeMovieDontHaveImage({ image: backdrop_path });
        changeImageHeroBasedScreen({ screen: "phone" });
        render();

        function render() {
            container.innerHTML += `
                <section id="${id}" class="hero__content">
                    <div class="float">
                        <header>
                            <h1>${title}</h1>
                        </header>
                        <div class="hero__content__voting">
                            <i class="bi bi-star-fill" style="color: #f5de50;"></i> ${vote_average}
                        </div>
                        <time class="hero__content__release-date">
                            ${release_date}
                        </time>
                    </div>
                    <picture class="hero__content__image">
                        <img class="image-of-hero" src="${IMG_URL}/${backdrop_path}" alt="${title}">
                    </picture>
                </section>
            `;

            firstSlideVisitPage();
        }

        function firstSlideVisitPage() {
            $query(container.children[0]).addClass(["active"]);
        }

        function changeImageHeroBasedScreen({ screen }) {
            $media(screen) ? backdrop_path = poster_path : false;
        }
    }

    #cardSection({ container, movie }) {
        const { id, poster_path, title, vote_average } = movie;
        
        this.#removeMovieDontHaveImage({ image: poster_path });
        render();
        
        function render() {
            $(container).innerHTML += `
                <section id="${id}" class="card">
                    <picture class="card__image">
                        <img src="${IMG_URL}/${poster_path}" alt="${title}">
                    </picture>
                    <div class="card__text-box">
                        <h4>${title}</h4>
                        <span><i class="bi bi-star-fill" style="color: #f5de50;"></i> ${vote_average}</span>
                    </div>
                </section>    
            `;
        }
    }

    #removeMovieDontHaveImage({ image }) {
        if (!image) {
            console.log(`some movie dont show because dont have backdrop path`);
            return false;
        }
    }

    #errorNoResult({ error }) {
        if (error == 0 || error == null || error == undefined) {
            const searchResult = $("#searchResultWrapper");
            searchResult.innerHTML += `
                <h2>There is no result or similiar like that.</h2>
            `;
        }
    }
}

export { Movies };