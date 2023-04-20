import React from 'react';
import { useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView, Text, useColorScheme } from 'react-native';
import database from '@react-native-firebase/database';
import store from "./store/store";
import { Provider } from 'react-redux';
import { EnvironmentSettings } from './components/EnvironmentSettings/EnvironmentSettings';


function App() {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};
	
	return (
		<SafeAreaView style={backgroundStyle}>
			<Provider store={store}>
				<EnvironmentSettings />
			</Provider>
		</SafeAreaView>
	);
}

export default App;
