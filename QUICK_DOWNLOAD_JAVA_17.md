# Quick Guide: Download Java 17

## Step 1: Download Java 17

### Direct Download Link (Eclipse Temurin - Recommended)
**Go to:** https://adoptium.net/temurin/releases/?version=17

**Or use this direct link:**
- **Windows x64:** https://github.com/adoptium/temurin17-binaries/releases/latest
- Look for: `OpenJDK17U-jdk_x64_windows_hotspot_17.x.x_x64.msi` (installer)
- Or: `OpenJDK17U-jdk_x64_windows_hotspot_17.x.x_x64.zip` (portable)

---

## Step 2: Install Java 17

### If you downloaded the .msi installer:
1. **Run the installer** (double-click the .msi file)
2. **Follow the installation wizard**
3. **Default installation path:** `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot`
4. **Click "Install"**

### If you downloaded the .zip file:
1. **Extract the zip file** to a folder (e.g., `C:\Program Files\Java\jdk-17`)
2. **Note the path** where you extracted it

---

## Step 3: Find the Installation Path

After installation, run this command to find the path:

```powershell
Get-ChildItem -Path "C:\Program Files\Eclipse Adoptium" -Directory | ForEach-Object { Write-Host $_.FullName }
```

Or check manually:
- `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot`
- `C:\Program Files\Java\jdk-17`
- `C:\Program Files\Microsoft\jdk-17.x.x`

---

## Step 4: Set the Path in gradle.properties

Edit `android/gradle.properties` and add:

```properties
org.gradle.java.home=C:\\Program Files\\Eclipse Adoptium\\jdk-17.x.x-hotspot
```

**Important:**
- Use **double backslashes** (`\\`) in the path!
- Replace `jdk-17.x.x-hotspot` with your actual folder name

---

## Step 5: Verify It's Java 17

Check the version:
```powershell
& "C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot\bin\java.exe" -version
```

You should see: `openjdk version "17.0.x"`

---

## Step 6: Try Building

```bash
npm run android
```

---

## That's It!

Download Java 17, install it, set the path in `gradle.properties`, and try building again! 🚀


