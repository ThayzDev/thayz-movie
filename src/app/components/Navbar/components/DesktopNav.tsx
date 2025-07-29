"use client";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../Constants/navItems";
import { useNavActive } from "../hooks/useNavActive";

const DesktopNav = () => {
  const { isActive } = useNavActive();

  return (
    <div className="hidden md:flex justify-between items-center w-full">
      <div className="flex gap-3 items-center">
        <img src="/img/logo.png" alt="icon" className="h-14 w-14" />
        <NavLink
          to="/movies"
          className="text-white hover:text-red-600 font-semibold text-2xl lg:text-[43px] transition-colors duration-200"
        >
          theMovies
        </NavLink>
      </div>

      <div className="flex space-x-8 text-[27px] font-semibold">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={
              isActive(item.to)
                ? "text-white font-semibold border-b-2 border-red-600"
                : "relative hover:text-red-600 hover:font-medium duration-200 after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 after:rounded-full"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default DesktopNav;
