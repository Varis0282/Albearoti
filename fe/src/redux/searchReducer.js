import { createSlice } from "@reduxjs/toolkit";

export const search = createSlice({
    name: 'searches',
    initialState: {
        search: '',
    },
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        }
    }
})

export const { setSearch } = search.actions;