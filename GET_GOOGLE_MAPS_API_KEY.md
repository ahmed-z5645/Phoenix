# How to Get Google Maps API Key

## Quick Steps

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/
2. Sign in with your Google account

### Step 2: Create a New Project (or select existing)
1. Click "Select a project" at the top
2. Click "New Project"
3. Enter project name: "Phoenix" (or any name)
4. Click "Create"

### Step 3: Enable Maps SDK for Android
1. In the left menu, go to "APIs & Services" → "Library"
2. Search for "Maps SDK for Android"
3. Click on it
4. Click "Enable"

### Step 4: Create API Key
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the API key that appears

### Step 5: Restrict API Key (Optional but Recommended)
1. Click on the API key you just created
2. Under "Application restrictions", select "Android apps"
3. Click "Add an item"
4. Enter package name: `com.phoenix`
5. Get your SHA-1 certificate fingerprint:
   ```bash
   cd android
   ./gradlew signingReport
   ```
   Look for "SHA1:" in the output
6. Paste the SHA-1 fingerprint
7. Click "Save"

### Step 6: Add API Key to AndroidManifest.xml
1. Open `android/app/src/main/AndroidManifest.xml`
2. Find the line:
   ```xml
   android:value="YOUR_GOOGLE_MAPS_API_KEY_HERE"/>
   ```
3. Replace `YOUR_GOOGLE_MAPS_API_KEY_HERE` with your actual API key
4. Save the file

### Step 7: Rebuild the App
```bash
npm run android
```

---

## For Hackathon (Quick Test)

If you need to test quickly without getting an API key:

1. You can temporarily comment out the MapView in your code
2. Or use a test/demo API key (maps won't work but app won't crash)

---

## That's It!

Once you add the API key, the maps should work!

