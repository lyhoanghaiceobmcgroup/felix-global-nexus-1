import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Target, Calendar, CheckCircle2, AlertCircle, Circle } from "lucide-react";
import { useState } from "react";

export default function VicePresidentReport() {
  const [weekDate, setWeekDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b pb-6">
        <h1 className="text-4xl font-bold text-bni-red mb-2">
          Dashboard Báo Cáo Hiệu Suất Hoạt Động BNI Chapter
        </h1>
        <div className="flex items-center gap-4 mt-4">
          <Label className="font-semibold">Cập nhật cho Tuần:</Label>
          <Input 
            type="date" 
            value={weekDate}
            onChange={(e) => setWeekDate(e.target.value)}
            className="w-auto"
          />
        </div>
      </div>

      {/* I. TỔNG QUAN HIỆU SUẤT KINH DOANH */}
      <Card className="shadow-lg border-bni-gold border-2">
        <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-bni-red" />
            I. TỔNG QUAN HIỆU SUẤT KINH DOANH
          </CardTitle>
          <CardDescription className="text-base">Báo cáo Phó Chủ tịch</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-base">Chỉ số</TableHead>
                <TableHead className="font-bold text-base text-center">Tuần qua</TableHead>
                <TableHead className="font-bold text-base text-center">Tháng trước</TableHead>
                <TableHead className="font-bold text-base text-center">Từ khi thành lập</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Cơ hội kinh doanh (Referrals)</TableCell>
                <TableCell className="text-center">
                  <Input type="number" placeholder="53" className="w-24 mx-auto" defaultValue="53" />
                </TableCell>
                <TableCell className="text-center">
                  <Input type="number" placeholder="103" className="w-24 mx-auto" defaultValue="103" />
                </TableCell>
                <TableCell className="text-center text-muted-foreground">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Giá trị Giao dịch (Thank You Note)</TableCell>
                <TableCell className="text-center text-muted-foreground">-</TableCell>
                <TableCell className="text-center">
                  <Input placeholder="> 1,23 Tỷ VNĐ" className="w-40 mx-auto" defaultValue="> 1,23 Tỷ VNĐ" />
                </TableCell>
                <TableCell className="text-center">
                  <Input placeholder="> 326,1 Tỷ VNĐ" className="w-40 mx-auto" defaultValue="> 326,1 Tỷ VNĐ" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Số lượng Khách mời</TableCell>
                <TableCell className="text-center">
                  <Input type="number" placeholder="4" className="w-24 mx-auto" defaultValue="4" />
                </TableCell>
                <TableCell className="text-center text-muted-foreground">-</TableCell>
                <TableCell className="text-center text-muted-foreground">-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
            <p className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
              📊 Phân tích & Hành động đề xuất:
            </p>
            <Textarea 
              rows={2}
              className="bg-white dark:bg-background"
              defaultValue="Tuần qua hoạt động trao cơ hội kinh doanh rất sôi nổi. Cần tiếp tục theo dõi để chuyển hóa thành giá trị giao dịch trong các tuần tới."
            />
          </div>

          <div className="mt-4 flex justify-end">
            <Button className="bg-bni-gold text-bni-black hover:bg-bni-gold/90">
              Xuất sang Trang tính
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* II. TỔNG QUAN SỨC KHỎE THÀNH VIÊN */}
      <Card className="shadow-lg border-bni-red border-2">
        <CardHeader className="bg-gradient-to-r from-bni-gold/10 to-bni-red/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Users className="h-6 w-6 text-bni-red" />
            II. TỔNG QUAN SỨC KHỎE THÀNH VIÊN
          </CardTitle>
          <CardDescription className="text-base">Báo cáo Ban Thành viên</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          
          {/* 1. Báo cáo Chất lượng Thành viên */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Target className="h-5 w-5 text-bni-red" />
              1. Báo cáo Chất lượng Thành viên
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <p className="font-semibold mb-4">Phân loại Hiệu suất (Traffic Light):</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-background p-4 rounded-lg border-2 border-green-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Circle className="h-6 w-6 fill-green-500 text-green-500" />
                    <span className="font-bold">KPI Xanh (Tốt)</span>
                  </div>
                  <Input type="number" placeholder="50" className="text-2xl font-bold text-center" defaultValue="50" />
                  <p className="text-sm text-muted-foreground mt-1 text-center">%</p>
                </div>
                
                <div className="bg-white dark:bg-background p-4 rounded-lg border-2 border-yellow-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Circle className="h-6 w-6 fill-yellow-500 text-yellow-500" />
                    <span className="font-bold">KPI Vàng (Cần cải thiện)</span>
                  </div>
                  <Input type="number" placeholder="45" className="text-2xl font-bold text-center" defaultValue="45" />
                  <p className="text-sm text-muted-foreground mt-1 text-center">%</p>
                </div>
                
                <div className="bg-white dark:bg-background p-4 rounded-lg border-2 border-red-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Circle className="h-6 w-6 fill-red-500 text-red-500" />
                    <span className="font-bold">KPI Đỏ (Cần hỗ trợ)</span>
                  </div>
                  <Input type="number" placeholder="5" className="text-2xl font-bold text-center" defaultValue="5" />
                  <p className="text-sm text-muted-foreground mt-1 text-center">%</p>
                </div>
                
                <div className="bg-white dark:bg-background p-4 rounded-lg border-2 border-gray-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Circle className="h-6 w-6 fill-gray-500 text-gray-500" />
                    <span className="font-bold">KPI Xám (Chưa cập nhật)</span>
                  </div>
                  <Input type="number" placeholder="0" className="text-2xl font-bold text-center" defaultValue="0" />
                  <p className="text-sm text-muted-foreground mt-1 text-center">%</p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border-l-4 border-green-500">
                <p className="font-semibold text-green-900 dark:text-green-300 mb-2">
                  📊 Phân tích & Hành động đề xuất:
                </p>
                <Textarea 
                  rows={2}
                  className="bg-white dark:bg-background"
                  defaultValue="Tỷ lệ đang ở mức mục tiêu. Ban Chất lượng sẽ làm việc 1-1 với các thành viên thuộc nhóm KPI Đỏ để hỗ trợ cải thiện hiệu suất."
                />
              </div>
            </div>
          </div>

          {/* 2. Báo cáo Gắn kết Thành viên */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-bni-red" />
              2. Báo cáo Gắn kết Thành viên
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-background p-4 rounded-lg border">
                  <Label className="font-semibold text-base">Tỷ lệ Hiện diện trung bình:</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input type="number" placeholder="98" className="text-2xl font-bold" defaultValue="98" />
                    <span className="text-2xl font-bold">%</span>
                    <Badge className="bg-green-500">Đạt mục tiêu</Badge>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-background p-4 rounded-lg border">
                  <Label className="font-semibold text-base">Số lượt 1-2-1 (tháng trước):</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input placeholder="344" className="text-xl font-bold" defaultValue="344" />
                    <span className="text-xl">/</span>
                    <Input placeholder="544" className="text-xl font-bold" defaultValue="544" />
                    <Badge className="bg-yellow-500">Cần đẩy mạnh</Badge>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  📊 Phân tích & Hành động đề xuất:
                </p>
                <Textarea 
                  rows={2}
                  className="bg-white dark:bg-background"
                  defaultValue="Tỷ lệ hiện diện rất tốt. Chapter cần khuyến khích thành viên, đặc biệt là các thành viên mới, tăng cường 1-2-1 để xây dựng mối quan hệ sâu sắc hơn."
                />
              </div>
            </div>
          </div>

          {/* 3. Báo cáo Xây dựng Chapter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-bni-red" />
              3. Báo cáo Xây dựng Chapter
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-background p-4 rounded-lg border">
                  <Label className="font-semibold text-base">Sĩ số Chapter:</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input type="number" placeholder="42" className="text-2xl font-bold" defaultValue="42" />
                    <span className="text-2xl font-bold">/</span>
                    <Input type="number" placeholder="75" className="text-2xl font-bold" defaultValue="75" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">(Số hiện tại / Mục tiêu cuối nhiệm kỳ)</p>
                </div>
                
                <div className="bg-white dark:bg-background p-4 rounded-lg border">
                  <Label className="font-semibold text-base">Khách mời đang thẩm định:</Label>
                  <Input type="number" placeholder="3" className="text-2xl font-bold mt-2" defaultValue="3" />
                </div>
              </div>
              
              <div className="bg-white dark:bg-background p-4 rounded-lg border">
                <Label className="font-semibold text-base mb-2 block">Ngành nghề ưu tiên tìm kiếm:</Label>
                <Textarea 
                  rows={2}
                  placeholder="Vật liệu nội ngoại thất, Thi công ME, Thang máy, Lọc nước, PCCC, Rèm, Sàn..."
                  defaultValue="Vật liệu nội ngoại thất, Thi công ME, Thang máy, Lọc nước, PCCC, Rèm, Sàn."
                />
              </div>
              
              <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border-l-4 border-orange-500">
                <p className="font-semibold text-orange-900 dark:text-orange-300 mb-2">
                  📊 Phân tích & Hành động đề xuất:
                </p>
                <Textarea 
                  rows={2}
                  className="bg-white dark:bg-background"
                  defaultValue="Cần tập trung mời khách thuộc các ngành nghề ưu tiên để hoàn thiện Power Team Xây dựng."
                />
              </div>
            </div>
          </div>

          {/* 4. Báo cáo Định hướng & Mối quan hệ Thành viên */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-bni-red" />
              4. Báo cáo Định hướng & Mối quan hệ Thành viên
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-background p-4 rounded-lg border">
                  <Label className="font-semibold text-base">Thành viên mới cần định hướng:</Label>
                  <Input type="number" placeholder="2" className="text-2xl font-bold mt-2" defaultValue="2" />
                </div>
                
                <div className="bg-white dark:bg-background p-4 rounded-lg border">
                  <Label className="font-semibold text-base">Tình trạng Mối quan hệ:</Label>
                  <Input 
                    placeholder="Ổn định, không có vấn đề tồn đọng" 
                    className="mt-2" 
                    defaultValue="Ổn định, không có vấn đề tồn đọng."
                  />
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border-l-4 border-purple-500">
                <p className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                  📊 Phân tích & Hành động đề xuất:
                </p>
                <Textarea 
                  rows={2}
                  className="bg-white dark:bg-background"
                  defaultValue="Ban Định hướng cần hoàn thành chương trình đào tạo cho thành viên mới trong 2 tuần tới. Duy trì các hoạt động networking nội bộ để giữ vững sự gắn kết."
                />
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" size="lg">
          Hủy
        </Button>
        <Button className="bg-bni-red hover:bg-bni-red/90 text-white" size="lg">
          <CheckCircle2 className="h-5 w-5 mr-2" />
          Lưu Báo cáo
        </Button>
      </div>
    </div>
  );
}
