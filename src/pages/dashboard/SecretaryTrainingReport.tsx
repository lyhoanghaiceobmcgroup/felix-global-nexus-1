import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, FileText } from "lucide-react";

export default function SecretaryTrainingReport() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="h-8 w-8 text-bni-red" />
          Báo cáo Thư ký & Đào tạo
        </h2>
        <p className="text-muted-foreground mt-2">
          Báo cáo hoạt động Tổng thư ký và Ban đào tạo
        </p>
      </div>

      <Tabs defaultValue="secretary" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="secretary">Tổng Thư ký</TabsTrigger>
          <TabsTrigger value="training">Ban Đào tạo</TabsTrigger>
        </TabsList>

        <TabsContent value="secretary">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo Tổng Thư ký</CardTitle>
              <CardDescription>Hoạt động quản lý hành chính và tài chính</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Số biên bản họp</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tỷ lệ thu phí (%)</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Báo cáo tài chính</Label>
                  <Textarea rows={4} placeholder="Tóm tắt tình hình tài chính chapter..." />
                </div>
                <div className="space-y-2">
                  <Label>Hoạt động hành chính</Label>
                  <Textarea rows={4} placeholder="Các hoạt động hành chính đã thực hiện..." />
                </div>
                <div className="flex justify-end gap-4">
                  <Button variant="outline">Hủy</Button>
                  <Button className="bg-bni-red hover:bg-bni-red/90">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Gửi báo cáo
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo Ban Đào tạo</CardTitle>
              <CardDescription>Hoạt động đào tạo và phát triển thành viên</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Số buổi đào tạo</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Số thành viên tham dự</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Chương trình đào tạo</Label>
                  <Textarea rows={4} placeholder="Danh sách các chương trình đào tạo đã thực hiện..." />
                </div>
                <div className="space-y-2">
                  <Label>Đánh giá hiệu quả</Label>
                  <Textarea rows={4} placeholder="Đánh giá hiệu quả các buổi đào tạo..." />
                </div>
                <div className="flex justify-end gap-4">
                  <Button variant="outline">Hủy</Button>
                  <Button className="bg-bni-red hover:bg-bni-red/90">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Gửi báo cáo
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
