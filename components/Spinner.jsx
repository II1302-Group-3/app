import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const Spinner = () => {
	return (
		<View style={{width: "100%", height: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
			<ActivityIndicator animating={true} size="large"></ActivityIndicator>
		</View>
	)
}