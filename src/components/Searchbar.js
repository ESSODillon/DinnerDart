import { useState } from "react";
import { useHistory } from "react-router-dom";

// Material UI
import SearchIcon from "@mui/icons-material/Search";

export default function Searchbar() {
  const [term, setTerm] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    history.push(`/search?q=${term}`);
  };

  return (
    <form onSubmit={handleSubmit} action="#" className="home__banner--search">
      <input
        type="text"
        id="search"
        className="home__banner--search__input"
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search"
        required
      />
      <button className="home__banner--search__button">
        <svg className="home__banner--search__icon">
          <SearchIcon />
        </svg>
      </button>
    </form>
  );
}
