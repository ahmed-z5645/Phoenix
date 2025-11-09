# Fix Java Version Error - Step by Step

## The Error You're Getting

The error says:
- **"The consumer was configured to find a runtime of a library compatible with Java 8"**
- **"this component declares an API of a component compatible with Java 11"**

**What this means:**
- Gradle is using **Java 8**
- But Android Gradle Plugin 7.4.2 requires **Java 11+**
- You need to tell Gradle to use **Java 17**

---

## Solution: Set Gradle JDK in Android Studio

### Step 1: Open Android Studio
Open your project in Android Studio.

### Step 2: Open Settings
- **File → Settings** (or press `Ctrl + Alt + S`)

### Step 3: Find Gradle Settings
- In the **search bar** at the top of the settings window, type: `Gradle JDK`
- Or navigate manually: **Build, Execution, Deployment → Build Tools → Gradle**

### Step 4: Set Gradle JDK
- Look for **"Gradle JDK"** dropdown (it's on the right side)
- Click the dropdown
- Select **"jbr-17"** or **"JDK 17"** or **"Java 17"**
- If you don't see Java 17:
  - Click **"Download JDK"** button
  - Select **Version: 17**
  - Select **Vendor: JetBrains Runtime (jbr-17)** or **Eclipse Temurin**
  - Click **"Download"**
  - Wait for download to complete
  - Then select it from the dropdown

### Step 5: Apply and Sync
- Click **"Apply"** button
- Click **"OK"** button
- Android Studio will automatically sync Gradle (you'll see "Gradle sync" in the bottom status bar)
- **Wait for sync to complete** (this may take 1-2 minutes)

---

## After Fixing

Once Gradle sync completes, try building again:
```bash
npm run android
```

---

## Visual Guide

1. **Settings Window** → Search for "Gradle JDK"
2. **Gradle JDK dropdown** → Select "jbr-17" or "Java 17"
3. **Apply** → **OK**
4. **Wait for Gradle sync**
5. **Try building again**

---

## If You Can't Find the Setting

1. **Open Android Studio**
2. **File → Settings** (or `Ctrl + Alt + S`)
3. **In the search bar**, type: `Gradle JDK`
4. **Click on "Gradle JDK"** in the results
5. **Select Java 17** from the dropdown

---

## That's It!

Set the Gradle JDK to Java 17 in Android Studio, wait for sync, then try building again! 🚀


