import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView, Text, useColorScheme } from 'react-native';

function App() {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<Text>Green Garden</Text>
		</SafeAreaView>
	);
}

export default App;
