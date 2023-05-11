import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

export const UserTemplateView = ({ tempDetailPress, templatesData}) => {
  const [searchText, setSearchText] = useState('');

  const filteredPlantNames = templatesData.filter(name =>
    name.plantName.toLowerCase().includes(searchText.toLowerCase())
  );
  
  return (
    <View>
        <View style={{margin:'5%',}}>
        <TextInput
        label="Search"
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
    </View>
 
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {filteredPlantNames.map((name, index) => (
          <TouchableOpacity
              
            key={index}
            style={{
              backgroundColor: '#90ee90',
              borderRadius: 8,
              padding: '3%',
              margin: '2%',
              elevation: 6,
              width: '45%', 
              height: 80,
            }}
            onPress={() => tempDetailPress(name.plantName, name.lightLevel, name.moistureLevel)}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{name.plantName}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={require('../../assets/WaterDropIcon.png')}
                style={{ width: 20, height: 20, marginRight: 6 }}
              />

            <Text style={{ marginRight: 10 }}>{name.moistureLevel}</Text>
        
              
              <Image
                source={require('../../assets/BulpIcon.png')}
                style={{ width: 20, height: 20, marginRight: 6 }}
              />
              <Text>{name.lightLevel}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};