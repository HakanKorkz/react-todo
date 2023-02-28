import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    size: 0
}

export const windowSizeSlice = createSlice({
    name: "windowSize",
    initialState,
    reducers: {
        windowSizeChange: (state, action) => {
            state.size = action.payload
        }
    }
})

export const {windowSizeChange} = windowSizeSlice.actions

export default windowSizeSlice.reducer