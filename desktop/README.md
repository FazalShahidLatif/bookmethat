# BookMeThat Desktop App

Electron desktop application for Windows, macOS, and Linux.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- For Windows builds: Windows 10+
- For macOS builds: macOS 10.13+
- For Linux builds: Ubuntu 18.04+

### Installation

```bash
cd desktop
npm install
```

### Development

```bash
# Start development server (Next.js + Electron)
npm run dev

# This runs:
# - Next.js dev server on http://localhost:3000
# - Electron window pointing to localhost:3000
```

## 🏗️ Building for Production

### Windows

```bash
npm run build:win
```

Output: `release/BookMeThat-Setup-1.0.0.exe`

### macOS

```bash
npm run build:mac
```

Output: `release/BookMeThat-1.0.0.dmg`

### Linux

```bash
npm run build:linux
```

Output: 
- `release/BookMeThat-1.0.0.AppImage`
- `release/bookmethat_1.0.0_amd64.deb`

## 📦 Project Structure

```
desktop/
├── electron/              # Electron main process
│   ├── main.ts           # Main process entry
│   ├── preload.ts        # Preload scripts
│   └── tsconfig.json     # TypeScript config
├── renderer/             # Next.js frontend (shared with web)
├── public/               # Static assets
│   ├── icon.png         # Linux icon
│   ├── icon.ico         # Windows icon
│   └── icon.icns        # macOS icon
├── dist-electron/        # Compiled Electron code
├── release/              # Built applications
└── package.json          # Configuration
```

## 🎨 Features

All features from the web platform:
- ✅ Train booking (Pakistan Railway)
- ✅ Hotel search and booking
- ✅ Flight search
- ✅ Car rentals
- ✅ Activities and tours
- ✅ eSIM purchase
- ✅ Native menus and shortcuts
- ✅ System tray integration
- ✅ Auto-updates
- ✅ Offline support

## 🔧 Configuration

### App Icons

Replace icons in `public/` directory:
- `icon.png` - 512x512px (Linux)
- `icon.ico` - Multi-resolution (Windows)
- `icon.icns` - Multi-resolution (macOS)

### Build Configuration

Edit `package.json` build section:
- `appId`: Unique app identifier
- `productName`: Display name
- Platform-specific settings

## 📝 API Integration

The desktop app uses the same frontend as the web version, sharing:
- Pages from `../frontend/src/app`
- Components from `../frontend/src/components`
- API integration from `../frontend/src/lib/api.ts`

## 🚀 Distribution

### Windows
- **NSIS Installer**: Self-extracting exe with installation wizard
- Supports: Windows 10, 11

### macOS
- **DMG Image**: Drag-and-drop installation
- Supports: macOS 10.13 (High Sierra) and later
- Requires code signing for distribution

### Linux
- **AppImage**: Portable, runs anywhere
- **DEB Package**: For Debian/Ubuntu systems

## 🔐 Code Signing

### Windows
```bash
# Set environment variables
$env:CSC_LINK = "path/to/certificate.pfx"
$env:CSC_KEY_PASSWORD = "your-password"
npm run build:win
```

### macOS
```bash
# Set environment variables
export APPLE_ID="your@email.com"
export APPLE_ID_PASSWORD="app-specific-password"
npm run build:mac
```

## 🌐 Update Server

Configure auto-updates in `electron/main.ts`:
```typescript
import { autoUpdater } from 'electron-updater';

autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'your-username',
  repo: 'bookmethat'
});
```

## 📄 License

Copyright © 2025 BookMeThat
