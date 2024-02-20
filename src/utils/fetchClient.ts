import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

const MODES_API_URL = 'https://60816d9073292b0017cdd833.mockapi.io/modes';

const axiosInstance = axios.create({
  baseURL: MODES_API_URL,
});

type RequestMethod = 'GET'

async function request<T>(method: RequestMethod = 'GET'): Promise<T> {
  const config: AxiosRequestConfig = {
    method,
  }

  try {
    const response: AxiosResponse<T> = await axiosInstance(config)

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      throw error
    }
  }
}

export const client = {
  get: <T>() => request<T>(),
}
