import { BrowseTemplateNameView } from './BrowseTemplateNameView';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTemplate } from '../../store/slices/templateName';
import { setCanLike } from '../../store/slices/templateName';


export const BrowseTemplate = ({ navigation }) => {
    //const templatesName = useSelector(state => state.templateName.templatesName);
    const dispatch = useDispatch();
    const templatesData = useSelector(state => state.templateName.templatesData);
    const plantNames = Object.values(templatesData).map(item => item.plantName);
    const plantLight = Object.values(templatesData).map(item => item.lightLevel);
    const plantMoisture = Object.values(templatesData).map(item => item.moistureLevel);

    const sortByRecent = templatesData => {
        return Object.values(templatesData).sort((template1, template2) => (template2?.date ?? 0) - (template1?.date ?? 0));
    }

    const sortByLikes = templatesData => {
        return Object.values(templatesData).sort((template1, template2) => (template2?.likedBy?.length ?? 0) - (template1?.likedBy?.length ?? 0));
    }

    let templateData2 = {};
    useEffect(() => { dispatch(setCanLike(true)) }, []);

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
        <BrowseTemplateNameView sortByRecent={sortByRecent} sortByLikes={sortByLikes} tempDetailPress={tempDetailPress} />
    )

}

