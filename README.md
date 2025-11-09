# Phoenix
A platform for first responders and community members to quickly and efficiently deliver aid and evacuate emergency disasters.

## Natural Disaster Community Help App

A React Native mobile app that helps community members assist each other during natural disasters when internet connectivity is limited.

## Features

- Interactive map showing help requests with severity-based color coding
- Create and view help requests (medical, evacuation, food/water, shelter, other)
- User profile display
- Bottom sheet details card for request information
- Floating action button to create new requests

## Setup Instructions

### Prerequisites

- Node.js (>=18)
- React Native development environment set up
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

### Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS, install pods:
```bash
cd ios && pod install && cd ..
```

3. For Android, ensure you have the Android SDK configured.

### Running the App

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

### Development

Start the Metro bundler:
```bash
npm start
```

## Project Structure

```
Phoenix/
├── screens/
│   └── DisasterMapScreen.tsx    # Main map screen
├── components/
│   ├── HelpRequestDetailsCard.tsx  # Bottom sheet for request details
│   ├── NewRequestButton.tsx        # Floating action button
│   ├── NewRequestModal.tsx         # Modal for creating requests
│   └── UserProfileStrip.tsx        # User profile header
├── App.tsx                         # Root component with navigation
└── package.json
```

## Technologies

- React Native 0.72.6
- TypeScript
- React Navigation
- react-native-maps
- React Native Gesture Handler

## Notes

- This is a UI-only implementation with mock data
- No backend or Bluetooth/SMS functionality included
- Location data is mocked for development