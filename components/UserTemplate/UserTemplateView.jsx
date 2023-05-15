import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { lightGreenTheme, darkGreenTheme } from '../../theme';

export const UserTemplateView = ({ tempDetailPress, templatesData}) => {
  const [searchText, setSearchText] = useState('');

  const isDarkMode = useColorScheme() === 'dark';

  const filteredPlantNames = templatesData.filter(name =>
    name.plantName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView style={{paddingHorizontal: 30, paddingVertical: 30}}>
        <View style={{marginBottom: 30}}>
          <TextInput
            label="Search"
            mode="outlined"
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
       </View>

      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredPlantNames.map((name, index) => (
          <TouchableOpacity
            activeOpacity={0.6}
            key={index}
            style={{
              backgroundColor: isDarkMode ? darkGreenTheme.colors.surfaceVariant : lightGreenTheme.colors.surfaceVariant,
              borderRadius: 8,
              padding: 12,
              margin: 8,
              elevation: 0,
              width: '45%',
              height: 80,
              flexDirection: "column",
              justifyContent: "space-between"
            }}
            onPress={() => tempDetailPress(name.plantName, name.lightLevel, name.moistureLevel)}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{name.plantName}</Text>
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
    </ScrollView>
  );
};