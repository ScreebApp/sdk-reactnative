import {
	DeviceEventEmitter,
	NativeEventEmitter,
	NativeModules,
	Platform,
} from "react-native";
import ScreebReactNative from "./NativeScreebReactNative";

// biome-ignore lint/suspicious/noExplicitAny: .
let emitter: any;

type HookFn = (payload: string) => unknown | Promise<unknown>;
type HookMap = {
	version?: string;
	[key: string]: unknown;
};

type HookIdsMap = { [key: string]: string };
type InitOptions = {
	isDebugMode?: boolean;
	disableMirror?: boolean;
};

// initSdk
export function initSdk(
	channelId: string,
	userId?: string,
	properties?: Record<string, unknown> | Map<string, unknown>,
	hooks?: HookMap,
	initOptions?: InitOptions,
	language?: string,
) {
	// Use NativeEventEmitter on both platforms; pass the native module on iOS
	// and rely on the default emitter on Android.
	if (Platform.OS === "ios") {
		emitter = new NativeEventEmitter(NativeModules.ScreebReactNative);
	} else {
		emitter = DeviceEventEmitter;
	}

	emitter.addListener("ScreebEvent", handleEvent);

	let mapHooksId: HookIdsMap | undefined;
	if (hooks != null) {
		mapHooksId = {};
		Object.keys(hooks).map((key) => {
			if (key === "version") {
				const v = hooks.version ?? undefined;
				if (v)
					mapHooksId = { ...mapHooksId, version: v } as {
						[key: string]: string;
					};
			} else {
				const uuid = Date.now().toString() + Math.random().toString() + key;
				const fn = (hooks as Record<string, unknown>)[key];
				if (typeof fn === "function") {
					hooksRegistry.set(uuid, fn as HookFn);
				}
				mapHooksId = { ...mapHooksId, [key]: uuid };
			}
		});
	}

	return ScreebReactNative.initSdk(
		channelId,
		userId,
		toObject(properties),
		mapHooksId,
		initOptions,
		language,
	);
}

// setIdentity
export function setIdentity(
	userId: string,
	properties?: Record<string, unknown> | Map<string, unknown> | null,
) {
	return ScreebReactNative.setIdentity(userId, toObject(properties));
}

// setProperties
export function setProperties(
	properties?: Record<string, unknown> | Map<string, unknown> | null,
) {
	return ScreebReactNative.setProperties(toObject(properties));
}

// assignGroup
export function assignGroup(
	type: string | null,
	name: string,
	properties?: Record<string, unknown> | Map<string, unknown> | null,
) {
	return ScreebReactNative.assignGroup(type, name, toObject(properties));
}

// unassignGroup
export function unassignGroup(
	type: string | null,
	name: string,
	properties?: Record<string, unknown> | Map<string, unknown> | null,
) {
	return ScreebReactNative.unassignGroup(type, name, toObject(properties));
}

// trackEvent
export function trackEvent(
	name: string,
	properties?: Record<string, unknown> | Map<string, unknown> | null,
) {
	return ScreebReactNative.trackEvent(name, toObject(properties));
}

// trackScreen
export function trackScreen(
	name: string,
	properties?: Record<string, unknown> | Map<string, unknown> | null,
) {
	return ScreebReactNative.trackScreen(name, toObject(properties));
}

// startSurvey
export function startSurvey(
	surveyId: string,
	allowMultipleResponses?: boolean,
	hiddenFields?: Record<string, unknown> | Map<string, unknown> | null,
	ignoreSurveyStatus?: boolean,
	hooks?: HookMap,
	language?: string,
	distributionId?: string,
) {
	let mapHooksId: HookIdsMap | undefined;
	if (hooks !== undefined) {
		mapHooksId = {};
		Object.keys(hooks).map((key) => {
			if (key === "version") {
				const v = hooks.version ?? undefined;
				if (v)
					mapHooksId = { ...mapHooksId, version: v } as {
						[key: string]: string;
					};
			} else {
				const uuid = Date.now().toString() + Math.random().toString() + key;
				const fn = (hooks as Record<string, unknown>)[key];
				if (typeof fn === "function") {
					hooksRegistry.set(uuid, fn as HookFn);
				}
				mapHooksId = { ...mapHooksId, [key]: uuid };
			}
		});
	}
	return ScreebReactNative.startSurvey(
		surveyId,
		allowMultipleResponses ?? true,
		toObject(hiddenFields),
		ignoreSurveyStatus ?? true,
		mapHooksId,
		language,
		distributionId,
	);
}

// startMessage
export function startMessage(
	messageId: string,
	allowMultipleResponses?: boolean,
	hiddenFields?: Record<string, unknown> | Map<string, unknown> | null,
	ignoreMessageStatus?: boolean,
	hooks?: HookMap,
	language?: string,
	distributionId?: string,
) {
	let mapHooksId: HookIdsMap | undefined;
	if (hooks !== undefined) {
		mapHooksId = {};
		Object.keys(hooks).map((key) => {
			if (key === "version") {
				const v = hooks.version ?? undefined;
				if (v)
					mapHooksId = { ...mapHooksId, version: v } as {
						[key: string]: string;
					};
			} else {
				const uuid = Date.now().toString() + Math.random().toString() + key;
				const fn = (hooks as Record<string, unknown>)[key];
				if (typeof fn === "function") {
					hooksRegistry.set(uuid, fn as HookFn);
				}
				mapHooksId = { ...mapHooksId, [key]: uuid };
			}
		});
	}
	return ScreebReactNative.startMessage(
		messageId,
		allowMultipleResponses ?? true,
		toObject(hiddenFields),
		ignoreMessageStatus ?? true,
		mapHooksId,
		language,
		distributionId,
	);
}

// debug
export function debug() {
	return ScreebReactNative.debug();
}

// debugTargeting
export function debugTargeting() {
	return ScreebReactNative.debugTargeting();
}

// resetIdentity
export function resetIdentity() {
	return ScreebReactNative.resetIdentity();
}

// closeSdk
export function closeSdk() {
	if (emitter) {
		emitter.removeAllListeners("ScreebEvent");
		emitter = undefined;
	}
	return ScreebReactNative.closeSdk();
}

// closeSurvey
export function closeSurvey(surveyId?: string) {
	return ScreebReactNative.closeSurvey(surveyId);
}

// closeMessage
export function closeMessage(messageId?: string) {
	return ScreebReactNative.closeMessage(messageId);
}

const hooksRegistry = new Map<
	string,
	(payload: string) => unknown | Promise<unknown>
>();

function handleEvent(event: { hookId?: string; payload?: string }) {
	if (event?.hookId != null) {
		const hook = hooksRegistry.get(event.hookId);
		if (hook != null) {
			const payload = event.payload ?? "{}";
			const result = hook(payload);
			const parsedPayload = JSON.parse(payload);
			const originalHookId = parsedPayload?.hook_id;
			if (originalHookId) {
				if (result instanceof Promise) {
					result
						.then((result) => {
							ScreebReactNative.onHookResult(originalHookId, { result });
						})
						.catch((error) => {
							console.error(error);
						});
				} else {
					ScreebReactNative.onHookResult(originalHookId, { result });
				}
			}
		}
	}
}

function toObject(
	value?: Record<string, unknown> | Map<string, unknown> | null,
): { [key: string]: unknown } | undefined {
	if (value == null) return undefined;
	if (value instanceof Map) {
		return Object.fromEntries(value as Map<string, unknown>);
	}
	return value as { [key: string]: unknown };
}
