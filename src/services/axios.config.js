import axios from "axios";

const URL = 'https://6529bce055b137ddc83f2060.mockapi.io/api/stockProducts'

export const axiosInstance = axios.create({
  baseURL: URL
})