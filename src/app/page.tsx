"use client";

import { useEffect } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./i18n";
import CustomRouter from "./router/Router";

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  return (
    <div>
      <I18nextProvider i18n={i18n}>
        <CustomRouter />
      </I18nextProvider>
    </div>
  );
};

export default App;
