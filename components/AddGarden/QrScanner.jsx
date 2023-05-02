import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { DeniedQrScannerView, QrScannerView, UndeterminedQrScannerView } from "./QrScannerViews";
import { Linking } from "react-native";
import { setScannedSerial } from "../../store/slices/garden";

export const QrScanner = ({navigation}) => {
	const dispatch = useDispatch();

	const returnWithCode = code => {
		dispatch(setScannedSerial(code.trim()));
		navigation.goBack();
	}

	const [cameraPermission, setCameraPermission] = useState("");
	const device = useCameraDevices().back;
	
	// Run this when view is created
	useEffect(() => {
		// Not sure why but we need to wait here or the screen flashes gray
		setTimeout(() => {
			Camera.requestCameraPermission().then(result => {
				setCameraPermission(result);
			}).catch(() => {});
		}, 250);

		setTimeout(() => {
			returnWithCode("000000000000");
		}, 3000);
	}, []);

	if(cameraPermission === "") {
		return <UndeterminedQrScannerView/>;
	}

	if(cameraPermission === "authorized") {
		return device ? <QrScannerView camera={device} returnWithCode={returnWithCode}/> : <UndeterminedQrScannerView/>;
	}

	return <DeniedQrScannerView openSettings={Linking.openSettings}/>;
}