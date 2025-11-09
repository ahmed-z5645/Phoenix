# Find Java 17 Path and Set It

## What I Did

I've added Java 17 configuration to `android/build.gradle` and prepared `gradle.properties` for setting the Java path.

---

## Find Your Java 17 Path

Run this command to find where Java 17 is installed:

```powershell
Get-ChildItem -Path "C:\Program Files\Android\Android Studio" -Filter "jbr*" -Directory -ErrorAction SilentlyContinue | ForEach-Object { Write-Host $_.FullName }
```

Or check these common locations:
- `C:\Program Files\Android\Android Studio\jbr`
- `C:\Program Files\Android\Android Studio\jbr-17`
- `%LOCALAPPDATA%\Programs\Android\Android Studio\jbr`
- `%LOCALAPPDATA%\Programs\Android\Android Studio\jbr-17`

---

## Set It in gradle.properties

Once you find the path, edit `android/gradle.properties` and uncomment one of these lines, then set the correct path:

```properties
org.gradle.java.home=C:\\Program Files\\Android\\Android Studio\\jbr
```

**Important:** 
- Use double backslashes (`\\`) in the path!
- Replace the path with your actual Java 17 path

---

## Or Use Environment Variable

If you have JAVA_HOME set to Java 17, you can use:
```properties
org.gradle.java.home=%JAVA_HOME%
```

---

## Try Building Now

After setting the path, try:
```bash
npm run android
```

---

## If You Can't Find Java 17

1. **Open Android Studio**
2. **File → Settings → Build, Execution, Deployment → Build Tools → Gradle**
3. **Look at "Gradle JDK"** - it will show the path
4. **Copy that path** and set it in `gradle.properties`

---

## That's It!

Find your Java 17 path and set it in `gradle.properties`! 🚀


