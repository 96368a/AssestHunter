import request from "."
import { FofaResultModel, FofaSearchAllModel } from "./model/fofa"

export const getFofaAssetsApi = (model: FofaSearchAllModel) => {
    return request.get("fofa/api/v1/search/all", {
        searchParams: {
            ...model
        }
    }).json<FofaResultModel>()
}