import axios, { AxiosResponse, AxiosError } from "axios";

type ResponseBase<D = any> = {
    error: false
    success: true
    statusCode: number
    httpStatus: number
    message: string,
    data: D

    original: AxiosResponse<D>
} | {
    error: true
    success: false
    statusCode?:any
    httpStatus?:any
    message?:any
    data?:any
    meta?:any
    original?:any
    errorDetail?: unknown | any
};

const requestApiHelper = async <D = any>(promise: Promise<AxiosResponse<ResponseBase<D>>>): Promise<ResponseBase<D>> => {
    try {
        const { data } = await promise;
        return data;
    } catch (error) {
        const axiosError = error as AxiosError;
        return {
            error: true,
            success: false,
            errorDetail: axiosError,
        };
    }
};

export {
    requestApiHelper
};
