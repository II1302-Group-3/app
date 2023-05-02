import React from 'react';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import {
	MD3DarkTheme as PaperDarkTheme,
	DefaultTheme as PaperDefaultTheme,
	Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { selectIsLoggedIn } from './store/slices/firebaseAuth';
import { Home } from './components/Home/Home';
import { EnvironmentSettings } from './components/EnvironmentSettings/EnvironmentSettings';
import { LoginForm } from './components/Authentication/LoginForm/LoginForm';
import { RegistrationForm } from './components/Authentication/RegistrationForm/RegistrationForm';
import { AddGarden } from './components/AddGarden/AddGarden';
import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme
  } from '@react-navigation/native';
import { QrScanner } from './components/AddGarden/QrScanner';

function App() {
	const Stack = createNativeStackNavigator();
	const isLoggedIn = useSelector(selectIsLoggedIn)
	const isDarkMode = useColorScheme() === 'dark';

	const paperTheme = isDarkMode ? PaperDarkTheme : PaperDefaultTheme;
	const navigationTheme = isDarkMode ? NavigationDarkTheme : NavigationDefaultTheme;

	return (
		<PaperProvider theme={paperTheme}>
			<NavigationContainer theme={navigationTheme}>
				<Stack.Navigator initialRouteName="Home">
					{isLoggedIn ? (
						<>
						<Stack.Screen name="Home" component={ Home } />
						<Stack.Screen name="EnvironmentSettings" component={ EnvironmentSettings } />
						<Stack.Screen name="AddGarden" options={{ title: "Add Garden" }} component={ AddGarden } />
						<Stack.Screen name="QrScanner" options={{ title: "Scan for QR code" }} component={ QrScanner } />
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