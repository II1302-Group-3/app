import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLight } from '../../store/slices/garden';
import { BrowseTemplateView } from './BrowseTemplateView';
import {  } from './BrowseTemplate';
import { setLiked } from '../../store/slices/templateName';

import { Alert } from 'react-native';

export const DetailsTemp = ({ }) => {
    const dispatch = useDispatch();

    const [isFilled, setIsFilled] = useState(false)
    const [advancedInfo, setAdvancedInfo] = useState(false);
    const name = useSelector(state => state.templateName.selectedTemplate.name)

    const onPress = (isFilled) => {
        setIsFilled(isFilled)
        dispatch(setLiked({isFilled}))
    }

    function hasAlreadyLiked() {
        
    }

    return(
        <BrowseTemplateView
            setAdvancedInfo={ setAdvancedInfo }
            advancedInfo={ advancedInfo }
            name={name}
            light={ 100 }
            moisture={ 200 }
            isFilled={isFilled} 
            setIsFilled={setIsFilled} 
            onPress={ onPress }
        />
    )
}