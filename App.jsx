import React from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { selectIsLoggedIn } from './store/slices/firebaseAuth';
import { Home } from './components/Home/Home';
import { EnvironmentSettings } from './components/EnvironmentSettings/EnvironmentSettings';
import { LoginForm } from './components/Authentication/LoginForm/LoginForm';
import { RegistrationForm } from './components/Authentication/RegistrationForm/RegistrationForm';
import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme
  } from '@react-navigation/native';
import { lightGreenTheme, darkGreenTheme } from './theme';

function App() {
	const Stack = createNativeStackNavigator();
	const isLoggedIn = useSelector(selectIsLoggedIn)
	const isDarkMode = useColorScheme() === 'dark';

	const paperTheme = isDarkMode ? darkGreenTheme : lightGreenTheme;
	const navigationTheme = isDarkMode ? NavigationDarkTheme : NavigationDefaultTheme;
	
	return (
		<PaperProvider theme={paperTheme}>
			<StatusBar backgroundColor={navigationTheme.colors.card} barStyle={isDarkMode ? "light-content" : "dark-content"} />
			<NavigationContainer theme={navigationTheme}>
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