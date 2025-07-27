import Navbar from "@/app/components/Navbar/Navbar";
import HomePage from "@/app/pages/home";
import MoviesPage from "@/app/pages/movies";
import MovieTvDetailPage from "@/app/pages/movieTvDetail/[id]";
import TVSeriesPage from "@/app/pages/tv-series";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const Router = dynamic(
  () => import("react-router-dom").then((mod) => mod.BrowserRouter),
  {
    ssr: false,
  }
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const CustomRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className="container-fuild mx-auto bg-[#0F0F0F] ">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/tv-series" element={<TVSeriesPage />} />
            <Route path="/details/:type/:id" element={<MovieTvDetailPage />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </Router>
  );
};

export default CustomRouter;
