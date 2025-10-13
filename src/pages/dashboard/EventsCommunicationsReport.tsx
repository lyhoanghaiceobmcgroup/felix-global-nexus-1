import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Megaphone, CheckCircle2, TrendingUp, Send, Plus, ChevronDown, ChevronUp, X, Edit } from "lucide-react";
import { useState } from "react";
import { useChapterData } from "@/contexts/ChapterDataContext";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import EventCalendar from "@/components/events/EventCalendar";
import CreateEventDialog, { EventData } from "@/components/events/CreateEventDialog";
import ContentGenerator from "@/components/events/ContentGenerator";
import { Input } from "@/components/ui/input";
import EventTaskManager, { TaskAssignment } from "@/components/events/EventTaskManager";
import { Progress } from "@/components/ui/progress";

export default function EventsCommunicationsReport() {
  const { chapterData, submitReport } = useChapterData();
  const [weekDate, setWeekDate] = useState(new Date().toISOString().split('T')[0]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<EventData[]>([
    {
      id: '1',
      title: 'Lễ Chuyển giao Ban Điều hành Nhiệm kỳ XI',
      date: '2025-10-07',
      objectives: 'Chuyển giao quyền lực và trách nhiệm từ nhiệm kỳ cũ sang nhiệm kỳ mới',
      preparationPlan: 'Đã chốt địa điểm, hoàn thiện kịch bản, phân công nhiệm vụ',
      communicationPlan: 'Đã gửi email mời, đang thực hiện series bài đăng',
      budget: '50.000.000 VNĐ',
      prepStatus: 'completed',
      commsStatus: 'in-progress',
      tasks: [
        {
          id: '1',
          personName: 'Nguyễn Văn A',
          role: 'Trưởng ban Sự kiện',
          task: 'Tổng hợp danh sách khách mời và gửi thiệp',
          status: 'completed',
        },
        {
          id: '2',
          personName: 'Trần Thị B',
          role: 'Thành viên Ban Truyền thông',
          task: 'Chuẩn bị nội dung đăng fanpage và kênh Zalo',
          status: 'in-progress',
        },
      ],
    },
    {
      id: '2',
      title: 'Gala Dinner & Business Matching Cuối năm',
      date: '2025-12-15',
      objectives: 'Tạo không gian kết nối kinh doanh trang trọng, tổng kết năm',
      preparationPlan: 'Đã lên ý tưởng, đang khảo sát địa điểm',
      communicationPlan: 'Sẽ khởi động chiến dịch 6 tuần trước sự kiện',
      budget: '100.000.000 VNĐ',
      prepStatus: 'in-progress',
      commsStatus: 'not-started',
      tasks: [],
    },
  ]);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [taskManagerOpen, setTaskManagerOpen] = useState(false);
  const [selectedEventForTasks, setSelectedEventForTasks] = useState<EventData | null>(null);
  const [fanpageReach, setFanpageReach] = useState("15");
  const [fanpageEngagement, setFanpageEngagement] = useState("20");
  const [communicationActivities, setCommunicationActivities] = useState([
    { id: '1', type: 'member-of-week' },
    { id: '2', type: 'newsletter' },
    { id: '3', type: 'event-announcement' },
    { id: '4', type: 'fanpage-growth' },
  ]);
  const [isCommActivitiesOpen, setIsCommActivitiesOpen] = useState(false);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="border-b pb-4 sm:pb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bni-red mb-2">
          Dashboard Báo Cáo Sự kiện & Truyền thông
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-4">
          <Label className="font-semibold text-sm sm:text-base">Cập nhật cho Tuần:</Label>
          <Input 
            type="date" 
            value={weekDate}
            onChange={(e) => setWeekDate(e.target.value)}
            className="w-full sm:w-auto"
          />
        </div>
      </div>

      {/* I. LỊCH SỰ KIỆN & TRUYỀN THÔNG SẮP TỚI */}
      <Card className="shadow-lg border-bni-gold border-2">
        <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
          <CardTitle className="text-2xl">
            I. LỊCH SỰ KIỆN & TRUYỀN THÔNG SẮP TỚI
          </CardTitle>
          <CardDescription className="text-base">
            Lịch đầy đủ 12 tháng với nhắc nhở tự động 7 ngày trước
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <EventCalendar
            onDateSelect={(date) => setSelectedDate(date)}
            onCreateEvent={() => setIsCreateDialogOpen(true)}
          />
        </CardContent>
      </Card>

      {/* II. CHI TIẾT KẾ HOẠCH & TIẾN ĐỘ */}
      <Card className="shadow-lg border-bni-red border-2">
        <CardHeader className="bg-gradient-to-r from-bni-gold/10 to-bni-red/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                II. CHI TIẾT KẾ HOẠCH & TIẾN ĐỘ
              </CardTitle>
              <CardDescription className="text-base">
                Danh sách sự kiện và tiến độ chi tiết
              </CardDescription>
            </div>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-bni-red hover:bg-bni-red/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tạo Sự kiện
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <Collapsible open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>Xem Chi tiết Sự kiện ({events.length})</span>
                {isEventDetailsOpen ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-6 mt-4">
              {events.map((event, index) => (
                <Card key={event.id} className="border-2 border-bni-gold">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {index + 1}. {event.title}
                      </CardTitle>
                      <Badge className="bg-bni-red">{new Date(event.date).toLocaleDateString('vi-VN')}</Badge>
                    </div>
                  </CardHeader>
                   <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-semibold">Trạng thái Chuẩn bị:</Label>
                        <Badge className={
                          event.prepStatus === 'completed' ? 'bg-green-500' :
                          event.prepStatus === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-500'
                        }>
                          {event.prepStatus === 'completed' ? 'Hoàn thành' :
                           event.prepStatus === 'in-progress' ? 'Đang tiến hành' : 'Chưa bắt đầu'}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold">Trạng thái Truyền thông:</Label>
                        <Badge className={
                          event.commsStatus === 'completed' ? 'bg-green-500' :
                          event.commsStatus === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-500'
                        }>
                          {event.commsStatus === 'completed' ? 'Hoàn thành' :
                           event.commsStatus === 'in-progress' ? 'Đang tiến hành' : 'Chưa bắt đầu'}
                        </Badge>
                      </div>
                    </div>

                    {/* Task Progress */}
                    {event.tasks && event.tasks.length > 0 && (
                      <div className="space-y-2">
                        <Label className="font-semibold">Tiến độ Công việc:</Label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>
                              {event.tasks.filter(t => t.status === 'completed').length}/{event.tasks.length} nhiệm vụ
                            </span>
                            <span className="font-bold">
                              {Math.round((event.tasks.filter(t => t.status === 'completed').length / event.tasks.length) * 100)}%
                            </span>
                          </div>
                          <Progress 
                            value={(event.tasks.filter(t => t.status === 'completed').length / event.tasks.length) * 100} 
                            className="h-2"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label className="font-semibold">Mục tiêu:</Label>
                      <p className="text-sm text-muted-foreground">{event.objectives}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="font-semibold">Kế hoạch Chuẩn bị:</Label>
                      <Textarea 
                        rows={3}
                        defaultValue={event.preparationPlan}
                        className="text-sm"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="font-semibold">Kế hoạch Truyền thông:</Label>
                      <Textarea 
                        rows={3}
                        defaultValue={event.communicationPlan}
                        className="text-sm"
                      />
                    </div>
                    
                    {event.budget && (
                      <div className="space-y-2">
                        <Label className="font-semibold">Ngân sách:</Label>
                        <p className="text-sm font-medium text-bni-red">{event.budget}</p>
                      </div>
                    )}

                    {/* Update Button */}
                    <Button
                      onClick={() => {
                        setSelectedEventForTasks(event);
                        setTaskManagerOpen(true);
                      }}
                      className="w-full bg-bni-red hover:bg-bni-red/90 text-white"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Cập nhật Phân công & Tiến độ
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      {/* III. HOẠT ĐỘNG TRUYỀN THÔNG THƯỜNG XUYÊN */}
      <Card className="shadow-lg border-bni-gold border-2">
        <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Megaphone className="h-6 w-6 text-bni-red" />
                III. HOẠT ĐỘNG TRUYỀN THÔNG THƯỜNG XUYÊN
              </CardTitle>
              <CardDescription className="text-base">
                Tạo nội dung với AI hoặc tự điền, chia sẻ trực tiếp lên mạng xã hội
              </CardDescription>
            </div>
            <Button 
              onClick={() => {
                const newActivity = {
                  id: Date.now().toString(),
                  type: 'member-of-week'
                };
                setCommunicationActivities([...communicationActivities, newActivity]);
              }}
              className="bg-bni-red hover:bg-bni-red/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm Hoạt động
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Content Generators */}
          <Collapsible open={isCommActivitiesOpen} onOpenChange={setIsCommActivitiesOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>Hoạt động Truyền thông ({communicationActivities.length})</span>
                {isCommActivitiesOpen ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {communicationActivities.map((activity) => (
                  <div key={activity.id} className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 z-10 h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        setCommunicationActivities(
                          communicationActivities.filter(a => a.id !== activity.id)
                        );
                        toast.success('Đã xóa hoạt động truyền thông');
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <ContentGenerator contentType={activity.type} />
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Hiệu quả Fanpage */}
          <Card className="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Hiệu quả Fanpage (7 ngày qua)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-background p-4 rounded-lg border">
                  <Label className="font-semibold block mb-2">Lượt tiếp cận bài viết:</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      value={fanpageReach}
                      onChange={(e) => setFanpageReach(e.target.value)}
                      className="text-2xl font-bold w-24" 
                    />
                    <span className="text-2xl font-bold">%</span>
                    <Badge className="bg-green-500">Tăng</Badge>
                  </div>
                </div>

                <div className="bg-white dark:bg-background p-4 rounded-lg border">
                  <Label className="font-semibold block mb-2">Lượt tương tác:</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      value={fanpageEngagement}
                      onChange={(e) => setFanpageEngagement(e.target.value)}
                      className="text-2xl font-bold w-24" 
                    />
                    <span className="text-2xl font-bold">%</span>
                    <Badge className="bg-green-500">Tăng</Badge>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  📊 Hành động đề xuất:
                </p>
                <Textarea 
                  rows={2}
                  className="bg-white dark:bg-background"
                  defaultValue="Khuyến khích tất cả thành viên tích cực chia sẻ các bài đăng từ fanpage của Chapter để lan tỏa hình ảnh của chúng ta mạnh mẽ hơn."
                />
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
        <Button variant="outline" size="lg" className="w-full sm:w-auto order-4 sm:order-1">
          Hủy
        </Button>
        <Button className="bg-bni-gold text-bni-black hover:bg-bni-gold/90 w-full sm:w-auto order-3 sm:order-2" size="lg">
          <span className="hidden sm:inline">Xuất sang Trang tính</span>
          <span className="sm:hidden">Xuất Excel</span>
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto order-2 sm:order-3" size="lg">
          <CheckCircle2 className="h-5 w-5 mr-2" />
          Lưu Báo cáo
        </Button>
        <Button 
          className="bg-bni-red hover:bg-bni-red/90 text-white w-full sm:w-auto order-1 sm:order-4" 
          size="lg"
          onClick={() => {
            const eventsLead = chapterData.leadership.find(l => l.role === 'Ban Sự kiện')?.name || '';
            const commsLead = chapterData.leadership.find(l => l.role === 'Ban Truyền thông')?.name || '';
            submitReport('eventsCommunications', `${eventsLead} & ${commsLead}`);
            toast.success('Báo cáo đã hoàn thành', {
              description: 'Báo cáo Sự kiện & Truyền thông đã được gửi và đồng bộ real-time lên Tổng quan',
              duration: 5000,
            });
          }}
        >
          <Send className="h-5 w-5 mr-2" />
          Báo cáo
        </Button>
      </div>

      {/* Create Event Dialog */}
      <CreateEventDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        preselectedDate={selectedDate}
        onCreateEvent={(newEvent) => {
          setEvents(prev => [...prev, { ...newEvent, tasks: [] }]);
        }}
      />

      {/* Task Manager Dialog */}
      {selectedEventForTasks && (
        <EventTaskManager
          open={taskManagerOpen}
          onOpenChange={setTaskManagerOpen}
          eventTitle={selectedEventForTasks.title}
          tasks={selectedEventForTasks.tasks || []}
          onSaveTasks={(updatedTasks) => {
            setEvents(prev => prev.map(e => 
              e.id === selectedEventForTasks.id 
                ? { ...e, tasks: updatedTasks }
                : e
            ));
          }}
        />
      )}
    </div>
  );
}
