const Footer = () => {
  return (
    <div className="relative bg-black text-white py-8 md:py-12 lg:py-16 pb-20 md:pb-24 lg:pb-16 h-auto md:h-[50vh] lg:h-[57vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-top bg-no-repeat"
        style={{
          backgroundImage: `url('/img/footer-bg.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 md:from-black/40 md:via-black/20 md:to-black/60"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-4 h-full flex flex-col justify-center">
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img
              src="/img/logo.png"
              alt="theMovies"
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
              theMovies
            </h1>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="hidden md:grid md:grid-cols-3 gap-30 text-center text-2xl font-bold max-w-4xl w-full">
            <ul className="space-y-5">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  Contact us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  Term of services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  About us
                </a>
              </li>
            </ul>

            <ul className="space-y-5">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  Live
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  Premium
                </a>
              </li>
            </ul>

            <ul className="space-y-5">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  You must watch
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  Recent release
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  Top IMDB
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>

          <div className="md:hidden w-full max-w-2xl space-y-6">
            <div className="grid grid-cols-2 gap-6 text-center text-sm font-bold">
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  Contact us
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  Term of services
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  About us
                </a>
              </div>

              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  Live
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  FAQ
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  Premium
                </a>
              </div>
            </div>

            <div className="text-center">
              <div className="grid grid-cols-2 gap-6 text-sm font-bold">
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  You must watch
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  Recent release
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  Top IMDB
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-600 transition-colors duration-200"
                >
                  Privacy policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
