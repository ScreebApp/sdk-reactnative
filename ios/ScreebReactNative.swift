import Screeb
import React
import UIKit
import Foundation

@objc(ScreebReactNative)
class ScreebReactNative: RCTEventEmitter {
  private var hasListeners = false
  private var pendingEvents: [[String: Any]] = []

  override func startObserving() {
    hasListeners = true
    flushPendingEventsIfPossible()
  }

  override func stopObserving() {
    hasListeners = false
  }

  @objc(initSdk:userId:properties:hooks:initOptions:language:)
  func initSdk(
      _ channelId: String,
      userId userId_: String?,
      properties properties_: [String: Any]?,
      hooks hooks_: [String: Any]?,
      initOptions initOptions_: [String: Any]?,
      language language_: String?
    ) {
    Screeb.setSecondarySDK(name: "react-native", version: "2.2.1")
    var mapHooks: [String: Any]? = nil
    if (hooks_ != nil) {
      mapHooks = [:]
      hooks_?.forEach{ hook in
        if (hook.key == "version") {
          if let v = hook.value as? String {
            mapHooks![hook.key] = v
          }
        } else {
          mapHooks![hook.key] = { [weak self] (payload: Any) -> () in
            self?.emitHookEvent(hookId: hook.value, payload: payload)
          }
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
      Screeb.initSdk(context: nil, channelId: channelId, identity: userId_, visitorProperty: properties_ ?? [:], initOptions: initOptions, hooks: mapHooks, language: language_)
    }
  }

  @objc func setIdentity(_ userId: String, properties properties_: [String: Any]?) {
    DispatchQueue.main.async {
      Screeb.setIdentity(uniqueVisitorId: userId, visitorProperty: properties_ ?? [:])
    }
  }

  @objc func trackEvent(_ eventId: String, properties properties_: [String: Any]?) {
    DispatchQueue.main.async {
      Screeb.trackEvent(name: eventId, trackingEventProperties: properties_ ?? [:])
    }
  }

  @objc func trackScreen(_ screen: String, properties properties_: [String: Any]?) {
    DispatchQueue.main.async {
      Screeb.trackScreen(name: screen, trackingEventProperties: properties_ ?? [:])
    }
  }

  @objc(setProperties:)
  func setVisitorPropertiesImpl(_ properties: [String: Any]?) {
    DispatchQueue.main.async {
      Screeb.visitorProperty(visitorProperty: properties ?? [:])
    }
  }

  @objc func startSurvey(_ surveyId: String, allowMultipleResponses allowMultipleResponses_: Bool, hiddenFields hiddenFields_: [String: Any]?,ignoreSurveyStatus ignoreSurveyStatus_: Bool, hooks hooks_: [String: Any]?, language language_: String?, distributionId distributionId_: String?) {
    var mapHooks: [String: Any]? = nil
    if (hooks_ != nil) {
      mapHooks = [:]
      hooks_?.forEach{ hook in
        if(hook.key == "version"){
            if let v = hook.value as? String {
              mapHooks![hook.key] = v
            }
        } else {
            mapHooks![hook.key] = { [weak self] (payload: Any) -> () in
              self?.emitHookEvent(hookId: hook.value, payload: payload)
          }
        }
      }
    }
    DispatchQueue.main.async {
      Screeb.startSurvey(surveyId: surveyId, allowMultipleResponses: allowMultipleResponses_, hiddenFields: hiddenFields_ ?? [:], ignoreSurveyStatus: ignoreSurveyStatus_, hooks: mapHooks, language: language_, distributionId: distributionId_)
    }
  }

  @objc func startMessage(_ messageId: String, allowMultipleResponses allowMultipleResponses_: Bool, hiddenFields hiddenFields_: [String: Any]?, ignoreMessageStatus ignoreMessageStatus_: Bool, hooks hooks_: [String: Any]?, language language_: String?, distributionId distributionId_: String?) {
    var mapHooks: [String: Any]? = nil
    if (hooks_ != nil) {
      mapHooks = [:]
      hooks_?.forEach{ hook in
        if(hook.key == "version"){
            if let v = hook.value as? String {
              mapHooks![hook.key] = v
            }
        } else {
            mapHooks![hook.key] = { [weak self] (payload: Any) -> () in
              self?.emitHookEvent(hookId: hook.value, payload: payload)
          }
        }
      }
    }
    DispatchQueue.main.async {
      Screeb.startMessage(messageId: messageId, allowMultipleResponses: allowMultipleResponses_, hiddenFields: hiddenFields_ ?? [:], ignoreMessageStatus: ignoreMessageStatus_, hooks: mapHooks, language: language_, distributionId: distributionId_)
    }
  }

  @objc func assignGroup(_ type: String?, name name_: String, properties properties_: [String: Any]?) {
    DispatchQueue.main.async {
      Screeb.assignGroup(type: type, name: name_, properties: properties_ ?? [:])
    }
  }

  @objc func unassignGroup(_ type: String?, name name_: String, properties properties_: [String: Any]?) {
    DispatchQueue.main.async {
      Screeb.assignGroup(type: type, name: name_, properties: properties_ ?? [:])
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

  @objc func closeSurvey(_ surveyId: String?){
    DispatchQueue.main.async {
      Screeb.closeSurvey(surveyId: surveyId)
    }
  }

  @objc func closeMessage(_ messageId: String?){
    DispatchQueue.main.async {
      Screeb.closeMessage(messageId: messageId)
    }
  }

  @objc func onHookResult(_ hookId: String, payload: [String: Any]?) {
    DispatchQueue.main.async {
      if payload != nil {
        Screeb.onHookResult(hookId, payload!["result"])
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

  private func emitHookEvent(hookId: Any?, payload: Any) {
    guard let hookKey = hookId as? String else {
      return
    }

    let body: [String: Any] = ["hookId": hookKey, "payload": payload]

    let sendBlock = { [weak self] in
      guard let self else { return }
      if self.hasListeners, self.callableJSModules != nil {
        self.sendEvent(withName: "ScreebEvent", body: body)
      } else {
        self.pendingEvents.append(body)
      }
    }

    if Thread.isMainThread {
      sendBlock()
      flushPendingEventsIfPossible()
    } else {
      DispatchQueue.main.async {
        sendBlock()
        self.flushPendingEventsIfPossible()
      }
    }
  }

  private func flushPendingEventsIfPossible() {
    guard hasListeners, callableJSModules != nil, !pendingEvents.isEmpty else { return }

    let events = pendingEvents
    pendingEvents.removeAll()

    let flushBlock = { [weak self] in
      guard let self else { return }
      events.forEach { self.sendEvent(withName: "ScreebEvent", body: $0) }
    }

    if Thread.isMainThread {
      flushBlock()
    } else {
      DispatchQueue.main.async(execute: flushBlock)
    }
  }

  override func supportedEvents() -> [String]! {
    return ["ScreebEvent"]
  }
}
