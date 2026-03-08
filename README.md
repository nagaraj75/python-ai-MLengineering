# 🎓 AI/ML Learning Hub

A high-performance, mobile-first learning platform for Python, AI, and Machine Learning. Built with React Native & Expo.

## ✨ Features

- **Rich Curriculum**: 100+ modules covering everything from basic Python to advanced Neural Networks.
- **Progress Tracking**: Automatic local save of your learning progress.
- **Interactive Content**: Code examples, lessons, and quizzes.
- **Premium Design**: Modern sleek dark UI with smooth transitions.
- **Universal**: Deploy to Web, Android, and iOS.

---

## 🚀 Production Deployment

### Option 1: Vercel (Recommended)

This project is pre-configured for **Vercel** zero-config deployment.

1.  Connect your GitHub repository to [Vercel](https://vercel.com).
2.  Vercel will automatically detect the `vercel.json` file.
3.  Deploy! Vercel handles the build process using the `npm run build` command.

**Manual Build:**
```bash
npm run build
# The production-ready files will be in the 'dist' directory.
```

### Option 2: GoDaddy (or other Shared Hosting)

1.  Run the build command locally:
    ```bash
    npm run build
    ```
2.  Compress the contents of the `dist` folder into a `.zip` file.
3.  Upload the `.zip` file to your GoDaddy **File Manager** (usually in `/public_html`).
4.  Extract the files directly into the root.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start the Hub
npm start
# Press 'w' for web view
```

## 🔧 Architecture

- **Framework**: Expo SDK 51
- **State Management**: Zustand (with Persistence)
- **Navigation**: React Navigation (Bottom Tabs + Native Stack)
- **Styling**: React Native StyleSheet (Platform-independent)

---

## 📄 License
MIT
