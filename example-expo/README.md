# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies from the repository root (all workspaces share the same lockfile).

   ```bash
   yarn install
   ```

2. Recreate the native project (new architecture is enabled by default and Screeb is autolinked via `react-native.config.js`).

   ```bash
   yarn workspace example-expo prebuild
   yarn workspace example-expo ios # or yarn workspace example-expo android
   ```

3. Start the Metro server.

   ```bash
   yarn example:expo
   ```

The generated build installs a fully native binary; Expo Go cannot load the Screeb TurboModule. Always launch the app produced by `expo run:ios` / `expo run:android` after the `prebuild` step.
If native sources fall out of sync, re-run `yarn workspace example-expo prebuild --clean` to regenerate the iOS and Android folders from scratch.

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
yarn reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
