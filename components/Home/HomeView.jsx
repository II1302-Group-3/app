import React from 'react';
import { Button, Card, Avatar, Text } from 'react-native-paper';
import { View, Image, TouchableOpacity } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

const backgroundStyle = {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 10, // Height of the shadow
    padding: 20,
    margin: 15,
};


const GardenEntry = (garden, onPress) => {
    const onlineIcon = require('../../assets/globe.png');
    const waterDropIcon = require('../../assets/WaterDropIcon.png');

    return (
        <TouchableOpacity onPress={() => onPress(garden)} activeOpacity={0.6} style={{marginBottom: 16}} key={garden.serial}>
            <Card mode="contained">
                <Card.Title titleVariant="titleMedium" title={garden.nickname} subtitleStyle="titleSmall" subtitle={garden.serial}></Card.Title>
                <Card.Content>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={onlineIcon} style={{width: 20, height: 20, marginRight: 6}} />
                        <Text style={{marginRight: 10}}>
                            {garden.online ? "Online" : "Offline"}
                        </Text>
                        <Image source={waterDropIcon} style={{width: 20, height: 20, marginRight: 6}} />
                        <Text>
                            {garden.waterLevelLow ? "Water tank empty" : "Water tank full"}
                        </Text>
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
}

const NoGardens = () => {
    return (
        <Card>
            <Card.Content>
                <Text>
                    No gardens have been added yet.
                    You can add your garden to this list by selecting "Add a new Green Garden" and entering the serial number.
                </Text>
            </Card.Content>
        </Card>
    );
}

export const HomeView = ({signOut, displayName, gardens, addNewGarden, openGarden, addNewTemplate, myTemplates}) => {
    const headerHeight = useHeaderHeight();

    return(
        <View style={{paddingHorizontal: 25, paddingTop: 30, paddingBottom: 30, flexDirection: "column", height: "100%"}}>
            <View style={{flexGrow: 1}}>
                <Text variant="headlineMedium" style={{fontWeight: "bold", marginBottom: 30}} >Hello {displayName}</Text>
                {gardens.map(g => GardenEntry(g, e => openGarden(e)))}
                {gardens.length == 0 && <NoGardens/>}
            </View>
            <View style={{flexGrow: 0}}>
                <Button mode="contained" style={{marginBottom: 10}} onPress={() => addNewGarden()}>Add a new Green Garden</Button>
                <Button mode="contained" style={{marginBottom: 10}} onPress={() => addNewTemplate()}>Create a plant template</Button>
                <Button mode="contained" style={{marginBottom: 10}} onPress={() => myTemplates()}>View my templates</Button>
                <Button mode="contained-tonal" style={{}} onPress={() => signOut()}>Sign out</Button>
            </View>
        </View>
    )
}