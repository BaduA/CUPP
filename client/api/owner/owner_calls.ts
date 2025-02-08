import { useQuery } from "@tanstack/react-query";
import { client } from "..";

var BASE_URL = "appOwner";
export const getTotalPointsDaily = () => {
  const query = useQuery({
    queryKey: ["todaysTotalPoint"],
    queryFn: async () => {
      return await client.get(`${BASE_URL}/getTotalPointsDaily`);
    },
  });
  return query;
};
export const getTotalPlaces = () => {
  const query = useQuery({
    queryKey: ["todaysTotalPoint"],
    queryFn: async () => {
      return await client.get(`${BASE_URL}/getTotalPointsDaily`);
    },
  });
  return query;
};
