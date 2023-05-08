import { BrowseTemplateNameView  } from './BrowseTemplateNameView';
import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setTemplateName } from '../../store/slices/templateName';

export const BrowseTemplate = (templateDAta) => {
    //const templatesName = useSelector(state => state.templateName.templatesName);
    const dispatch = useDispatch();
    const templateNams = templateNames => dispatch(setTemplateName(templateNames))
    const [templateName, setTemplateName] = useState("grape");
    return(
        <BrowseTemplateNameView
            plantName={templateName}
        />
    )
  
}
