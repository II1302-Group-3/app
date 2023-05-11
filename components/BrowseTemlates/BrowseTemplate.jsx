import { BrowseTemplateNameView } from './BrowseTemplateNameView';
import React, { useReducer, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTemplateName, setSelectedTemplate, getTemplates } from '../../store/slices/templateName';
import module from '@react-native-firebase/app';

export const BrowseTemplate = ({ navigation }) => {
    //const templatesName = useSelector(state => state.templateName.templatesName);
    const dispatch = useDispatch();

    // useEffect(() => {
        
    // }, [])
    // const templatesData = useSelector(state => state.templateName.templatesData);


    let templateData2 = {};

    // const templateName = useSelector(state => state.templateName.templatesName);
    //console.log(templateName + '3')

    const tempDetailPress = (name, light, moisture, id) => {
        templateData2 = {
            plantName: name,
            lightLevel: light,
            moistureLevel: moisture,
            id
        }
        dispatch(setSelectedTemplate(templateData2))
        navigation.navigate("DetailsTemp")
    }


    return (
        <BrowseTemplateNameView tempDetailPress={tempDetailPress} />
    )

}

