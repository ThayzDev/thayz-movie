import axios from "axios";
//API
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL || "";

// Image and video URLs
export const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";
export const POSTER_SIZE = "w500";
export const PROFILE_SIZE = "w200";
export const YOUTUBE_EMBED_BASE = "https://www.youtube.com/embed/";

export function getImageUrl(path: string, size: string = POSTER_SIZE) {
  if (!path) return "";
  return `${BASE_IMAGE_URL}${size}${path}`;
}

export function getProfileUrl(path: string, size: string = PROFILE_SIZE) {
  if (!path) return "";
  return `${BASE_IMAGE_URL}${size}${path}`;
}

export function getYoutubeEmbedUrl(
  key: string,
  params = "?rel=0&modestbranding=1&showinfo=0"
) {
  if (!key) return "";
  return `${YOUTUBE_EMBED_BASE}${key}${params}`;
}

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

    // Ensure we return only the results
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
