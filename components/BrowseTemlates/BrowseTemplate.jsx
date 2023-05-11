import { BrowseTemplateNameView  } from './BrowseTemplateNameView';
import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const BrowseTemplate = ( {navigation} ) => {
    const templatesData = useSelector(state => state.templateName.templatesData);
    const plantNames = Object.values(templatesData).map(item => item.plantName);
    const plantLight = Object.values(templatesData).map(item => item.lightLevel);
    const plantMoisture = Object.values(templatesData).map(item => item.moistureLevel);
    let templateData2 = {}; 

    const tempDetailPress = (name, light, moisture) => {
        templateData2 = {
            plantName: name,
            lightLevel: light,
            moistureLevel: moisture,
        }
        navigation.navigate("DetailsTemp", { templateData: templateData2 })}


    return(
          <BrowseTemplateNameView plantName={plantNames}  tempDetailPress={tempDetailPress} plantLight={plantLight} plantMoisture={plantMoisture} templatesData={templatesData} />
    )
  
}

