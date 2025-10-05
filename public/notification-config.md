# Hướng dẫn cấu hình Firebase Cloud Messaging

## Thông tin cần cập nhật

Để hệ thống thông báo hoạt động đầy đủ, bạn cần cập nhật các thông tin sau từ Firebase Console:

### 1. Firebase Config (trong 2 files)
- `public/firebase-messaging-sw.js`
- `src/services/firebaseNotificationService.ts`

Cập nhật các giá trị sau:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBTszupdCnwvrmaWWkZpjQR-ACkMLsRx9k", // ✅ Đã có
  authDomain: "your-project.firebaseapp.com", // ⚠️ Cần cập nhật
  projectId: "your-project-id", // ⚠️ Cần cập nhật
  storageBucket: "your-project.appspot.com", // ⚠️ Cần cập nhật
  messagingSenderId: "123456789", // ⚠️ Cần cập nhật
  appId: "1:123456789:web:abcdef123456" // ⚠️ Cần cập nhật
};
```

### 2. VAPID Key
✅ Đã được cấu hình: `BEzMko9UcqgaUP5sVzgWYIwVD2hxxPr2iEIActGtWW8MXcHEUwOj5rDXo2adM9UZKlhBsMCLd7KQJiirmY0rBqU`

## Cách lấy thông tin từ Firebase Console

1. Truy cập: https://console.firebase.google.com
2. Chọn project của bạn
3. Vào **Project Settings** (biểu tượng bánh răng)
4. Kéo xuống phần **Your apps**
5. Chọn app Web (hoặc tạo mới nếu chưa có)
6. Sao chép toàn bộ `firebaseConfig` object

## Các tính năng đã tích hợp

✅ Service Worker cho background notifications
✅ Component NotificationPrompt tự động hiện sau 3 giây
✅ Lưu FCM token vào localStorage
✅ Xử lý foreground messages với toast notifications
✅ UI đẹp với Card component và animations

## Cách kiểm tra

1. Sau khi cập nhật Firebase config, reload trang web
2. Popup yêu cầu quyền thông báo sẽ hiện ra
3. Click "Cho phép nhận thông báo"
4. Token sẽ được lưu trong localStorage (key: `fcm_token`)
5. Kiểm tra Console (F12) để xem token

## Gửi thông báo test

Sử dụng Firebase Console:
1. Vào **Messaging** trong Firebase Console
2. Click "New campaign" → "Firebase Notification messages"
3. Nhập title và body
4. Click "Send test message"
5. Paste FCM token từ localStorage
6. Click "Test"

## Tích hợp với website events

Hệ thống đã sẵn sàng để tích hợp với các sự kiện:
- Check-in buổi họp
- Đề xuất referral
- Báo cáo từ dashboard
- Các thông báo khác

Để gửi thông báo đến tất cả thành viên, cần implement backend API endpoint để lưu trữ tất cả FCM tokens và gửi hàng loạt.
