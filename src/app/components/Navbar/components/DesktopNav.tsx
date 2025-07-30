"use client";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../Constants/navItems";
import { useLanguageToggle } from "../hooks/useLanguageToggle";
import { useNavActive } from "../hooks/useNavActive";

const DesktopNav = () => {
  const { isActive } = useNavActive();
  const { currentLang, handleToggleLang } = useLanguageToggle();
  const { t } = useTranslation();

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

      <div className="flex items-center space-x-8 text-[27px] font-semibold">
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
            {t(item.label)}
          </NavLink>
        ))}
        <button
          onClick={handleToggleLang}
          className="flex items-center gap-2 px-3 py-1 rounded-lg border border-gray-600 bg-[#181818] hover:bg-[#232323] transition-colors duration-200 ml-4"
          title="Change language"
        >
          <img
            src={currentLang.flag}
            alt={currentLang.label}
            className="w-7 h-7 rounded-full border border-gray-400"
          />
          <span className="text-white font-bold text-lg">
            {currentLang.label}
          </span>
        </button>
      </div>
    </div>
  );
};

export default DesktopNav;
