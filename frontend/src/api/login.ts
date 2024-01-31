import serviceAxios from ".";
import { User } from "./model/user";

export const login = (user: User) => {
    return serviceAxios.post("/api/login", {
        username: user.username,
        password: user.password
    })
}

export const checkLogin = () => {
    return serviceAxios.get("/api/checkLogin")
}