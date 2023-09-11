import { User } from "@/interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFetchTemplates(isAuthenticated: boolean) {
  return useQuery({
    queryKey: ["fetchTemplates", isAuthenticated],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/fetchTemplates", {
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

export function useCreateEnvelopeFromTemplate() {
  return useMutation({
    mutationFn: async ({
      templateId,
      parties,
    }: {
      templateId: number;
      parties: User[];
    }) => {
      try {
        const { data } = await axios({
          url: "/api/createEnvelopeFromTemplate",
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          data: {
            templateIds: [templateId],
            parties,
          },
        });
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    },
  });
}
