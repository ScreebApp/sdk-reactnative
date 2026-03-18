# Screeb React Native Example (npm)

This is a [**React Native**](https://reactnative.dev) example app that uses `@screeb/react-native` installed from **npm** (not from local sources).

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Install dependencies

```sh
npm install
# or
yarn install
```

### iOS

Install CocoaPods dependencies:

```sh
bundle install
cd ios && bundle exec pod install && cd ..
```

Run the app:

```sh
npm run ios
# or
yarn ios
```

### Android

```sh
npm run android
# or
yarn android
```

## Key difference with `example/`

This project installs `@screeb/react-native` from npm instead of using the local monorepo source. This is useful to validate the published package works correctly in a standalone project.
