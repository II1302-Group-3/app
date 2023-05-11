import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import database from '@react-native-firebase/database';
import { Alert } from 'react-native';

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
    },
    extraReducers: builder => {
      builder.addCase(saveTemplate.fulfilled, (state, { payload }) => {
          state.userTemplate = [...state.userTemplate, payload.templateKey];
          state.allTemplates = {...state.allTemplates, ...payload.templateObject};
      });
    }
  });

export const saveTemplate = createAsyncThunk(
    'templateName/saveTemplate',
    async({tempLight, tempmoisture, tempName, uid}) => {
      try {
        const templateRef = 'templates'
        const newChildRef = database().ref(templateRef).push();
        const template = {plantName: tempName, lightLevel: tempLight, moistureLevel: tempmoisture };
        newChildRef.set(template);
        const templateKey = newChildRef.key;
        const userTemplateRef =  `users/${uid}/` + 'templates';
        database().ref(userTemplateRef).push().set({templateKey: templateKey});
        Alert.alert('Template saved successfully!');

        let templateObject = {};
        templateObject[templateKey] = template;

        return {templateKey, templateObject};
      }
      catch(error) {
        console.log(error);
      }
    }
)

export const { setTemplateName, setUserTemplate } = templateName.actions;