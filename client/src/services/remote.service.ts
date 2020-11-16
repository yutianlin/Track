import axios, {AxiosResponse} from "axios";
import {toRequestJson} from "../conversions/conversions.util";

export class RemoteService {
  private static JSON_HEADER: any = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  public post(url: string, data: any): Promise<AxiosResponse> {
    return axios.post(url, toRequestJson(data), RemoteService.JSON_HEADER);
  }

  public patch(url: string, data: any): Promise<AxiosResponse> {
    return axios.patch(url, toRequestJson(data), RemoteService.JSON_HEADER);
  }

  public get(url: string): Promise<AxiosResponse> {
    return axios.get(url);
  }

  public delete(url: string): Promise<AxiosResponse> {
    return axios.delete(url);
  }
}
