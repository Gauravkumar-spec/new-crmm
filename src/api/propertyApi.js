import { axiosInstance } from "../context/AuthContext.jsx";

export const propertyApi = {
    createProperty: async (data) => {
        try {
            const response = await axiosInstance.post("setProperty", data);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    updateProperty: async (data) => {
        try {
            const response = await axiosInstance.post("propertyUpdate", data);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    deleteProperty: async (data) => {
        try {
            const response = await axiosInstance.post("propertyDelete", data);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    propertySearch: async (data) => {
        try {
            const response = await axiosInstance.post("propertySearch", data);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    propertyPreview: async (data) => {
        try {
            const response = await axiosInstance.post("propertyPreview", data);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
};
