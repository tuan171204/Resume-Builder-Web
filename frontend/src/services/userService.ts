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

export const getUserProfile = async () => {
  const token = getToken();
  if (!token) throw new Error("Token not found");

  // Giải mã token để lấy userId (tương tự như trong updateMyInfo)
  const decodedToken: any = jwtDecode(token);
  const userId = decodedToken.sub; // Lấy userId từ claim 'sub'

  // Gọi API lấy thông tin chi tiết user
  // Lưu ý: Nếu httpClient đã cấu hình baseURL khác port 8888, bạn cần truyền full URL
  return await httpClient.get(`/profile/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};