import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowseTemplateView } from './BrowseTemplateView';
import { setMoisture, setLight, selectGarden, resetGarden} from '../../store/slices/garden';
import { Alert } from 'react-native';

export const DetailsTemp = ({route }) => {
    const dispatch = useDispatch();



    const { templateData } = route.params;
    const light = templateData.lightLevel;
    const moisture = templateData.moistureLevel
    const [advancedInfo, setAdvancedInfo] = useState(false);
    const serial = useSelector(state => state.garden?.serial ?? "");
    const nickname = useSelector(state => state.garden?.nickname ?? "");


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
            plantName={templateData.plantName}
            applyTemplate={applyTemplate}
            gardens={gardens}
        />
    )
}