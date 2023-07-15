import {SortOrder} from "mongoose";

export interface IQueryItems<T> {
    search: Partial<TSearchOption>,
    filter: T,
    pagination: Partial<TPaginationOptions>,
    sort: Partial<TSortOptions>,
}

export type TSearchOption = {
    search: string
}

export type TPaginationOptions = {
    page: number;
    limit: number;
    skip: number;
}
export const PaginationKeys = ["page", "limit"]

export type TSortOptions = {
    sortBy: string;
    sortOrder: SortOrder;
}
export const SortKeys = ["sortBy", "sortOrder"]

export type TMeta = {
    page: number,
    limit: number,
    total: number
}
export type TDataWithMeta<T> = {
    meta: TMeta,
    data: T
}