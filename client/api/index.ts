import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const client = axios.create({
    baseURL: "http://10.201.158.191:3000/",
});
client.interceptors.request.use(async function (config) {
    let token = await SecureStore.getItemAsync("token");
    if (token) config.headers.Authorization = "Bearer " + token;
    return config;
});
