import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AddGardenView } from "./AddGardenView";
import { resetScannedSerial } from "../../store/slices/qrScanner";
import { addGarden } from "../../store/slices/garden";
import { Alert } from "react-native";

export const AddGarden = ({navigation}) => {
	const dispatch = useDispatch();

	const [serial, setSerial] = useState("");
	const [name, setName] = useState("");

	const setSerialAndTrim = serial => setSerial(serial.trim());

	const isValidSerial = serial.length == 12 && [...serial].every(c => c >= '0' && c <= '9');
	const isValidName = name.trim().length > 0 && name.length < 100;
	const canClaim = isValidSerial && isValidName;

	const userToken = useSelector(state => state.firebaseAuth.user.token);
	const [isClaiming, setIsClaiming] = useState(false);

	useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => isClaiming);
        return () => backHandler.remove();
      }, []);

	const claimGarden = () => {
		if(canClaim) {
			setIsClaiming(true);

			addGarden(userToken, serial, name, dispatch)
				.catch(error => Alert.alert("Failed to add garden", error.message))
				.finally(() => {
					setIsClaiming(false);
					navigation.navigate("Home");
				});
		}
	}

	const scannedSerial = useSelector(state => state.qrScanner.scannedSerial);
	const openQrScanner = () => navigation.navigate("QrScanner");

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

			canPressClaim={canClaim && !isClaiming}
			canPressQr={!isClaiming}
			loading={isClaiming}

			claimGarden={claimGarden}
			openQrScanner={openQrScanner}
		/>
	);
}