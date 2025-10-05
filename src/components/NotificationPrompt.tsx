import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, X } from 'lucide-react';
import { requestNotificationPermission, onMessageListener } from '@/services/firebaseNotificationService';
import { toast } from '@/hooks/use-toast';

export const NotificationPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user has already been asked for permission
    const hasAsked = localStorage.getItem('notification_prompted');
    const hasToken = localStorage.getItem('fcm_token');
    
    if (!hasAsked && !hasToken && 'Notification' in window) {
      // Show prompt after 3 seconds
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }

    // Listen for foreground messages
    const unsubscribe = onMessageListener((payload) => {
      toast({
        title: payload.notification?.title || 'Thông báo mới',
        description: payload.notification?.body || '',
      });
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const handleEnableNotifications = async () => {
    setIsLoading(true);
    try {
      const token = await requestNotificationPermission();
      
      if (token) {
        toast({
          title: 'Thành công!',
          description: 'Bạn sẽ nhận được thông báo từ BNI FELIX.',
        });
        setShowPrompt(false);
        localStorage.setItem('notification_prompted', 'true');
      } else {
        toast({
          title: 'Không thành công',
          description: 'Vui lòng cho phép thông báo trong cài đặt trình duyệt.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error enabling notifications:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể kích hoạt thông báo. Vui lòng thử lại.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('notification_prompted', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <Card className="w-[380px] shadow-lg">
        <CardHeader className="relative pb-3">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-6 w-6"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Nhận thông báo</CardTitle>
          </div>
          <CardDescription>
            Cho phép nhận thông báo để cập nhật các hoạt động mới nhất từ BNI FELIX
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full" 
            onClick={handleEnableNotifications}
            disabled={isLoading}
          >
            {isLoading ? 'Đang kích hoạt...' : 'Cho phép nhận thông báo'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
