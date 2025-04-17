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
import app.screeb.sdk.InitOptions
import app.screeb.sdk.Screeb
import android.os.Handler
import android.os.Looper

class ScreebModuleModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "ScreebModule"
  }

  @ReactMethod
  fun initSdk(channelId: String, userId: String?, properties: ReadableMap?, hooks: ReadableMap?, initOptions: ReadableMap?, language: String?) {
    Log.d("ScreebModule", "Called initSdk : $userId")
    Screeb.setSecondarySDK("react-native", "2.1.15")
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

    Handler(Looper.getMainLooper()).post {
      Screeb.pluginInit(channelId, userId, this.fromReadableMap(properties), mapHooks, language)
    }
  }

  @ReactMethod
  fun setIdentity(userId: String, properties: ReadableMap?) {
    Log.d("ScreebModule", "Called setIdentity : $userId")
    Handler(Looper.getMainLooper()).post {
      Screeb.setIdentity(userId, this.fromReadableMap(properties))
    }
  }

  @ReactMethod
  fun setProperties(properties: ReadableMap?) {
    Log.d("ScreebModule", "Called setProperties")
    Handler(Looper.getMainLooper()).post {
      Screeb.setVisitorProperties(this.fromReadableMap(properties))
    }
  }

  @ReactMethod
  fun assignGroup(type: String? = null, name: String, properties: ReadableMap? = null) {
    Log.d("ScreebModule", "Called assignGroup : $name")
    Handler(Looper.getMainLooper()).post {
      Screeb.assignGroup(type, name, this.fromReadableMap(properties))
    }
  }

  @ReactMethod
  fun unassignGroup(type: String? = null, name: String, properties: ReadableMap? = null) {
    Log.d("ScreebModule", "Called unassignGroup : $name")
    Handler(Looper.getMainLooper()).post {
      Screeb.unassignGroup(type, name, this.fromReadableMap(properties))
    }
  }

  @ReactMethod
  fun trackEvent(eventId: String, properties: ReadableMap?) {
    Log.d("ScreebModule", "Called trackEvent : $eventId")
    Handler(Looper.getMainLooper()).post {
      Screeb.trackEvent(eventId, this.fromReadableMap(properties))
    }
  }

  @ReactMethod
  fun trackScreen(screen: String, properties: ReadableMap?) {
    Log.d("ScreebModule", "Called trackScreen : $screen")
    Handler(Looper.getMainLooper()).post {
      Screeb.trackScreen(screen, this.fromReadableMap(properties))
    }
  }

  @ReactMethod
  fun startSurvey(surveyId: String, allowMultipleResponses: Boolean? = true, hiddenFields: ReadableMap? = null, ignoreSurveyStatus: Boolean? = true, hooks: ReadableMap? = null, language: String? = null) {
    Log.e("ScreebModule", "Called startSurvey : $surveyId")
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
    Handler(Looper.getMainLooper()).post {
      Screeb.startSurvey(surveyId, allowMultipleResponses ?: true, this.fromReadableMap(hiddenFields), ignoreSurveyStatus ?: true, mapHooks, language)
    }
  }

  @ReactMethod
  fun resetIdentity(){
    Log.d("ScreebModule","Called resetIdentity")
    Handler(Looper.getMainLooper()).post {
      Screeb.resetIdentity()
    }
  }

  @ReactMethod
  fun closeSdk(){
    Log.d("ScreebModule","Called closeSdk")
    Handler(Looper.getMainLooper()).post {
      Screeb.closeSdk()
    }
  }

  @ReactMethod
  fun closeSurvey(){
    Log.d("ScreebModule","Called closeSurvey")
    Handler(Looper.getMainLooper()).post {
      Screeb.closeSurvey()
    }
  }

  @ReactMethod
  fun onHookResult(hookId: String, payload: ReadableMap?){
    if (payload != null) {
      val result = this.fromReadableMap(payload!!)!!["result"] as Any?
      Screeb.onHookResult(hookId, result)
    }
  }

  @ReactMethod
  fun debug(){
    Log.d("ScreebModule","Called debug")
    Screeb.debug()
  }

  @ReactMethod
  fun debugTargeting(){
    Log.d("ScreebModule","Called debugTargeting")
    Handler(Looper.getMainLooper()).post {
      Screeb.debugTargeting()
    }
  }

  private fun fromReadableMap(readableMap: ReadableMap?): HashMap<String, Any?>? {
    if (readableMap == null) {
      return null
    }

    return readableMap!!.toHashMap() as HashMap<String, Any?>?
  }
}
