import React from 'react';
import { View } from 'react-native';
import store from './store/store';
import { Provider } from 'react-redux';
import { EnvironmentSettings } from './components/EnvironmentSettings/EnvironmentSettings';
import { LoginForm } from './components/Authentication/LoginForm/LoginForm';

function App() {
	return (
		<View>
			<Provider store={store}>
				<LoginForm />
			</Provider>
		</View>
	);
}

export default App;
