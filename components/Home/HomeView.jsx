import React from 'react';
import { Button } from 'react-native-paper';
import { useColorScheme, View, Text, StyleSheet, Image,TouchableHighlight } from 'react-native';
import { useColors } from '../../style';


const backgroundStyle = {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 10, // Height of the shadow
    padding: 20, 
    margin: 15,
};


export const HomeView = ({signOut, displayName, addNewGarden, navigation}) => {
    const styles = StyleSheet.create({
        color: useColors()
    })

    return(
        <View style={{}}>
            <Text style={{fontSize: 24, fontWeight: 'bold', margin: 15}} >Hello {displayName}</Text>
            
            <TouchableHighlight activeOpacity={0.1} underlayColor={styles.color.lightGray} onPress={() => navigation.navigate('Garden')}>
            <View style={{  backgroundColor: "white",
                            borderRadius: 10,
                            shadowColor: '#000',
                            shadowOpacity: 0.2,
                            elevation: 10, // Height of the shadow
                            padding: 20, 
                            margin: 15,}}>
                <Text style={{fontSize: 25}} >Garden 'One' </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 25}}>
                    <Text>
                        <Image source={require('../../assets/WaterDropIcon.png')} style={{width: 20, height: 20, marginRight: 10}} />
                        Looks Good
                    </Text>
            
                    <Text>
                    <Image source={require('../../assets/BulpIcon.png')} style={{width: 20, height: 20, marginRight: 10}} />
                        Looks Good 
                    </Text>
                </View>   
            </View>
            </TouchableHighlight>
            
             <Button mode="contained" style={{marginVertical: 1}} onPress={() => addNewGarden()}>Add Garden</Button>
             <Button mode="contained" style={{marginVertical: 30}} onPress={() => signOut()}>Sign out</Button>
        </View>
    )
}