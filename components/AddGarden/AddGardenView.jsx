import React from "react";
import { View } from "react-native";
import { Button, Card, TextInput, Text } from "react-native-paper";

export const AddGardenView = props => {
	return (
        <View style={{paddingHorizontal: 25, paddingVertical: 25, flexDirection: "column", height: "100%"}}>
			<View style={{flexGrow: 1, justifyContent: "center", flexDirection: "column"}}>
				<View>
					<TextInput 
						label="Name your garden" 
						mode="outlined" 

						error={!props.isValidName} 
						value={props.name} 
						onChangeText={props.setName} 
					/>
					<TextInput 
						label="Serial number" 
						mode="outlined" 

						error={!props.isValidSerial} 
						value={props.serial} 
						onChangeText={props.setSerial} 
						
						keyboardType="numeric" 
						maxLength={12} 
					/>
					<Button mode="contained" style={{marginVertical: 25}} onPress={() => {}}>Claim</Button>
					<Button mode="text" icon={require("../../assets/qrexample.png")} onPress={props.openQrScanner}>Scan a QR code</Button>
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