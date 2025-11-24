# App Downloads Setup Guide

## 📱 Mobile Apps

### iOS App Store
1. **Build the app:**
   ```bash
   cd mobile
   npm run build:ios
   ```

2. **Submit to App Store:**
   - Use Apple Developer Account
   - Create app listing on App Store Connect
   - Upload IPA file via Transporter
   - Fill in app metadata, screenshots
   - Submit for review

3. **App Store Link:**
   ```
   https://apps.apple.com/app/bookmethat/id[YOUR_APP_ID]
   ```

### Google Play Store
1. **Build the app:**
   ```bash
   cd mobile
   npm run build:android
   ```

2. **Submit to Play Store:**
   - Use Google Play Console
   - Create app listing
   - Upload AAB/APK file
   - Fill in store listing, screenshots
   - Submit for review

3. **Play Store Link:**
   ```
   https://play.google.com/store/apps/details?id=com.bookmethat.app
   ```

## 💻 Desktop Apps

### Build All Platforms

```bash
cd desktop

# Windows
npm run build:win
# Output: release/BookMeThat-Setup-1.0.0.exe

# macOS
npm run build:mac
# Output: release/BookMeThat-1.0.0.dmg

# Linux
npm run build:linux
# Output: release/BookMeThat-1.0.0.AppImage
# Output: release/bookmethat_1.0.0_amd64.deb
```

### Host on Website

1. **Upload to hosting:**
   ```bash
   # Example: AWS S3, Netlify, or CDN
   aws s3 cp desktop/release/ s3://bookmethat-downloads/ --recursive
   ```

2. **Download URLs:**
   - Windows: `https://bookmethat.com/downloads/BookMeThat-Setup.exe`
   - macOS: `https://bookmethat.com/downloads/BookMeThat.dmg`
   - Linux AppImage: `https://bookmethat.com/downloads/BookMeThat.AppImage`
   - Linux DEB: `https://bookmethat.com/downloads/bookmethat.deb`

## 🌐 Website Integration

Add download section to homepage (`frontend/src/app/page.tsx`):

```tsx
{/* Desktop & Mobile Apps Section */}
<section className="bg-gray-50 py-20">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Download Our Apps
      </h2>
      <p className="text-xl text-gray-600">
        Available on all your devices
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Mobile Apps */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold mb-6">📱 Mobile Apps</h3>
        <div className="space-y-4">
          <a
            href="https://apps.apple.com/app/bookmethat/id123456"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition"
          >
            <div className="text-4xl">🍎</div>
            <div>
              <div className="font-semibold text-lg">Download on the</div>
              <div className="text-2xl font-bold">App Store</div>
            </div>
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=com.bookmethat.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition"
          >
            <div className="text-4xl">📱</div>
            <div>
              <div className="font-semibold text-lg">GET IT ON</div>
              <div className="text-2xl font-bold">Google Play</div>
            </div>
          </a>
        </div>
      </div>

      {/* Desktop Apps */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold mb-6">💻 Desktop Apps</h3>
        <div className="space-y-4">
          <a
            href="/downloads/BookMeThat-Setup.exe"
            className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">🪟</div>
              <div>
                <div className="font-bold text-lg">Windows</div>
                <div className="text-sm text-gray-600">Windows 10, 11</div>
              </div>
            </div>
            <div className="text-blue-600 font-semibold">Download</div>
          </a>

          <a
            href="/downloads/BookMeThat.dmg"
            className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">🍎</div>
              <div>
                <div className="font-bold text-lg">macOS</div>
                <div className="text-sm text-gray-600">macOS 10.13+</div>
              </div>
            </div>
            <div className="text-blue-600 font-semibold">Download</div>
          </a>

          <a
            href="/downloads/BookMeThat.AppImage"
            className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">🐧</div>
              <div>
                <div className="font-bold text-lg">Linux</div>
                <div className="text-sm text-gray-600">AppImage / DEB</div>
              </div>
            </div>
            <div className="text-blue-600 font-semibold">Download</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

## 📊 Version Management

Create a downloads manifest (`public/downloads/manifest.json`):

```json
{
  "version": "1.0.0",
  "releaseDate": "2025-11-24",
  "downloads": {
    "windows": {
      "url": "/downloads/BookMeThat-Setup-1.0.0.exe",
      "size": "120 MB",
      "sha256": "checksum-here"
    },
    "mac": {
      "url": "/downloads/BookMeThat-1.0.0.dmg",
      "size": "150 MB",
      "sha256": "checksum-here"
    },
    "linux": {
      "appimage": {
        "url": "/downloads/BookMeThat-1.0.0.AppImage",
        "size": "130 MB"
      },
      "deb": {
        "url": "/downloads/bookmethat_1.0.0_amd64.deb",
        "size": "110 MB"
      }
    },
    "ios": {
      "url": "https://apps.apple.com/app/bookmethat/id123456",
      "version": "1.0.0",
      "minOS": "iOS 13.0"
    },
    "android": {
      "url": "https://play.google.com/store/apps/details?id=com.bookmethat.app",
      "version": "1.0.0",
      "minOS": "Android 8.0"
    }
  }
}
```

## 🔐 Security

### Code Signing
- **Windows:** Use EV Code Signing Certificate
- **macOS:** Apple Developer ID Application Certificate
- **Linux:** GPG sign packages

### Checksums
Generate SHA256 checksums:
```bash
# Windows
certutil -hashfile BookMeThat-Setup.exe SHA256

# macOS/Linux
shasum -a 256 BookMeThat.dmg
```

## 🚀 Auto-Updates

Configure in Electron app (`electron/main.ts`):
```typescript
import { autoUpdater } from 'electron-updater';

autoUpdater.checkForUpdatesAndNotify();
autoUpdater.setFeedURL({
  provider: 'generic',
  url: 'https://bookmethat.com/downloads/updates'
});
```

Create update server endpoint that serves:
- `latest.yml` (Windows/Linux)
- `latest-mac.yml` (macOS)

## 📱 Deep Links

Configure deep linking for app integration:
- Scheme: `bookmethat://`
- Examples:
  - `bookmethat://trains/search`
  - `bookmethat://booking/ABC123`
  - `bookmethat://payment/confirm`

## 📄 Installation Instructions

Create help pages for each platform:
- `/help/install-windows`
- `/help/install-mac`
- `/help/install-linux`
- `/help/install-ios`
- `/help/install-android`
