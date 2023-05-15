import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import database from '@react-native-firebase/database';
import { Alert } from 'react-native';

const initialState = {
    templatesData: [],
    userTemplate: [],
    allTemplates:[],

    selectedTemplate: {
      name: "",
      light: 0,
      moisture: 0,
      id: "",
      hasLiked: null,
      canLike: null,
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
        state.templatesData = payload;
      },
      setUserTemplate: (state, { payload }) => {
        state.userTemplate = payload.userTemplate;
        state.allTemplates = payload.templateData;
      },
      setLikes: (state, { payload }) => {
        state.likes = payload;
      },
      setHasLiked: (state, { payload }) => {
        state.selectedTemplate.hasLiked = payload;
      },
      setCanLike: (state, { payload }) => {
        state.selectedTemplate.canLike = payload;
      },
      setSelectedTemplate: (state, { payload }) => {
        state.selectedTemplate.name = payload.plantName;
        state.selectedTemplate.light = payload.lightLevel;
        state.selectedTemplate.moisture = payload.moistureLevel;
        state.selectedTemplate.id = payload.id;
      }
    },
    extraReducers: builder => {
      builder.addCase(saveTemplate.fulfilled, (state, { payload }) => {
          state.userTemplate = [...state.userTemplate, payload.templateKey];
          state.allTemplates = {...state.allTemplates, ...payload.templateObject};
      });
      builder.addCase(alreadyLiked.fulfilled, (state, { payload }) => {
        state.selectedTemplate.hasLiked = payload;
      })
      builder.addCase(getTemplates.fulfilled, (state, { payload }) => {
        state.templatesData = payload;
      })
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

export const { setTemplateName, setUserTemplate, setLikes, setHasLiked, setSelectedTemplate, setCanLike } = templateName.actions;