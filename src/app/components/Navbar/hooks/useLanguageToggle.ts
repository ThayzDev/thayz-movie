import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "EN", flag: "/img/flag-en.png" },
  { code: "vi", label: "VN", flag: "/img/flag-vn.png" },
  { code: "th", label: "TH", flag: "/img/flag-th.png" },
];

export function useLanguageToggle() {
  const { i18n } = useTranslation();
  const [langIdx, setLangIdx] = useState(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("app_language")
        : null;
    const code = saved || i18n.language;
    const idx = LANGUAGES.findIndex((l) => l.code === code);
    return idx !== -1 ? idx : 0;
  });
  const currentLang = LANGUAGES[langIdx];

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("app_language");
      if (saved && i18n.language !== saved) {
        i18n.changeLanguage(saved);
      }
    }
  }, []);

  const handleToggleLang = () => {
    const nextIdx = (langIdx + 1) % LANGUAGES.length;
    setLangIdx(nextIdx);
    const nextCode = LANGUAGES[nextIdx].code;
    i18n.changeLanguage(nextCode);
    if (typeof window !== "undefined") {
      localStorage.setItem("app_language", nextCode);
    }
  };

  return { currentLang, handleToggleLang };
}
