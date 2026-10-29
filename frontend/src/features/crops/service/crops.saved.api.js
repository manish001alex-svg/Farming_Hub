import axios from "axios";

const cropSavedApiInstance = axios.create({
    baseURL: "http://localhost:8080/api/saved-crops",
    withCredentials: true
})

export const savedCrops = async (id) => {
    const response = await cropSavedApiInstance.post(`/${id}`);
    return response.data;
}

export const getSavedCrops = async () =>{
    const response = await cropSavedApiInstance.get("");
    return response;
}

export const removeSavedCrops = async (id) => {
    const response = await cropSavedApiInstance.delete(`/${id}`);
    return response;
}