import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, CheckCircle2, Clock, MessageSquare, TrendingUp, AlertCircle, FileCheck, Send } from "lucide-react";
import { useState } from "react";
import { useChapterData } from "@/contexts/ChapterDataContext";
import { toast } from "sonner";

export default function VisitorsReport() {
  const { chapterData, submitReport } = useChapterData();
  const [meetingDate, setMeetingDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b pb-6">
        <h1 className="text-4xl font-bold text-bni-red mb-2">
          Dashboard Báo Cáo Ban Khách mời
        </h1>
        <div className="flex items-center gap-4 mt-4">
          <Label className="font-semibold">Cập nhật cho Buổi họp ngày:</Label>
          <Input 
            type="date" 
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            className="w-auto"
          />
        </div>
      </div>

      {/* I. TỔNG QUAN HOẠT ĐỘNG KHÁCH MỜI */}
      <Card className="shadow-lg border-bni-gold border-2">
        <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <UserPlus className="h-6 w-6 text-bni-red" />
            I. TỔNG QUAN HOẠT ĐỘNG KHÁCH MỜI
          </CardTitle>
          <CardDescription className="text-base">Thống kê và so sánh theo tuần</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-base">Chỉ số</TableHead>
                <TableHead className="font-bold text-base text-center">Tuần này (30/09)</TableHead>
                <TableHead className="font-bold text-base text-center">Tuần trước</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Số lượng Khách mời tham dự</TableCell>
                <TableCell className="text-center">
                  <Input type="number" placeholder="0" className="w-24 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <Input type="number" placeholder="4" className="w-24 mx-auto" defaultValue="4" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Số lượng Khách mời tiềm năng nộp hồ sơ</TableCell>
                <TableCell className="text-center">
                  <Input type="number" placeholder="0" className="w-24 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <Input type="number" placeholder="1" className="w-24 mx-auto" defaultValue="1" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-end">
            <Button className="bg-bni-gold text-bni-black hover:bg-bni-gold/90">
              Xuất sang Trang tính
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* II. CHI TIẾT QUY TRÌNH CHĂM SÓC KHÁCH MỜI */}
      <Card className="shadow-lg border-bni-red border-2">
        <CardHeader className="bg-gradient-to-r from-bni-gold/10 to-bni-red/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-bni-red" />
            II. CHI TIẾT QUY TRÌNH CHĂM SÓC KHÁCH MỜI
          </CardTitle>
          <CardDescription className="text-base">Báo cáo tuần trước - Quy trình 3 giai đoạn</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          
          {/* 1. Hoạt động TRƯỚC buổi họp */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 pb-2 border-b-2 border-bni-gold">
              <Clock className="h-5 w-5 text-bni-red" />
              1. Hoạt động TRƯỚC buổi họp
            </h3>
            
            <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg space-y-4">
              <div>
                <Label className="font-bold text-lg mb-3 block">Mời và xác nhận:</Label>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-background p-4 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-green-500 shrink-0 mt-1">HOÀN THÀNH</Badge>
                      <Textarea 
                        rows={2}
                        className="flex-1"
                        placeholder="Nhập hoạt động..."
                        defaultValue="100% khách mời đã được liên hệ xác nhận tham dự 24h trước buổi họp."
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-background p-4 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-green-500 shrink-0 mt-1">HOÀN THÀNH</Badge>
                      <Textarea 
                        rows={2}
                        className="flex-1"
                        placeholder="Nhập hoạt động..."
                        defaultValue="Thông tin chi tiết về buổi họp đã được gửi qua email/Zalo."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="font-bold text-lg mb-3 block">Chuẩn bị:</Label>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-background p-4 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-green-500 shrink-0 mt-1">HOÀN THÀNH</Badge>
                      <Textarea 
                        rows={2}
                        className="flex-1"
                        placeholder="Nhập hoạt động..."
                        defaultValue="Bảng tên, tài liệu giới thiệu về BNI Felix Chapter đã được chuẩn bị sẵn sàng."
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-background p-4 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-green-500 shrink-0 mt-1">HOÀN THÀNH</Badge>
                      <Textarea 
                        rows={2}
                        className="flex-1"
                        placeholder="Nhập hoạt động..."
                        defaultValue="Ban Khách mời đã họp nhanh 15 phút trước giờ G để phân công nhiệm vụ."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Hoạt động TRONG buổi họp */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 pb-2 border-b-2 border-bni-gold">
              <UserPlus className="h-5 w-5 text-bni-red" />
              2. Hoạt động TRONG buổi họp
            </h3>
            
            <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg space-y-4">
              <div>
                <Label className="font-bold text-lg mb-3 block">Đón tiếp:</Label>
                <div className="bg-white dark:bg-background p-4 rounded-lg">
                  <Textarea 
                    rows={3}
                    placeholder="Nhập hoạt động đón tiếp..."
                    defaultValue="4/4 khách mời được chào đón ngay tại cửa và được giới thiệu với ít nhất 3 thành viên trong Ban Điều hành và Power Team liên quan."
                  />
                </div>
              </div>

              <div>
                <Label className="font-bold text-lg mb-3 block">Định hướng & Hỗ trợ:</Label>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-background p-4 rounded-lg">
                    <Textarea 
                      rows={2}
                      placeholder="Nhập hoạt động..."
                      defaultValue="Mỗi khách mời đều có một thành viên trong Ban Khách mời ngồi cạnh để giải thích về các phần của buổi họp."
                    />
                  </div>
                  <div className="bg-white dark:bg-background p-4 rounded-lg">
                    <Textarea 
                      rows={2}
                      placeholder="Nhập hoạt động..."
                      defaultValue="Tất cả các câu hỏi của khách mời đều được giải đáp kịp thời."
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="font-bold text-lg mb-3 block">Thu thập Phản hồi:</Label>
                <div className="bg-white dark:bg-background p-4 rounded-lg mb-3">
                  <Textarea 
                    rows={2}
                    placeholder="Nhập thông tin thu thập phản hồi..."
                    defaultValue="100% khách mời đã chia sẻ cảm nhận cuối buổi họp."
                  />
                </div>

                <div className="bg-gradient-to-r from-bni-gold/20 to-bni-red/20 p-4 rounded-lg border-2 border-bni-gold">
                  <Label className="font-bold text-base mb-3 block flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-bni-gold" />
                    Phản hồi nổi bật:
                  </Label>
                  <Textarea 
                    rows={5}
                    className="bg-white dark:bg-background"
                    placeholder="Nhập phản hồi nổi bật từ khách mời..."
                    defaultValue='"Tôi rất ấn tượng với phần các thành viên trao cơ hội kinh doanh cho nhau, rất thực tế và hiệu quả."&#10;&#10;"Không khí buổi họp rất năng lượng và chuyên nghiệp."&#10;&#10;"Phần trình bày 30 giây của các thành viên giúp tôi nhanh chóng nắm bắt được rất nhiều ngành nghề."'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Hoạt động SAU buổi họp */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 pb-2 border-b-2 border-bni-gold">
              <TrendingUp className="h-5 w-5 text-bni-red" />
              3. Hoạt động SAU buổi họp
            </h3>
            
            <div className="bg-purple-50 dark:bg-purple-950/20 p-6 rounded-lg space-y-4">
              <div>
                <Label className="font-bold text-lg mb-3 block">Theo dõi (Follow-up):</Label>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-background p-4 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-green-500 shrink-0 mt-1">HOÀN THÀNH</Badge>
                      <Textarea 
                        rows={2}
                        className="flex-1"
                        placeholder="Nhập hoạt động..."
                        defaultValue="Email/tin nhắn cảm ơn đã được gửi đến tất cả khách mời trong vòng 24h."
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-background p-4 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-green-500 shrink-0 mt-1">HOÀN THÀNH</Badge>
                      <Textarea 
                        rows={2}
                        className="flex-1"
                        placeholder="Nhập hoạt động..."
                        defaultValue="Các thành viên mời khách đã được nhắc nhở để tiếp tục chăm sóc mối quan hệ."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="font-bold text-lg mb-3 block">Tình hình Chuyển đổi:</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-background p-4 rounded-lg border">
                    <Label className="font-semibold block mb-2">Số khách mời bày tỏ quan tâm gia nhập:</Label>
                    <Input type="number" placeholder="2" className="text-2xl font-bold" defaultValue="2" />
                  </div>

                  <div className="bg-white dark:bg-background p-4 rounded-lg border">
                    <Label className="font-semibold block mb-2">Số khách mời đã nhận hồ sơ đăng ký:</Label>
                    <Input type="number" placeholder="2" className="text-2xl font-bold" defaultValue="2" />
                  </div>

                  <div className="bg-white dark:bg-background p-4 rounded-lg border-2 border-green-500">
                    <Label className="font-semibold block mb-2">Số hồ sơ đã nộp về Ban Thành viên:</Label>
                    <Input type="number" placeholder="1" className="text-2xl font-bold" defaultValue="1" />
                  </div>

                  <div className="bg-white dark:bg-background p-4 rounded-lg border-2 border-yellow-500">
                    <Label className="font-semibold block mb-2">Số hồ sơ đang chờ hoàn thiện:</Label>
                    <Input type="number" placeholder="1" className="text-2xl font-bold" defaultValue="1" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* III. PHÂN TÍCH & HÀNH ĐỘNG ĐỀ XUẤT */}
      <Card className="shadow-lg border-bni-gold border-2">
        <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-bni-red" />
            III. PHÂN TÍCH & HÀNH ĐỘNG ĐỀ XUẤT
          </CardTitle>
          <CardDescription className="text-base">Đánh giá và kế hoạch cải thiện</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          
          <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border-l-4 border-green-500">
            <Label className="font-bold text-lg mb-3 block text-green-700 dark:text-green-400">
              ✅ Điểm mạnh:
            </Label>
            <Textarea 
              rows={2}
              className="bg-white dark:bg-background"
              placeholder="Nhập điểm mạnh..."
              defaultValue="Quy trình đón tiếp và chăm sóc trong buổi họp đang được thực hiện rất tốt, tạo thiện cảm cao."
            />
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-lg border-l-4 border-orange-500">
            <Label className="font-bold text-lg mb-3 block text-orange-700 dark:text-orange-400">
              ⚠️ Điểm cần cải thiện:
            </Label>
            <Textarea 
              rows={3}
              className="bg-white dark:bg-background"
              placeholder="Nhập điểm cần cải thiện..."
              defaultValue='Cần tạo một bộ tài liệu "Cẩm nang dành cho Khách mời" ngắn gọn, gửi trước cho khách để họ không bị bỡ ngỡ với các thuật ngữ như "Referral", "1-2-1", "Thank You Note".'
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border-l-4 border-blue-500">
            <Label className="font-bold text-lg mb-3 block text-blue-700 dark:text-blue-400">
              🎯 Hành động tuần tới:
            </Label>
            <Textarea 
              rows={4}
              className="bg-white dark:bg-background"
              placeholder="Nhập kế hoạch hành động..."
              defaultValue='- Ban Khách mời sẽ soạn thảo "Cẩm nang Khách mời" và trình duyệt.&#10;&#10;- Phối hợp với Ban Truyền thông để làm một video ngắn 1 phút giới thiệu về một buổi họp của Chapter để gửi cho khách mời tiềm năng.'
            />
          </div>

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
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="lg">
          <CheckCircle2 className="h-5 w-5 mr-2" />
          Lưu Báo cáo
        </Button>
        <Button 
          className="bg-bni-red hover:bg-bni-red/90 text-white" 
          size="lg"
          onClick={() => {
            submitReport('visitors', chapterData.leadership.find(l => l.role === 'Ban Khách mời')?.name || 'Ban Khách mời');
            toast.success('Báo cáo đã hoàn thành', {
              description: 'Báo cáo Khách mời đã được gửi và đồng bộ real-time lên Tổng quan',
              duration: 5000,
            });
          }}
        >
          <Send className="h-5 w-5 mr-2" />
          Báo cáo
        </Button>
      </div>
    </div>
  );
}
