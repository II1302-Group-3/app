import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddGardenView } from "./AddGardenView";
import { resetScannedSerial } from "../../store/slices/qrScanner";
import { addGarden, removeGarden } from "../../store/slices/garden";
import { Alert } from "react-native";

export const AddGarden = ({navigation}) => {
	const dispatch = useDispatch();

	const [serial, setSerial] = useState("");
	const [name, setName] = useState("");

	const isValidSerial = serial.length == 12 && [...serial].every(c => c >= '0' && c <= '9');
	const isValidName = name.trim().length > 0 && name.length < 100;

	const setSerialAndTrim = serial => setSerial(serial.trim());

	const idToken = useSelector(state => state.firebaseAuth.user.token);
	const claimGarden = () => {
		if(isValidName && isValidSerial) {
			addGarden(idToken, serial, name, dispatch)
				.catch(error => Alert.alert("Failed to add garden", error.message))
				.finally(() => navigation.navigate("Home"));
		}
	}
	const rmGarden = () => {
		if(isValidName && isValidSerial) {
			removeGarden(idToken, serial, dispatch)
				.catch(error => Alert.alert("Failed to add garden", error.message))
				.finally(() => navigation.navigate("Home"));
		}
	}
	const openQrScanner = () => navigation.navigate("QrScanner");

	const scannedSerial = useSelector(state => state.qrScanner.scannedSerial);

	// Watch for any changes made by QrScanner
	useEffect(() => {
		if(scannedSerial) {
			setSerial(scannedSerial);
			dispatch(resetScannedSerial());
		}
	}, [scannedSerial]);

	return (
		<AddGardenView
			name={name}
			setName={setName}
			serial={serial}
			setSerial={setSerialAndTrim}

			isValidName={isValidName}
			isValidSerial={isValidSerial}

			claimGarden={claimGarden}
			removeGarden={rmGarden}
			openQrScanner={openQrScanner}
		/>
	);
}