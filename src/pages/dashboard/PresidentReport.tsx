import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Crown, Target, TrendingUp, Users, Calendar, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import { useState } from "react";

export default function PresidentReport() {
  const [meetingDate, setMeetingDate] = useState(new Date().toISOString().split('T')[0]);
  const [termStart, setTermStart] = useState("2025-10-01");
  const [termEnd, setTermEnd] = useState("2026-03-31");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b pb-6">
        <h1 className="text-4xl font-bold text-bni-red mb-4 flex items-center gap-3">
          <Crown className="h-10 w-10 text-bni-gold" />
          BÁO CÁO CỦA CHỦ TỊCH
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Label className="font-semibold shrink-0">Buổi họp ngày:</Label>
            <Input 
              type="date" 
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
              className="w-auto"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="font-semibold shrink-0">Nhiệm kỳ XI:</Label>
            <Input 
              type="date" 
              value={termStart}
              onChange={(e) => setTermStart(e.target.value)}
              className="w-32"
            />
            <span>–</span>
            <Input 
              type="date" 
              value={termEnd}
              onChange={(e) => setTermEnd(e.target.value)}
              className="w-32"
            />
          </div>
        </div>
      </div>

      {/* Lời chào */}
      <Card className="shadow-lg border-bni-gold border-2 bg-gradient-to-r from-bni-gold/5 to-bni-red/5">
        <CardContent className="pt-6">
          <Textarea 
            rows={4}
            className="text-base bg-white dark:bg-background"
            placeholder="Nhập lời chào và thông điệp mở đầu từ Chủ tịch..."
            defaultValue="Chào buổi sáng toàn thể các thành viên BNI Felix Chapter!&#10;&#10;Chúng ta đang ở buổi họp cuối cùng của Nhiệm kỳ X và chuẩn bị bước sang một chặng đường mới với Nhiệm kỳ XI. Đây là thời điểm để chúng ta cùng nhìn lại, và quan trọng hơn, là cùng nhau hướng về những mục tiêu lớn phía trước."
          />
        </CardContent>
      </Card>

      {/* I. NHÌN LẠI TẦM NHÌN & MỤC TIÊU NHIỆM KỲ */}
      <Card className="shadow-lg border-bni-red border-2">
        <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Target className="h-6 w-6 text-bni-red" />
            I. NHÌN LẠI TẦM NHÌN & MỤC TIÊU NHIỆM KỲ
          </CardTitle>
          <CardDescription className="text-base">
            Hãy cùng nhắc lại những mục tiêu mà chúng ta đã cam kết cùng nhau đạt được
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-base">Hạng mục</TableHead>
                <TableHead className="font-bold text-base text-center">Mục tiêu Nhiệm kỳ</TableHead>
                <TableHead className="font-bold text-base text-center">Tiến độ Hiện tại</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Số lượng Thành viên</TableCell>
                <TableCell className="text-center">
                  <Input placeholder="75+" className="w-32 mx-auto font-bold" defaultValue="75+" />
                </TableCell>
                <TableCell className="text-center">
                  <Input type="number" placeholder="42" className="w-32 mx-auto font-bold" defaultValue="42" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Doanh thu Cả nhiệm kỳ</TableCell>
                <TableCell className="text-center">
                  <Input placeholder="33 Tỷ VNĐ" className="w-40 mx-auto font-bold" defaultValue="33 Tỷ VNĐ" />
                </TableCell>
                <TableCell className="text-center text-muted-foreground">
                  (Bắt đầu tính từ 01/10)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Tỷ lệ Hiện diện</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Input type="number" placeholder="98" className="w-20 mx-auto font-bold" defaultValue="98" />
                    <span className="font-bold">%</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Input type="number" placeholder="98" className="w-20 mx-auto font-bold" defaultValue="98" />
                    <span className="font-bold">%</span>
                    <Badge className="bg-green-500">Đạt</Badge>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Tỷ lệ Thành viên KPI Xanh</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Input type="number" placeholder="50" className="w-20 mx-auto font-bold" defaultValue="50" />
                    <span className="font-bold">%</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Input type="number" placeholder="50" className="w-20 mx-auto font-bold" defaultValue="50" />
                    <span className="font-bold">%</span>
                    <Badge className="bg-green-500">Đạt</Badge>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Số lượt 1-2-1 / tháng</TableCell>
                <TableCell className="text-center">
                  <Input placeholder="344 – 544" className="w-40 mx-auto font-bold" defaultValue="344 – 544" />
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Input type="number" placeholder="344" className="w-24 mx-auto font-bold" defaultValue="344" />
                    <Badge className="bg-green-500">Đạt tối thiểu</Badge>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-6 flex justify-end">
            <Button className="bg-bni-gold text-bni-black hover:bg-bni-gold/90">
              Xuất sang Trang tính
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
            <p className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
              💭 Góc nhìn của Chủ tịch:
            </p>
            <Textarea 
              rows={2}
              className="bg-white dark:bg-background"
              defaultValue="Chúng ta đang làm rất tốt việc duy trì sự hiện diện và chất lượng hoạt động. Nền tảng con người đã vững, giờ là lúc tập trung vào sự tăng trưởng về quy mô và doanh thu trong nhiệm kỳ mới."
            />
          </div>
        </CardContent>
      </Card>

      {/* II. BẢNG ĐIỀU KHIỂN TỔNG QUAN CHAPTER */}
      <Card className="shadow-lg border-bni-gold border-2">
        <CardHeader className="bg-gradient-to-r from-bni-gold/10 to-bni-red/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-bni-red" />
            II. BẢNG ĐIỀU KHIỂN (DASHBOARD) TỔNG QUAN CHAPTER
          </CardTitle>
          <CardDescription className="text-base">(Số liệu cập nhật từ các Trưởng ban)</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          
          {/* Hiệu suất Kinh doanh & Kết nối */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-bni-red">Hiệu suất Kinh doanh & Kết nối</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 p-6 rounded-lg border-2 border-green-500">
                <Label className="font-semibold text-sm text-muted-foreground block mb-2">
                  Cơ hội Kinh doanh (Tuần qua):
                </Label>
                <Input type="number" placeholder="53" className="text-3xl font-bold" defaultValue="53" />
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 p-6 rounded-lg border-2 border-blue-500">
                <Label className="font-semibold text-sm text-muted-foreground block mb-2">
                  Giá trị Giao dịch (Tháng trước):
                </Label>
                <Input placeholder="> 1,23 Tỷ VNĐ" className="text-3xl font-bold" defaultValue="> 1,23 Tỷ VNĐ" />
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 p-6 rounded-lg border-2 border-purple-500">
                <Label className="font-semibold text-sm text-muted-foreground block mb-2">
                  Số lượng Khách mời (Tuần trước):
                </Label>
                <Input type="number" placeholder="4" className="text-3xl font-bold" defaultValue="4" />
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 p-6 rounded-lg border-2 border-orange-500">
                <Label className="font-semibold text-sm text-muted-foreground block mb-2">
                  Số hồ sơ TV mới đã nộp:
                </Label>
                <Input type="number" placeholder="1" className="text-3xl font-bold" defaultValue="1" />
              </div>
            </div>
          </div>

          {/* Sức khỏe & Gắn kết Nội bộ */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-bni-red">Sức khỏe & Gắn kết Nội bộ</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 p-6 rounded-lg border-2 border-yellow-500">
                <Label className="font-semibold text-sm text-muted-foreground block mb-2">
                  Thành viên cần gia hạn (90 ngày tới):
                </Label>
                <Input type="number" placeholder="7" className="text-3xl font-bold" defaultValue="7" />
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 p-6 rounded-lg border-2 border-green-500">
                <Label className="font-semibold text-sm text-muted-foreground block mb-2">
                  Tổng điểm Đào tạo (Tháng trước):
                </Label>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="486" className="text-3xl font-bold" defaultValue="486" />
                  <Badge className="bg-green-500">Vượt MTC</Badge>
                </div>
              </div>

              <div className="bg-gradient-to-br from-bni-gold/30 to-bni-red/30 p-6 rounded-lg border-2 border-bni-gold">
                <Label className="font-semibold text-sm text-muted-foreground block mb-2">
                  Sự kiện quan trọng sắp tới:
                </Label>
                <Input 
                  placeholder="Lễ Chuyển giao BĐH (07/10/2025)" 
                  className="text-lg font-bold"
                  defaultValue="Lễ Chuyển giao BĐH (07/10/2025)"
                />
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* III. GÓC NHÌN & ĐỊNH HƯỚNG CỦA CHỦ TỊCH */}
      <Card className="shadow-lg border-bni-red border-2">
        <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-bni-gold" />
            III. GÓC NHÌN & ĐỊNH HƯỚNG CỦA CHỦ TỊCH
          </CardTitle>
          <CardDescription className="text-base">Nhìn vào các con số trên, tôi muốn chia sẻ một vài điểm nhấn</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          
          {/* Điều chúng ta đang làm rất tốt */}
          <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border-l-4 border-green-500">
            <h4 className="font-bold text-lg mb-4 text-green-700 dark:text-green-400 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Điều chúng ta đang làm rất tốt:
            </h4>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-background p-4 rounded-lg">
                <Label className="font-semibold block mb-2">✨ Năng lượng & Sự Gắn kết:</Label>
                <Textarea 
                  rows={2}
                  placeholder="Nhập đánh giá..."
                  defaultValue="Tỷ lệ hiện diện 98% và số lượt 1-2-1 đạt mức tối thiểu cho thấy sự cam kết mạnh mẽ của Chapter. Đây là nền tảng vững chắc nhất của chúng ta."
                />
              </div>

              <div className="bg-white dark:bg-background p-4 rounded-lg">
                <Label className="font-semibold block mb-2">📚 Tinh thần Học tập:</Label>
                <Textarea 
                  rows={2}
                  placeholder="Nhập đánh giá..."
                  defaultValue="Việc vượt mục tiêu điểm đào tạo cho thấy chúng ta là một tập thể ham học hỏi, luôn nỗ lực để trở nên tốt hơn."
                />
              </div>

              <div className="bg-white dark:bg-background p-4 rounded-lg">
                <Label className="font-semibold block mb-2">🤝 Trải nghiệm Khách mời:</Label>
                <Textarea 
                  rows={2}
                  placeholder="Nhập đánh giá..."
                  defaultValue="Quy trình chăm sóc khách mời đang phát huy hiệu quả, bằng chứng là chúng ta đã có 1 hồ sơ tiềm năng được nộp ngay sau buổi họp."
                />
              </div>
            </div>
          </div>

          {/* Vấn đề cần tập trung */}
          <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-lg border-l-4 border-orange-500">
            <h4 className="font-bold text-lg mb-4 text-orange-700 dark:text-orange-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Vấn đề cần tập trung:
            </h4>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-background p-4 rounded-lg">
                <Label className="font-semibold block mb-2">📈 Tăng trưởng Sĩ số:</Label>
                <Textarea 
                  rows={2}
                  placeholder="Nhập phân tích..."
                  defaultValue="Chúng ta cần một cú hích mạnh mẽ để đạt được mục tiêu 75+ thành viên. Sức mạnh của tập thể đến từ sự đa dạng và quy mô."
                />
              </div>

              <div className="bg-white dark:bg-background p-4 rounded-lg">
                <Label className="font-semibold block mb-2">💎 Chất lượng Cơ hội Kinh doanh:</Label>
                <Textarea 
                  rows={2}
                  placeholder="Nhập phân tích..."
                  defaultValue='Số lượng referral rất tốt, nhưng chúng ta cần tập trung hơn nữa vào việc tìm kiếm những cơ hội kinh doanh "cấp 7-8", những cơ hội thực sự chất lượng và có khả năng chuyển đổi cao.'
                />
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* IV. KÊU GỌI HÀNH ĐỘNG TRỌNG TÂM TUẦN TỚI */}
      <Card className="shadow-lg border-bni-gold border-2 bg-gradient-to-r from-bni-gold/10 to-bni-red/10">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Target className="h-6 w-6 text-bni-red" />
            IV. KÊU GỌI HÀNH ĐỘNG TRỌNG TÂM TUẦN TỚI
          </CardTitle>
          <CardDescription className="text-base">
            Để khởi động Nhiệm kỳ XI một cách bùng nổ, tôi kêu gọi mỗi thành viên tập trung vào 2 hành động cụ thể sau
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <div className="bg-white dark:bg-background p-6 rounded-lg border-2 border-bni-red">
            <div className="flex items-start gap-3 mb-3">
              <Badge className="bg-bni-red text-lg px-3 py-1 shrink-0">Hành động 1</Badge>
              <Label className="font-bold text-lg">Mỗi thành viên mời 1 khách mời:</Label>
            </div>
            <Textarea 
              rows={3}
              placeholder="Nhập chi tiết hành động..."
              defaultValue="Tuần tới là Lễ Chuyển giao, một sự kiện rất đặc biệt. Hãy mời một khách mời chất lượng, đúng ngành nghề Chapter đang tìm kiếm, để họ cảm nhận được năng lượng và văn hóa của chúng ta. Đây là trách nhiệm của tất cả mọi người, không chỉ riêng Ban Khách mời."
            />
          </div>

          <div className="bg-white dark:bg-background p-6 rounded-lg border-2 border-bni-gold">
            <div className="flex items-start gap-3 mb-3">
              <Badge className="bg-bni-gold text-bni-black text-lg px-3 py-1 shrink-0">Hành động 2</Badge>
              <Label className="font-bold text-lg">Lên lịch 1-2-1 với Ban Điều hành mới:</Label>
            </div>
            <Textarea 
              rows={3}
              placeholder="Nhập chi tiết hành động..."
              defaultValue="Hãy chủ động đặt lịch 1-2-1 với các thành viên trong Ban Điều hành nhiệm kỳ mới. Hãy chia sẻ cho họ biết mục tiêu của bạn, mong muốn của bạn và bạn sẽ đóng góp gì cho Chapter. Sự thấu hiểu này sẽ là chất keo kết dính chúng ta trong 6 tháng tới."
            />
          </div>

        </CardContent>
      </Card>

      {/* Lời kết */}
      <Card className="shadow-lg border-bni-red border-2 bg-gradient-to-r from-bni-red/5 to-bni-gold/5">
        <CardContent className="pt-6">
          <Textarea 
            rows={2}
            className="text-lg font-semibold text-center bg-white dark:bg-background"
            placeholder="Nhập lời kết từ Chủ tịch..."
            defaultValue="Chúng ta là BNI Felix Chapter, một Chapter của sự hành động và hiệu quả. Hãy cùng nhau biến những mục tiêu trên thành hiện thực!"
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" size="lg">
          Hủy
        </Button>
        <Button className="bg-bni-gold text-bni-black hover:bg-bni-gold/90" size="lg">
          Xuất sang Trang tính
        </Button>
        <Button className="bg-bni-red hover:bg-bni-red/90 text-white" size="lg">
          <CheckCircle2 className="h-5 w-5 mr-2" />
          Lưu Báo cáo
        </Button>
      </div>
    </div>
  );
}
