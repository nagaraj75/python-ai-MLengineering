# 🎓 AI/ML Learning Hub

<div align="center">

![Expo](https://img.shields.io/badge/Expo-51.0-black?style=for-the-badge&logo=expo)
![React Native](https://img.shields.io/badge/React_Native-0.74-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)

**A comprehensive mobile learning platform for Python, Artificial Intelligence & Machine Learning**

[Features](#-features) • [Installation](#-installation) • [Screenshots](#-screenshots) • [Deployment](#-deployment)

</div>

---

## 📱 Features

- 📚 **3 Complete Courses** - Python, Machine Learning, Deep Learning
- 🎯 **20+ Interactive Lessons** - Detailed content with code examples
- 📊 **Progress Tracking** - Persisted locally with AsyncStorage
- 🎨 **Modern Dark Theme** - Professional UI with smooth animations
- 📱 **Cross-Platform** - iOS, Android, and Web support
- 🔄 **OTA Updates** - Push updates without app store review

---

## 🚀 Installation

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/aiml-learning-hub.git
cd aiml-learning-hub

# Install dependencies
npm install

# Start the development server
npm start
```

### Platform-Specific Commands

```bash
npm run ios      # Run on iOS Simulator
npm run android  # Run on Android Emulator
npm run web      # Run in web browser
```

---

## 📁 Project Structure

```
aiml-learning-hub/
├── App.tsx                     # Main application entry
├── app.json                    # Expo configuration
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── eas.json                    # EAS Build configuration
├── babel.config.js             # Babel configuration
└── src/
    ├── types/                  # TypeScript interfaces
    │   └── index.ts
    ├── data/                   # Course content
    │   └── courseData.ts
    ├── store/                  # State management
    │   └── useProgressStore.ts
    ├── components/             # Reusable UI components
    │   └── index.tsx
    ├── screens/                # Screen components
    ├── hooks/                  # Custom hooks
    └── utils/                  # Utility functions
```

---

## 📚 Course Content

### Python Programming Masterclass (48 hours)
| Module | Lessons | Topics |
|--------|---------|--------|
| Fundamentals | 4 | Variables, Data Types, Strings, Math |
| Control Flow | 2 | Conditionals, Loops |
| Data Structures | 2 | Lists, Dictionaries |
| Functions & OOP | 2 | Functions, Classes |

### Machine Learning Fundamentals (36 hours)
| Module | Lessons | Topics |
|--------|---------|--------|
| ML Foundations | 2 | ML Types, Preprocessing |
| Supervised Learning | 2 | Regression, Classification |

### Deep Learning with TensorFlow (44 hours)
| Module | Lessons | Topics |
|--------|---------|--------|
| Neural Networks | 1 | Perceptrons, Training |

---

## 🏗️ Building for Production

### Setup EAS (Expo Application Services)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure project
eas build:configure
```

### Build Commands

```bash
# Build for Android (AAB for Play Store)
npm run build:android

# Build for iOS (for App Store)
npm run build:ios

# Build for Web
npm run build:web

# Build APK for testing
eas build --platform android --profile preview
```

### Submit to Stores

```bash
# Submit to Google Play
npm run submit:android

# Submit to App Store
npm run submit:ios
```

---

## 🚀 Deployment

### GitHub Actions CI/CD

Create `.github/workflows/build.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install -g eas-cli
      - run: npm ci
      - run: eas build --platform android --profile preview --non-interactive
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

### Over-the-Air Updates

```bash
# Publish update to production
npm run update

# Publish to specific branch
eas update --branch preview
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Expo SDK | 51.0 | Cross-platform framework |
| React Native | 0.74.5 | Mobile development |
| TypeScript | 5.3.3 | Type safety |
| React Navigation | 6.x | Navigation |
| Zustand | 4.5.5 | State management |
| AsyncStorage | 1.23.1 | Local persistence |

---

## 📸 Screenshots

<div align="center">
  
| Home Screen | Course Detail | Lesson View |
|-------------|---------------|-------------|
| ![Home](assets/screenshots/home.png) | ![Course](assets/screenshots/course.png) | ![Lesson](assets/screenshots/lesson.png) |

| Progress | Profile | Explore |
|----------|---------|---------|
| ![Progress](assets/screenshots/progress.png) | ![Profile](assets/screenshots/profile.png) | ![Explore](assets/screenshots/explore.png) |

</div>

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Course content designed by expert educators
- Built with Expo and React Native
- Icons from Ionicons

---

<div align="center">

**Made with ❤️ for learners worldwide**

</div>
