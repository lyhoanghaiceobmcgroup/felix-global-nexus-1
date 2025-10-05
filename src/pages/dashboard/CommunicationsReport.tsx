import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Megaphone } from "lucide-react";

export default function CommunicationsReport() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Megaphone className="h-8 w-8 text-bni-red" />
          Báo cáo Ban Truyền thông
        </h2>
        <p className="text-muted-foreground mt-2">
          Báo cáo hoạt động truyền thông và marketing của Chapter
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin báo cáo</CardTitle>
          <CardDescription>
            Điền thông tin báo cáo hoạt động Ban Truyền thông
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
                <Label htmlFor="content-count">Số nội dung phát hành</Label>
                <Input 
                  id="content-count" 
                  type="number"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content-summary">Tổng hợp nội dung</Label>
              <Textarea 
                id="content-summary"
                placeholder="Liệt kê các nội dung đã phát hành (bài viết, video, hình ảnh)..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="social-performance">Hiệu quả mạng xã hội</Label>
              <Textarea 
                id="social-performance"
                placeholder="Tổng hợp tương tác, reach, engagement trên các kênh..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pr-activities">Hoạt động PR</Label>
              <Textarea 
                id="pr-activities"
                placeholder="Các hoạt động PR, đối ngoại, hợp tác truyền thông..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="next-plan">Kế hoạch tiếp theo</Label>
              <Textarea 
                id="next-plan"
                placeholder="Kế hoạch nội dung và chiến dịch truyền thông sắp tới..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="total-reach">Tổng lượt tiếp cận</Label>
                <Input 
                  id="total-reach" 
                  type="number"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="engagement-rate">Tỷ lệ tương tác (%)</Label>
                <Input 
                  id="engagement-rate" 
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-followers">Người theo dõi mới</Label>
                <Input 
                  id="new-followers" 
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
