import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import database from '@react-native-firebase/database';

const initialState = {
  templatesData: [],
  templateDataArray: [],
  moisture: null,
  light: null,
  name: null,
  likes: null,

  selectedTemplate: {
    name: "",
    light: 0,
    moisture: 0,
    id: "",
    hasLiked: null
  }
}

export const getTemplates = createAsyncThunk('templateName/getTemplates', async(_, {getState, dispatch}) => {
  const state = getState();
  const ref = `templates`;
  const templateData = (await database().ref(ref).once('value')).val()

  return templateData;
})

export const alreadyLiked = createAsyncThunk('templateName/alreadyLiked', async(_, {getState}) => {
  const state = getState();
  const ref = `templates/${state.templateName.selectedTemplate.id}/likedBy`;
  const snapshot = await database().ref(ref).once("value");
  const likedBy = snapshot.val()
  const hasLiked = !!likedBy?.includes(state.firebaseAuth.user.uid);

  return hasLiked;
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
    setHasLiked: (state, { payload }) => {
      state.selectedTemplate.hasLiked = payload;
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
    builder.addCase(alreadyLiked.fulfilled, (state, { payload }) => {
      console.log("hasLiked?")
      console.log(payload)
      state.selectedTemplate.hasLiked = payload;
    })
    builder.addCase(getTemplates.fulfilled, (state, { payload }) => {
      state.templatesData = payload;
    })
  }
});


export const { setTemplateName, setTemplateData, setSelectedTemplate, setLikes, setHasLiked } = templateName.actions;