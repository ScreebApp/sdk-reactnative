/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
	assignGroup,
	debug,
	debugTargeting,
	initSdk,
	setIdentity,
	setProperties,
	startSurvey,
	trackEvent,
	trackScreen,
	unassignGroup,
} from "@screeb/react-native";
import type { PropsWithChildren } from "react";
import React from "react";
import {
	Button,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from "react-native";
import {
	Colors,
	DebugInstructions,
	Header,
	LearnMoreLinks,
	ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";

type SectionProps = PropsWithChildren<{
	title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
	const isDarkMode = useColorScheme() === "dark";
	return (
		<View style={styles.sectionContainer}>
			<Text
				style={[
					styles.sectionTitle,
					{
						color: isDarkMode ? Colors.white : Colors.black,
					},
				]}
			>
				{title}
			</Text>
			<Text
				style={[
					styles.sectionDescription,
					{
						color: isDarkMode ? Colors.light : Colors.dark,
					},
				]}
			>
				{children}
			</Text>
		</View>
	);
}

function App(): React.JSX.Element {
	React.useEffect(() => {
		initSdk(
			"0e2b609a-8dce-4695-a80f-966fbfa87a88", // preview
			"0e2b609a-8dce-4695-a80f-966fbfa87a88", // preview
			"0021de43-6e44-443c-9903-2ab99f9c4233", // https://admin.screeb.app/org/73bd089b-61e3-49f4-86d5-08f1da50941d/people/respondent/f4776019-24d9-49aa-9e5d-a4a5a1d44ab1
			// "react-native@screeb.app",
			{
				// 'isConnected': false,
				// 'age': 29,
				// 'product': 'iPhone 13',
				// 'email': 'e2e@screeb.app',
			},
			{
				version: "1.0.0",
				onReady: (payload) => {
					console.log("onReady", payload);
				},
				onSurveyDisplayAllowed: (payload) => {
					console.log("onSurveyDisplayAllowed", payload);
					return true;
				},
			},
			{
				isDebugMode: false,
			},
		);

		// trackScreen('Dashboard')

		// setInterval(() => {
		// trackScreen('Dashboard', {
		//   'isConnected': false,
		// })
		// }, 1000);

		// setTimeout(() => {
		// trackScreen('ReactModuleHomeScreen', {
		//   'isConnected': false,
		//   'age': 29,
		//   'product': 'iPhone 13',
		// })
		// }, 5000)
	}, []);

	const isDarkMode = useColorScheme() === "dark";

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	return (
		<View style={backgroundStyle}>
			<StatusBar
				barStyle={isDarkMode ? "light-content" : "dark-content"}
				backgroundColor={backgroundStyle.backgroundColor}
			/>
			<ScrollView style={backgroundStyle}>
				<View style={styles.container}>
					<Text style={styles.sectionTitle}>Screeb demo app</Text>
					<Button
						title="Set identity"
						onPress={() =>
							setIdentity("react-user@screeb.app", {
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
							trackEvent("ReactModuleEvent", {
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
							trackScreen("ReactModuleScreen", {
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
							setProperties({
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
							startSurvey(
								"8dd42ae1-f716-429c-9843-fad62adf2ac4",
								true,
								null,
								true,
								{
									version: "1.0.0",
									onSurveyShowed: (payload: any) => {
										console.log("onSurveyShowed", payload);
									},
								},
							)
						}
					/>
					<View style={styles.space} />
					<Button
						title="Assign group"
						onPress={() =>
							assignGroup(null, "Apple", {
								age: null,
								product: "iPhone 13",
							})
						}
					/>
					<View style={styles.space} />
					<Button
						title="Unassign group"
						onPress={() =>
							unassignGroup(null, "Apple", {
								age: null,
								product: "iPhone 13",
							})
						}
					/>
					<View style={styles.space} />
					<Button title="debug" onPress={() => debug()} />
					<View style={styles.space} />
					<Button title="debug targeting" onPress={() => debugTargeting()} />
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
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

export default App;
