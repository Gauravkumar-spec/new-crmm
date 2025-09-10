import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./api";

export const agentApi = createApi({
  reducerPath: "agentApi",
  baseQuery: async (args, api, extraOptions) => {
    console.log("🟡 [RTK-Query] Request Args =>", args);
    try {
      const result = await baseQuery(args, api, extraOptions);
      console.log("✅ [RTK-Query] Response =>", result);
      return result;
    } catch (error) {
      console.error("❌ [RTK-Query] Error =>", error);
      throw error;
    }
  },
  endpoints: (builder) => ({
    setAgent: builder.mutation({
      query: (data) => {
        console.log("🟡 [setAgent] Payload =>", data);
        return {
          url: "setAgent",
          method: "POST",
          body: data,
        };
      },
    }),
    agentSearch: builder.mutation({
      query: (data) => {
        console.log("🟡 [agentSearch] Payload =>", data);
        return {
          url: "agentSearch",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useSetAgentMutation, useAgentSearchMutation } = agentApi;
