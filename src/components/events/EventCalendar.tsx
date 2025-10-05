import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { format, addDays, isBefore, startOfDay } from "date-fns";

interface Event {
  id: string;
  date: Date;
  title: string;
  prepStatus: 'completed' | 'in-progress' | 'not-started';
  commsStatus: 'completed' | 'in-progress' | 'not-started';
}

interface EventCalendarProps {
  events: Event[];
  onDateSelect: (date: Date) => void;
  onCreateEvent: () => void;
}

export default function EventCalendar({ events, onDateSelect, onCreateEvent }: EventCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'not-started': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Hoàn thành';
      case 'in-progress': return 'Đang tiến hành';
      case 'not-started': return 'Chưa bắt đầu';
      default: return 'Chưa xác định';
    }
  };

  const eventsOnSelectedDate = events.filter(
    event => selectedDate && format(event.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  // Check for events within 7 days
  const upcomingEvents = events.filter(event => {
    const today = startOfDay(new Date());
    const eventDate = startOfDay(event.date);
    const sevenDaysFromNow = addDays(today, 7);
    return isBefore(today, eventDate) && isBefore(eventDate, sevenDaysFromNow);
  });

  // Dates with events
  const eventDates = events.map(event => event.date);

  const modifiers = {
    hasEvent: eventDates,
  };

  const modifiersClassNames = {
    hasEvent: "bg-bni-red/20 font-bold text-bni-red",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-bni-red" />
                  Lịch Sự kiện 12 Tháng
                </CardTitle>
                <CardDescription>Chọn ngày để xem chi tiết hoặc lên kế hoạch mới</CardDescription>
              </div>
              <Button onClick={onCreateEvent} className="bg-bni-red hover:bg-bni-red/90">
                <Plus className="h-4 w-4 mr-2" />
                Tạo Sự kiện
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                if (date) onDateSelect(date);
              }}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="rounded-md border"
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
            />
          </CardContent>
        </Card>
      </div>

      {/* Event Details Sidebar */}
      <div className="space-y-4">
        {/* Upcoming Reminders */}
        {upcomingEvents.length > 0 && (
          <Card className="border-orange-500 border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-orange-600">
                🔔 Nhắc nhở (7 ngày tới)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {upcomingEvents.map(event => (
                <div key={event.id} className="text-sm p-2 bg-orange-50 dark:bg-orange-950/20 rounded">
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{format(event.date, 'dd/MM/yyyy')}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Selected Date Events */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">
              {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'Chọn ngày'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {eventsOnSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {eventsOnSelectedDate.map(event => (
                  <div key={event.id} className="space-y-2 p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm">{event.title}</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Chuẩn bị:</span>
                        <Badge className={getStatusColor(event.prepStatus)}>
                          {getStatusText(event.prepStatus)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Truyền thông:</span>
                        <Badge className={getStatusColor(event.commsStatus)}>
                          {getStatusText(event.commsStatus)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                Chưa có sự kiện trong ngày này
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
