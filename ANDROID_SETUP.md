# Android Development Setup for Windows

## Option 1: Android Emulator (Recommended for Development)

### Step 1: Install Android Studio

1. Download Android Studio from: https://developer.android.com/studio
2. Install Android Studio with default settings
3. During installation, make sure to install:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)

### Step 2: Configure Environment Variables

1. Open System Properties → Environment Variables
2. Add these to your **User** or **System** PATH:
   ```
   %LOCALAPPDATA%\Android\Sdk\platform-tools
   %LOCALAPPDATA%\Android\Sdk\tools
   %LOCALAPPDATA%\Android\Sdk\tools\bin
   ```
   
   Or if installed in default location:
   ```
   C:\Users\YourUsername\AppData\Local\Android\Sdk\platform-tools
   C:\Users\YourUsername\AppData\Local\Android\Sdk\tools
   C:\Users\YourUsername\AppData\Local\Android\Sdk\tools\bin
   ```

3. Create/Update `ANDROID_HOME` variable:
   ```
   ANDROID_HOME = %LOCALAPPDATA%\Android\Sdk
   ```

4. **Restart your terminal/PowerShell** after adding these variables

### Step 3: Create an Android Virtual Device (AVD)

1. Open Android Studio
2. Go to **Tools → Device Manager** (or **Configure → AVD Manager**)
3. Click **Create Device**
4. Select a device (e.g., Pixel 5)
5. Download a system image (e.g., Android 13 - API 33)
6. Finish the setup

### Step 4: Verify Setup

Open a new PowerShell window and run:
```powershell
adb version
```

You should see the ADB version. If not, restart your terminal.

### Step 5: Start the Emulator

1. Open Android Studio → Device Manager
2. Click the ▶️ play button next to your AVD
3. Wait for the emulator to boot

Or from command line:
```powershell
# First, find your AVD name:
emulator -list-avds

# Then start it (replace YourAVDName with actual name):
emulator -avd YourAVDName
```

**Note:** If `emulator` command doesn't work, use the full path:
```powershell
$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe -list-avds
$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe -avd YourAVDName
```

**Or use Android Studio Device Manager** (easier):
1. Open Android Studio
2. Tools → Device Manager
3. Click ▶️ play button next to your AVD

### Step 6: Run the App

Once the emulator is running:
```powershell
npm start
```

In another terminal:
```powershell
npm run android
```

---

## Option 2: Physical Android Device

### Step 1: Enable Developer Options

1. Go to **Settings → About Phone**
2. Tap **Build Number** 7 times
3. Go back to **Settings → Developer Options**
4. Enable **USB Debugging**

### Step 2: Connect Device

1. Connect your phone via USB
2. Accept the USB debugging prompt on your phone
3. Verify connection:
   ```powershell
   adb devices
   ```
   You should see your device listed

### Step 3: Run the App

```powershell
npm start
```

In another terminal:
```powershell
npm run android
```

---

## Quick Test (Without Full Setup)

If you just want to verify the code compiles without running on a device:

```powershell
npm start
```

This will start Metro bundler. You can check if there are any syntax errors, but you'll need an emulator or device to actually see the app.

---

## Troubleshooting

### "adb: command not found"
- Make sure Android SDK is installed
- Add platform-tools to PATH (see Step 2 above)
- Restart your terminal

### "SDK location not found"
- Set ANDROID_HOME environment variable
- Or create `android/local.properties` with:
  ```
  sdk.dir=C\:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
  ```

### "Java version mismatch"
- React Native 0.72.6 works with Java 11, 17, or 21
- You have Java 23, which might work but Java 17 is recommended
- You can install multiple Java versions and switch using JAVA_HOME

### Build Errors
- Make sure you've run `npm install` successfully
- Try: `cd android && ./gradlew clean && cd ..`
- Then: `npm run android`

---

## Alternative: Use Expo (Easier but Different)

If setting up Android Studio seems complex, you could use Expo instead:
- Easier setup
- Can test on physical device via Expo Go app
- But requires converting the project to Expo

For now, stick with React Native CLI if you want the full native maps functionality.

