//Consts
const apikey = "eff26691c68b4a4773a35b2423dfbb75";
const apiEndpoint = "https://api.themoviedb.org/3"
const imgPath = "https://image.tmdb.org/t/p/original";



const apiPaths = {
    fetchAllcategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMoviesList: (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
}

function init(){
    fetchANdBuildAllSections();
}

function fetchANdBuildAllSections(){
    fetch(apiPaths.fetchAllcategories)
    .then(res => res.json())
    .then(res => {
        const categories = res.genres;
        if(Array.isArray(categories) && categories.length){
            categories.forEach(category => {
                fetchAndbuildMoviesection(apiPaths.fetchMoviesList(category.id), category);
            });
        }
    })
    .catch(err => console.log(err));
}

function fetchAndbuildMoviesection(fetchUrl, category){
    console.log(fetchUrl, category);
    fetch(fetchUrl)
    .then(res => res.json())
    .then(res => {
        console.log(res.results);
        const movies = res.results;
        if(Array.isArray(movies) && movies.length){
            buildMoviesSection(movies, category.name);
        }
    })
    .catch(err => console.log(err))
}

function buildMoviesSection(list, categoryName){
    console.log(list, categoryName);

    const moviesCont = document.getElementById('movies-cont');

    const moviesListHTML = list.map(item => {
        return `
        <img class="movie-item" src="${imgPath}${item.backdrop_path}" alt="${item.title}">
        `;
    }).join('');

    const moviesSectionHTML = `
        <h2 class="movies-section-heading">${categoryName} <span class="explore-nudge">Explore All</span></h2>
        <div class="movies-row">
            ${moviesListHTML}
        </div>
    `

    const div = document.createElement('div');
    div.className = "movies-section"
    div.innerHTML = moviesSectionHTML;


    moviesCont.append(div);
}

window.addEventListener('load', function() {
    init();
})