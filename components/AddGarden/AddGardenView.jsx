import React from "react";
import { View } from "react-native";
import { Button, Card, TextInput, Text } from "react-native-paper";

export const AddGardenView = ({name, setName, serial, setSerial, isValidName, isValidSerial}) => {
	return (
        <View style={{paddingHorizontal: 25, paddingVertical: 25, flexDirection: "column", height: "100%"}}>
			<View style={{flexGrow: 1, justifyContent: "center", flexDirection: "column"}}>
				<View>
					<TextInput label="Name your garden" mode="outlined" error={!isValidName} value={name} onChangeText={setName}></TextInput>
					<TextInput label="Serial number" mode="outlined" error={!isValidSerial} value={serial} onChangeText={setSerial}></TextInput>
					<Button mode="contained" style={{marginVertical: 25}} onPress={() => {}}>Claim</Button>
					<Button mode="text" icon={require("../../assets/qrexample.png")} onPress={() => {}}>Scan a QR code</Button>
				</View>
			</View>
			<View style={{flexGrow: 0}}>
				<Card>
					<Card.Content>
						<Text>
							You can find the serial number and a QR code under your Green Garden.
							The garden can only be claimed once it has been connected to Wi-Fi.
						</Text>
					</Card.Content>
				</Card>
			</View>
		</View>
	);
}