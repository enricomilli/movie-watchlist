import { createSignal, createResource, Show, For } from "solid-js";

const API_KEY = import.meta.env.VITE_MOVIE_DB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const fetchMovies = async (query) => {
    if (!query) return null;
    const response = await fetch(
        `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch movies");
    return response.json();
};

export default function SearchPage() {
    const [searchInput, setSearchInput] = createSignal("");
    const [movies, { refetch }] = createResource(searchInput, fetchMovies);

    const handleSearch = (event) => {
        event.preventDefault();
        refetch();
    };

    return (
        <div class="w-full h-full p-4">
            <div class="mx-auto flex flex-col justify-center items-center">
                <h1 class="text-3xl font-bold text-center mb-8">
                    Find any title and add to your watchlist!
                </h1>
                <form
                    onSubmit={handleSearch}
                    class="form-control max-w-4xl ">
                    <div class="input-group flex flex-row gap-2 w-full">
                        <input
                            type="search"
                            placeholder="Search for a movie"
                            class="input input-bordered w-full"
                            value={searchInput()}
                            onInput={(e) => setSearchInput(e.currentTarget.value)}
                        />
                        <button
                            type="submit"
                            class="btn btn-square">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </form>

                <div class="mt-8">
                    <Show when={movies.loading}>
                        <div class="flex justify-center">
                            <span class="loading loading-spinner loading-lg"></span>
                        </div>
                    </Show>
                    <Show when={movies.error}>
                        <div class="alert alert-error">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="stroke-current shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{movies.error.message}</span>
                        </div>
                    </Show>
                    <Show when={movies() && movies().results.length === 0}>
                        <div class="alert alert-info">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                class="stroke-current shrink-0 w-6 h-6">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>No movies found</span>
                        </div>
                    </Show>
                    <For each={movies()?.results.filter((movie) => movie.poster_path)}>
                        {(movie) => (
                            <div class="card lg:card-side bg-base-100 shadow-xl mb-6">
                                <figure class="lg:w-1/3">
                                    <img
                                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                                        alt={movie.title}
                                        class="h-full w-full object-cover"
                                    />
                                </figure>
                                <div class="card-body lg:w-2/3">
                                    <h2 class="card-title">{movie.title}</h2>
                                    <p class="line-clamp-3">{movie.overview}</p>
                                    <p class="text-sm opacity-70">Released: {movie.release_date}</p>
                                    <div class="card-actions justify-end">
                                        <button
                                            class="btn btn-primary"
                                            onClick={() => {
                                                /* Add to watchlist logic */
                                            }}>
                                            + Watchlist
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </For>
                </div>
            </div>
        </div>
    );
}
