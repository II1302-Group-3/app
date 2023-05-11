import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    templatesData: [], 
    userTemplate: [],
    allTemplates:[], 

}


export const templateName = createSlice({
    name: 'templateName',
    initialState,
    reducers: {
      setTemplateName: (state, { payload }) => {
        state.templatesData = payload;
      },
      setUserTemplate: (state, { payload }) => {
        state.userTemplate = payload.userTemplate;
        state.allTemplates = payload.templateData; 
      }
    }
  });
  

export const { setTemplateName, setUserTemplate } = templateName.actions;