import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const client = axios.create({
    baseURL: `http://${process.env.EXPO_PUBLIC_LOCALHOST_ADDRESS}:3000/`,
});
client.interceptors.request.use(async function (config) {
    let token = SecureStore.getItem("token");
    console.log(token)
    console.log("TOKEN")
    if (token) config.headers.Authorization = "Bearer " + token;
    return config;
});
