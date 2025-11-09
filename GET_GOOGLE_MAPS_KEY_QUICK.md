# Quick Guide: Get Google Maps API Key

## Step 1: Go to Google Cloud Console
Visit: https://console.cloud.google.com/

## Step 2: Create/Select Project
1. Click "Select a project" at the top
2. Click "New Project"
3. Name: "Phoenix" (or any name)
4. Click "Create"

## Step 3: Enable Maps SDK for Android
1. Go to "APIs & Services" → "Library"
2. Search: "Maps SDK for Android"
3. Click on it
4. Click "Enable"

## Step 4: Create API Key
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. **Copy the API key** that appears

## Step 5: Add to AndroidManifest.xml
1. Open: `android/app/src/main/AndroidManifest.xml`
2. Find this line:
   ```xml
   android:value="AIzaSyDummyKeyForTesting123456789"/>
   ```
3. Replace `AIzaSyDummyKeyForTesting123456789` with your real API key
4. Save the file

## Step 6: Rebuild App
```bash
npm run android
```

---

## That's It!

Once you add the API key, the map will work!

