# Quick Setup Guide

## 🚀 Quick Start (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start JSON Server (in one terminal)
```bash
npm run json-server
```

### Step 3: Start Metro Bundler (in another terminal)
```bash
npm start
```

### Step 4: Run the App

**For iOS:**
```bash
npm run ios
```

**For Android:**
```bash
npm run android
```

## 📱 Platform-Specific Notes

### iOS Setup (macOS only)
```bash
cd ios
pod install
cd ..
npm run ios
```

### Android Setup
- Ensure Android Studio is installed
- Start an Android emulator OR connect a physical device
- Run: `npm run android`

### Physical Device Setup
1. Open `src/services/api/config.ts`
2. Find your local IP: 
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig` or `ip addr`
3. Update `LOCAL_IP` constant with your IP address

## ✅ Verification Checklist

- [ ] Node.js 18+ installed (`node --version`)
- [ ] Dependencies installed (`npm install`)
- [ ] JSON Server running on port 3001
- [ ] Metro bundler running
- [ ] App launched on iOS/Android

## 🧪 Test the App

1. **Open app** - See the search form
2. **Search** - Enter "John" in First Name
3. **View Results** - See John Doe in the list
4. **Pull to Refresh** - Pull down on results
5. **View Details** - Tap on a customer
6. **Navigate Back** - Use back button

## 🆘 Need Help?

Check the main README.md for detailed troubleshooting.

Common commands:
```bash
# Reset Metro cache
npx react-native start --reset-cache

# Clean Android build
cd android && ./gradlew clean && cd ..

# Reinstall iOS pods
cd ios && pod install && cd ..
```

## 📞 Contact

Rishik Kumar Chaurasiya  
📧 rishikkumarchaurasiya@gmail.com
