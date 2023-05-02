import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { Camera } from "react-native-vision-camera";

// Used when waiting for the user to allow camera access
export const UndeterminedQrScannerView = () => {
	return <View style={{backgroundColor: "black"}}/>;
}

// Used when the user denied camera access
export const DeniedQrScannerView = ({openSettings}) => {
	return (
		<View style={{backgroundColor: "black", height: "100%", flexDirection: "column", justifyContent: "center" }}>
			<Text style={{color: "white", textAlign: "center"}}>The app has no access to the camera</Text>
			<Button mode="text" onPress={openSettings} dark={true}>Open Settings app</Button>
		</View>
	);
}

// Used when the user allows camera access
export const QrScannerView = ({camera, frameProcessor}) => {
	return (
		<View style={{backgroundColor: "white"}}>
			<Camera 
				style={{width: "100%", height: "100%"}} 

				device={camera} 
				isActive={true} 

				frameProcessor={frameProcessor} 
				frameProcessorFps={10}
			/>
		</View>
	);
}