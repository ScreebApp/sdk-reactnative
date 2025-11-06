import { type TurboModule, TurboModuleRegistry } from "react-native";

type HookIdsMap = { [key: string]: string };
type InitOptions = {
	isDebugMode?: boolean;
	disableMirror?: boolean;
};

export interface Spec extends TurboModule {
	initSdk(
		channelId: string,
		userId?: string,
		properties?: { [key: string]: unknown } | null,
		hooks?: HookIdsMap,
		initOptions?: InitOptions,
		language?: string,
	): Promise<void>;
	setIdentity(
		userId: string,
		properties?: { [key: string]: unknown } | null,
	): Promise<void>;
	setProperties(properties?: { [key: string]: unknown } | null): Promise<void>;
	assignGroup(
		type: string | null,
		name: string,
		properties?: { [key: string]: unknown } | null,
	): Promise<void>;
	unassignGroup(
		type: string | null,
		name: string,
		properties?: { [key: string]: unknown } | null,
	): Promise<void>;
	trackEvent(
		name: string,
		properties?: { [key: string]: unknown } | null,
	): Promise<void>;
	trackScreen(
		name: string,
		properties?: { [key: string]: unknown } | null,
	): Promise<void>;
	startSurvey(
		surveyId: string,
		allowMultipleResponses?: boolean,
		hiddenFields?: { [key: string]: unknown } | null,
		ignoreSurveyStatus?: boolean,
		hooks?: HookIdsMap,
		language?: string,
		distributionId?: string,
	): Promise<void>;
	startMessage(
		messageId: string,
		allowMultipleResponses?: boolean,
		hiddenFields?: { [key: string]: unknown } | null,
		ignoreMessageStatus?: boolean,
		hooks?: HookIdsMap,
		language?: string,
		distributionId?: string,
	): Promise<void>;
	debug(): Promise<void>;
	debugTargeting(): Promise<void>;
	resetIdentity(): Promise<void>;
	closeSdk(): Promise<void>;
	closeSurvey(surveyId?: string): Promise<void>;
	closeMessage(messageId?: string): Promise<void>;
	onHookResult(
		hookId: string,
		result: { [key: string]: unknown },
	): Promise<void>;
}

const module = TurboModuleRegistry.get<Spec>("ScreebReactNative");
if (!module) {
	const LINKING_ERROR =
		`The native module "ScreebReactNative" could not be found.\n` +
		"- Ensure the iOS/Android native code is compiled (iOS: run 'pod install' in the example app, then rebuild).\n" +
		"- If you're developing locally, run 'yarn prepare' to rebuild the JS output.\n" +
		"- On iOS, make sure the podspec is included and the app is rebuilt (not just reloaded).";
	throw new Error(LINKING_ERROR);
}

export default module as Spec;
