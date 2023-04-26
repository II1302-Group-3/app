import React, { useState } from 'react';
import { View } from 'react-native';
import store from './store/store';
import { Provider, useSelector } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { selectedIsLoggedIn } from './store/slices/firebaseAuth';
import { Home } from './components/Home/Home';
import { EnvironmentSettings } from './components/EnvironmentSettings/EnvironmentSettings';
import { LoginForm } from './components/Authentication/LoginForm/LoginForm';
import { RegistrationForm } from './components/Authentication/RegistrationForm/RegistrationForm';

function App() {
	const Stack = createNativeStackNavigator();
	const isLoggedIn = useSelector(selectedIsLoggedIn)
	
	return (
			<PaperProvider>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Home">
						{isLoggedIn ? (
							<>
							<Stack.Screen name="Home" component={ Home } />
							<Stack.Screen name="EnvironmentSettings" component={ EnvironmentSettings } />
							</>
						) : (
							<>
							<Stack.Screen name="Home" component={ LoginForm } />
							<Stack.Screen name="Signup" component={ RegistrationForm } />
							</>
						)}
					</Stack.Navigator>
				</NavigationContainer>
			</PaperProvider>
	);
}

export default App;
