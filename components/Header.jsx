import React from 'react';
import { Image, Text, View } from 'react-native';

export const Header = ({ textColor }) => {
    return(
        <View style={{flexDirection: "row", paddingBottom: 40, paddingHorizontal: 20 }}>
            <Image style={{flex: 1, resizeMode: "contain", flexGrow: 0, flexBasis: 90 }} source={require("../assets/GreenGarden.png")}/>
            <Text 
                style={{flex: 1, 
                fontSize: 32, 
                fontWeight: 'bold', 
                color: textColor, 
                textAlign: "center", 
                alignSelf: "flex-end", 
                flexGrow: 1, 
                verticalAlign: "middle", 
                height: "100%" }}>
                Green Garden
            </Text>
        </View>
    )
}