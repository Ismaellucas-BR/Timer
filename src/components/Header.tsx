import React from "react";
import { Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <header className="flex items-center justify-between">
      <span>Timer</span>
      <nav className="flex gap-2">
        <NavLink
          to="/"
          title="Timer"
          className="flex justify-center items-center text-gray-10 border-y-[3px] border-transparent w-12 h-12 hover:border-b-green-50"
        >
          <Timer size={24} />
        </NavLink>
        <NavLink
          to="/history"
          title="Histórico"
          className="flex justify-center items-center text-gray-10 border-y-[3px] border-transparent w-12 h-12 hover:border-b-green-50"
        >
          <Scroll size={24} />
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
