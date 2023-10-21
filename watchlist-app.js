'use strict';
const searchBtn = document.getElementById('movie-search-btn')
const searchInput = document.getElementById('movie-search-bar')
const searchForm = document.getElementById('search-form')
const searchResultsEl = document.querySelector('.movie-search-results')
let watchlist = []
const navWatchlistBtn = document.getElementById('nav-my-watchlist-btn')
const navSearchBtn = document.getElementById('nav-search-btn')
const mainBody = document.querySelector('.main-body')

// Movie search
searchBtn.addEventListener('click', () => {
    let searched = searchInput.value.replaceAll(" ", "+")
    searchInput.value = ''
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searched}&api_key=7e0735916a1421eb781167e4fab6b93c`)
        .then(res => {
            // Error check
            if (!res.ok) {
                throw Error('Error has ocurred')
            }
            return res.json()})
        .then(data => {
                let searchResults = ''
                data.results.forEach(item => {
                    // Shows movies with posters only
                    if (item.poster_path){
                        searchResults += `
                        <div class='search-result-item'>
                                 <span><img src='https://image.tmdb.org/t/p/w500/${item.poster_path}' class='movie-poster'/></span>
                                 <span class='search-result-details'>
                                     <h2>${item.title}</h2>
                                     <p class='movie-overview'>${item.overview}</p>
                                     <p>Released: ${item.release_date}</p>
                                     <button data-movieid='${item.id}' class='add2watchlist-btn'>+ Watchlist</button>
                                 </span>
                         </div>
                        `
                    }
                })
                if (searchResults) searchResultsEl.innerHTML = searchResults
                else {
                    throw Error('No results found')
                }
        })
        .catch(err => {
            searchResultsEl.innerHTML = `
            <h2>No movies found</h2>
            `
        })
})

document.addEventListener('click', (e)=> {
    if (e.target.dataset.movieid) {
        if (localStorage.getItem("watchlist")) {
            watchlist = localStorage.getItem('watchlist').slice(1, -1).split(' ')
            console.log(watchlist)
            watchlist.push(e.target.dataset.movieid)
            localStorage.setItem("watchlist", JSON.stringify(watchlist.map(item => {return item}).join(' ')))
        } else {
            watchlist.push(e.target.dataset.movieid)
            localStorage.setItem("watchlist", JSON.stringify(watchlist.map(item => {return item}).join(' ')))
        }
    }
})

navWatchlistBtn.addEventListener('click', ()=> {
    if (localStorage.getItem("watchlist")) {
        const stringFromLocalStr = localStorage.getItem('watchlist').slice(1, -1)
        const watchlistArray = stringFromLocalStr.split(' ')
        let watchlistHTML = ``
        mainBody.innerHTML = `<div class="movie-search-results" id='watchlist-results-list'></div>`
        watchlistArray.forEach(watchlistIDs => {
            fetch(`https://api.themoviedb.org/3/movie/${watchlistIDs}?&api_key=7e0735916a1421eb781167e4fab6b93c`)
                .then(res => res.json())
                .then(data => {
                    watchlistHTML +=`
                    <div class='search-result-item'>
                        <span><img src='https://image.tmdb.org/t/p/w500/${data.poster_path}' class='movie-poster'/></span>
                            <span class='movie-details'>
                                <h1>${data.title}</h1>
                                <p>${data.overview}</p>
                                <p>${data.release_date}</p>
                            </span>
                    </div>`
                })
                .then( ()=> {
                    document.querySelector('.movie-search-results').innerHTML = watchlistHTML
                })
        })
        let clearWatchlistBtn = document.createElement('button')
        clearWatchlistBtn.textContent = 'X - Clear Watchlist'
        clearWatchlistBtn.className = 'clear-watchlist-btn'
        clearWatchlistBtn.addEventListener('click', ()=> {
            localStorage.clear()
            document.querySelector('.movie-search-results').innerHTML = ''
        })
        mainBody.prepend(clearWatchlistBtn)
    } else {
        window.alert('You have no added any movies to your watchlist!')
    }
})

navSearchBtn.addEventListener('click', ()=> location.reload())