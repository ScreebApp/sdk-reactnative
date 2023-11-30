package com.screebmodule

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.HashMap
import androidx.annotation.NonNull
import android.content.Context
import android.util.Log
import app.screeb.sdk.Screeb

class ScreebModuleModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "ScreebModule"
  }

  @ReactMethod
  fun initSdk(channelId: String, userId: String?, properties: ReadableMap?, hooks: ReadableMap?) {
    Log.d("ScreebModule", "Called initSdk : $userId")
    var map: HashMap<String, Any?>? = null
    if (properties != null) {
      map = properties.toHashMap()
    }
    var mapHooks:HashMap<String, Any>? = null
    if (hooks != null) {
      mapHooks = hashMapOf<String, Any>()
      val hooksKeys = hooks.keySetIterator()
      while (hooksKeys.hasNextKey()) {
        val key = hooksKeys.nextKey()
        val value = hooks.getString(key)
        if (key == "version"){
          mapHooks[key] = value!!
        } else {
          mapHooks[key] = { payload:Any -> this.reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit("ScreebEvent",  Arguments.createMap().apply {
            putString("hookId", value!!)
            putString("payload", payload.toString())
        }) }
        }
      }
    }
    Screeb.pluginInit(channelId, userId, map, mapHooks)
  }

  @ReactMethod
  fun setIdentity(userId: String, properties: ReadableMap?) {
    Log.d("ScreebModule", "Called setIdentity : $userId")
    var map: HashMap<String, Any?>? = null
    if (properties != null) {
      map = properties.toHashMap()
    }
    Screeb.setIdentity(userId, map)
  }

  @ReactMethod
  fun setProperties(properties: ReadableMap) {
    Log.d(
      "ScreebModule",
      "Called setVisitorProperties with " + properties.toHashMap().size + " properties"
    )
    Screeb.setVisitorProperties(properties.toHashMap())
  }

  @ReactMethod
  fun assignGroup(type: String? = null, name: String, properties: ReadableMap? = null) {
    Log.d("ScreebModule", "Called assignGroup : $name")
    var map: HashMap<String, Any?>? = null
    if (properties != null) {
      map = properties.toHashMap()
    }
    Screeb.assignGroup(type, name, map)
  }

  @ReactMethod
  fun unassignGroup(type: String? = null, name: String, properties: ReadableMap? = null) {
    Log.d("ScreebModule", "Called unassignGroup : $name")
    var map: HashMap<String, Any?>? = null
    if (properties != null) {
      map = properties.toHashMap()
    }
    Screeb.unassignGroup(type, name, map)
  }

  @ReactMethod
  fun trackEvent(eventId: String, properties: ReadableMap?) {
    Log.d("ScreebModule", "Called trackEvent : $eventId")
    var map: HashMap<String, Any?>? = null
    if (properties != null) {
      map = properties.toHashMap()
    }
    Screeb.trackEvent(eventId, map)
  }

  @ReactMethod
  fun trackScreen(screen: String, properties: ReadableMap?) {
    Log.d("ScreebModule", "Called trackScreen : $screen")
    var map: HashMap<String, Any?>? = null
    if (properties != null) {
      map = properties.toHashMap()
    }
    Screeb.trackScreen(screen, map)
  }

  @ReactMethod
  fun startSurvey(surveyId: String, allowMultipleResponses: Boolean? = true, hiddenFields: ReadableMap? = null, ignoreSurveyStatus: Boolean? = true, hooks: ReadableMap? = null) {
    Log.e("ScreebModule", "Called startSurvey : $surveyId")
    var map: HashMap<String, Any>? = null
    if (hiddenFields != null) {
      map = hiddenFields.toHashMap()
    }
    var mapHooks:HashMap<String, Any>? = null
    if (hooks != null) {
      mapHooks = hashMapOf<String, Any>()
      val hooksKeys = hooks.keySetIterator()
      while (hooksKeys.hasNextKey()) {
        val key = hooksKeys.nextKey()
        val value = hooks.getString(key)
        if (key == "version"){
          mapHooks[key] = value!!
        } else {
          mapHooks[key] = { payload:Any -> this.reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit("ScreebEvent",  Arguments.createMap().apply {
            putString("hookId", value!!)
            putString("payload", payload.toString())
        }) }
        }
      }
    }
    Screeb.startSurvey(surveyId, allowMultipleResponses ?: true, map, ignoreSurveyStatus ?: true, mapHooks)
  }

  @ReactMethod
  fun debug(){
    Log.d("ScreebModule","Called debug")
    Screeb.debug()
  }

  @ReactMethod
  fun debugTargeting(){
    Log.d("ScreebModule","Called debugTargeting")
    Screeb.debugTargeting()
  }

  @ReactMethod
  fun resetIdentity(){
    Log.d("ScreebModule","Called resetIdentity")
    Screeb.resetIdentity()
  }

  @ReactMethod
  fun closeSdk(){
    Log.d("ScreebModule","Called closeSdk")
    Screeb.closeSdk()
  }
}
