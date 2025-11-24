# Mobile & Desktop Apps Setup Guide

## 📱 Mobile App (React Native with Expo)

### Prerequisites
- Node.js 18+ installed
- Expo CLI: `npm install -g expo-cli`
- For iOS: macOS with Xcode
- For Android: Android Studio with Android SDK

### Setup

```bash
cd mobile
npm install
```

### Development

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web
```

### Project Structure

```
mobile/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Home screen
│   │   ├── hotels.tsx         # Hotels listing
│   │   ├── flights.tsx        # Flights search
│   │   ├── trains.tsx         # Train booking
│   │   ├── profile.tsx        # User profile
│   └── _layout.tsx            # Root layout with navigation
├── components/
│   ├── TrainCard.tsx          # Train result card
│   ├── SearchBar.tsx          # Search component
│   └── BookingForm.tsx        # Booking form
├── services/
│   ├── api.ts                 # API client
│   ├── auth.ts                # Authentication
│   └── storage.ts             # Local storage
├── app.json                   # Expo configuration
├── package.json
└── tsconfig.json
```

### Building for Production

#### Android APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build APK
eas build --platform android --profile production

# Submit to Google Play
eas submit --platform android
```

#### iOS IPA

```bash
# Build for iOS
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios
```

### Configuration

Update `app.json` with your details:

```json
{
  "expo": {
    "name": "BookMeThat",
    "slug": "bookmethat",
    "version": "1.0.0",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png"
    },
    "ios": {
      "bundleIdentifier": "com.bookmethat.app",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "com.bookmethat",
      "versionCode": 1
    }
  }
}
```

## 🖥️ Desktop App (Electron)

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Setup

```bash
cd desktop
npm install
```

### Development

```bash
# Start in development mode
npm run dev

# This will:
# 1. Start Next.js dev server on port 3000
# 2. Launch Electron app window
```

### Project Structure

```
desktop/
├── electron/
│   ├── main.ts                # Electron main process
│   ├── preload.ts             # Preload scripts for security
│   └── menu.ts                # Application menu
├── renderer/                  # Next.js frontend (shared with web)
│   ├── pages/
│   ├── components/
│   └── styles/
├── package.json
└── electron-builder.json      # Build configuration
```

### Building for Production

#### Windows

```bash
# Build for Windows (creates .exe installer)
npm run build:win

# Output: dist/BookMeThat Setup 1.0.0.exe
```

#### macOS

```bash
# Build for macOS (creates .dmg)
npm run build:mac

# Output: dist/BookMeThat-1.0.0.dmg
```

#### Linux

```bash
# Build for Linux (creates .AppImage)
npm run build:linux

# Output: dist/BookMeThat-1.0.0.AppImage
```

### Configuration

Update `electron-builder.json`:

```json
{
  "appId": "com.bookmethat.app",
  "productName": "BookMeThat",
  "directories": {
    "output": "dist"
  },
  "files": [
    "out/**/*",
    "electron/**/*"
  ],
  "win": {
    "target": ["nsis"],
    "icon": "assets/icon.ico"
  },
  "mac": {
    "target": ["dmg"],
    "icon": "assets/icon.icns"
  },
  "linux": {
    "target": ["AppImage"],
    "icon": "assets/icon.png"
  }
}
```

## 🔗 API Integration

Both mobile and desktop apps connect to the backend API:

### Development
```typescript
const API_URL = 'http://localhost:4000';
```

### Production
```typescript
const API_URL = 'https://api.bookmethat.com';
```

### Example API Call

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Search trains
const searchTrains = async (from: string, to: string, date: string) => {
  const response = await api.post('/api/v1/trains/search', {
    from,
    to,
    date,
  });
  return response.data;
};
```

## 🚀 Deployment

### Mobile App Deployment

1. **App Store (iOS)**
   - Requires Apple Developer Account ($99/year)
   - Create app in App Store Connect
   - Build and submit: `eas submit --platform ios`

2. **Google Play Store (Android)**
   - Requires Google Play Developer Account ($25 one-time)
   - Create app in Google Play Console
   - Build and submit: `eas submit --platform android`

### Desktop App Deployment

1. **Create Download Page**
   - Upload built files to `/public/downloads/`
   - Update download links in `/downloads` page

2. **Hosting Options**
   - GitHub Releases (free)
   - AWS S3 + CloudFront
   - Your own server

3. **Auto-Updates**
   - Configure electron-updater in main.ts
   - Host update manifest file
   - Apps will check for updates on startup

## 📦 App Store Assets Required

### Screenshots
- iOS: 6.5" (1284x2778), 5.5" (1242x2208)
- Android: Phone (1080x1920), Tablet (1200x1920)

### Icons
- iOS: 1024x1024 PNG (App Store)
- Android: 512x512 PNG (Play Store)
- Desktop: 512x512 PNG + ICO/ICNS

### Marketing Materials
- App description (short & long)
- Keywords (max 100 characters for iOS)
- Privacy policy URL
- Support URL
- Category selection

## 🔒 Security Considerations

### Mobile
- Store sensitive data in SecureStore
- Use HTTPS for all API calls
- Implement biometric authentication
- Enable certificate pinning

### Desktop
- Enable context isolation in Electron
- Use preload scripts for IPC
- Validate all user inputs
- Implement auto-updates with signature verification

## 🐛 Troubleshooting

### Mobile

**Metro bundler fails to start:**
```bash
npm start -- --clear
```

**iOS build fails:**
```bash
cd ios && pod install && cd ..
```

**Android build fails:**
```bash
cd android && ./gradlew clean && cd ..
```

### Desktop

**Electron doesn't start:**
```bash
rm -rf node_modules
npm install
npm run dev
```

**Build fails:**
```bash
npm run build
# Then try platform-specific build
```

## 📞 Support

- Documentation: https://bookmethat.com/docs
- Issues: https://github.com/FazalShahidLatif/bookmethat/issues
- Email: support@bookmethat.com

## 📄 License

MIT License - see LICENSE file for details
