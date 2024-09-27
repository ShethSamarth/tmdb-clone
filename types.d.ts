export interface Movie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetails {
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TvShow {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface TvShowDetails {
  id: number;
  backdrop_path: string;
  genres: Genre[];
  languages: string[];
  name: string;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path?: string;
  season_number: number;
  vote_average: number;
}

export interface Cast {
  id: number;
  cast_id: number;
  credit_id: number;
  original_name: string;
  profile_path: string;
  character: string;
  known_for_department: string;
}

export interface Crew {
  id: number;
  credit_id: number;
  original_name: string;
  profile_path: string;
  job: string;
}

export interface Person {
  id: number;
  name: string;
  profile_path: string;
  biography: string;
  known_for_department: string;
  place_of_birth: string;
  birthday: string;
  combined_credits: {
    cast: Movie[];
  };
}

export interface People {
  id: number;
  original_name: string;
  known_for_department: string;
  profile_path: string;
}

export interface SearchResult {
  backdrop_path?: string;
  id: number;
  name?: string;
  original_name?: string;
  poster_path?: string;
  media_type: 'movie' | 'tv' | 'person';
  genre_ids?: number[];
  popularity: number;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  title?: string;
  original_title?: string;
  release_date?: string;
  gender?: number;
  known_for_department?: string;
  profile_path?: string;
  known_for?: KnownFor[];
}

export interface KnownFor {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface States {
  id: number;
  favorite: boolean;
  rated?: {
    value: number;
  };
  watchlist: boolean;
}
