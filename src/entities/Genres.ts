import { Service } from "../services/Service";
import { GetResponseGenres } from "../types/GetResponseGenres";

import { Genre } from "./Genre";

interface GenresInterface {
  getGenres(): Promise<Genre[] | []>;
}

export class Genres implements GenresInterface {
  private _genres: Genre[] = [];
  private _isFetching: boolean = false;
  private static _instance: Genres = new Genres();

  private constructor() {}

  static get instance(): Genres {
    return this._instance;
  }

  private async fetchGenres(): Promise<void> {
    try {
      this._isFetching = true;

      const genresService = new Service<GetResponseGenres>("genre/movie/list");
      const response: GetResponseGenres = await genresService.getEntities();

      this._genres = response.genres;
      this._isFetching = false;
    } catch (error) {
      console.error("An error occurred while fetching genres", error);
      this._isFetching = false;
    }
  }

  async getGenres(): Promise<Genre[] | []> {
    if (this._isFetching) return this._genres;
    if (this._genres.length) {
      return this._genres;
    }
    await this.fetchGenres();
    return this._genres;
  }
}
