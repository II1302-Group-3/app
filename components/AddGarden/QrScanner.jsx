import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { DeniedQrScannerView, QrScannerView, UndeterminedQrScannerView } from "./QrScannerViews";
import { Linking } from "react-native";
import { setScannedSerial } from "../../store/slices/qrScanner";
import { useScanBarcodes, BarcodeFormat } from "vision-camera-code-scanner";

export const QrScanner = ({navigation}) => {
	const dispatch = useDispatch();

	const returnWithCode = code => {
		dispatch(setScannedSerial(code));
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
	}, []);

	const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
		checkInverted: true,
	});

	useEffect(() => {
		barcodes.every(barcode => {
			// Selects barcode.rawValue if it exists
			const serial = barcode.rawValue?.trim() ?? "";

			if(serial.length == 12 && [...serial].every(c => c >= '0' && c <= '9')) {
				returnWithCode(serial);
				return false;
			}

			// continue
			return true;
		});
	}, [barcodes])

	if(cameraPermission === "") {
		return <UndeterminedQrScannerView/>;
	}

	if(cameraPermission === "authorized") {
		return device ? <QrScannerView camera={device} frameProcessor={frameProcessor}/> : <UndeterminedQrScannerView/>;
	}

	return <DeniedQrScannerView openSettings={Linking.openSettings}/>;
}