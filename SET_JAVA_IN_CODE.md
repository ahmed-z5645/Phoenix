# Set Java Version in Code

## What I Did

I've added Java 17 configuration to `android/build.gradle` to force Gradle to use Java 17.

---

## If This Doesn't Work

If you still get the error, we need to set the Java home path. Try this:

### Option 1: Find Your Java 17 Path

Run this command to find where Java 17 is installed:
```powershell
Get-ChildItem -Path "C:\Program Files\Android\Android Studio" -Filter "jbr*" -Directory -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty FullName
```

Or check:
- `C:\Program Files\Android\Android Studio\jbr`
- `C:\Program Files\Android\Android Studio\jbr-17`
- `%LOCALAPPDATA%\Programs\Android\Android Studio\jbr`
- `%LOCALAPPDATA%\Programs\Android\Android Studio\jbr-17`

### Option 2: Set Java Home in gradle.properties

Once you find the path, edit `android/gradle.properties` and set:
```properties
org.gradle.java.home=C:\\Program Files\\Android\\Android Studio\\jbr
```

**Important:** Use double backslashes (`\\`) in the path!

---

## Try Building Now

```bash
npm run android
```

---

## If It Still Doesn't Work

Tell me the error message and I'll help you find the Java 17 path and set it correctly! 🚀


