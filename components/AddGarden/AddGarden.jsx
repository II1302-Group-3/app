import React, { useState } from "react";
import { AddGardenView } from "./AddGardenView";

export const AddGarden = ({navigation}) => {
	const [name, setName] = useState("");
	const [serial, setSerial] = useState("");

	const isValidName = name.length > 0 && name.length < 100;
	const isValidSerial = serial.length == 12 && [...serial].every(c => c >= '0' && c <= '9');

	const setNameAndTrim = name => setName(name.trim());
	const setSerialAndTrim = serial => setSerial(serial.trim());

	return (
		<AddGardenView
			name={name}
			setName={setNameAndTrim}
			serial={serial}
			setSerial={setSerialAndTrim}
			isValidName={isValidName}
			isValidSerial={isValidSerial}
		/>
	);
}