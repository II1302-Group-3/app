import { BrowseTemplateNameView  } from './BrowseTemplateNameView';
import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setTemplateName } from '../../store/slices/garden';

export const BrowseTemplate = ( {navigation} ) => {
    //const templatesName = useSelector(state => state.templateName.templatesName);
    //const dispatch = useDispatch();
    const templatesData = useSelector(state => state.templateName.templatesData);
    const plantNames = Object.values(templatesData).map(item => item.plantName);
    console.log(plantNames)
   // const templateName = useSelector(state => state.templateName.templatesName);
    //console.log(templateName + '3')

    const tempDetailPress = () => navigation.navigate("BrowseTemplateView")


    return(
          <BrowseTemplateNameView plantName={plantNames}  tempDetailPress={tempDetailPress} advancedIntoTitle={"title"}/>
    )
  
}
