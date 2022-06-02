<p align="center">
  <a href="https://www.npmjs.com/package/@screeb/react-native"><img alt="npm screeb/react-native" src="https://img.shields.io/npm/v/@screeb/react-native"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-purple.svg" alt="License: MIT"></a>
  <a href="https://cocoapods.org/pods/Screeb"><img src="https://img.shields.io/cocoapods/v/Screeb.svg?style=flat" alt="Cocoapods"></a>
  <a href="https://search.maven.org/search?q=g:%22app.screeb.sdk%22%20AND%20a:%22survey%22"><img src="https://img.shields.io/maven-central/v/app.screeb.sdk/survey.svg?label=Maven%20Central" alt="Maven Central"></a>
</p>

# @screeb/react-native

A react-native module to integrate Screeb mobile sdk for Android and/or iOS.

## Installation

```sh
npm install @screeb/react-native
```

## iOS specific configuration
You should set IOS target build configuration `BUILD_LIBRARY_FOR_DISTRIBUTION` to `YES` in your `Podfile` to avoid runtime crash:
```ruby
post_install do |installer|
  ...
  installer.pods_project.targets.each do |target|
    ...

    target.build_configurations.each do |config|
      ...
      config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
    end
  end
end
```

When upgrading a Screeb sdk-reactnative version, it can be useful to run in /ios directory :
```sh
pod update Screeb
```

## Android specific configuration

First, you should use MultidexApplication if not yet to avoid compilation issues.

```
defaultConfig {
    (...)
    multiDexEnabled true
}
(...)
dependencies {
   (...)
   implementation 'androidx.multidex:multidex:2.0.1'
}
```

Then, the Android sdk needs to be notified of activities lifecycle changes to be correctly started.

It is mandatory to pass the Application context to the module in your custom Application class
in the `onCreate` function :

```kotlin
override fun onCreate() {
    super.onCreate()
    ScreebModuleModule.setAppContext(this)
}
```

NB : Your android app needs to use AGP minimum 7.1.3

```groovy
classpath("com.android.tools.build:gradle:7.1.3")
```

## Usage

```js
import { initSdk, trackScreen, trackEvent, setProperties, setIdentity } from "@screeb/react-native";

// Init the sdk at app start (useEffect hook used here, but componentDidMount is fine)
React.useEffect(() => {
   initSdk(
      "<android-channel-id>",
      "<ios-channel-id>",
      "<user-identity>",
      {
         'example-prop1': false,
         'example-prop2': 29,
         'example-prop3' : 'iPhone 13',
      }
   );
}, []);

(...)

// SetIdentity command :
setIdentity(
    '<user-identity>',
    {
        'example-prop1': false,
        'example-prop2': 29,
        'example-prop3' : 'iPhone 13',
    }
);

(...)

// trackEvent command :
trackEvent(
    '<event-name>',
    {
        'example-prop1': false,
        'example-prop2': 29,
        'example-prop3' : 'iPhone 13',
    }
);

(...)

// trackScreen command :
trackScreen(
    '<screen-name>',
    {
        'example-prop1': false,
        'example-prop2': 29,
        'example-prop3' : 'iPhone 13',
    }
);

(...)

// setProperties command :
setProperties(
    {
        'example-prop1': false,
        'example-prop2': 29,
        'example-prop3' : 'iPhone 13',
    }
);
```

## License

MIT
