import { axiosInstance } from "../context/AuthContext.jsx";

export const dashboardApi = {
    getTopAgent: async (data) => {
        try {
            const response = await axiosInstance.post("dashboardTopagent", data);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    getPropertyCount: async (data) => {
        try {
            const response = await axiosInstance.post("dashboardPropertycount", data);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
};
