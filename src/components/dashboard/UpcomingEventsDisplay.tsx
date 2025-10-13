import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useChapterData } from "@/contexts/ChapterDataContext";

export default function UpcomingEventsDisplay() {
  const { getUpcomingEvents } = useChapterData();
  const upcomingEvents = getUpcomingEvents(30); // Get events for next 30 days

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lịch họp và sự kiện sắp tới</CardTitle>
        <CardDescription>
          Các cuộc họp và sự kiện trong 30 ngày tới (đồng bộ với Lịch sự kiện)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Chưa có sự kiện sắp tới</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingEvents.map(event => {
              const eventDate = new Date(event.date);
              const today = new Date();
              const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={event.id} className="flex items-start space-x-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex-shrink-0">
                    <Calendar className="h-10 w-10 text-bni-red" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-base font-semibold">{event.title}</p>
                        {event.description && (
                          <p className="text-sm text-muted-foreground mt-0.5">{event.description}</p>
                        )}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`flex-shrink-0 ${
                          daysUntil <= 3 
                            ? 'bg-red-50 text-red-700 border-red-200' 
                            : daysUntil <= 7 
                            ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {daysUntil === 0 ? 'Hôm nay' : daysUntil === 1 ? 'Ngày mai' : `${daysUntil} ngày`}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      📅 {eventDate.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    {event.location && (
                      <p className="text-sm text-muted-foreground">
                        📍 {event.location}
                      </p>
                    )}
                    <div className="flex items-center mt-2 space-x-2 flex-wrap gap-1">
                      {event.attendees && (
                        <Badge variant="outline">{event.attendees} người tham dự</Badge>
                      )}
                      <Badge className={
                        event.type === 'meeting' ? 'bg-green-500/10 text-green-700 border-green-200' :
                        event.type === 'event' ? 'bg-purple-500/10 text-purple-700 border-purple-200' :
                        event.type === 'training' ? 'bg-blue-500/10 text-blue-700 border-blue-200' :
                        'bg-orange-500/10 text-orange-700 border-orange-200'
                      }>
                        {event.type === 'meeting' ? 'Họp tuần' :
                         event.type === 'event' ? 'Sự kiện' :
                         event.type === 'training' ? 'Đào tạo' : 'Gặp gỡ'}
                      </Badge>
                      <Badge variant="outline" className={
                        event.prepStatus === 'completed' ? 'bg-green-50 text-green-700' :
                        event.prepStatus === 'in-progress' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-gray-50 text-gray-700'
                      }>
                        Chuẩn bị: {event.prepStatus === 'completed' ? '✓' : event.prepStatus === 'in-progress' ? '⏳' : '○'}
                      </Badge>
                      <Badge variant="outline" className={
                        event.commsStatus === 'completed' ? 'bg-green-50 text-green-700' :
                        event.commsStatus === 'in-progress' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-gray-50 text-gray-700'
                      }>
                        Truyền thông: {event.commsStatus === 'completed' ? '✓' : event.commsStatus === 'in-progress' ? '⏳' : '○'}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="mt-4 pt-4 border-t">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.location.href = '/schedule'}
          >
            Xem tất cả lịch họp và sự kiện
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
