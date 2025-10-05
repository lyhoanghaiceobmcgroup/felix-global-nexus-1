// Firebase Cloud Messaging Service
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTszupdCnwvrmaWWkZpjQR-ACkMLsRx9k",
  authDomain: "your-project.firebaseapp.com", // Cần cập nhật từ Firebase Console
  projectId: "your-project-id", // Cần cập nhật từ Firebase Console
  storageBucket: "your-project.appspot.com", // Cần cập nhật từ Firebase Console
  messagingSenderId: "123456789", // Cần cập nhật từ Firebase Console
  appId: "1:123456789:web:abcdef123456" // Cần cập nhật từ Firebase Console
};

// VAPID Key for push notifications
const VAPID_KEY = "BEzMko9UcqgaUP5sVzgWYIwVD2hxxPr2iEIActGtWW8MXcHEUwOj5rDXo2adM9UZKlhBsMCLd7KQJiirmY0rBqU";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let messaging: Messaging | null = null;

// Initialize messaging only in browser environment
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  messaging = getMessaging(app);
}

// Request notification permission and get FCM token
export const requestNotificationPermission = async (): Promise<string | null> => {
  try {
    if (!messaging) {
      console.log('Firebase Messaging is not supported in this browser');
      return null;
    }

    console.log('Requesting notification permission...');
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      
      // Register service worker
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('Service Worker registered:', registration);
      
      // Get FCM token
      const currentToken = await getToken(messaging, { 
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration
      });
      
      if (currentToken) {
        console.log('FCM Token:', currentToken);
        // Save token to database or localStorage
        localStorage.setItem('fcm_token', currentToken);
        return currentToken;
      } else {
        console.log('No registration token available.');
        return null;
      }
    } else {
      console.log('Notification permission denied.');
      return null;
    }
  } catch (error) {
    console.error('Error getting notification permission:', error);
    return null;
  }
};

// Listen for foreground messages
export const onMessageListener = (callback: (payload: any) => void) => {
  if (!messaging) {
    console.log('Firebase Messaging is not supported');
    return () => {};
  }

  return onMessage(messaging, (payload) => {
    console.log('Message received in foreground:', payload);
    callback(payload);
  });
};

// Get current FCM token from localStorage
export const getCurrentToken = (): string | null => {
  return localStorage.getItem('fcm_token');
};

// Send notification data to server for broadcasting
export const sendNotificationToAllMembers = async (
  title: string,
  body: string,
  data?: Record<string, string>
) => {
  try {
    // This would call your backend API to send notifications to all registered tokens
    console.log('Sending notification to all members:', { title, body, data });
    
    // TODO: Implement backend API call
    // await fetch('/api/send-notification', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ title, body, data })
    // });
    
    return true;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
};
