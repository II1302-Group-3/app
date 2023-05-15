import { TemplateFormView } from './TemplateFormView';
import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {saveTemplate} from '../../store/slices/templateName';
import Toast from 'react-native-simple-toast';

export const AddTemplate = ({navigation}) => {
    const uid = useSelector(state => state.firebaseAuth.user.uid)

    const dispatch = useDispatch();
    const [advancedInfo, setAdvancedInfo] = useState(false);
    const [changeLight, setLightLevel] = useState(0);
    const [moistureLevel, setMoisture] = useState(0);
    const [templateName, setTemplateName] = useState("");
    const saveTemplateValue = () => {dispatch(saveTemplate({
        tempLight: changeLight,
        tempmoisture: moistureLevel,
        tempName: templateName,
        uid,
        date: new Date().getTime()
        }));
        navigation.navigate("Home");
    }

    const garden = useSelector(state => state.garden?.nickname ?? "");
    const gardenLight = useSelector(state => state.garden?.light ?? 0);
    const gardenMoisture = useSelector(state => state.garden?.moisture ?? 0);

    useEffect(() => {
        if(garden !== "") {
            // Shows up too fast without setTimeout
            setTimeout(() => Toast.showWithGravity(`Settings copied from ${garden}`, Toast.SHORT, Toast.BOTTOM), 250);
            setLightLevel(gardenLight);
            setMoisture(gardenMoisture);
        }
    }, [garden]);


    return(
        <TemplateFormView
            name={templateName}
            light={changeLight}
            moisture={moistureLevel}
            setLight={ setLightLevel }
            setMoisture={ setMoisture }
            setAdvancedInfo={ setAdvancedInfo }
            advancedInfo={ advancedInfo }
            saveTemplateValue ={saveTemplateValue}
            setTemplateName={setTemplateName}
        />
    )

}
