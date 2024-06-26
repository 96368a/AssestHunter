import serviceAxios from "."
import { FofaSearchAllModel } from "./model/fofa"

export const getFofaAssetsApi = (model: FofaSearchAllModel) => {
    return serviceAxios.get("/fofa/api/v1/search/all", {
        params: model
    })
}