import React from 'react';
import { View } from 'react-native';
import store from './store/store';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { EnvironmentSettings } from './components/EnvironmentSettings/EnvironmentSettings';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginForm } from './components/Authentication/LoginForm/LoginForm';
import { RegistrationForm } from './components/Authentication/RegistrationForm/RegistrationForm';

function App() {
	const Stack = createNativeStackNavigator();
	
	return (
		<Provider store={store}>
			<PaperProvider>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Login">
						<Stack.Screen name="Login" component={ LoginForm } />
						<Stack.Screen name="Signup" component={ RegistrationForm } />
						<Stack.Screen name="EnvironmentSettings" component={ EnvironmentSettings } />
					</Stack.Navigator>
				</NavigationContainer>
			</PaperProvider>
			{/* <EnvironmentSettings /> */}
		</Provider>
	);
}

export default App;
