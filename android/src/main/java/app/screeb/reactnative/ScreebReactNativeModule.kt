package app.screeb.reactnative
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.HashMap
import app.screeb.sdk.Screeb
import app.screeb.sdk.InitOptions
import android.os.Handler
import android.os.Looper

@ReactModule(name = ScreebReactNativeModule.NAME)
class ScreebReactNativeModule(reactContext: ReactApplicationContext) :
  NativeScreebReactNativeSpec(reactContext) {

  override fun getName(): String = NAME


  override fun initSdk(
    channelId: String,
    userId: String?,
    properties: ReadableMap?,
    hooks: ReadableMap?,
    initOptions: ReadableMap?,
    language: String?,
    promise: Promise
  ) {
    Screeb.setSecondarySDK("react-native", "2.2.1")

    val mapHooks: HashMap<String, Any>? = hooks?.let { readable ->
      hashMapOf<String, Any>().apply {
        val itKeys = readable.keySetIterator()
        while (itKeys.hasNextKey()) {
          val key = itKeys.nextKey()
          if (key == "version") {
            put(key, readable.getString(key)!!)
          } else {
            val value = readable.getString(key)
            put(key) { payload: Any ->
              reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(
                  "ScreebEvent",
                  Arguments.createMap().apply {
                    putString("hookId", value!!)
                    putString("payload", payload.toString())
                  }
                )
            }
          }
        }
      }
    }

    Handler(Looper.getMainLooper()).post {
      Screeb.pluginInit(channelId, userId, fromReadableMap(properties), fromReadableMap(initOptions), mapHooks, language)
      promise.resolve(null)
    }
  }

  override fun setIdentity(userId: String, properties: ReadableMap?, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.setIdentity(userId, fromReadableMap(properties))
      promise.resolve(null)
    }
  }

  override fun setProperties(properties: ReadableMap?, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      fromReadableMap(properties)?.let { Screeb.setVisitorProperties(it) }
      promise.resolve(null)
    }
  }

  override fun assignGroup(type: String?, name: String, properties: ReadableMap?, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.assignGroup(type, name, fromReadableMap(properties))
      promise.resolve(null)
    }
  }

  override fun unassignGroup(type: String?, name: String, properties: ReadableMap?, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.unassignGroup(type, name, fromReadableMap(properties))
      promise.resolve(null)
    }
  }

  override fun trackEvent(name: String, properties: ReadableMap?, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.trackEvent(name, fromReadableMap(properties))
      promise.resolve(null)
    }
  }

  override fun trackScreen(name: String, properties: ReadableMap?, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.trackScreen(name, fromReadableMap(properties))
      promise.resolve(null)
    }
  }

  override fun startSurvey(
    surveyId: String,
    allowMultipleResponses: Boolean?,
    hiddenFields: ReadableMap?,
    ignoreSurveyStatus: Boolean?,
    hooks: ReadableMap?,
    language: String?,
    distributionId: String?,
    promise: Promise
  ) {
    val mapHooks: HashMap<String, Any>? = hooks?.let { readable ->
      hashMapOf<String, Any>().apply {
        val itKeys = readable.keySetIterator()
        while (itKeys.hasNextKey()) {
          val key = itKeys.nextKey()
          if (key == "version") {
            put(key, readable.getString(key)!!)
          } else {
            val value = readable.getString(key)
            put(key) { payload: Any ->
              reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(
                  "ScreebEvent",
                  Arguments.createMap().apply {
                    putString("hookId", value!!)
                    putString("payload", payload.toString())
                  }
                )
            }
          }
        }
      }
    }

    Handler(Looper.getMainLooper()).post {
      Screeb.startSurvey(
        surveyId,
        allowMultipleResponses ?: true,
        fromReadableMap(hiddenFields),
        ignoreSurveyStatus ?: true,
        mapHooks,
        language,
        distributionId
      )
      promise.resolve(null)
    }
  }

  override fun startMessage(
    messageId: String,
    allowMultipleResponses: Boolean?,
    hiddenFields: ReadableMap?,
    ignoreMessageStatus: Boolean?,
    hooks: ReadableMap?,
    language: String?,
    distributionId: String?,
    promise: Promise
  ) {
    val mapHooks: HashMap<String, Any>? = hooks?.let { readable ->
      hashMapOf<String, Any>().apply {
        val itKeys = readable.keySetIterator()
        while (itKeys.hasNextKey()) {
          val key = itKeys.nextKey()
          if (key == "version") {
            put(key, readable.getString(key)!!)
          } else {
            val value = readable.getString(key)
            put(key) { payload: Any ->
              reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(
                  "ScreebEvent",
                  Arguments.createMap().apply {
                    putString("hookId", value!!)
                    putString("payload", payload.toString())
                  }
                )
            }
          }
        }
      }
    }

    Handler(Looper.getMainLooper()).post {
      Screeb.startMessage(
        messageId,
        allowMultipleResponses ?: true,
        fromReadableMap(hiddenFields),
        ignoreMessageStatus ?: true,
        mapHooks,
        language,
        distributionId
      )
      promise.resolve(null)
    }
  }

  override fun debug(promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.debug()
      promise.resolve(null)
    }
  }

  override fun debugTargeting(promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.debugTargeting()
      promise.resolve(null)
    }
  }

  override fun resetIdentity(promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.resetIdentity()
      promise.resolve(null)
    }
  }

  override fun closeSdk(promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.closeSdk()
      promise.resolve(null)
    }
  }

  override fun closeSurvey(surveyId: String?, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.closeSurvey(surveyId)
      promise.resolve(null)
    }
  }

  override fun closeMessage(messageId: String?, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.closeMessage(messageId)
      promise.resolve(null)
    }
  }

  override fun onHookResult(hookId: String, result: ReadableMap, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.onHookResult(hookId, result.toHashMap())
      promise.resolve(null)
    }
  }

  private fun fromReadableMap(readableMap: ReadableMap?): HashMap<String, Any?>? =
    readableMap?.toHashMap() as? HashMap<String, Any?>

  companion object {
    const val NAME = "ScreebReactNative"
  }
}
