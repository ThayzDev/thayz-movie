"use client";
import BottomNav from "./components/BottomNav";
import DesktopNav from "./components/DesktopNav";
import { useScrolled } from "./hooks/useScrolled";

const Navbar = () => {
  const scrolled = useScrolled(200);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ease-in-out
          px-4 sm:px-6 md:px-12 lg:px-10 
          py-4 sm:py-5 md:py-6 lg:py-10
          text-white ${
            scrolled
              ? "bg-[#0F0F0F] bg-opacity-80 shadow-lg mt-0"
              : "bg-transparent pt-6 sm:pt-8 md:pt-10 opacity-80"
          }`}
      >
        <DesktopNav />
      </nav>

      <BottomNav />
    </>
  );
};

export default Navbar;
