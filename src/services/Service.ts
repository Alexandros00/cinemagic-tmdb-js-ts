import { ServiceConfig } from "./ServiceConfig";

const commonQueryParams = {
  language: "en-US",
  sort_by: "popularity.desc",
  include_adult: "false",
  include_video: "false",
  page: "1"
};

type Params = Record<string, string | number | boolean>;

export class Service<T> extends ServiceConfig {
  private _path: string = "";
  private _query: string = "";
  private _useCommonParams: boolean = false;

  constructor(path: string, useCommonParams?: boolean) {
    super();
    this._path = path;
    if (useCommonParams) this._useCommonParams = useCommonParams;
  }

  setPath(path: string): void {
    this._path = path;
  }

  getPath(): string {
    return this._path;
  }

  setQuery(query: string): void {
    this._query = query;
  }

  getQuery(): string {
    return this._query;
  }

  getEntities = async (params?: Params): Promise<T> => {
    try {
      const queryParams = this.createQueryParams(params);

      const headers = this.createHeaders();

      const response = await fetch(
        `${this._url}/${this._path}?${queryParams}`,
        {
          method: "GET",
          headers
        }
      );
      if (!response.ok) {
        throw new Error(`Server error! status: ${response.status}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      throw new Error(
        `Communication error! message: ${(error as Error).message}`
      );
    }
  };

  private cleanParams(params: Params): Params {
    if (!params) return {};
    const cleanedParams: Params = {};
    for (const key in params) {
      if (params[key]) cleanedParams[key] = params[key];
    }
    return cleanedParams;
  }

  private createQueryParams(params: Params | undefined) {
    return new URLSearchParams({
      api_key: this._apiKey,
      ...((this._useCommonParams && commonQueryParams) || {}),
      ...this.cleanParams(params ?? {})
    });
  }

  private createHeaders() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return headers;
  }
}
