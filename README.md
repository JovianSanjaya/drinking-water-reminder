# 💧 Drinking Water Reminder App

A cute and friendly water reminder app built with Next.js and React to help you stay hydrated throughout the day!

## ✨ Features

- 🎯 **Daily Water Goal Tracking** - Track your water intake with a goal of 8 glasses per day
- 💬 **Motivational Messages** - Get encouraging messages every time you log a glass of water
- ⏰ **Smart Reminders** - Set custom reminder intervals (15min, 30min, 1hr, 2hr)
- 🔔 **Browser Notifications** - Optional push notifications to remind you to drink water
- 📊 **Progress Bar** - Visual progress indicator to see how close you are to your daily goal
- 💾 **Auto-Save** - Your progress is automatically saved and resets daily
- 🎨 **Cute Design** - Beautiful gradient UI with playful animations
- 🏆 **Achievement Celebration** - Special message when you reach your daily goal

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🌐 Deploy on Vercel

The easiest way to deploy this app is using [Vercel](https://vercel.com):

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and deploy your app
4. Your app will be live in minutes!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 🎮 How to Use

1. **Track Water Intake**: Click "I Drank Water! 💧" every time you finish a glass
2. **Set Reminders**: Choose your preferred reminder interval from the dropdown
3. **Enable Notifications**: Click the notification button to get browser alerts
4. **Reset Daily**: The counter automatically resets at midnight, or use the reset button
5. **Reach Your Goal**: Aim for 8 glasses a day and celebrate when you achieve it!

## 🛠️ Built With

- **Next.js 15** - React framework for production
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **localStorage** - Data persistence
- **Notification API** - Browser notifications

## 📱 Features in Detail

### Motivational Messages
- 10+ unique encouraging messages
- Randomly displayed when you log water intake
- Keeps you motivated throughout the day

### Reminder System
- Customizable intervals
- Tracks time since last drink
- Browser notifications (with permission)
- Visual popup reminders

### Data Persistence
- Saves your progress automatically
- Resets daily at midnight
- Remembers last drink time
- Works offline

## 🎨 Customization

You can easily customize the app by editing:
- **Messages**: Update the `motivationalMessages` and `reminderMessages` arrays in `app/page.tsx`
- **Goal**: Change the `goalGlasses` constant (default is 8)
- **Colors**: Modify the Tailwind classes or `globals.css`
- **Intervals**: Add more reminder interval options

## 📄 License

Free to use for personal projects!

## 💝 Made with Love

Created to help friends stay healthy and hydrated! 💙

---

**Stay hydrated, stay happy!** 🌟
