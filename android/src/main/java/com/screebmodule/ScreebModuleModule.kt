package com.screebmodule

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import java.util.HashMap
import androidx.annotation.NonNull
import android.content.Context
import android.util.Log
import app.screeb.sdk.Screeb
import android.os.Handler
import android.os.Looper

class ScreebModuleModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "ScreebModule"
  }

  @ReactMethod
  fun initSdk(channelId: String, userId: String?, properties: ReadableMap?) {
    Log.d("ScreebModule", "Called setIdentity : $userId")
    var map: HashMap<String, Any?>? = null
    if (properties != null) {
      map = properties.toHashMap()
    }
    Handler(Looper.getMainLooper()).post {
      screeb?.pluginInit(channelId, userId, map)
    }
  }

  @ReactMethod
  fun setIdentity(userId: String, properties: ReadableMap?) {
    Log.d("ScreebModule", "Called setIdentity : $userId")
    var map: HashMap<String, Any?>? = null
    if (properties != null) {
      map = properties.toHashMap()
    }
    Handler(Looper.getMainLooper()).post {
      screeb?.setIdentity(userId, map)
    }
  }

  @ReactMethod
  fun trackEvent(eventId: String, properties: ReadableMap?) {
    Log.d("ScreebModule", "Called trackEvent : $eventId")
    var map: HashMap<String, Any?>? = null
    if (properties != null) {
      map = properties.toHashMap()
    }
    Handler(Looper.getMainLooper()).post {
      screeb?.trackEvent(eventId, map)
    }
  }

  @ReactMethod
  fun trackScreen(screen: String, properties: ReadableMap?) {
    Log.d("ScreebModule", "Called trackScreen : $screen")
    var map: HashMap<String, Any?>? = null
    if (properties != null) {
      map = properties.toHashMap()
    }
    Handler(Looper.getMainLooper()).post {
      screeb?.trackScreen(screen, map)
    }
  }

  @ReactMethod
  fun setProperties(properties: ReadableMap) {
    Log.d(
      "ScreebModule",
      "Called setVisitorProperties with " + properties.toHashMap().size + " properties"
    )
    Handler(Looper.getMainLooper()).post {
      screeb?.setVisitorProperties(properties.toHashMap())
    }
  }

  @ReactMethod
  fun startSurvey(surveyId: String, allowMultipleResponses: Boolean, hiddenFields: ReadableMap? = null) {
    Log.e("ScreebModule", "Called startSurvey : $surveyId")
    var map: HashMap<String, Any>? = null
    if (hiddenFields != null) {
      map = hiddenFields.toHashMap()
    }
    screeb?.startSurvey(surveyId, allowMultipleResponses, map)
  }

  @ReactMethod
  fun assignGroup(name: String, type: String? = null, properties: ReadableMap? = null) {
    Log.d("ScreebModule", "Called assignGroup : $name")
    var map: HashMap<String, Any>? = null
    if (properties != null) {
      map = properties.toHashMap()
    }
    screeb?.assignGroup(name, type, map)
  }

  companion object {
    var screeb: Screeb? = null

    @JvmStatic
    fun setAppContext(context: Context){
      screeb = Screeb.Builder()
        .withContext(context)
        .withPluginMode(true)
        .build()
    }

  }
}
