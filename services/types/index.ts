export enum ApiErrorCode {
    SUCCESS = '00000',
    WRONG_PWD = '00030',
    NEED_VERIFY = '00032',
}

export interface IResponseData<T = unknown> {
    code: ApiErrorCode | string;
    errorCode?: ApiErrorCode | string;
    timestamp?: string;
    message?: string;
    result?: T;
    signature?: string;
    requestId?: string;
    flowEnded?: boolean;
}

export * from './category';
export * from './product';
export * from './productMeasurement'; 