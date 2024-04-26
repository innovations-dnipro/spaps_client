import { type AxiosResponse } from 'axios';

export * from './auth';

// interface ApiResponseInterface<T> {
//   success: boolean;
//   result: T[];
//   message: null | string;
//   pagination: ApiPaginationInterface | null;
// }

export interface IParams {
  [key: string]: string;
}

export interface IServerError {
  statusCode: number;
  message: string;
}

export type ServiceResponseType<T> = Promise<AxiosResponse<T | IServerError>>;

// export interface ApiPaginationInterface {
//   total: number;
//   page: number;
//   pageSize: number;
//   pages: number;
// }
