import axios, {AxiosResponse} from "axios";

export class RemoteService {
  private static JSON_HEADER: any = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  public post(url: string, data: any): Promise<AxiosResponse> {
    return axios.post(url, data, RemoteService.JSON_HEADER);
  }

  public put(url: string, data: any): Promise<AxiosResponse> {
    return axios.put(url, data, RemoteService.JSON_HEADER);
  }

  public patch(url: string, data: any): Promise<AxiosResponse> {
    return axios.patch(url, data, RemoteService.JSON_HEADER);
  }

  public get(url: string): Promise<AxiosResponse> {
    return axios.get(url);
  }
}
