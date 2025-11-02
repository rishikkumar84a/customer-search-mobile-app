# 🔧 Troubleshooting Guide

Common issues and solutions for the Customer Search Mobile Application.

---

## 📱 Installation Issues

### Issue: `npm install` fails

**Symptoms:**
- Package installation errors
- Dependency conflicts

**Solutions:**

1. **Clear npm cache**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Use correct Node version**
   ```bash
   node --version  # Should be 18+
   ```

3. **Try yarn instead**
   ```bash
   yarn install
   ```

### Issue: iOS pod install fails

**Symptoms:**
- `pod install` command fails
- CocoaPods errors

**Solutions:**

1. **Update CocoaPods**
   ```bash
   sudo gem install cocoapods
   ```

2. **Clean and reinstall**
   ```bash
   cd ios
   rm -rf Pods Podfile.lock
   pod install
   cd ..
   ```

3. **Update pod repo**
   ```bash
   pod repo update
   ```

---

## 🚀 Runtime Issues

### Issue: Metro bundler won't start

**Symptoms:**
- Metro fails to start
- Port already in use
- Bundling errors

**Solutions:**

1. **Reset cache**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Kill existing Metro**
   ```bash
   # Windows
   taskkill /F /IM node.exe
   
   # Mac/Linux
   killall node
   ```

3. **Use different port**
   ```bash
   npx react-native start --port 8082
   ```

### Issue: App won't build (Android)

**Symptoms:**
- Gradle build fails
- Android build errors

**Solutions:**

1. **Clean Gradle**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

2. **Clear build folder**
   ```bash
   cd android
   rm -rf build app/build
   cd ..
   ```

3. **Invalidate caches**
   - Open Android Studio
   - File → Invalidate Caches / Restart

4. **Check Java version**
   ```bash
   java -version  # Should be JDK 11 or 17
   ```

### Issue: App won't build (iOS)

**Symptoms:**
- Xcode build fails
- Signing errors
- Simulator issues

**Solutions:**

1. **Clean build**
   - Xcode → Product → Clean Build Folder (Cmd+Shift+K)

2. **Reinstall pods**
   ```bash
   cd ios
   rm -rf Pods Podfile.lock
   pod install --repo-update
   cd ..
   ```

3. **Reset simulator**
   ```bash
   xcrun simctl erase all
   ```

4. **Check Xcode version**
   - Should be Xcode 14 or higher

---

## 🌐 API Issues

### Issue: Cannot connect to API

**Symptoms:**
- "Network error" messages
- API calls timeout
- Unable to fetch customers

**Solutions:**

1. **Check JSON Server is running**
   ```bash
   # In separate terminal
   npm run json-server
   
   # Should see:
   # Resources
   # http://localhost:3001/customers
   ```

2. **Verify API URL**
   - Open `src/services/api/config.ts`
   - Check platform-specific URLs:
     - iOS: `http://localhost:3001`
     - Android: `http://10.0.2.2:3001`
     - Device: `http://<YOUR_IP>:3001`

3. **Test API directly**
   ```bash
   # Open browser or use curl
   curl http://localhost:3001/customers
   ```

4. **Check firewall**
   - Ensure port 3001 is not blocked
   - Add exception for Node.js if needed

### Issue: API works in browser but not in app

**Symptoms:**
- Browser shows data
- App shows network error

**Solutions:**

1. **For Android Emulator**
   - Use `10.0.2.2` instead of `localhost`
   - Already configured in `config.ts`

2. **For Physical Device**
   - Get your computer's IP:
     ```bash
     # Windows
     ipconfig
     
     # Mac/Linux
     ifconfig
     ```
   - Update `LOCAL_IP` in `src/services/api/config.ts`:
     ```typescript
     const LOCAL_IP = '192.168.1.100'; // Your actual IP
     ```

3. **Ensure same network**
   - Device and computer must be on same WiFi network

### Issue: Search returns no results

**Symptoms:**
- Search completes but shows empty list
- Expected customers not found

**Solutions:**

1. **Check search criteria**
   - Names are case-sensitive in JSON Server
   - Use exact match for dates (YYYY-MM-DD)

2. **Verify db.json data**
   - Check `db.json` has customer data
   - Ensure JSON is valid

3. **Test with known data**
   - Search for "John" (should find John Doe)
   - Search for "Smith" (should find Jane Smith)

4. **Check API query**
   - Open browser: `http://localhost:3001/customers?firstName_like=John`
   - Should return matching customers

---

## 📱 App Behavior Issues

### Issue: App crashes on launch

**Symptoms:**
- App opens then immediately closes
- Red screen error

**Solutions:**

1. **Check error message**
   - Red screen shows error details
   - Metro console shows errors

2. **Common fixes**
   ```bash
   # Clear Metro cache
   npx react-native start --reset-cache
   
   # Rebuild app
   npx react-native run-ios --clean
   # or
   npx react-native run-android --clean
   ```

3. **Check for syntax errors**
   - TypeScript compiler will show errors
   - Run: `npx tsc --noEmit`

### Issue: Form fields not showing

**Symptoms:**
- Search screen is blank
- No input fields visible

**Solutions:**

1. **Check configuration**
   - Open `src/config/appConfig.ts`
   - Verify `searchConfig.fields` is not empty
   - Check for syntax errors

2. **Check console for errors**
   - Look for React errors in Metro

3. **Verify component imports**
   - Check all imports in `SearchScreen.tsx`

### Issue: Navigation not working

**Symptoms:**
- Buttons don't navigate
- Stuck on one screen

**Solutions:**

1. **Check navigation prop**
   - Ensure screens receive `navigation` prop
   - Verify navigation types

2. **Verify stack configuration**
   - Check `RootNavigator.tsx`
   - Ensure all screens registered

3. **Check for errors**
   - Navigation errors show in console

### Issue: Data not displaying correctly

**Symptoms:**
- Customer info missing
- Formatting issues
- Incorrect data shown

**Solutions:**

1. **Check display configuration**
   - Review `displayConfig` in `appConfig.ts`
   - Verify field keys match customer data

2. **Check format functions**
   - Ensure format functions handle null/undefined
   - Add defensive checks

3. **Verify customer data structure**
   - Check `db.json` data format
   - Ensure matches TypeScript types

---

## 🎨 UI/Style Issues

### Issue: UI looks broken

**Symptoms:**
- Layout issues
- Overlapping elements
- Text cut off

**Solutions:**

1. **Check SafeAreaView**
   - Ensure all screens use SafeAreaView
   - Check safe area insets

2. **Test different devices**
   - Try different simulators/emulators
   - Test various screen sizes

3. **Check for console warnings**
   - React Native warnings in console
   - FlexBox warnings

### Issue: Slow performance

**Symptoms:**
- Laggy scrolling
- Slow form input
- Delayed navigation

**Solutions:**

1. **Enable Hermes** (if not already)
   - Check `android/app/build.gradle`
   - Should have `enableHermes: true`

2. **Check for memory leaks**
   - Large lists without virtualization
   - Unsubscribed event listeners

3. **Optimize images**
   - Use appropriate image sizes
   - Enable image caching

---

## 🔍 TypeScript Issues

### Issue: TypeScript errors

**Symptoms:**
- Red squiggly lines in IDE
- Build fails with type errors

**Solutions:**

1. **Install type definitions**
   ```bash
   npm install --save-dev @types/react @types/react-native
   ```

2. **Check tsconfig.json**
   - Ensure proper configuration
   - Verify include/exclude paths

3. **Restart TypeScript server**
   - VS Code: Cmd+Shift+P → "Restart TS Server"

### Issue: "Cannot find module" errors

**Symptoms:**
- Import errors
- Module not found

**Solutions:**

1. **Check file paths**
   - Verify relative import paths
   - Ensure file extensions correct

2. **Check module resolution**
   - Review `tsconfig.json` paths
   - Check babel config aliases

3. **Reinstall dependencies**
   ```bash
   rm -rf node_modules
   npm install
   ```

---

## 🧹 Clean Slate Solutions

### Nuclear Option: Complete Reset

If all else fails, try a complete clean and rebuild:

**For iOS:**
```bash
# Stop all processes
killall node

# Clean everything
rm -rf node_modules package-lock.json ios/Pods ios/Podfile.lock

# Reinstall
npm install
cd ios && pod install && cd ..

# Clear caches and rebuild
npx react-native start --reset-cache &
npx react-native run-ios
```

**For Android:**
```bash
# Stop all processes
killall node

# Clean everything
rm -rf node_modules package-lock.json android/build android/app/build

# Reinstall
npm install

# Clear caches and rebuild
cd android && ./gradlew clean && cd ..
npx react-native start --reset-cache &
npx react-native run-android
```

---

## 📋 Debug Checklist

When encountering issues, go through this checklist:

- [ ] Node.js version 18+ installed
- [ ] Dependencies installed (`node_modules` exists)
- [ ] JSON Server running on port 3001
- [ ] Metro bundler running
- [ ] No firewall blocking ports
- [ ] Correct simulator/emulator running
- [ ] Metro cache cleared if needed
- [ ] Build folders cleaned if needed
- [ ] Console checked for error messages
- [ ] Network connectivity verified

---

## 🆘 Getting Help

### Information to Provide

When asking for help, include:

1. **Environment**
   - OS version (Windows/Mac/Linux)
   - Node version (`node --version`)
   - React Native version
   - iOS/Android version

2. **Error Details**
   - Complete error message
   - Stack trace
   - When the error occurs

3. **Steps to Reproduce**
   - What you did
   - What you expected
   - What actually happened

4. **Screenshots**
   - Error screens
   - Console output

### Where to Get Help

- Check this guide first
- Review README.md
- Check CONFIGURATION_GUIDE.md
- Review React Native docs
- Check JSON Server documentation

---

## 💡 Prevention Tips

1. **Keep dependencies updated**
   ```bash
   npm outdated
   npm update
   ```

2. **Regular cache clearing**
   ```bash
   npx react-native start --reset-cache
   ```

3. **Test on both platforms**
   - iOS and Android may behave differently

4. **Use version control**
   - Commit working versions
   - Easy to revert if issues

5. **Read error messages carefully**
   - They usually tell you what's wrong
   - Check file paths and line numbers

---

## 📞 Contact Support

If you can't resolve an issue:

**Developer:** Rishik Kumar Chaurasiya  
**Email:** rishikkumarchaurasiya@gmail.com

Include all information from the "Getting Help" section above.

---

**Most issues can be resolved by reading error messages carefully and checking this guide!**
