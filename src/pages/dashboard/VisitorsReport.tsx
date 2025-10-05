import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, UserPlus } from "lucide-react";

export default function VisitorsReport() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <UserPlus className="h-8 w-8 text-bni-red" />
          Báo cáo Ban Khách mời
        </h2>
        <p className="text-muted-foreground mt-2">
          Báo cáo hoạt động: Trưởng ban, Điều phối, Đón tiếp, Định hướng, Hỗ trợ khách mời
        </p>
      </div>

      <Tabs defaultValue="coordinator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="coordinator">Trưởng ban</TabsTrigger>
          <TabsTrigger value="dispatch">Điều phối</TabsTrigger>
          <TabsTrigger value="reception">Đón tiếp</TabsTrigger>
          <TabsTrigger value="orientation">Định hướng</TabsTrigger>
          <TabsTrigger value="support">Hỗ trợ</TabsTrigger>
        </TabsList>

        <TabsContent value="coordinator">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo Trưởng ban Khách mời</CardTitle>
              <CardDescription>Tổng quan hoạt động và chiến lược phát triển khách mời</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tổng số khách mời</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tỷ lệ chuyển đổi (%)</Label>
                    <Input type="number" step="0.1" placeholder="0.0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Chiến lược và kế hoạch</Label>
                  <Textarea rows={4} placeholder="Chiến lược thu hút và phát triển khách mời..." />
                </div>
                <div className="space-y-2">
                  <Label>Thách thức và giải pháp</Label>
                  <Textarea rows={4} placeholder="Những thách thức gặp phải và phương án khắc phục..." />
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

        <TabsContent value="dispatch">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo Điều phối Khách mời</CardTitle>
              <CardDescription>Hoạt động điều phối và phân công khách mời</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Số khách mời được phân công</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Số thành viên mời khách</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Hiệu quả điều phối</Label>
                  <Textarea rows={4} placeholder="Đánh giá hiệu quả phân công và theo dõi khách mời..." />
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

        <TabsContent value="reception">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo Đón tiếp Khách mời</CardTitle>
              <CardDescription>Hoạt động đón tiếp và tạo ấn tượng ban đầu</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Số khách được đón tiếp</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Điểm hài lòng TB (/10)</Label>
                    <Input type="number" step="0.1" max="10" placeholder="0.0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Phản hồi từ khách mời</Label>
                  <Textarea rows={4} placeholder="Tổng hợp phản hồi và trải nghiệm của khách mời..." />
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

        <TabsContent value="orientation">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo Định hướng Khách mời</CardTitle>
              <CardDescription>Hoạt động giới thiệu và định hướng về BNI</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Số buổi định hướng</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Số khách tham gia</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Nội dung định hướng</Label>
                  <Textarea rows={4} placeholder="Các chủ đề và nội dung đã trình bày..." />
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

        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo Hỗ trợ Khách mời</CardTitle>
              <CardDescription>Hoạt động hỗ trợ và theo dõi khách mời</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Số khách được hỗ trợ</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Số khách đăng ký thành viên</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Hoạt động hỗ trợ</Label>
                  <Textarea rows={4} placeholder="Các hoạt động hỗ trợ và chăm sóc khách mời..." />
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
