import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Calendar } from "lucide-react";

export default function EventsReport() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Calendar className="h-8 w-8 text-bni-red" />
          Báo cáo Ban Sự kiện
        </h2>
        <p className="text-muted-foreground mt-2">
          Báo cáo hoạt động tổ chức sự kiện và các hoạt động gắn kết
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin báo cáo</CardTitle>
          <CardDescription>
            Điền thông tin báo cáo hoạt động Ban Sự kiện
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="report-period">Kỳ báo cáo</Label>
                <Input type="date" id="report-period" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-count">Số sự kiện tổ chức</Label>
                <Input 
                  id="event-count" 
                  type="number"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="events-list">Danh sách sự kiện</Label>
              <Textarea 
                id="events-list"
                placeholder="Liệt kê các sự kiện đã tổ chức (tên, ngày, số người tham dự)..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievements">Thành tích nổi bật</Label>
              <Textarea 
                id="achievements"
                placeholder="Những điểm nhấn, thành công của các sự kiện..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback">Phản hồi và đánh giá</Label>
              <Textarea 
                id="feedback"
                placeholder="Phản hồi từ thành viên, đánh giá chất lượng sự kiện..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="next-events">Kế hoạch sự kiện tiếp theo</Label>
              <Textarea 
                id="next-events"
                placeholder="Các sự kiện dự kiến tổ chức trong kỳ tiếp theo..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="total-attendees">Tổng số người tham dự</Label>
                <Input 
                  id="total-attendees" 
                  type="number"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="satisfaction">Điểm hài lòng TB (/10)</Label>
                <Input 
                  id="satisfaction" 
                  type="number"
                  step="0.1"
                  max="10"
                  placeholder="0.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Ngân sách sử dụng (triệu)</Label>
                <Input 
                  id="budget" 
                  type="number"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline">
                Hủy
              </Button>
              <Button type="submit" className="bg-bni-red hover:bg-bni-red/90">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Gửi báo cáo
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
