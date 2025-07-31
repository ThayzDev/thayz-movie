import Navbar from "@/app/components/Navbar/Navbar";
import HomePage from "@/app/pages/home";
import MediaPage from "@/app/pages/media";
import MovieTvDetailPage from "@/app/pages/movieTvDetail/[id]";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import i18n from "../i18n";

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
  const { language } = i18n;
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <ScrollToTop />
        <Navbar />
        <div className="container-fuild mx-auto bg-[#0F0F0F] ">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MediaPage type="movies" />} />
              <Route
                path="/tv-series"
                element={<MediaPage type="tv-series" />}
              />
              <Route
                path="/details/:type/:id"
                element={<MovieTvDetailPage />}
              />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
      </Router>
    </I18nextProvider>
  );
};

export default CustomRouter;
