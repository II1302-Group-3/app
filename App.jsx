import React from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { selectIsLoggedIn } from './store/slices/firebaseAuth';
import { Home } from './components/Home/Home';
import { EnvironmentSettings } from './components/Garden/EnvironmentSettings/EnvironmentSettings';
import { LoginForm } from './components/Authentication/LoginForm/LoginForm';
import { RegistrationForm } from './components/Authentication/RegistrationForm/RegistrationForm';
import { AddGarden } from './components/AddGarden/AddGarden';
import { AddTemplate } from './components/Template/AddTemplate';
import { BrowseTemplate } from './components/BrowseTemlates/BrowseTemplate';
import { DetailsTemp } from './components/BrowseTemlates/DetailsTemp';
import { UserTemplate } from './components/UserTemplate/UserTemplate';

import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme
  } from '@react-navigation/native';
import { GardenView } from './components/Garden/GardenView';
import { Statistics } from './components/Garden/Statistics/Statistics';
import { QrScanner } from './components/AddGarden/QrScanner';
import { lightGreenTheme, darkGreenTheme } from './theme';

function App() {
	const Stack = createNativeStackNavigator();
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const isDarkMode = useColorScheme() === 'dark';

	const paperTheme = isDarkMode ? darkGreenTheme : lightGreenTheme;
	const navigationTheme = isDarkMode ? NavigationDarkTheme : NavigationDefaultTheme;

	const qrOptions = {
		title: "Scan for QR code",
		headerTransparent: true,
		headerStyle: {backgroundColor: "#000000aa"},
		headerTintColor: "white"
	};

	return (
		<PaperProvider theme={paperTheme}>
			<StatusBar backgroundColor={navigationTheme.colors.card} barStyle={isDarkMode ? "light-content" : "dark-content"} />
			<NavigationContainer theme={navigationTheme}>
				<Stack.Navigator initialRouteName="Home">
					{isLoggedIn ? (
						<>
						<Stack.Screen name="Home" component={ Home } />
						<Stack.Screen name="Garden" options={{title: ""}} component={ GardenView } />
						<Stack.Screen name="Statistics" options={{title: ""}} component={ Statistics } />
						<Stack.Screen name="EnvironmentSettings" options={{title: ""}} component={ EnvironmentSettings } />
						<Stack.Screen name="AddGarden" options={{ title: "Add Garden" }} component={ AddGarden } />
						<Stack.Screen name="UserTemplate" options={{ title: "My Templates" }} component={ UserTemplate } />
						<Stack.Screen name="BrowseTemplate" options={{ title: "Browse Template" }} component={ BrowseTemplate } />
						<Stack.Screen name="DetailsTemp" options={{ title: "" }} component={ DetailsTemp } />
						<Stack.Screen name="AddTemplate" options={{ title: "Add Template" }} component={ AddTemplate } />
						<Stack.Screen name="QrScanner" options={qrOptions} component={ QrScanner } />
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