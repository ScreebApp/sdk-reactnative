import * as Screeb from "@screeb/react-native";
import { useEffect } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

const initScreeb = async () => {
	Screeb.initSdk(
		"de55cf0e-1cb6-4e2c-8bf5-ef4d72e63922", // preview
		"react-native@screeb.app",
		{
			// 'isConnected': false,
			// 'age': 29,
			// 'product': 'iPhone 13',
			// 'email': 'e2e@screeb.app',
		},
		{
			version: "1.0.0",
			onReady: (payload: unknown) => {
				console.log("onReady", payload);
			},
			onSurveyDisplayAllowed: (payload: unknown) => {
				console.log("onSurveyDisplayAllowed", payload);
				return true;
			},
		},
		{},
	);
};

export default function App() {
	useEffect(() => {
		initScreeb();
	}, []);

	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.sectionTitle}>Screeb demo app</Text>
				<View style={styles.space} />
				<Button title="Init SDK" onPress={() => initScreeb()} />
				<View style={styles.space} />
				<Button title="Close SDK" onPress={() => Screeb.closeSdk()} />
				<View style={styles.space} />
				<Button
					title="Set identity"
					onPress={() =>
						Screeb.setIdentity("react-user@screeb.app", {
							isConnected: false,
							age: 29,
							product: "iPhone 13",
						})
					}
				/>
				<View style={styles.space} />
				<Button
					title="Track event"
					onPress={() =>
						Screeb.trackEvent("ReactModuleEvent", {
							isConnected: false,
							age: 29,
							product: "iPhone 13",
						})
					}
				/>
				<View style={styles.space} />
				<Button
					title="Track screen"
					onPress={() =>
						Screeb.trackScreen("ReactModuleScreen", {
							isConnected: false,
							age: 29,
							product: "iPhone 13",
						})
					}
				/>
				<View style={styles.space} />
				<Button
					title="Set visitor properties"
					onPress={() =>
						Screeb.setProperties({
							isConnected: false,
							age: 29,
							product: "iPhone 13",
						})
					}
				/>
				<View style={styles.space} />
				<Button
					title="Start survey"
					onPress={() =>
						Screeb.startSurvey(
							"8dd42ae1-f716-429c-9843-fad62adf2ac4",
							true,
							null,
							true,
							{
								version: "1.0.0",
								onSurveyShowed: (payload: string) => {
									console.log("onSurveyShowed", payload);
									return null;
								},
							},
						)
					}
				/>
				<View style={styles.space} />
				<Button
					title="Assign group"
					onPress={() =>
						Screeb.assignGroup(null, "Apple", {
							age: null,
							product: "iPhone 13",
						})
					}
				/>
				<View style={styles.space} />
				<Button
					title="Unassign group"
					onPress={() =>
						Screeb.unassignGroup(null, "Apple", {
							age: null,
							product: "iPhone 13",
						})
					}
				/>
				<View style={styles.space} />
				<Button title="debug" onPress={() => Screeb.debug()} />
				<View style={styles.space} />
				<Button
					title="debug targeting"
					onPress={() => Screeb.debugTargeting()}
				/>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: "600",
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: "400",
	},
	highlight: {
		fontWeight: "700",
	},
	space: {
		width: 20,
		height: 20,
	},
});
