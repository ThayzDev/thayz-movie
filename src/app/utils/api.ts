// /utils/api.ts
import axios from "axios";

// API Key của bạn từ TMDb
const API_KEY = "4f85134e0e3de33d9af45eb9596b5735";
const API_URL = "https://api.themoviedb.org/3/";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

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
    switch (category) {
      case "trending":
        endpoint = `trending/movie/week`;
        break;
      case "search":
        if (!query.trim()) {
          endpoint = `trending/movie/week`;
        } else {
          endpoint = `search/movie`;
          params.query = query.trim();
        }
        break;
      case "top_rated":
        endpoint = `movie/top_rated`;
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
      case "top_rated":
        endpoint = `tv/top_rated`;
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
