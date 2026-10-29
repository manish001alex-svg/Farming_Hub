import axios from 'axios';

const authApiInstance = axios.create({
    baseURL: "http://localhost:8080/api/auth",
    withCredentials: true,
});

export const register = async ({ name, email, password }) => {
    const response = await authApiInstance.post("/admin/register", {
        name,
        email,
        password
    });

    console.log(register);

    return response.data;
}


export const registerUser = async ({ name, email, password }) => {
    const response = await authApiInstance.post("/user/register", {
        name,
        email,
        password
    });

    console.log(register);

    return response.data;
}

export const login = async ({ email, password }) => {

    const response = await authApiInstance.post("/login", {
        email,
        password
    });

    return response.data.data;
}


export const me = async () => {
    const response = await authApiInstance.get("/me");

    console.log(response.data)

    return response.data.data;
}