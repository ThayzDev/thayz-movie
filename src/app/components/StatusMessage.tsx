import React from "react";
import { useTranslation } from "react-i18next";

interface StatusMessageProps {
  loading?: boolean;
  error?: unknown;
  notFound?: boolean;
  loadingText?: string;
  errorText?: string;
  notFoundText?: string;
}

const StatusMessage: React.FC<StatusMessageProps> = ({
  loading,
  error,
  notFound,
  loadingText,
  errorText,
  notFoundText,
}) => {
  const { t } = useTranslation();
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="w-12 h-12 border-4 border-red-700 border-t-transparent rounded-full animate-spin absolute top-2 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="text-white text-xl font-semibold">
            {loadingText || t("status.loading")}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-900 flex items-center justify-center">
        <div className="text-center p-8 bg-black/70 backdrop-blur-md rounded-xl border border-red-500/50">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-red-400 text-2xl font-bold mb-2">
            {t("status.errorTitle")}
          </h2>
          <p className="text-gray-300">
            {error instanceof Error
              ? error.message
              : errorText || t("status.errorText")}
          </p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="text-center p-8 bg-black/70 backdrop-blur-md rounded-xl border border-gray-500/50">
          <h2 className="text-xl font-semibold text-gray-300 mb-2">
            {notFoundText || t("status.notFound")}
          </h2>
          <p className="text-gray-500">{t("status.trySearchOther")}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default StatusMessage;
