import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, FileText } from "lucide-react";

export default function PresidentReport() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="h-8 w-8 text-bni-red" />
          Báo cáo của Chủ tịch
        </h2>
        <p className="text-muted-foreground mt-2">
          Báo cáo hoạt động và chiến lược phát triển Chapter
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin báo cáo</CardTitle>
          <CardDescription>
            Điền thông tin báo cáo hoạt động của Chủ tịch
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
                <Label htmlFor="report-title">Tiêu đề báo cáo</Label>
                <Input 
                  id="report-title" 
                  placeholder="Ví dụ: Báo cáo hoạt động tháng 10/2025"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vision">Tầm nhìn và chiến lược</Label>
              <Textarea 
                id="vision"
                placeholder="Mô tả tầm nhìn phát triển Chapter, chiến lược triển khai..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievements">Thành tích đạt được</Label>
              <Textarea 
                id="achievements"
                placeholder="Các thành tích nổi bật, mục tiêu hoàn thành trong kỳ..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenges">Thách thức và giải pháp</Label>
              <Textarea 
                id="challenges"
                placeholder="Các thách thức gặp phải và phương án giải quyết..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="next-plan">Kế hoạch tiếp theo</Label>
              <Textarea 
                id="next-plan"
                placeholder="Kế hoạch hành động và mục tiêu cho kỳ tiếp theo..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="member-growth">Tăng trưởng thành viên (%)</Label>
                <Input 
                  id="member-growth" 
                  type="number"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meeting-attendance">Tỷ lệ tham dự (%)</Label>
                <Input 
                  id="meeting-attendance" 
                  type="number"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tyfcb-total">Tổng TYFCB (tỷ VNĐ)</Label>
                <Input 
                  id="tyfcb-total" 
                  type="number"
                  step="0.1"
                  placeholder="0.0"
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
