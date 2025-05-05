import { createInfiniteScrollSentinel } from "../components/infiniteScrollSentinel/InfiniteScrollSentinel";
import { createMovieCard } from "../components/movieCard/MovieCard";
import { createMovieDetailsModal } from "../components/movieDetails/MovieDetails";
import { observerCardImage } from "../components/MoviesContainer/lazyLoadCardImage";
import { Genre } from "../entities/Genre";
import { Genres } from "../entities/Genres";
import { Movie } from "../entities/Movie";
import { Service } from "../services/Service";
import { GetResponseMovies } from "../types/GetResponseMovies";

type Dates = {
  maximum: string;
  minimum: string;
};
export interface MoviesStoreInterface {
  getMovies(): Movie[];
  setMovies(movies: Movie[]): void;
  setResults(movieResponse: GetResponseMovies): void;
  resetMovieStore(): void;
  addMovies(movies: Movie[]): void;
  getPage(): number;
  setPage(page: number): void;
  getPageSize(): number;
  setPageSize(pageSize: number): void;
  getTotalPages(): number;
  setTotalPages(totalPages: number): void;
  getTotalResults(): number;
  setTotalResults(totalResults: number): void;
  getIsLoading(): boolean;
  setIsLoading(isLoading: boolean): void;
  getDates(): Dates;
  setDates(dates: Dates): void;
  getQuery(): string;
  setQuery(query: string): Promise<void>;
  getGenres(): Promise<Genre[]>;
  getObserver(): IntersectionObserver | null;
  setObserver(observer: IntersectionObserver): void;
  getServiceEndpointPath(): string;
  setServiceEndpointPath(serviceEndpointPath: string): Promise<void>;
  getService(): Service<GetResponseMovies>;
  fetchMovies(): void;
  getParentElement(): HTMLElement | null;
  setParentElement(parentElement: HTMLElement): void;
}
const useCommonParams = true;
export class MoviesStore implements MoviesStoreInterface {
  private _movies: Movie[] = [];
  private _page: number = 0;
  private _pageSize: number = 0;
  private _totalPages: number = 1;
  private _totalResults: number = 0;
  private _isLoading: boolean = false;
  private _dates: Dates = {
    maximum: "",
    minimum: ""
  };
  private _query: string = "";
  private readonly _genresInstance = Genres.instance;
  private _observerMovies: IntersectionObserver | null = null;

  private _service: Service<GetResponseMovies> = new Service<GetResponseMovies>(
    "movie/now_playing",
    useCommonParams
  );
  private _parentElement: HTMLElement | null = null;
  private _mainHeader: HTMLElement | null = null;

  private setFullStore(moviesResponse?: GetResponseMovies): void {
    this._movies = moviesResponse?.results ?? [];
    this._dates = moviesResponse?.dates ?? { maximum: "", minimum: "" };
    this._page = moviesResponse?.page ?? 0;
    if (this._page === 1) this._pageSize = moviesResponse?.results?.length ?? 0;
    this._totalPages = moviesResponse?.total_pages ?? 1;
    this._totalResults = moviesResponse?.total_results ?? 0;
  }

  constructor();
  constructor(movieResponse?: GetResponseMovies) {
    this.setFullStore(movieResponse);
  }

  getMovies(): Movie[] {
    return this._movies;
  }

  setMovies(movies: Movie[]): void {
    this._movies = movies;
  }

  setResults(movieResponse: GetResponseMovies): void {
    if (!movieResponse) throw new Error("Movie response cannot be null");
    this.setFullStore(movieResponse);
  }

  resetMovieStore(): void {
    this._movies = [];
    this._page = 0;
    this._pageSize = 0;
    this._totalPages = 1;
    this._totalResults = 0;
    this._isLoading = false;
    this._dates = { maximum: "", minimum: "" };
    this._query = "";
    this._service.setPath("movie/now");
    if (this._parentElement) this._parentElement.innerHTML = "";
  }

  addMovies(movies: Movie[]): void {
    this._movies = [...this._movies, ...movies];
  }

  getPage(): number {
    return this._page;
  }

  setPage(page: number): void {
    if (page < 0) throw new Error("Page number cannot be less than 0 ");
    if (page > this._totalPages)
      throw new Error("Page number cannot be greater than total pages");
    this._page = page;
  }

  getPageSize(): number {
    return this._pageSize;
  }

  setPageSize(pageSize: number): void {
    if (pageSize < 0) throw new Error("Page size cannot be less than 0");

    this._pageSize = pageSize;
  }

  getTotalPages(): number {
    return this._totalPages;
  }

  setTotalPages(totalPages: number): void {
    if (totalPages < 1) throw new Error("Total pages cannot be less than 1");

    this._totalPages = totalPages;
  }

  getTotalResults(): number {
    return this._totalResults;
  }

  setTotalResults(totalResults: number): void {
    if (totalResults < 0)
      throw new Error("Total results cannot be less than 0");

    this._totalResults = totalResults;
  }

  getIsLoading(): boolean {
    return this._isLoading;
  }

  setIsLoading(isLoading: boolean): void {
    this._isLoading = isLoading;
  }

  getDates(): Dates {
    return this._dates;
  }

  setDates(dates: Dates): void {
    if (!dates.maximum || !dates.minimum)
      throw new Error("Dates must have a maximum and minimum value");
    this._dates = dates;
  }

  getQuery(): string {
    return this._query;
  }

  async setQuery(query: string): Promise<void> {
    this.resetMovieStore();

    if (query) {
      if (this._service.getPath() !== "search/movie")
        this._service.setPath("search/movie");
    } else {
      this._service.setPath("movie/now_playing");
    }
    this._query = query;
    this.fetchMovies();
  }

  async getGenres(): Promise<Genre[]> {
    return this._genresInstance.getGenres();
  }

  getObserver(): IntersectionObserver | null {
    return this._observerMovies;
  }

  setObserver(observer: IntersectionObserver): void {
    this._observerMovies = observer;
  }

  getServiceEndpointPath(): string {
    return this._service.getPath();
  }

  async setServiceEndpointPath(serviceEndpointPath: string): Promise<void> {
    this.resetMovieStore();
    this._service.setPath(serviceEndpointPath);
    this.fetchMovies();
  }
  getService(): Service<GetResponseMovies> {
    return this._service;
  }

  getParentElement(): HTMLElement | null {
    return this._parentElement;
  }

  setParentElement(parentElement: HTMLElement): void {
    this._parentElement = parentElement;
  }

  private openDetailsModal = (movieId: number) => {
    createMovieDetailsModal(movieId);
  };

  private setMainHeader(): void {
    if (!this._mainHeader)
      this._mainHeader = document.querySelector(".landing-page__h2");
  }

  async fetchMovies(): Promise<void> {
    this.setIsLoading(true);

    const response: GetResponseMovies = await this.getService().getEntities({
      page: this.getPage() + 1,
      query: this.getQuery()
    });
    const updatedResults = {
      ...response,
      results: [...this.getMovies(), ...response.results]
    };
    this.setIsLoading(false);
    this.setResults(updatedResults);
    // ===============================================================
    const allGenres = await this.getGenres();

    const fragment = document.createDocumentFragment();
    if (this._mainHeader) {
      if (!response.results.length) {
        this._mainHeader.textContent = "No results found";
        return;
      }
      this._mainHeader.textContent = this._query
        ? `Results for: ${this.getQuery()}`
        : "In theaters this week";
    }
    for (
      let idx = this.getPage() * this.getPageSize() - this.getPageSize();
      idx < this.getMovies().length;
      idx++
    ) {
      const movieWithGenres = {
        ...this.getMovies()[idx],
        genres: this.getMovies()
          [idx].genre_ids.map((id) =>
            allGenres.find((genre) => genre.id === id)
          )
          .filter(Boolean) as Genre[]
      };
      const movieCard = createMovieCard({
        movie: movieWithGenres,
        openDetailsModal: this.openDetailsModal
      });

      fragment.appendChild(movieCard);
      observerCardImage.observe(
        movieCard.querySelector(".movie-card__lazy") as HTMLImageElement
      );
    }
    const areMorePages = this.getPage() < this.getTotalPages();
    this.setMainHeader();

    if (
      this.getPage() === 1 &&
      this._totalPages > this._page &&
      !document.getElementById("infinite-scroll-sentinel")
    ) {
      const sentinel = createInfiniteScrollSentinel(
        areMorePages,
        "Loading more movies..."
      );
      this.getObserver()?.observe(sentinel);
      fragment.appendChild(sentinel);
      this._parentElement?.appendChild(fragment);
    } else {
      const oldSentinel = document.getElementById("infinite-scroll-sentinel");
      if (!areMorePages) {
        oldSentinel?.remove();
        this._parentElement?.appendChild(fragment);
      } else {
        this._parentElement?.insertBefore(fragment, oldSentinel);
      }
    }
  }
}
