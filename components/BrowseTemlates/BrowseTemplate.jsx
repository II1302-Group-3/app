import { BrowseTemplateNameView  } from './BrowseTemplateNameView';
import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setTemplateName } from '../../store/slices/garden';
import module from '@react-native-firebase/app';

export const BrowseTemplate = ( {navigation} ) => {
    //const templatesName = useSelector(state => state.templateName.templatesName);
    //const dispatch = useDispatch();
    const templatesData = useSelector(state => state.templateName.templatesData);
    const plantNames = Object.values(templatesData).map(item => item.plantName);
    const plantLight = Object.values(templatesData).map(item => item.lightLevel);
    const plantMoisture = Object.values(templatesData).map(item => item.moistureLevel);
    let templateData2 = {}; 

    console.log(templatesData)
   // const templateName = useSelector(state => state.templateName.templatesName);
    //console.log(templateName + '3')

    const tempDetailPress = (name, light, moisture) => {
        templateData2 = {
            plantName: name,
            lightLevel: light,
            moistureLevel: moisture,
        }
        console.log(templateData2)
        navigation.navigate("DetailsTemp")}


    return(
          <BrowseTemplateNameView plantName={plantNames}  tempDetailPress={tempDetailPress} plantLight={plantLight} plantMoisture={plantMoisture} templatesData={templatesData} />
    )
  
}
