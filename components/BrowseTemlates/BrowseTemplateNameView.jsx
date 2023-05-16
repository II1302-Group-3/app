import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { TextInput, SegmentedButtons } from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { getTemplates } from '../../store/slices/templateName';
import { useColorScheme } from 'react-native';
import { lightGreenTheme, darkGreenTheme } from '../../theme';

export const BrowseTemplateNameView = ({ plantName, tempDetailPress, plantMoisture, plantLight, likePath, setLikePath, sortByRecent, sortByLikes }) => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
	const isFocused = useIsFocused();

	const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    dispatch(getTemplates());
	}, [isFocused])

  const templatesData = useSelector(state => state.templateName.templatesData);
  let filteredPlantNames = []; 
  if (templatesData) {
      filteredPlantNames = Object.keys(templatesData).map(a => templatesData[a]).filter(name =>
      name.plantName.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  const [templates, setTemplates] = useState(filteredPlantNames);


  useEffect(() => {

    if (templatesData) {
      setTemplates(Object.keys(templatesData).map(a => templatesData[a]).filter(name =>
        name.plantName.toLowerCase().includes(searchText.toLowerCase())))
    }
    
  }, [searchText, templatesData])

  return (
    <View style={{paddingHorizontal: 30, paddingVertical: 30}}>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          label="Search"
          mode="outlined"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>
      <SegmentedButtons
        style={{marginBottom: 30}}
        value={"value"}
        onValueChange={(val) => setTemplates(val)}
        buttons={[
          {
            value: sortByRecent(templates),
            label: 'Most Recent',
          },
          {
            value: sortByLikes(templates),
            label: 'Most Liked',
          }
        ]}
      />

      <ScrollView>
        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {templates.map((name, index) => (
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
              onPress={() => tempDetailPress(name.plantName, name.lightLevel,name.moistureLevel, Object.keys(templatesData)[index])}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{name.plantName.length < 7 ? name.plantName: name.plantName.substr(0, 7) + '...'}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ marginRight: 5}}>{ name.likedBy?.length ?? 0 }</Text>
                  <Image
                  source={require('../../assets/filled_heart.png')}
                  style={{ width: 20, height: 20}}
                ></Image>
                </View>
              </View>

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
    </View>
  );
};