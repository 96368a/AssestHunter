export interface FofaSearchAllModel {
    qbase64: string
    fields?: string
    page?: number
    size?: number
    full?: boolean
}

export interface FofaResultModel {
    error: boolean;
    consumed_fpoint: number;
    required_fpoints: number;
    size: number;
    page: number;
    mode: string;
    query: string;
    results: Array<[string, string, string, string]>;
}