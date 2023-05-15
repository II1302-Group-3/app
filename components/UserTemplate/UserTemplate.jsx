import { loadOptions } from '@babel/core';
import { UserTemplateView  } from './UserTemplateView';
import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTemplate,setCanLike } from '../../store/slices/templateName';


export const UserTemplate = ( {navigation} ) => {
    const dispatch = useDispatch();
    const userTemplate = useSelector(state => state.templateName.userTemplate);
    let allTemplate = useSelector(state => state.templateName.allTemplates);
    let templatesData = userTemplate.map(value => allTemplate[value])
    



    console.log('USERTEMPLATE PRESENTER TEMPLATE DATA', templatesData)
    let templateData2 = []; 

    const tempDetailPress = (name, light, moisture) => {
        templateData2 = {
            plantName: name,
            lightLevel: light,
            moistureLevel: moisture,
        }
        dispatch(setSelectedTemplate(templateData2))
        dispatch(setCanLike(true))
        navigation.navigate("DetailsTemp", { templateData: templateData2 })}


    return(
          <UserTemplateView  tempDetailPress={tempDetailPress}  templatesData={templatesData} />
    )
  
}

