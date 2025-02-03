import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "..";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";

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
export const sendEmailCodeAgain = () => {
  const mutation = useMutation({
    mutationFn: async (email: any) => {
      return await client.post(`${BASE_URL}/generateCodeForMail`, {email});
    },
    retry: 1,
  });
  return mutation;
};
export const sendForForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: async (email: any) => {
      return await client.post(`${BASE_URL}/generateForForgotPassword`, {email});
    },
    retry: 1,
  });
  return mutation;
};
export const verifyAccount = () => {
  const mutation = useMutation({
    mutationFn: async (code: string) => {
      return await client.put(`${BASE_URL}/verifyUserAccount/${code}`);
    },
    retry: 1,
  });
  return mutation;
};
export const verifyForgotPasswordCode = () => {
  const mutation = useMutation({
    mutationFn: async (code: string) => {
      return await client.post(`${BASE_URL}/verifyCode/${code}`);
    },
    retry: 1,
  });
  return mutation;
};

export const getCurrentUser = () => {
  const dispatch = useDispatch();
  const mutation = useQuery({
    queryKey: ["getCurrent"],
    queryFn: async () => {
      return await client.get(`${BASE_URL}/getCurrentUser`).then((res) => {
        dispatch(setUser(res.data));
        return res;
      });
    },
    retry: 1,
    enabled: false,
  });
  return mutation;
};
