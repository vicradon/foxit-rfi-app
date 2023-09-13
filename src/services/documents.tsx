import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFetchDocuments(isAuthenticated: boolean) {
  return useQuery({
    queryKey: ["fetchDocuments", isAuthenticated],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/fetchDocuments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        return response.data;
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    },
    enabled: isAuthenticated,
  });
}
