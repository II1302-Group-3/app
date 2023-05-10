import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    templatesName: "apple", 
    templateDataArray: "DG", 
}


export const templateName = createSlice({
    name: 'templateName',
    initialState,
    reducers: {
      setTemplateName: (state, { payload }) => {
        console.log(payload)
        console.log("gello")
        state.templatesName = payload;
      },
      setTemplateData: (state, { payload }) => {
        console.log("gello2")
        state.templateDataArray = payload;
      }
    }
  });
  

export const { setTemplateName, setTemplateData } = templateName.actions;