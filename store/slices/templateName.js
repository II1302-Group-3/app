import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import database from '@react-native-firebase/database';

const initialState = {
  templatesData: null,
  templateDataArray: null,
  moisture: null,
  light: null,
  name: null,
  likes: null,
  likedByUser: null,

  selectedTemplate: {
    name: "",
    light: 0,
    moisture: 0,
    id: ""
  }
}

export const getLikes = createAsyncThunk('templateName/getLikes', async (_, {getState, dispatch}) => {
  const state = getState();
  const ref = `templates/${state.templateName.selectedTemplate.id}/likedBy`;
  const snapshot = await database().ref(ref).once("value");
  const likedBy = snapshot.val()

  return {likes: likedBy.length, likedByUser: !!likedBy?.includes(state.firebaseAuth.user.uid)}
})

export const setLiked = createAsyncThunk('templateName/setLiked', async({isFilled}, {getState, dispatch}) => {
  const state = getState();
  const ref = `templates/${state.templateName.selectedTemplate.id}/likedBy`;
  const snapshot = await database().ref(ref).once('value');
  const currentlyLikedBy = snapshot.val();

  if(isFilled && !currentlyLikedBy?.includes(state.firebaseAuth.user.uid)) {
    const newLikedBy = currentlyLikedBy ? [...currentlyLikedBy, state.firebaseAuth.user.uid] : [state.firebaseAuth.user.uid]
    await database().ref(ref).set(newLikedBy).then(() => console.log("data set"))
    dispatch(setLikes(newLikedBy.length))
  }

  if(!isFilled) {
    await database().ref(ref).set(currentlyLikedBy.filter(likedBy => likedBy !== state.firebaseAuth.user.uid)).then(() => console.log("data removed"))
    dispatch(setLikes(currentlyLikedBy.length - 1))
  }
  
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
      console.log(state.likes)
    },
    setSelectedTemplate: (state, { payload }) => {
      console.log(payload)
      state.selectedTemplate.name = payload.plantName;
      state.selectedTemplate.light = payload.lightLevel;
      state.selectedTemplate.moisture = payload.moistureLevel;
      state.selectedTemplate.id = payload.id;
    }
  },
  extraReducers: builder => {
    builder.addCase(getLikes.fulfilled, (state, { payload }) => {
      state.likes = payload.likes
      state
    })
  }
});


export const { setTemplateName, setTemplateData, setSelectedTemplate, setLikes } = templateName.actions;