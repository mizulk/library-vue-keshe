import { AxiosResponse } from "axios";

export interface Result<T> {
  code: number;
  msg: string;
  data: T;
}

export type ResponseResult<T> = Promise<AxiosResponse<Result<T>, any>>