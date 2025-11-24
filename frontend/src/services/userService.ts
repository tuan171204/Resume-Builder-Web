import httpClient from "../configurations/httpClient";
import { API } from "../configurations/configuration";
import { getToken } from "./localStorageService";
import { jwtDecode } from "jwt-decode";

export const getMyInfo = async () => {
  return await httpClient.get(API.MY_INFO, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const updateMyInfo = async (request: any) => {
  // Giải mã JWT để lấy ID người dùng hiện tại
  const token = getToken();
  if (!token) throw new Error("Token not found");

  // Giải mã token để lấy userId
  // JWT có claim 'sub' là ID người dùng
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.sub;

  return await httpClient.put(`/identity/users/${userId}`, request, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};