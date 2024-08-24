export default function NavItem(props) {
    const { setPage, navTo, buttonText } = props;

    const handleNavigation = () => {
        setPage(navTo);
    };

    return <button onClick={handleNavigation}>{buttonText}</button>;
}
