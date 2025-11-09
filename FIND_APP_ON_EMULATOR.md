# Find App on Emulator

## Check if App is Installed

### Step 1: Verify Emulator is Connected
```powershell
adb devices
```
You should see your emulator listed (e.g., `emulator-5554`).

### Step 2: Check if App is Installed
```powershell
adb shell pm list packages | findstr phoenix
```
This shows if the app is installed.

### Step 3: Launch the App
```powershell
adb shell am start -n com.phoenix/.MainActivity
```

---

## Find App on Emulator Screen

### Option 1: Look in App Drawer
1. **On emulator, swipe up** from bottom (or click app drawer icon)
2. **Look for "Phoenix"** app icon
3. **Tap it** to open

### Option 2: Search for App
1. **On emulator, swipe up** to open app drawer
2. **Type "Phoenix"** in search box
3. **Tap the app** when it appears

### Option 3: Launch from Command Line
```powershell
adb shell am start -n com.phoenix/.MainActivity
```

---

## If App is Not Installed

### Check Build Output
Look at the terminal where you ran `npm run android`:
- Did it say "BUILD SUCCESSFUL"?
- Did it say "Installing APK"?
- Any errors?

### Try Building Again
```bash
npm run android
```

### Check for Errors
Look at the terminal output for any error messages.

---

## Manual Launch

### Launch App Manually
```powershell
adb shell am start -n com.phoenix/.MainActivity
```

### Or Open App Drawer
1. **On emulator, swipe up** from bottom
2. **Find "Phoenix"** app
3. **Tap it**

---

## Troubleshooting

### "App not found"
**Fix:** App might not be installed. Try:
```bash
npm run android
```
Again and check for errors.

### "Activity not found"
**Fix:** Check if package name is correct:
- Should be `com.phoenix`
- Check `android/app/build.gradle` for `applicationId`

### App Installed but Won't Launch
**Fix:** Check for crashes:
```powershell
adb logcat | findstr Phoenix
```

---

## Quick Steps

1. **Check if app is installed:**
   ```powershell
   adb shell pm list packages | findstr phoenix
   ```

2. **Launch app:**
   ```powershell
   adb shell am start -n com.phoenix/.MainActivity
   ```

3. **Or find it on emulator:**
   - Swipe up to open app drawer
   - Look for "Phoenix" app
   - Tap it

---

## That's It!

Try launching the app manually or find it in the app drawer! 🚀

