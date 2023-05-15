import { TemplateFormView } from './TemplateFormView';
import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {saveTemplate} from '../../store/slices/templateName'

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


    return(
        <TemplateFormView
            name={templateName}
            setLight={ setLightLevel }
            setMoisture={ setMoisture }
            setAdvancedInfo={ setAdvancedInfo }
            advancedInfo={ advancedInfo }
            saveTemplateValue ={saveTemplateValue}
            setTemplateName={setTemplateName}
        />
    )

}
