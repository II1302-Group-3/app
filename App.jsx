import React, {useState,useEffect, Image}from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView, Text, useColorScheme, View, TouchableOpacity, Switch} from 'react-native';
import Slider from '@react-native-community/slider';
import store from './store/store';
import { Provider } from 'react-redux';
import { EnvironmentSettings } from './components/EnvironmentSettings/EnvironmentSettings';

function App() {

	return (
		
		<View>
			<Provider store={store}>
				<EnvironmentSettings />
			</Provider>
		</View>
		
	);
}

export default App;
