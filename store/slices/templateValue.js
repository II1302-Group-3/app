import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import database from '@react-native-firebase/database';

const initialState = {
    tempLight: 50,
    tempmoisture: 50,
    tempName: "dummy",
}

export const saveTemplate = createAsyncThunk(
    'templateValue/saveTemplate',
    async({tempLight, tempmoisture, tempName, uid}) => {
        const templateRef = 'templates'
        const newChildRef = database().ref(templateRef).push(); 
        newChildRef.set({plantName: tempName, lightLevel: tempLight, moistureLevel: tempmoisture }); 
        const templateKey = newChildRef.key;
        const userTemplateRef =  `users/${uid}/` + 'templates';
        database().ref(userTemplateRef).push().set({templateKey: templateKey});
            
    }
)

