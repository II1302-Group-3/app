import React, { useState } from 'react';
import { EnvironmentSettingsView } from './EnvironmentSettingsView';

export const EnvironmentSettings = () => {
    const [advancedInfo, setAdvancedInfo] = useState(false);

    return(
        <EnvironmentSettingsView 
            setAdvancedInfo={ setAdvancedInfo }
            advancedInfo={ advancedInfo } />
    )
}