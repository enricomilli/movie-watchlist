import NavItem from "./NavItem";

export default function Nav(props) {
    const { setPage } = props;

    return (
        <div class="navbar bg-base-300 w-full">
            <div class="mx-2 flex-1 px-2">PureWatchlist</div>
            <div class="hidden flex-none lg:block">
                <ul class="menu menu-horizontal gap-3">
                    {/* <!-- Navbar menu content here --> */}
                    <li>
                        <NavItem
                            buttonText="Search"
                            navTo="Search"
                            setPage={setPage}
                        />
                    </li>
                    <li>
                        <NavItem
                            buttonText="My Watchlist"
                            navTo="MyWatchlist"
                            setPage={setPage}
                        />
                    </li>
                </ul>
            </div>
            <div class="flex-none lg:hidden">
                <label
                    for="my-drawer-3"
                    aria-label="open sidebar"
                    class="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="inline-block h-6 w-6 stroke-current">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </label>
            </div>
        </div>
    );
}
