import axios from "axios";
import { CONFIG } from "./configuration";

const httpClient = axios.create({
  baseURL: CONFIG.API_GATEWAY,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;
