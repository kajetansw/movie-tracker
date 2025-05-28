import { Film } from "lucide-react";
import { Link } from "react-router";

import "./Header.scss";

export const Header = () => {
  return (
    <header className="header">
      <Film size={28} />
      <Link to="/">
        <h1 className="title">MovieTracker</h1>
      </Link>
    </header>
  );
};
