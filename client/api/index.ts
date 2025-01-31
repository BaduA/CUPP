import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const client = axios.create({
    baseURL: "http://192.168.1.6:3000/api/",
});
client.interceptors.request.use(async function (config) {
    let token = await SecureStore.getItemAsync("token");
    if (token) config.headers.Authorization = "Bearer " + token;
    return config;
});
