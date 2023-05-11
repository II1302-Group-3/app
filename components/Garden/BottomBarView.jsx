import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';
import { EnvironmentSettings } from './EnvironmentSettings/EnvironmentSettings';
import { StatisticsView } from './Statistics/StatisticsView';

export const BottomBarView = ({ }) => {
    const Tab = createBottomTabNavigator();
    
    return(
    //     <Tab.Navigator
    //   initialRouteName="Feed"
    //   shifting={true}
    //   sceneAnimationEnabled={false}
    // >
    //   <Tab.Screen
    //     name="EnvironmentSettings"
    //     component={EnvironmentSettings}
    //     options={{
    //       tabBarIcon: 'home-account',
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Statistics"
    //     component={StatisticsView}
    //     options={{
    //       tabBarIcon: 'bell-outline',
    //     }}
    //   />
    // </Tab.Navigator>
        // <Tab.Navigator 
        //     screenOptions={{headerShown: false}}
        //     tabBar={({navigation, state, descriptors, insets}) => (
        //         <BottomNavigation.Bar
        //             navigationState={state}
        //             safeAreaInsets={insets}
        //             onTabPress={({route, preventDefault}) => {
        //                 const event = navigation.emit({
        //                     type: 'tabPress',
        //                     target: route.key,
        //                     canPreventDefault: true
        //                 });

        //                 if(event.defaultPrevented) {
        //                     preventDefault();
        //                 } else {
        //                     navigation.dispatch({
        //                         ...CommonActions.navigate(route.name, route.params),
        //                         target: state.key
        //                     });
        //                 }
        //             }}
        //             renderIcon={({route, focused, color}) => {
        //                 const { options } = descriptors[route.key];
                        
        //                 if(options.tabBarIcon) {
        //                     return options.tabBarIcon({focused, color, size: 24})
        //                 }

        //                 return null;
        //             }}
        //             getLabelText={({ route }) => {
        //                 const { options} = descriptors[route.key];
        //                 const label = options.tarBarLabel !== undefined ?
        //                     options.tarBarLabel :
        //                     options.title !== undefined ?
        //                     options.title :
        //                     route.title;
                        
        //                 return label;
        //             }} />
        //     )}>
        //         <Tab.Screen
        //             name="EnvironmentSettings"
        //             component={EnvironmentSettings}
        //             options={{
        //                 tabBarLabel: 'Settings',
        //                 tabBarIcon: ({color, size}) => <Icon name="cog" size={size} color={color} />
        //             }} />
        //         <Tab.Screen
        //             name="Statistics"
        //             component={StatisticsView}
        //             options={{
        //                 tabBarLabel: 'Statistics',
        //                 tabBarIcon: ({color, size}) => <Icon name="stats-chart" size={size} color={color} />
        //             }} />

        // </Tab.Navigator>
    <Tab.Navigator
        screenOptions={{
            "tabBarActiveTintColor": "#e91e63",
            "tabBarStyle": [
              {
                "display": "flex"
              },
              null
            ]
          }}
      initialRouteName="EnvironmentSettings"
    >
      <Tab.Screen
        name="EnvironmentSettings"
        component={EnvironmentSettings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsView}
        options={{
          tabBarLabel: 'Statistics',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
    )
}