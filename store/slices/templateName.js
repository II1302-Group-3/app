import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import database from '@react-native-firebase/database';

const initialState = {
  templatesData: null,
  templateDataArray: null,
  moisture: null,
  light: null,
  name: null,
  likes: null,

}

export const getLikes = createAsyncThunk('templateName/getLikes', async () => {
  const ref = 'templates'
  let data;
  await database().ref(ref).once("value").then(snapshot => data = snapshot.val())
})
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

    },
    setLikes: (state, { payload }) => {
      state.likes = payload;
    }
  }
});


export const { setTemplateName, setTemplateData } = templateName.actions;