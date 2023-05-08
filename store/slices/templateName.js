import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    templatesName: []
}

export const templateName = createSlice({
    name: 'templateName',
    initialState,
    reducers: {
        setTemplateName: (state, { payload }) => {
            console.log(payload + "payload")
            state.templatesName = payload;
            console.log('fg')
            console.log( "payload")

        }
    }
})

export const { setTemplateName } = templateName.actions;