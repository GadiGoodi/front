import 'axios';

declare module 'axios' {
  export interface AxiosError {
    serverMessage?: string;
  }
}
