import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { TextInput, SegmentedButtons } from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { getTemplates } from '../../store/slices/templateName';

export const BrowseTemplateNameView = ({ plantName, tempDetailPress, plantMoisture, plantLight, likePath, setLikePath, sortByRecent, sortByLikes }) => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
	const isFocused = useIsFocused();

  useEffect(() => {
		console.log("called getTemplates")
    dispatch(getTemplates());
	}, [isFocused])

  const templatesData = useSelector(state => state.templateName.templatesData);

  const filteredPlantNames = Object.keys(templatesData).map(a => templatesData[a]).filter(name => 
    name.plantName.toLowerCase().includes(searchText.toLowerCase())
  );
  const [templates, setTemplates] = useState(filteredPlantNames);

  useEffect(() => {
    setTemplates(Object.keys(templatesData).map(a => templatesData[a]).filter(name => 
      name.plantName.toLowerCase().includes(searchText.toLowerCase())))
  }, [searchText])

  return (
    <View>
      <View style={{ margin: '5%', }}>
        <TextInput
          label="Search"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>
      <SegmentedButtons
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
        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {templates.map((name, index) => (
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
              onPress={() => tempDetailPress(name.plantName, name.lightLevel,name.moistureLevel, Object.keys(templatesData)[index])}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{name.plantName}</Text>
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