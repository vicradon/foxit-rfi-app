import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFetchTemplates(isAuthenticated: boolean) {
  return useQuery({
    queryKey: ["fetchTemplates", isAuthenticated],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/templates", {
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
