import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@screeb/react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

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

export function initSdk(
  androidChannelId: string,
  iosChannelId: string,
  userId?: string,
  properties?: Map<string, any>) {
  if (Platform.OS === 'ios') {
    return ScreebModule.initSdk(iosChannelId, userId, properties);
  } else {
    return ScreebModule.initSdk(androidChannelId, userId, properties);
  }
}
export function setIdentity(userId: string, properties?: Map<string, any>) {
  return ScreebModule.setIdentity(userId, properties);
}
export function setProperties(properties?: Map<string, any>) {
  return ScreebModule.setProperties(properties);
}
export function assignGroup(type: string | null, name: string, properties?: Map<string, any>) {
  return ScreebModule.assignGroup(type, name, properties);
}
export function unassignGroup(type: string | null, name: string, properties?: Map<string, any>) {
  return ScreebModule.unassignGroup(type, name, properties);
}
export function trackEvent(name: string, properties?: Map<string, any>) {
  return ScreebModule.trackEvent(name, properties);
}
export function trackScreen(name: string, properties?: Map<string, any>) {
  return ScreebModule.trackScreen(name, properties);
}
export function startSurvey(surveyId: string, allowMultipleResponses?: boolean, hiddenFields?: Map<string, any>) {
  return ScreebModule.startSurvey(surveyId, allowMultipleResponses ?? true, hiddenFields);
}
