import httpClient from "../configurations/httpClient";
import { API } from "../configurations/configuration";
import type { GenerateResumeRequest, ResumeResponse } from "../types/resume";
import { getToken } from "./localStorageService";

export const generateResume = async (data: GenerateResumeRequest) => {
    const response = await httpClient.post<ResumeResponse>(API.GENERATE_RESUME, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return response.data;
};