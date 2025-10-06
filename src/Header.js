import Logo from "./Logo";

function Header({ query, setQuery, totalResults, children }) {
  return (
    <header className="header border--rounded">
      <Logo />
      {children}
      <p className="header__search-result">
        Found <strong>{totalResults}</strong> results
      </p>
    </header>
  );
}

export default Header;
