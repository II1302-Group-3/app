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
    console.log(serial, nickname, '2')


    const applyTemplate = () => {console.log('applyTemplate pressed');
    
                                console.log(num, name)

                                 console.log(moisture, light)
                                 dispatch(setLight(light))
                                dispatch(setMoisture(moisture)); 
                                console.log(moisture, light)
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