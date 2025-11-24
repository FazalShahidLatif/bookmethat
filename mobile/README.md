# BookMeThat Mobile App

React Native mobile application for iOS and Android using Expo.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Expo CLI: `npm install -g expo-cli`
- For iOS: Xcode (Mac only)
- For Android: Android Studio

### Installation

```bash
cd mobile
npm install
```

### Development

```bash
# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS (Mac only)
npm run ios

# Run on web
npm run web
```

## 📱 Features

- ✅ Train booking (Pakistan Railway)
- ✅ Hotel search and booking
- ✅ Flight search
- ✅ Car rentals
- ✅ Activities and tours
- ✅ eSIM purchase
- ✅ User authentication
- ✅ Payment integration (JazzCash, EasyPaisa, Cards)
- ✅ Booking management
- ✅ Offline support

## 🏗️ Project Structure

```
mobile/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home screen
│   └── trains/            # Train booking flow
│       ├── index.tsx      # Train search
│       └── booking.tsx    # Booking form
├── assets/                # Images, fonts, icons
├── app.json              # Expo configuration
├── babel.config.js       # Babel configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies
```

## 📦 Building for Production

### Android APK

```bash
npm run build:android
```

### iOS IPA

```bash
npm run build:ios
```

## 🚀 Deployment

### Submit to App Stores

```bash
# Android Play Store
npm run submit:android

# iOS App Store
npm run submit:ios
```

## 🔧 Configuration

Update `app.json` with your:
- App name and slug
- Bundle identifiers (iOS/Android)
- API keys
- Asset paths

## 📝 API Integration

Backend API: `http://localhost:4000` (development)

Update API base URL in production:
- Edit API configuration in `src/services/api.ts`
- Set production URL: `https://api.bookmethat.com`

## 🎨 Styling

Using NativeWind (Tailwind CSS for React Native):
- Utility-first CSS classes
- Responsive design
- Dark mode support

## 📄 License

Copyright © 2025 BookMeThat
