import type { Movie } from "@/models/movie"

export interface SearchResult {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
