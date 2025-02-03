import { useMutation } from "@tanstack/react-query";
import { client } from "..";

var BASE_URL = "auth";

export const signIn = () => {
  const mutation = useMutation({
    mutationFn: async (body: any) => {
      console.log("logging in");
      return await client.post(`${BASE_URL}/signIn`, body);
    },
    retry: 1,
  });
  return mutation;
};
