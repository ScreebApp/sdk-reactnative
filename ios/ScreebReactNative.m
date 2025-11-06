#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(ScreebReactNative, RCTEventEmitter)

RCT_EXTERN_METHOD(initSdk:(NSString *)channelId
                  userId:(nullable NSString *)userId
                  properties:(nullable NSDictionary *)properties
                  hooks:(nullable NSDictionary *)hooks
                  initOptions:(nullable NSDictionary *)initOptions
                  language:(nullable NSString *)language)

RCT_EXTERN_METHOD(setIdentity:(NSString *)userId
                  properties:(nullable NSDictionary *)properties)

RCT_EXTERN_METHOD(setProperties:(nullable NSDictionary *)properties)

RCT_EXTERN_METHOD(assignGroup:(nullable NSString *)type
                  name:(NSString *)name
                  properties:(nullable NSDictionary *)properties)

RCT_EXTERN_METHOD(unassignGroup:(nullable NSString *)type
                  name:(NSString *)name
                  properties:(nullable NSDictionary *)properties)

RCT_EXTERN_METHOD(trackEvent:(NSString *)name
                  properties:(nullable NSDictionary *)properties)

RCT_EXTERN_METHOD(trackScreen:(NSString *)name
                  properties:(nullable NSDictionary *)properties)

RCT_EXTERN_METHOD(startSurvey:(NSString *)surveyId
                  allowMultipleResponses:(BOOL)allowMultipleResponses
                  hiddenFields:(nullable NSDictionary *)hiddenFields
                  ignoreSurveyStatus:(BOOL)ignoreSurveyStatus
                  hooks:(nullable NSDictionary *)hooks
                  language:(nullable NSString *)language
                  distributionId:(nullable NSString *)distributionId)

RCT_EXTERN_METHOD(startMessage:(NSString *)messageId
                  allowMultipleResponses:(BOOL)allowMultipleResponses
                  hiddenFields:(nullable NSDictionary *)hiddenFields
                  ignoreMessageStatus:(BOOL)ignoreMessageStatus
                  hooks:(nullable NSDictionary *)hooks
                  language:(nullable NSString *)language
                  distributionId:(nullable NSString *)distributionId)

RCT_EXTERN_METHOD(debug)

RCT_EXTERN_METHOD(debugTargeting)

RCT_EXTERN_METHOD(resetIdentity)

RCT_EXTERN_METHOD(closeSdk)

RCT_EXTERN_METHOD(closeSurvey:(nullable NSString *)surveyId)

RCT_EXTERN_METHOD(closeMessage:(nullable NSString *)messageId)

RCT_EXTERN_METHOD(onHookResult:(NSString *)hookId
                  payload:(nullable NSDictionary *)payload)

@end
