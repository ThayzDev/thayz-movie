// /utils/api.ts
import axios from "axios";

// API Key của bạn từ TMDb
const API_KEY = "4f85134e0e3de33d9af45eb9596b5735";
const API_URL = "https://api.themoviedb.org/3/";

// Tạo một instance của axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
  timeout: 10000,
});

export const fetchMovies = async (
  category: string,
  query: string = "",
  page: number = 1
) => {
  try {
    let endpoint = `movie/${category}`;
    const params: Record<string, unknown> = { page };

    // Xử lý các category khác nhau
    switch (category) {
      case "trending":
        endpoint = `trending/movie/week`;
        break;
      case "search":
        if (!query.trim()) {
          // Nếu không có query, trả về trending movies
          endpoint = `trending/movie/week`;
        } else {
          endpoint = `search/movie`;
          params.query = query.trim();
        }
        break;
      case "popular":
        endpoint = `movie/popular`;
        break;
      case "top_rated":
        endpoint = `movie/top_rated`;
        break;
      case "upcoming":
        endpoint = `movie/upcoming`;
        break;
      case "now_playing":
        endpoint = `movie/now_playing`;
        break;
      default:
        endpoint = `movie/${category}`;
    }

    const { data } = await axiosInstance.get(endpoint, {
      params,
    });

    return data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
};

// Lấy danh sách TV Series (với category: trending, top_rated, search)
export const fetchTVSeries = async (
  category: string,
  query: string = "",
  page: number = 1
) => {
  try {
    let endpoint = `tv/${category}`;
    const params: Record<string, unknown> = { page };

    switch (category) {
      case "trending":
        endpoint = `trending/tv/week`;
        break;
      case "search":
        if (!query.trim()) {
          endpoint = `trending/tv/week`;
        } else {
          endpoint = `search/tv`;
          params.query = query.trim();
        }
        break;
      case "popular":
        endpoint = `tv/popular`;
        break;
      case "top_rated":
        endpoint = `tv/top_rated`;
        break;
      case "on_the_air":
        endpoint = `tv/on_the_air`;
        break;
      case "airing_today":
        endpoint = `tv/airing_today`;
        break;
      default:
        endpoint = `tv/${category}`;
    }

    const { data } = await axiosInstance.get(endpoint, {
      params,
    });

    return data.results || [];
  } catch (error) {
    console.error("Error fetching TV series:", error);
    throw new Error("Failed to fetch TV series");
  }
};

export const fetchMovieDetail = async (id: string) => {
  try {
    const response = await axiosInstance.get(`movie/${id}`, {
      params: {
        append_to_response: "credits,videos,similar,recommendations",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTVDetail = async (id: string) => {
  try {
    const response = await axiosInstance.get(`tv/${id}`, {
      params: {
        append_to_response: "credits,videos,similar,recommendations",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy genres cho movies
export const fetchMovieGenres = async () => {
  try {
    const { data } = await axiosInstance.get("genre/movie/list");
    return data.genres || [];
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    throw new Error("Failed to fetch movie genres");
  }
};

// Lấy genres cho TV series
export const fetchTVGenres = async () => {
  try {
    const { data } = await axiosInstance.get("genre/tv/list");
    return data.genres || [];
  } catch (error) {
    console.error("Error fetching TV genres:", error);
    throw new Error("Failed to fetch TV genres");
  }
};

export const fetchTrendingBackdrop = async (type: "movie" | "tv" = "movie") => {
  try {
    const endpoint = `trending/${type}/day`;
    const { data } = await axiosInstance.get(endpoint, {
      params: { page: 1 },
    });

    const itemsWithBackdrop =
      data.results?.filter(
        (item: Record<string, unknown>) => item.backdrop_path
      ) || [];

    if (itemsWithBackdrop.length > 0) {
      const randomIndex = Math.floor(Math.random() * itemsWithBackdrop.length);
      const randomItem = itemsWithBackdrop[randomIndex];

      return `https://image.tmdb.org/t/p/original${randomItem.backdrop_path}`;
    }

    return "https://images.unsplash.com/photo-1489599874653-922f74f1b5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
  } catch (error) {
    console.error("Error fetching trending backdrop:", error);
    return "https://images.unsplash.com/photo-1489599874653-922f74f1b5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
  }
};
