# Setup Guide

## Initial Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **For iOS:**
   ```bash
   cd ios && pod install && cd ..
   ```

## Platform-Specific Configuration

### Android Configuration

1. **Add Google Maps API Key:**
   
   Edit `android/app/src/main/AndroidManifest.xml` and add your Google Maps API key:
   ```xml
   <application>
     <meta-data
       android:name="com.google.android.geo.API_KEY"
       android:value="YOUR_GOOGLE_MAPS_API_KEY"/>
   </application>
   ```

2. **Permissions:**
   
   Ensure these permissions are in `android/app/src/main/AndroidManifest.xml`:
   ```xml
   <uses-permission android:name="android.permission.INTERNET" />
   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
   <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
   ```

### iOS Configuration

1. **Add Google Maps API Key:**
   
   Edit `ios/Phoenix/AppDelegate.mm` (or `AppDelegate.swift`) and add:
   ```objc
   #import <GoogleMaps/GoogleMaps.h>
   
   - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
   {
     [GMSServices provideAPIKey:@"YOUR_GOOGLE_MAPS_API_KEY"];
     // ... rest of the code
   }
   ```

   Or if using Swift, in `AppDelegate.swift`:
   ```swift
   import GoogleMaps
   
   func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
     GMSServices.provideAPIKey("YOUR_GOOGLE_MAPS_API_KEY")
     // ... rest of the code
   }
   ```

2. **Info.plist:**
   
   Add location permissions to `ios/Phoenix/Info.plist`:
   ```xml
   <key>NSLocationWhenInUseUsageDescription</key>
   <string>This app needs location access to show help requests on the map.</string>
   <key>NSLocationAlwaysUsageDescription</key>
   <string>This app needs location access to show help requests on the map.</string>
   ```

## Running the App

### Development Mode

1. Start Metro bundler:
   ```bash
   npm start
   ```

2. In a new terminal, run:
   - iOS: `npm run ios`
   - Android: `npm run android`

### Troubleshooting

- **Maps not showing:** Ensure Google Maps API key is correctly configured
- **Build errors:** Run `cd ios && pod install && cd ..` for iOS, or clean Android build with `cd android && ./gradlew clean && cd ..`
- **TypeScript errors:** Run `npm install` to ensure all type definitions are installed

## Notes

- For development, you can use mock locations without a real API key, but maps won't render properly
- The app uses mock data - no backend connection required
- All location data is currently hardcoded for UI development

