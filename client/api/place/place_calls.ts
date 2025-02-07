import { useQuery } from "@tanstack/react-query";
import { client } from "..";
const BASE_URL = "user/place";
export const getCurrentUser = (name: string) => {
  const mutation = useQuery({
    queryKey: ["getCurrent"],
    queryFn: async () => {
      return await client.get(`${BASE_URL}/getByName/${name}`)
    },
  });
  return mutation;
};
