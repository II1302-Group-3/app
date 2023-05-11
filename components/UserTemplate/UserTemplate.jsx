import { loadOptions } from '@babel/core';
import { UserTemplateView  } from './UserTemplateView';
import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const UserTemplate = ( {navigation} ) => {
    //const templatesData = useSelector(state => state.templateName.templatesData);
    const userTemplate = useSelector(state => state.templateName.userTemplate);
    let allTemplate = useSelector(state => state.templateName.allTemplates);
    let templatesData = userTemplate.map(value => allTemplate[value])
    



    console.log('pre', templatesData, 'presenter')
    //console.log('pre', dataTemp, 'presenter')
    let templateData2 = {}; 

    const tempDetailPress = (name, light, moisture) => {
        templateData2 = {
            plantName: name,
            lightLevel: light,
            moistureLevel: moisture,
        }
        navigation.navigate("DetailsTemp", { templateData: templateData2 })}


    return(
          <UserTemplateView  tempDetailPress={tempDetailPress}  templatesData={templatesData} />
    )
  
}

