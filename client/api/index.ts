import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const client = axios.create({
    baseURL: "http://172.20.10.9:3000/",
});
client.interceptors.request.use(async function (config) {
    let token = await SecureStore.getItemAsync("session");
    if (token) config.headers.Authorization = "Bearer " + token;
    return config;
});
