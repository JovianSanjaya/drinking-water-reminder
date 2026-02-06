"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [waterCount, setWaterCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [reminderInterval, setReminderInterval] = useState(30); // minutes
  const [lastDrinkTime, setLastDrinkTime] = useState<Date | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const motivationalMessages = [
    "you're doing great!",
    "proud of you for taking care of yourself",
    "your body thanks you",
    "keep up the good work",
    "you're taking such good care of yourself",
    "that's another step towards healthy habits",
    "you're doing amazing, really",
    "your future self will thank you",
    "look at you being so responsible",
    "you're absolutely crushing it",
  ];

  const reminderMessages = [
    "hey, drink some water",
    "water break time",
    "time to hydrate",
    "don't forget your water",
    "quick water check",
    "hydrate yourself",
    "water time!",
  ];

  const goalGlasses = 8;
  const progress = (waterCount / goalGlasses) * 100;

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      new Notification("water reminder", {
        body: message,
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
    setCurrentMessage("reset! let's start fresh");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl cute-shadow p-8">
        
        {/* Cute illustration */}
        <div className="flex justify-center mb-6">
          <div className="relative water-ripple">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Water glass */}
              <path d="M35 25L40 95C40 100.523 44.4772 105 50 105H70C75.5228 105 80 100.523 80 95L85 25H35Z" 
                    fill="url(#waterGradient)" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round"/>
              {/* Water inside */}
              <ellipse cx="60" cy="70" rx="18" ry="8" fill="#60A5FA" opacity="0.6"/>
              <path d="M42 70C42 65 48 60 60 60C72 60 78 65 78 70V85C78 90 72 95 60 95C48 95 42 90 42 85V70Z" 
                    fill="url(#waterFill)" opacity="0.8"/>
              {/* Shine effect */}
              <ellipse cx="52" cy="45" rx="8" ry="15" fill="white" opacity="0.3"/>
              
              <defs>
                <linearGradient id="waterGradient" x1="60" y1="25" x2="60" y2="105" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#DBEAFE"/>
                  <stop offset="1" stopColor="#BFDBFE"/>
                </linearGradient>
                <linearGradient id="waterFill" x1="60" y1="60" x2="60" y2="95" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60A5FA"/>
                  <stop offset="1" stopColor="#3B82F6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            water tracker
          </h1>
          <p className="text-gray-500 text-sm">for your friend</p>
        </div>

        {/* Notification popup */}
        {showNotification && (
          <div className="mb-6 bg-indigo-50 border-2 border-indigo-200 text-indigo-900 p-4 rounded-2xl text-sm font-medium text-center">
            {currentMessage}
          </div>
        )}

        {/* Water counter */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-baseline gap-3 bg-blue-50 px-8 py-4 rounded-2xl">
            <div className="text-6xl font-bold text-blue-600">{waterCount}</div>
            <div className="text-gray-600 text-left">
              <div className="text-sm font-medium">glasses</div>
              <div className="text-xs">of {goalGlasses}</div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-400 to-indigo-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {Math.round(progress)}% of your daily goal
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={addWater}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300"
          >
            i drank water
          </button>
          
          <button
            onClick={resetCount}
            className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium py-3 px-6 rounded-2xl transition-colors border border-gray-200"
          >
            reset count
          </button>
        </div>

        {/* Reminder settings */}
        <div className="bg-purple-50 rounded-2xl p-5 mb-4 border-2 border-purple-100">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            remind me every
          </label>
          <select
            value={reminderInterval}
            onChange={(e) => setReminderInterval(Number(e.target.value))}
            className="w-full p-3 rounded-xl border-2 border-purple-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white"
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
            <option value={120}>2 hours</option>
          </select>
        </div>

        {/* Enable notifications button */}
        {isMounted && "Notification" in window && Notification.permission === "default" && (
          <button
            onClick={requestNotificationPermission}
            className="w-full bg-amber-50 hover:bg-amber-100 text-amber-800 border-2 border-amber-200 font-medium py-3 px-6 rounded-2xl transition-colors text-sm"
          >
            turn on reminders
          </button>
        )}

        {/* Last drink time */}
        {lastDrinkTime && (
          <p className="text-center text-xs text-gray-400 mt-5">
            last glass: {lastDrinkTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}

        {/* Achievement message */}
        {waterCount >= goalGlasses && (
          <div className="mt-6 text-center p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl">
            <p className="text-lg font-bold text-green-800 mb-1">goal complete!</p>
            <p className="text-sm text-green-700">you did an amazing job today</p>
          </div>
        )}
      </div>
    </div>
  );
}
