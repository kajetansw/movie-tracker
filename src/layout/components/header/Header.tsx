import { Film, Star } from "lucide-react";
import { Link } from "react-router";

import "./Header.scss";

export const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Film size={28} />
        <Link to="/">
          <h1 className="title">MovieTracker</h1>
        </Link>
      </div>

      <ul>
        <li className="navItem">
          <Link className="navLink" to="/favorites">
            <Star size={20} fill="#8a6bc1" />
            <span>Favorites</span>
          </Link>
        </li>
      </ul>
    </header>
  );
};
