import serviceAxios from ".";
import { User } from "./model/user";

export const login = (user: User) => {
    return serviceAxios.post("/api/login", {
        username: user.username,
        password: user.password
    })
}

export const checkLogin = async (): Promise<boolean> => {
    const res = await serviceAxios.get("/api/checkLogin")
    return (res.data.code && res.data.code == 200)

}
export const logout = async (): Promise<boolean> => {
    const res = await serviceAxios.get("/api/logout")
    return (res.data.code && res.data.code == 200)
}