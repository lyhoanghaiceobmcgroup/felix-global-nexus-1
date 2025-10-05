import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, UserCog } from "lucide-react";

export default function VicePresidentReport() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <UserCog className="h-8 w-8 text-bni-red" />
          Báo cáo Phó Chủ tịch
        </h2>
        <p className="text-muted-foreground mt-2">
          Báo cáo hoạt động các mảng: Định hướng, Xây dựng, Mối quan hệ, Gắn kết, Chất lượng thành viên
        </p>
      </div>

      <Tabs defaultValue="orientation" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="orientation">Định hướng TV</TabsTrigger>
          <TabsTrigger value="chapter-building">Xây dựng Chapter</TabsTrigger>
          <TabsTrigger value="relationships">Mối quan hệ</TabsTrigger>
          <TabsTrigger value="engagement">Gắn kết</TabsTrigger>
          <TabsTrigger value="quality">Chất lượng</TabsTrigger>
        </TabsList>

        <TabsContent value="orientation">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo Định hướng Thành viên</CardTitle>
              <CardDescription>Hoạt động định hướng và hỗ trợ thành viên mới</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Số thành viên mới định hướng</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Số buổi định hướng</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Hoạt động nổi bật</Label>
                  <Textarea rows={4} placeholder="Mô tả các hoạt động định hướng thành viên..." />
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

        <TabsContent value="chapter-building">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo Xây dựng Chapter</CardTitle>
              <CardDescription>Hoạt động phát triển và mở rộng chapter</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Số chapter mới hỗ trợ</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Số hoạt động hỗ trợ</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Kế hoạch xây dựng</Label>
                  <Textarea rows={4} placeholder="Mô tả kế hoạch xây dựng và phát triển chapter..." />
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

        <TabsContent value="relationships">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo Mối quan hệ Thành viên</CardTitle>
              <CardDescription>Hoạt động tăng cường mối quan hệ giữa các thành viên</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Số buổi 1-to-1</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Số hoạt động kết nối</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Thành tích nổi bật</Label>
                  <Textarea rows={4} placeholder="Mô tả các hoạt động tăng cường mối quan hệ..." />
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

        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo Gắn kết Thành viên</CardTitle>
              <CardDescription>Hoạt động tạo sự gắn kết và tham gia của thành viên</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tỷ lệ tham gia họp (%)</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Số hoạt động gắn kết</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Đánh giá chung</Label>
                  <Textarea rows={4} placeholder="Đánh giá mức độ gắn kết của thành viên..." />
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

        <TabsContent value="quality">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo Chất lượng Thành viên</CardTitle>
              <CardDescription>Đánh giá và nâng cao chất lượng thành viên</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Số thành viên đạt chuẩn</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Điểm chất lượng TB</Label>
                    <Input type="number" step="0.1" placeholder="0.0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Đánh giá và đề xuất</Label>
                  <Textarea rows={4} placeholder="Đánh giá chất lượng thành viên và đề xuất cải thiện..." />
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
