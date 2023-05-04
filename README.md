# Green Garden App

Frontend app for the Green Garden project created with React Native

## How to use

1. Set up React Native CLI for iOS or Android: [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)
2. Make sure you have a recent version of Node (`node -v` should be at least 16). For Android make sure you have Java 11 (`java --version`).
3. Download Firebase credentials for [iOS](https://rnfirebase.io/#generating-ios-credentials) or [Android](https://rnfirebase.io/#generating-android-credentials). For iOS this should be put in `ios/GoogleService-Info.plist` and for Android this should be put in `android/app/google-services.json`.
4. Run `npm install`. For iOS you also need to run `npx pod-install`.
5. Start the app with `npx react-native start`.

If there are issues with starting the app try using `npx react-native start --reset-cache` or `npx react-native clean`.

**Always run `npm install` (and `npx pod-install` on iOS) after fetching the latest commits from git!**