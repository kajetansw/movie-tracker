import { Film } from "lucide-react";

import "./Header.scss";

export const Header = () => {
  return (
    <header className="header">
      <Film size={28} />
      <h1 className="title">MovieTracker</h1>
    </header>
  );
};
