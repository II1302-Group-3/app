import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowseTemplateView } from './BrowseTemplateView';
import { setMoisture, setLight, selectGarden, resetGarden} from '../../store/slices/garden';
import { setLiked, alreadyLiked, setHasLiked } from '../../store/slices/templateName';
import { useIsFocused } from "@react-navigation/native";

import { Alert } from 'react-native';

export const DetailsTemp = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(alreadyLiked())
    }, [])


    const templateData = useSelector(state => state.templateName.selectedTemplate)
    const light = templateData.light;
    const moisture = templateData.moisture;
    const hasLiked = useSelector(state => state.templateName.selectedTemplate.hasLiked);
    const [advancedInfo, setAdvancedInfo] = useState(false);
    const serial = useSelector(state => state.garden?.serial ?? "");
    const nickname = useSelector(state => state.garden?.nickname ?? "");
    const canLike = useSelector(state => state.templateName.selectedTemplate.canLike);

    const onPress = (isFilled) => {
        dispatch(setHasLiked(isFilled))
        dispatch(setLiked({isFilled}))
    }

    const applyTemplate = () => {console.log('applyTemplate pressed');
                                dispatch(setLight(light))
                                dispatch(setMoisture(moisture));
                                Alert.alert('Template applied successfully!');
                                }

    const gardens = useSelector(state => {
        return [...state.firebaseAuth.user?.claimedGardens].map(serial => {
        const nickname = state.firebaseAuth.user.claimedGardenNames[serial] ?? serial;
        return {serial, nickname};
    })
    });

    return(
        <BrowseTemplateView
            serial={serial}
            nickname={nickname}
            setAdvancedInfo={ setAdvancedInfo }
            advancedInfo={ advancedInfo }
            light={light  }
            moisture={ moisture }
            plantName={templateData.name}
            applyTemplate={applyTemplate}
            gardens={gardens}
            isFilled={hasLiked} 
            onPress={ onPress }
            canLike={canLike}
        />
    )
}