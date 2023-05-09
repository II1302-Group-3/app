import { BrowseTemplateNameView  } from './BrowseTemplateNameView';
import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setTemplateName } from '../../store/slices/garden';

export const BrowseTemplate = () => {
    //const templatesName = useSelector(state => state.templateName.templatesName);
    //const dispatch = useDispatch();
    //const templateName = useSelector(state => state.templateName.templatesName);
   // const templateName = useSelector(state => state.templateName.templatesName);
   const templatesName = ['apple', 'grape', 'tomato', "fdgsfg", "dwfwg ", "sdgdg", "dsf s", "sdf df "]
    //console.log(templateName + '3')
    return(

          <BrowseTemplateNameView plantName={templatesName} />

  

    )
  
}
