import Screeb
import UIKit
import Foundation

@objc(ScreebModule)
class ScreebModule: RCTEventEmitter {
  @objc(initSdk:userId:properties:hooks:initOptions:language:)
  func initSdk(
      _ channelId: String,
      userId userId_: String?,
      properties properties_: [String: Any]?,
      hooks hooks_: [String: Any]?,
      initOptions initOptions_: [String: Any]?,
      language language_: String?
    ) {
    Screeb.setSecondarySDK(name: "react-native", version: "2.1.11")
    var map: [String: AnyEncodable?] = [:]
    if (properties_ != nil) {
        map = self.mapToAnyEncodable(map: properties_!)
    }
    var mapHooks: [String: Any?]? = nil
    if (hooks_ != nil) {
      mapHooks = [:]
      hooks_?.forEach{ hook in
        if (hook.key == "version") {
          mapHooks![hook.key] = hook.value as? String
        } else {
          mapHooks![hook.key] = {(payload:Any) -> () in DispatchQueue.main.async {
            guard let data = try? JSONEncoder().encode(self.toAnyEncodable(payload)) else {
              return
            }

            let encoded = String(data: data, encoding: .utf8)!
            self.sendEvent(withName: "ScreebEvent", body: ["hookId": hook.value, "payload": encoded])
          }}
        }
      }
    }

    var initOptions = InitOptions()
    initOptions_?.forEach{ option in
      if (option.key == "isDebugMode") {
        initOptions = InitOptions(isDebugMode: option.value as? Bool)
      }
    }

    DispatchQueue.main.async {
      Screeb.initSdk(context: nil, channelId: channelId, identity: userId_, visitorProperty: map, initOptions: initOptions, hooks: mapHooks, language: language_)
    }
  }

  @objc func setIdentity(_ userId: String, properties properties_: [String: Any]?) {
    var map: [String: AnyEncodable?] = [:]
    if (properties_ != nil) {
        map = self.mapToAnyEncodable(map: properties_!)
    }
    DispatchQueue.main.async {
      Screeb.setIdentity(uniqueVisitorId: userId, visitorProperty: map)
    }
  }

  @objc func trackEvent(_ eventId: String, properties properties_: [String: Any]?) {
    var map: [String: AnyEncodable?] = [:]
    if (properties_ != nil) {
        map = self.mapToAnyEncodable(map: properties_!)
    }
    DispatchQueue.main.async {
      Screeb.trackEvent(name: eventId, trackingEventProperties: map)
    }
  }

  @objc func trackScreen(_ screen: String, properties properties_: [String: Any]?) {
    var map: [String: AnyEncodable?] = [:]
    if (properties_ != nil) {
        map = self.mapToAnyEncodable(map: properties_!)
    }
    DispatchQueue.main.async {
      Screeb.trackScreen(name: screen, trackingEventProperties: map)
    }
  }

  @objc(setProperties:)
  func setVisitorPropertiesImpl(_ properties: [String: Any]) {
    let map = self.mapToAnyEncodable(map: properties)
    DispatchQueue.main.async {
      Screeb.visitorProperty(visitorProperty: map)
    }
  }

  @objc func startSurvey(_ surveyId: String, allowMultipleResponses allowMultipleResponses_: Bool, hiddenFields hiddenFields_: [String: Any]?,ignoreSurveyStatus ignoreSurveyStatus_: Bool, hooks hooks_: [String: Any]?, language language_: String?) {
    var map: [String: AnyEncodable] = [:]
    if (hiddenFields_ != nil) {
        map = self.mapToAnyEncodable(map: hiddenFields_!).filter({ $0.value != nil }).mapValues({ $0! })
    }
    var mapHooks: [String: Any?]? = nil
    if (hooks_ != nil) {
      mapHooks = [:]
      hooks_?.forEach{ hook in
        if(hook.key == "version"){
            mapHooks![hook.key] = hook.value as? String
        } else {
            mapHooks![hook.key] = {(payload:Any) -> () in DispatchQueue.main.async {
            guard let data = try? JSONEncoder().encode(self.toAnyEncodable(payload)) else {
              return
            }

            let encoded = String(data: data, encoding: .utf8)!
            self.sendEvent(withName: "ScreebEvent", body: ["hookId": hook.value, "payload": encoded])
          }}
        }
      }
    }
    DispatchQueue.main.async {
      Screeb.startSurvey(surveyId: surveyId, allowMultipleResponses: allowMultipleResponses_, hiddenFields: map, ignoreSurveyStatus: ignoreSurveyStatus_, hooks: mapHooks, language: language_)
    }
  }

  @objc func assignGroup(_ type: String?, name name_: String, properties properties_: [String: Any]?) {
    var map: [String: AnyEncodable] = [:]
    if (properties_ != nil) {
        map = self.mapToAnyEncodable(map: properties_!).filter({ $0.value != nil }).mapValues({ $0! })
    }
    DispatchQueue.main.async {
      Screeb.assignGroup(type: type, name: name_, properties: map)
    }
  }

  @objc func unassignGroup(_ type: String?, name name_: String, properties properties_: [String: Any]?) {
    var map: [String: AnyEncodable] = [:]
    if (properties_ != nil) {
        map = self.mapToAnyEncodable(map: properties_!).filter({ $0.value != nil }).mapValues({ $0! })
    }
    DispatchQueue.main.async {
      Screeb.assignGroup(type: type, name: name_, properties: map)
    }
  }

  @objc func resetIdentity(){
    DispatchQueue.main.async {
      Screeb.resetIdentity()
    }
  }

  @objc func closeSdk(){
    DispatchQueue.main.async {
      Screeb.closeSdk()
    }
  }

  @objc func closeSurvey(){
    DispatchQueue.main.async {
      Screeb.closeSurvey()
    }
  }

  @objc func onHookResult(_ hookId: String, payload: [String: Any]?) {
    DispatchQueue.main.async {
      if payload != nil {
        let encoded = self.toAnyEncodable(payload!["result"])
        Screeb.onHookResult(hookId, encoded)
      }
    }
  }

  @objc func debug(){
    DispatchQueue.main.async {
      Screeb.debug()
    }
  }

  @objc func debugTargeting(){
    DispatchQueue.main.async {
      Screeb.debugTargeting()
    }
  }

  private func toAnyEncodable(_ value: Any?) -> AnyEncodable? {
    if let nsValue = value as? NSNumber {
        if CFBooleanGetTypeID() == CFGetTypeID(nsValue) {
            return AnyEncodable(nsValue.boolValue)
        } else if let value = value as? Int {
            return AnyEncodable(value)
        } else if let value = value as? Double {
            return AnyEncodable(value)
        } else if let value = value as? Float {
            return AnyEncodable(value)
        } else {
            return nil
        }
    } else if let value = value as? String {
        return AnyEncodable(value)
    } else if let value = value as? [String: Any?] {
        return AnyEncodable(self.mapToAnyEncodable(map: value))
    } else {
        return nil
    }
  }

  private func mapToAnyEncodable(map: [String: Any?]?) -> [String: AnyEncodable?] {
    var anyEncodableMap: [String: AnyEncodable?] = [:]
    map?.forEach { key, value in
        anyEncodableMap[key] = self.toAnyEncodable(value)
    }
    return anyEncodableMap
  }

  override func supportedEvents() -> [String]! {
    return ["ScreebEvent"]
  }
}
