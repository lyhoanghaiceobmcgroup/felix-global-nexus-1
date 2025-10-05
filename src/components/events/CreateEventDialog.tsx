import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Lightbulb } from "lucide-react";
import { toast } from "sonner";

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateEvent: (event: EventData) => void;
  preselectedDate?: Date;
}

export interface TaskAssignment {
  id: string;
  personName: string;
  role: string;
  task: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

export interface EventData {
  id: string;
  title: string;
  date: string;
  objectives: string;
  preparationPlan: string;
  communicationPlan: string;
  budget: string;
  prepStatus: 'completed' | 'in-progress' | 'not-started';
  commsStatus: 'completed' | 'in-progress' | 'not-started';
  tasks?: TaskAssignment[];
}

const EVENT_TEMPLATES = [
  {
    name: "Lễ Chuyển giao Ban Điều hành",
    objectives: "Chuyển giao quyền lực và trách nhiệm từ nhiệm kỳ cũ sang nhiệm kỳ mới một cách trang trọng và chính thức",
    preparationPlan: "- Xác định địa điểm và thời gian\n- Chuẩn bị kịch bản chương trình\n- Phân công nhiệm vụ cho các vị trí hỗ trợ\n- Chuẩn bị hậu cần và trang thiết bị",
    communicationPlan: "- Gửi email mời và poster chính thức\n- Đăng bài series 'Nhìn lại Nhiệm kỳ' trên fanpage\n- Thiết kế thư mời online cho khách mời\n- Livestream phần quan trọng\n- Đăng bài recap trong vòng 24h",
  },
  {
    name: "Gala Dinner & Business Matching",
    objectives: "Tạo không gian kết nối kinh doanh trang trọng, tổng kết năm và vinh danh thành viên xuất sắc",
    preparationPlan: "- Lên ý tưởng và chủ đề chính\n- Khảo sát địa điểm tiềm năng\n- Dự kiến ngân sách và kêu gọi tài trợ\n- Thiết kế chương trình Business Matching",
    communicationPlan: "- Khởi động chiến dịch 6 tuần trước sự kiện\n- Thiết kế bộ nhận diện (logo, theme)\n- Tung 'Save the Date' và các gói tài trợ\n- Chạy chuỗi bài đăng trên các kênh",
  },
  {
    name: "Workshop Kỹ năng Kinh doanh",
    objectives: "Nâng cao kỹ năng chuyên môn và năng lực kinh doanh cho thành viên chapter",
    preparationPlan: "- Xác định chủ đề và diễn giả\n- Đặt địa điểm và chuẩn bị trang thiết bị\n- Thiết kế tài liệu workshop\n- Chuẩn bị hoạt động tương tác",
    communicationPlan: "- Tạo landing page đăng ký\n- Email marketing đến thành viên\n- Đăng bài giới thiệu diễn giả\n- Teaser nội dung workshop",
  },
  {
    name: "Team Building",
    objectives: "Tăng cường tinh thần đồng đội, kết nối và tạo động lực cho thành viên chapter",
    preparationPlan: "- Chọn địa điểm phù hợp\n- Thiết kế các hoạt động team building\n- Chuẩn bị logistics và ăn uống\n- Phân chia nhóm và trò chơi",
    communicationPlan: "- Tạo buzz với teaser video\n- Countdown posts trên fanpage\n- Live updates trong sự kiện\n- Chia sẻ highlights và ảnh đẹp",
  },
];

export default function CreateEventDialog({ open, onOpenChange, onCreateEvent, preselectedDate }: CreateEventDialogProps) {
  const [formData, setFormData] = useState<Partial<EventData>>({
    date: preselectedDate ? preselectedDate.toISOString().split('T')[0] : '',
    prepStatus: 'not-started',
    commsStatus: 'not-started',
  });
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const applyTemplate = (templateName: string) => {
    const template = EVENT_TEMPLATES.find(t => t.name === templateName);
    if (template) {
      setFormData(prev => ({
        ...prev,
        title: template.name,
        objectives: template.objectives,
        preparationPlan: template.preparationPlan,
        communicationPlan: template.communicationPlan,
      }));
      setSelectedTemplate(templateName);
      toast.success("Đã áp dụng mẫu sự kiện");
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.date) {
      toast.error("Vui lòng nhập tên sự kiện và ngày tổ chức");
      return;
    }

    const newEvent: EventData = {
      id: Date.now().toString(),
      title: formData.title,
      date: formData.date,
      objectives: formData.objectives || '',
      preparationPlan: formData.preparationPlan || '',
      communicationPlan: formData.communicationPlan || '',
      budget: formData.budget || '',
      prepStatus: formData.prepStatus || 'not-started',
      commsStatus: formData.commsStatus || 'not-started',
    };

    onCreateEvent(newEvent);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      date: '',
      prepStatus: 'not-started',
      commsStatus: 'not-started',
    });
    setSelectedTemplate("");
    
    toast.success("Đã tạo sự kiện mới");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-bni-red" />
            Tạo Sự kiện Mới
          </DialogTitle>
          <DialogDescription>
            Điền thông tin sự kiện hoặc chọn mẫu có sẵn để nhanh chóng
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Templates */}
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-2 border-blue-500">
            <Label className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-blue-600" />
              Chọn Mẫu Sự kiện (Tùy chọn)
            </Label>
            <Select value={selectedTemplate} onValueChange={applyTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn mẫu sự kiện..." />
              </SelectTrigger>
              <SelectContent>
                {EVENT_TEMPLATES.map(template => (
                  <SelectItem key={template.name} value={template.name}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tên Sự kiện *</Label>
              <Input
                id="title"
                placeholder="VD: Gala Dinner 2025"
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Ngày Tổ chức *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
          </div>

          {/* Objectives */}
          <div className="space-y-2">
            <Label htmlFor="objectives">Mục Tiêu</Label>
            <Textarea
              id="objectives"
              rows={3}
              placeholder="Mục tiêu của sự kiện..."
              value={formData.objectives || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, objectives: e.target.value }))}
            />
          </div>

          {/* Preparation Plan */}
          <div className="space-y-2">
            <Label htmlFor="preparationPlan">Kế Hoạch Chuẩn bị</Label>
            <Textarea
              id="preparationPlan"
              rows={4}
              placeholder="Các bước chuẩn bị sự kiện..."
              value={formData.preparationPlan || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, preparationPlan: e.target.value }))}
            />
          </div>

          {/* Communication Plan */}
          <div className="space-y-2">
            <Label htmlFor="communicationPlan">Kế Hoạch Truyền thông</Label>
            <Textarea
              id="communicationPlan"
              rows={4}
              placeholder="Chiến lược truyền thông cho sự kiện..."
              value={formData.communicationPlan || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, communicationPlan: e.target.value }))}
            />
          </div>

          {/* Budget & Status */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Ngân Sách</Label>
              <Input
                id="budget"
                placeholder="VD: 50.000.000 VNĐ"
                value={formData.budget || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prepStatus">Trạng thái Chuẩn bị</Label>
              <Select 
                value={formData.prepStatus} 
                onValueChange={(value: any) => setFormData(prev => ({ ...prev, prepStatus: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-started">Chưa bắt đầu</SelectItem>
                  <SelectItem value="in-progress">Đang tiến hành</SelectItem>
                  <SelectItem value="completed">Hoàn thành</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="commsStatus">Trạng thái Truyền thông</Label>
              <Select 
                value={formData.commsStatus} 
                onValueChange={(value: any) => setFormData(prev => ({ ...prev, commsStatus: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-started">Chưa bắt đầu</SelectItem>
                  <SelectItem value="in-progress">Đang tiến hành</SelectItem>
                  <SelectItem value="completed">Hoàn thành</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} className="bg-bni-red hover:bg-bni-red/90">
            Tạo Sự kiện
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
