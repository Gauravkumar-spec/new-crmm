import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    const token = sessionStorage.getItem("token");

    console.log("🟡 [baseQuery] Base URL =>", import.meta.env.VITE_BASE_URL);
    console.log("🟡 [baseQuery] Current Token =>", token);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json"); // ✅ fixed
    }

    console.log("🟡 [baseQuery] Final Headers =>", [...headers.entries()]);

    return headers;
  },
});
