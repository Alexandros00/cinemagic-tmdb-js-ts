export class ServiceConfig {
  protected readonly _apiKey: string = import.meta.env.VITE_TMDB_API_KEY || "";
  protected readonly _url: string = "https://api.themoviedb.org/3";
}
