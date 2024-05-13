
import request  from ".";
import { User } from "./model/user";

export const login = async (user: User) => {
    const response = await request.post("api/login", {
        json: user
    }).json<RespondModel>()
    return response
}

export const checkLogin = async (): Promise<boolean> => {
    const res = await request.get("api/checkLogin").json<RespondModel>()
    return (res.code == 200)

}
export const logout = async (): Promise<boolean> => {
    const res = await request.get("api/logout").json<RespondModel>()
    return (res.code == 200)
}