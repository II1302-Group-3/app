import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    templatesData: [], 
    templateDataArray: [],

}


export const templateName = createSlice({
    name: 'templateName',
    initialState,
    reducers: {
      setTemplateName: (state, { payload }) => {
        console.log(payload)
        state.templatesData = payload;
      },
      setTemplateData: (state, { payload }) => {
        console.log("gello2")
        state.templateDataArray = payload;
      }
    }
  });
  

export const { setTemplateName, setTemplateData } = templateName.actions;