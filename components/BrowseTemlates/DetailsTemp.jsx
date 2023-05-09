import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowseTemplateView } from './BrowseTemplateView';
import {  } from './BrowseTemplate';

import { Alert } from 'react-native';

export const DetailsTemp = ({ }) => {
    const dispatch = useDispatch();




    const [advancedInfo, setAdvancedInfo] = useState(false);

	


    return(
        <BrowseTemplateView
            setAdvancedInfo={ setAdvancedInfo }
            advancedInfo={ advancedInfo }
            light={ 100 }
            moisture={ 200 }
        />
    )
}