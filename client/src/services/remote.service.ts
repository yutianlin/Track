import axios, {AxiosResponse} from "axios";

export class RemoteService {
  public post(url: string, data: any): Promise<AxiosResponse> {
    return axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public get(url: string): Promise<AxiosResponse> {
    return axios.get(url);
  }
}