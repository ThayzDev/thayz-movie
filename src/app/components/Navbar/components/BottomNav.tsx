"use client";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { NAV_ITEMS } from "../Constants/navItems";
import { useLanguageToggle } from "../hooks/useLanguageToggle";
import { useNavActive } from "../hooks/useNavActive";

const BottomNav = () => {
  const { isActive } = useNavActive();
  const { t } = useTranslation();
  const { currentLang, handleToggleLang } = useLanguageToggle();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800 z-50">
      <div className="flex justify-around items-center py-2 px-4">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={`relative py-1 px-4 transition-all duration-200 ${
              isActive(item.to)
                ? "text-white"
                : "text-gray-400 hover:text-red-600 after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 after:rounded-full"
            }`}
          >
            <span className="text-sm font-medium">{t(item.label)}</span>
            {isActive(item.to) && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
            )}
          </NavLink>
        ))}

        <button
          onClick={handleToggleLang}
          className="flex flex-row items-center gap-1 px-1 py-0.5 rounded bg-transparent hover:bg-[#232323] transition-colors duration-200 ml-1"
          style={{ minWidth: 0 }}
          title="Change language"
        >
          <img
            src={currentLang.flag}
            alt={currentLang.label}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-white text-[15px] font-bold">
            {currentLang.label}
          </span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
