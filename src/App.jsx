import Nav from "./components/nav/Nav";
import MobileNav from "./components/nav/MobileNav";
import { createEffect, createSignal } from "solid-js";
import SearchPage from "./components/Search";
import MyWatchlistPage from "./components/MyWatchlist";

function App() {
    const [page, setPage] = createSignal("Search");

    return (
        <div class="drawer drawer-end">
            <input
                id="my-drawer-3"
                type="checkbox"
                class="drawer-toggle"
            />
            <div class="drawer-content flex flex-col w-screen items-center justify-center gap-10">
                <Nav setPage={setPage} />
                {/* <!-- Page content here --> */}
                {page() == "Search" && <SearchPage />}
                {page() == "MyWatchlist" && <MyWatchlistPage />}
            </div>
            <MobileNav />
        </div>
    );
}

export default App;
