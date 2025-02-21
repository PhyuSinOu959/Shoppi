import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryList } from "@/src/services/types";

export interface homeState {
    categoryList?: CategoryList[];
}

const initialState: homeState = {
    categoryList: [],
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        getListCategory: () => { },
    }
})

export const {
    getListCategory
} = homeSlice.actions;

export default homeSlice.reducer;