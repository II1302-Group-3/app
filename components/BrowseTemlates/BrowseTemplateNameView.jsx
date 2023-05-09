import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

export const BrowseTemplateNameView = ({ plantName, tempDetailPress }) => {
  const [searchText, setSearchText] = useState('');

  const filteredPlantNames = plantName.filter(name =>
    name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handlePlantPress = name => {
    console.log('Pressed plant:', name);
  };

  
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
            onPress={() => tempDetailPress(name)}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={require('../../assets/WaterDropIcon.png')}
                style={{ width: 20, height: 20, marginRight: 6 }}
              />
              <Text style={{ marginRight: 10 }}>High</Text>
              <Image
                source={require('../../assets/BulpIcon.png')}
                style={{ width: 20, height: 20, marginRight: 6 }}
              />
              <Text>Medium</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};