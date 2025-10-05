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
    chartAgentperformance: async (data) => {
        try {
            const response = await axiosInstance.post("chartAgentperformance", data);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    chartLeadconversion: async (data) => {
        try {
            const response = await axiosInstance.post("chartLeadconversion", data);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    chartLeadcreated: async (data) => {
        try {
            const response = await axiosInstance.post("chartLeadcreated", data);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    chartLeadsource: async (data) => {
        try {
            const response = await axiosInstance.post("chartLeadsource", data);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    chartRevenuetrend: async (data) => {
        try {
            const response = await axiosInstance.post("chartRevenuetrend", data);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    chartLeadfollowup: async (data) => {
        try {
            const response = await axiosInstance.post("chartLeadfollowup", data);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
};
