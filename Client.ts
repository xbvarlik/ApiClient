import { ApiClientConfig } from "./ClientConfig";
import { buildQueryString } from "./Utils";

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl;
    this.defaultHeaders = config.defaultHeaders || {};
  }

  private async ApiRequest<T>(
    endpoint: string = "",
    options: RequestInit = {},
    params?: Record<string, any>
  ): Promise<T> {
    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    const query = buildQueryString(params);
    const uri = `${this.baseUrl}${endpoint}${query}`
    
    const response = await fetch(uri, config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  public async GetAsync<T>(
    path: string = "",
    id: string | number = "", 
    params?: Record<string, any>, 
    ) : Promise<T> 
  {
    const uri = `${path}/${id}`;

    return await this.ApiRequest<T>(uri, { method: "GET" }, params);
  }

  public async PostAsync<T>(
    data: any, 
    endpoint: string = "") : Promise<T> 
  {

    return await this.ApiRequest<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  public async PutAsync<T>(
    path: string = "",
    id: string | number,
    data: any
  ) : Promise<T> 
  {
    return await this.ApiRequest<T>(`${path}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  public async DeleteAsync<T>(
    path: string = "",
    id: string | number,
  ) : Promise<T>
  {
    return this.ApiRequest<T>(`${path}/${id}`, { method: "DELETE" });
  }
}

export default ApiClient;
