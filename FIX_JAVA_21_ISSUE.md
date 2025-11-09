# Fix Java 21 Issue

## Problem
The error "Unsupported class file major version 65" means:
- **Java 21** is being used (class file version 65 = Java 21)
- But **Gradle 7.6.1** needs **Java 17**
- The Java at `C:\Program Files\Android\Android Studio\jbr` is **Java 21**

---

## Solution: Find Java 17

### Option 1: Check for jbr-17 Directory

Check if there's a `jbr-17` directory:
```powershell
Get-ChildItem -Path "C:\Program Files\Android\Android Studio" -Filter "jbr-17" -Directory
```

### Option 2: Download Java 17

If you don't have Java 17, download it:
1. Go to: https://adoptium.net/temurin/releases/?version=17
2. Download **Windows x64** JDK 17
3. Install it
4. Set the path in `gradle.properties` to the installation directory

### Option 3: Use Android Studio to Download Java 17

1. **Open Android Studio**
2. **File → Settings → Build, Execution, Deployment → Build Tools → Gradle**
3. **Click "Gradle JDK" dropdown**
4. **Click "Download JDK"**
5. **Select Version: 17**
6. **Select Vendor: JetBrains Runtime (jbr-17)**
7. **Click "Download"**
8. **Wait for download**
9. **Copy the path** (it will show in the dropdown)
10. **Set it in `gradle.properties`**

---

## After Finding Java 17

Once you have Java 17, set it in `android/gradle.properties`:
```properties
org.gradle.java.home=C:\\path\\to\\java17
```

**Important:** Use double backslashes (`\\`) in the path!

---

## Clear Gradle Cache

I've cleared the Gradle cache. Try building again:
```bash
npm run android
```

---

## That's It!

Find Java 17 and set it in `gradle.properties`! 🚀


