import React from "react";
import { Timer, Scroll } from "phosphor-react";
function Header() {
  return (
    <header className="flex items-center justify-between">
      <span>Timer</span>
      <nav>
        <Timer size={24} />
        <Scroll size={24} />
      </nav>
    </header>
  );
}

export default Header;
