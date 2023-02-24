#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ScreebModule, NSObject)

RCT_EXTERN_METHOD(initSdk:(NSString *)channelId userId:(NSString *)userId_  properties:(NSDictionary<NSString *, id> *)properties_)
RCT_EXTERN_METHOD(setIdentity:(NSString *)userId properties:(NSDictionary<NSString *, id> *)properties_)
RCT_EXTERN_METHOD(setProperties:(NSDictionary<NSString *, id> *)properties)
RCT_EXTERN_METHOD(assignGroup:(NSString *)type name:(NSString *)name_ properties:(NSDictionary<NSString *, id> *)properties_)
RCT_EXTERN_METHOD(unassignGroup:(NSString *)type name:(NSString *)name_ properties:(NSDictionary<NSString *, id> *)properties_)
RCT_EXTERN_METHOD(trackEvent:(NSString *)eventId properties:(NSDictionary<NSString *, id> *)properties_)
RCT_EXTERN_METHOD(trackScreen:(NSString *)screen properties:(NSDictionary<NSString *, id> *)properties_)
RCT_EXTERN_METHOD(startSurvey:(NSString *)surveyId allowMultipleResponses:(BOOL)allowMultipleResponses_ hiddenFields:(NSDictionary<NSString *, id> *)hiddenFields_)
RCT_EXTERN_METHOD(debug)
RCT_EXTERN_METHOD(debugTargeting)
RCT_EXTERN_METHOD(closeSdk)
RCT_EXTERN_METHOD(resetIdentity)
+ (BOOL)requiresMainQueueSetup
{
  return YES;
}
@end
