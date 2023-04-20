import React from 'react';
import { View } from 'react-native';
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
