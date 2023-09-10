import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useLogin() {
  return useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axios.get("/api/login");
        localStorage.setItem("access_token", data.access_token);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    },
  });
}
