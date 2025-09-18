import { axiosInstance } from "../context/AuthContext.jsx";

export const tableApi = {
    dataTable: async (data) => {
        try {
            const response = await axiosInstance.post("getEnum", data);

            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
};
