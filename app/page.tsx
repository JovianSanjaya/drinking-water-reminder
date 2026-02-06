"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [waterCount, setWaterCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [reminderInterval, setReminderInterval] = useState(30); // minutes
  const [lastDrinkTime, setLastDrinkTime] = useState<Date | null>(null);

  const motivationalMessages = [
    "You&apos;re doing amazing! 💧✨",
    "Your skin will thank you! 🌟",
    "Stay hydrated, stay happy! 😊",
    "Water is the key to glow! ✨",
    "Keep up the great work! 🎉",
    "You&apos;re a hydration champion! 🏆",
    "Your body loves you! 💙",
    "Drink up, buttercup! 🌸",
    "Glowing skin starts here! ✨",
    "You deserve to feel great! 🌈",
  ];

  const reminderMessages = [
    "Time to drink water! 💧",
    "Don't forget to hydrate! 🌊",
    "Water break time! 💙",
    "Your body is calling for water! 📞",
    "Hydration time, friend! 🤗",
    "Quick! Grab some water! 💦",
    "Stay fresh, drink water! 🌿",
  ];

  const goalGlasses = 8;
  const progress = (waterCount / goalGlasses) * 100;

  useEffect(() => {
    // Load saved data from localStorage
    const saved = localStorage.getItem("waterData");
    if (saved) {
      const data = JSON.parse(saved);
      const savedDate = new Date(data.date);
      const today = new Date();
      
      // Reset if it's a new day
      if (savedDate.toDateString() !== today.toDateString()) {
        setWaterCount(0);
        setLastDrinkTime(null);
      } else {
        setWaterCount(data.count || 0);
        if (data.lastDrinkTime) {
          setLastDrinkTime(new Date(data.lastDrinkTime));
        }
      }
    }
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem(
      "waterData",
      JSON.stringify({
        count: waterCount,
        date: new Date().toISOString(),
        lastDrinkTime: lastDrinkTime?.toISOString(),
      })
    );
  }, [waterCount, lastDrinkTime]);

  useEffect(() => {
    // Set up reminder timer
    const timer = setInterval(() => {
      if (lastDrinkTime) {
        const now = new Date();
        const diffMinutes = (now.getTime() - lastDrinkTime.getTime()) / (1000 * 60);
        
        if (diffMinutes >= reminderInterval) {
          showReminderNotification();
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastDrinkTime, reminderInterval]);

  const showReminderNotification = () => {
    const message = reminderMessages[Math.floor(Math.random() * reminderMessages.length)];
    setCurrentMessage(message);
    setShowNotification(true);
    
    // Request browser notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Water Reminder 💧", {
        body: message,
        icon: "💧",
      });
    }
  };

  const requestNotificationPermission = async () => {
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }
  };

  const addWater = () => {
    setWaterCount(waterCount + 1);
    setLastDrinkTime(new Date());
    const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setCurrentMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const resetCount = () => {
    setWaterCount(0);
    setLastDrinkTime(null);
    setCurrentMessage("Fresh start! Let's hydrate! 🌟");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-50 -z-10"></div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-2">
            Water Reminder 💧
          </h1>
          <p className="text-gray-600 text-sm">Stay hydrated, stay healthy!</p>
        </div>

        {/* Notification popup */}
        {showNotification && (
          <div className="mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-white p-4 rounded-2xl shadow-lg animate-bounce text-center">
            {currentMessage}
          </div>
        )}

        {/* Water glass counter */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-4 animate-pulse">💧</div>
          <div className="text-5xl font-bold text-blue-600 mb-2">{waterCount}</div>
          <p className="text-gray-600">glasses today</p>
          <p className="text-sm text-gray-500 mt-2">Goal: {goalGlasses} glasses</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            {Math.round(progress)}% of daily goal
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-4 mb-6">
          <button
            onClick={addWater}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform transition hover:scale-105 active:scale-95"
          >
            I Drank Water! 💧
          </button>
          
          <button
            onClick={resetCount}
            className="w-full bg-pink-100 hover:bg-pink-200 text-pink-600 font-semibold py-3 px-6 rounded-2xl transition"
          >
            Reset Count
          </button>
        </div>

        {/* Reminder settings */}
        <div className="bg-blue-50 rounded-2xl p-4 mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Remind me every:
          </label>
          <select
            value={reminderInterval}
            onChange={(e) => setReminderInterval(Number(e.target.value))}
            className="w-full p-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
            <option value={120}>2 hours</option>
          </select>
        </div>

        {/* Enable notifications button */}
        {typeof window !== "undefined" && "Notification" in window && Notification.permission === "default" && (
          <button
            onClick={requestNotificationPermission}
            className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-semibold py-3 px-6 rounded-2xl transition text-sm"
          >
            🔔 Enable Browser Notifications
          </button>
        )}

        {/* Last drink time */}
        {lastDrinkTime && (
          <p className="text-center text-xs text-gray-500 mt-4">
            Last drink: {lastDrinkTime.toLocaleTimeString()}
          </p>
        )}

        {/* Achievement message */}
        {waterCount >= goalGlasses && (
          <div className="mt-6 text-center p-4 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-2xl">
            <p className="text-2xl mb-2">🎉 🏆 🎉</p>
            <p className="font-bold text-orange-600">Amazing! You hit your goal!</p>
            <p className="text-sm text-orange-600">You&apos;re a hydration superstar!</p>
          </div>
        )}
      </div>
    </div>
  );
}
