import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddGardenView } from "./AddGardenView";
import { setScannedSerial } from "../../store/slices/garden";

export const AddGarden = ({navigation, route}) => {
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [serial, setSerial] = useState("");

	const isValidName = name.trim().length > 0 && name.length < 100;
	const isValidSerial = serial.length == 12 && [...serial].every(c => c >= '0' && c <= '9');

	const setSerialAndTrim = serial => setSerial(serial.trim());
	const openQrScanner = () => navigation.navigate("QrScanner");

	const scannedSerial = useSelector(state => state.garden.scannedSerial);

	useEffect(() => {
		if(scannedSerial !== "") {
			setSerial(scannedSerial);
			dispatch(setScannedSerial(""));
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

			openQrScanner={openQrScanner}
		/>
	);
}