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
