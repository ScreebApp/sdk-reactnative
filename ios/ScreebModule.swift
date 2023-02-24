import Screeb
import UIKit
import Foundation

@objc(ScreebModule)
class ScreebModule: NSObject {

  @objc(initSdk:userId:properties:)
  func initSdk(
      _ channelId: String,
      userId userId_: String?,
      properties properties_: [String: Any]?) {
    var map: [String: AnyEncodable?] = [:]
    if (properties_ != nil) {
        map = self.mapToAnyEncodable(map: properties_!)
    }
    if let controller = UIApplication.shared.keyWindow?.rootViewController {
        DispatchQueue.main.async {
          Screeb.initSdk(context: controller, channelId: channelId, identity: userId_, visitorProperty: map)
        }
    } else {
        print("Screeb : error init, could not find rootViewController")
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

  @objc func startSurvey(_ surveyId: String, allowMultipleResponses allowMultipleResponses_: Bool, hiddenFields hiddenFields_: [String: Any]?) {
    var map: [String: AnyEncodable] = [:]
    if (hiddenFields_ != nil) {
        map = self.mapToAnyEncodable(map: hiddenFields_!).filter({ $0.value != nil }).mapValues({ $0! })
    }
    DispatchQueue.main.async {
      Screeb.startSurvey(surveyId: surveyId, allowMultipleResponses: allowMultipleResponses_, hiddenFields: map)
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

  private func mapToAnyEncodable(map: [String: Any]) -> [String: AnyEncodable?] {
      return map.mapValues{
          value in
          switch value {
          case is String:
              return AnyEncodable(value as! String)
          case is Bool:
              return AnyEncodable(value as! Bool)
          case is Float:
              return AnyEncodable(value as! Float)
          case is Int:
              return AnyEncodable(value as! Int)
          default: break
          }
          return nil
      }
  }
}
