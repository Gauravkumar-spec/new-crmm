import { axiosInstance } from "../context/AuthContext.jsx";

export const agentApi = {
    createAgent: async (data) => {
        try {
            const response = await axiosInstance.post("setAgent", data);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },

    agentSearch: async (data) => {
        try {
            const response = await axiosInstance.post("agentSearch", data);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },

    agentUpdate: async (data) => {
        try {
            const response = await axiosInstance.post("agentUpdate", data);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    agentDelete: async (data) => {
        try {
            const response = await axiosInstance.post("agentDelete", data);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
};
