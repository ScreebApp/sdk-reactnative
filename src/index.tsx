import {
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from "react-native";

const LINKING_ERROR =
  `The package '@screeb/react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: "" }) +
  "- You rebuilt the app after installing the package\n" +
  "- You are not using Expo managed workflow\n";

const ScreebModule = NativeModules.ScreebModule
  ? NativeModules.ScreebModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

let hooksRegistry = new Map<string, any>();

export function initSdk(
  androidChannelId: string,
  iosChannelId: string,
  userId?: string,
  properties?: Map<string, any>,
  hooks?: any,
  isDebugMode?: boolean,
  language?: string
) {
  const emitter =
    Platform.OS === "ios"
      ? new NativeEventEmitter(NativeModules.ScreebModule)
      : DeviceEventEmitter;
  emitter.addListener("ScreebEvent", handleEvent);
  let mapHooksId: any = undefined;
  if (hooks != null) {
    mapHooksId = new Object();
    Object.keys(hooks).map((key) => {
      if (key == "version") {
        mapHooksId = { ...mapHooksId, version: hooks[key] };
      } else {
        let uuid = Date.now().toString() + Math.random().toString() + key;
        hooksRegistry.set(uuid, hooks[key]);
        mapHooksId = { ...mapHooksId, [key]: uuid };
      }
    });
  }
  if (Platform.OS === "ios") {
    return ScreebModule.initSdk(
      iosChannelId,
      userId,
      properties,
      mapHooksId,
      isDebugMode,
      language
    );
  } else {
    return ScreebModule.initSdk(
      androidChannelId,
      userId,
      properties,
      mapHooksId,
      isDebugMode,
      language
    );
  }
}
export function setIdentity(userId: string, properties?: Map<string, any>) {
  return ScreebModule.setIdentity(userId, properties);
}
export function setProperties(properties?: Map<string, any>) {
  return ScreebModule.setProperties(properties);
}
export function assignGroup(
  type: string | null,
  name: string,
  properties?: Map<string, any>
) {
  return ScreebModule.assignGroup(type, name, properties);
}
export function unassignGroup(
  type: string | null,
  name: string,
  properties?: Map<string, any>
) {
  return ScreebModule.unassignGroup(type, name, properties);
}
export function trackEvent(name: string, properties?: Map<string, any>) {
  return ScreebModule.trackEvent(name, properties);
}
export function trackScreen(name: string, properties?: Map<string, any>) {
  return ScreebModule.trackScreen(name, properties);
}
export function startSurvey(
  surveyId: string,
  allowMultipleResponses?: boolean,
  hiddenFields?: Map<string, any>,
  ignoreSurveyStatus?: boolean,
  hooks?: any,
  language?: string
) {
  let mapHooksId: any = undefined;
  if (hooks != undefined) {
    mapHooksId = new Object();
    Object.keys(hooks).map((key) => {
      if (key == "version") {
        mapHooksId = { ...mapHooksId, version: hooks[key] };
      } else {
        let uuid = Date.now().toString() + Math.random().toString() + key;
        hooksRegistry.set(uuid, hooks[key]);
        mapHooksId = { ...mapHooksId, [key]: uuid };
      }
    });
  }
  return ScreebModule.startSurvey(
    surveyId,
    allowMultipleResponses ?? true,
    hiddenFields,
    ignoreSurveyStatus ?? true,
    mapHooksId,
    language
  );
}
export function debug() {
  return ScreebModule.debug();
}
export function debugTargeting() {
  return ScreebModule.debugTargeting();
}
export function resetIdentity() {
  return ScreebModule.resetIdentity();
}
export function closeSdk() {
  return ScreebModule.closeSdk();
}
export function closeSurvey() {
  return ScreebModule.closeSurvey();
}

function handleEvent(event: any) {
  if (event?.hookId != null) {
    let hook = hooksRegistry.get(event.hookId);
    if (hook != null) {
      const result = hook(event.payload);
      const parsedPayload = JSON.parse(event.payload);
      const originalHookId = parsedPayload?.hook_id;
      if (originalHookId) {
        // result must be a map to fit with react native allowed types
        // Check if hook is a promise/async function
        if (result instanceof Promise) {
          result
            .then((result) => {
              ScreebModule.onHookResult(originalHookId, { result });
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          ScreebModule.onHookResult(originalHookId, { result });
        }
      }
    }
  }
}
