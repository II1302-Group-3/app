import React from 'react';
import { EnvironmentSettingsSwitch } from './EnvironmentSettingsSwitch';

export const AdvancedInfoSwitch = ({ 
    advancedInfo,
    setAdvancedInfo,
    textColor }) => {

    const title = 'Advanced info';

    return(
        <EnvironmentSettingsSwitch
            title={ title }
            onToggle={ setAdvancedInfo }
            active={ advancedInfo }
            textColor={ textColor } />
    )
}