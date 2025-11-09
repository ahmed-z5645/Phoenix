# Start Emulator - Your AVD Name

## Your AVD Name
**`Medium_Phone_API_36.1`**

---

## Start Emulator

### Option 1: From Command Line (Just Started!)
```powershell
$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe -avd Medium_Phone_API_36.1
```

**The emulator is starting now!** Wait 1-2 minutes for it to boot.

---

### Option 2: From Android Studio (Easier)
1. **Open Android Studio**
2. **Tools → Device Manager**
3. **Find "Medium_Phone_API_36.1"**
4. **Click ▶️ play button** next to it
5. **Wait for emulator to boot**

---

## After Emulator Starts

1. **Wait for emulator to fully boot** (home screen appears)
2. **In your project folder, run:**
   ```bash
   npm start
   ```
   (Keep this running)

3. **In a NEW terminal, run:**
   ```bash
   npm run android
   ```

4. **App installs and launches on emulator!** 🎉

---

## Verify Emulator is Running

```powershell
adb devices
```

You should see your emulator listed (e.g., `emulator-5554`).

---

## Quick Commands

```powershell
# Start emulator
$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe -avd Medium_Phone_API_36.1

# Check if running
adb devices

# Run app
npm start
# (in new terminal)
npm run android
```

---

## That's It!

**The emulator is starting now!** Wait for it to boot, then run `npm run android`! 🚀

