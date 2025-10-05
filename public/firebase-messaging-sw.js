// Import Firebase libraries
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Firebase configuration - Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBTszupdCnwvrmaWWkZpjQR-ACkMLsRx9k",
  authDomain: "your-project.firebaseapp.com", // Cần cập nhật từ Firebase Console
  projectId: "your-project-id", // Cần cập nhật từ Firebase Console
  storageBucket: "your-project.appspot.com", // Cần cập nhật từ Firebase Console
  messagingSenderId: "123456789", // Cần cập nhật từ Firebase Console
  appId: "1:123456789:web:abcdef123456" // Cần cập nhật từ Firebase Console
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        data: payload.data
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});
