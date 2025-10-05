import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Megaphone, CheckCircle2, Clock, FileText, TrendingUp, Users, Send } from "lucide-react";
import { useState } from "react";
import { useChapterData } from "@/contexts/ChapterDataContext";
import { toast } from "sonner";

export default function EventsCommunicationsReport() {
  const { chapterData, submitReport } = useChapterData();
  const [weekDate, setWeekDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b pb-6">
        <h1 className="text-4xl font-bold text-bni-red mb-2">
          Dashboard Báo Cáo Sự kiện & Truyền thông
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

      {/* I. LỊCH SỰ KIỆN & TRUYỀN THÔNG SẮP TỚI */}
      <Card className="shadow-lg border-bni-gold border-2">
        <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Calendar className="h-6 w-6 text-bni-red" />
            I. LỊCH SỰ KIỆN & TRUYỀN THÔNG SẮP TỚI
          </CardTitle>
          <CardDescription className="text-base">Tổng hợp lịch trình và trạng thái chuẩn bị</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-base">Ngày</TableHead>
                <TableHead className="font-bold text-base">Tên Sự kiện</TableHead>
                <TableHead className="font-bold text-base">Trạng thái Chuẩn bị</TableHead>
                <TableHead className="font-bold text-base">Trạng thái Truyền thông</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Input type="date" defaultValue="2025-10-07" className="w-40" />
                </TableCell>
                <TableCell>
                  <Input 
                    placeholder="Lễ Chuyển giao Ban Điều hành Nhiệm kỳ XI" 
                    className="font-semibold"
                    defaultValue="Lễ Chuyển giao Ban Điều hành Nhiệm kỳ XI"
                  />
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-500 flex items-center gap-1 w-fit">
                    <CheckCircle2 className="h-3 w-3" />
                    Hoàn thành
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-yellow-500 flex items-center gap-1 w-fit">
                    <Clock className="h-3 w-3" />
                    Đang diễn ra
                  </Badge>
                </TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell>
                  <Input type="month" defaultValue="2025-12" className="w-40" />
                </TableCell>
                <TableCell>
                  <Input 
                    placeholder="Gala Dinner & Business Matching Cuối năm" 
                    className="font-semibold"
                    defaultValue="Gala Dinner & Business Matching Cuối năm"
                  />
                </TableCell>
                <TableCell>
                  <Badge className="bg-yellow-500 flex items-center gap-1 w-fit">
                    <Clock className="h-3 w-3" />
                    Đang lên kế hoạch
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-gray-500 flex items-center gap-1 w-fit">
                    <FileText className="h-3 w-3" />
                    Chưa bắt đầu
                  </Badge>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Input type="month" defaultValue="2026-01" className="w-40" />
                </TableCell>
                <TableCell>
                  <Input 
                    placeholder="Workshop: Xây dựng Kế hoạch Kinh doanh 2026" 
                    className="font-semibold"
                    defaultValue="Workshop: Xây dựng Kế hoạch Kinh doanh 2026"
                  />
                </TableCell>
                <TableCell>
                  <Badge className="bg-gray-500 flex items-center gap-1 w-fit">
                    <FileText className="h-3 w-3" />
                    Chưa bắt đầu
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-gray-500 flex items-center gap-1 w-fit">
                    <FileText className="h-3 w-3" />
                    Chưa bắt đầu
                  </Badge>
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

      {/* II. CHI TIẾT KẾ HOẠCH & TIẾN ĐỘ */}
      <Card className="shadow-lg border-bni-red border-2">
        <CardHeader className="bg-gradient-to-r from-bni-gold/10 to-bni-red/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Calendar className="h-6 w-6 text-bni-red" />
            II. CHI TIẾT KẾ HOẠCH & TIẾN ĐỘ
          </CardTitle>
          <CardDescription className="text-base">Báo cáo chi tiết từng sự kiện</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          
          {/* 1. Sự kiện: Lễ Chuyển giao */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-bni-gold">
              <h3 className="text-xl font-bold text-bni-red">
                1. Sự kiện: Lễ Chuyển giao Ban Điều hành Nhiệm kỳ XI
              </h3>
              <Badge className="bg-green-500">07/10/2025</Badge>
            </div>

            {/* Báo cáo Ban Sự kiện */}
            <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Báo cáo Ban Sự kiện:
              </h4>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-background p-4 rounded-lg">
                  <Label className="font-semibold block mb-2">Địa điểm & Thời gian:</Label>
                  <Textarea 
                    rows={2}
                    placeholder="Nhập thông tin địa điểm và thời gian..."
                    defaultValue="Đã chốt, thông tin đã được gửi tới thành viên."
                  />
                </div>

                <div className="bg-white dark:bg-background p-4 rounded-lg">
                  <Label className="font-semibold block mb-2">Kịch bản chương trình:</Label>
                  <Textarea 
                    rows={2}
                    placeholder="Nhập thông tin kịch bản..."
                    defaultValue="Đã hoàn thiện và duyệt lần cuối."
                  />
                </div>

                <div className="bg-white dark:bg-background p-4 rounded-lg">
                  <Label className="font-semibold block mb-2">Nhân sự & Phân công:</Label>
                  <Textarea 
                    rows={2}
                    placeholder="Nhập thông tin phân công nhân sự..."
                    defaultValue="Đã phân công nhiệm vụ cho các vị trí hỗ trợ."
                  />
                </div>

                <div className="bg-white dark:bg-background p-4 rounded-lg border-2 border-green-500">
                  <Label className="font-semibold block mb-2">Tình trạng:</Label>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500 text-lg px-4 py-2">HOÀN TẤT CHUẨN BỊ</Badge>
                    <Input 
                      placeholder="Mọi công tác hậu cần đã sẵn sàng." 
                      className="flex-1"
                      defaultValue="Mọi công tác hậu cần đã sẵn sàng."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Báo cáo Ban Truyền thông */}
            <div className="bg-purple-50 dark:bg-purple-950/20 p-6 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-purple-600" />
                Báo cáo Ban Truyền thông:
              </h4>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-background p-4 rounded-lg">
                  <Label className="font-semibold block mb-3">Trước sự kiện:</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500 shrink-0">HOÀN THÀNH</Badge>
                      <Input 
                        placeholder="Hoạt động..."
                        defaultValue="Gửi email mời và poster chính thức tới toàn bộ thành viên."
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-500 shrink-0">ĐANG TIẾN HÀNH</Badge>
                      <Input 
                        placeholder="Hoạt động..."
                        defaultValue='Thực hiện chuỗi bài đăng "Nhìn lại Nhiệm kỳ X" trên fanpage.'
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500 shrink-0">HOÀN THÀNH</Badge>
                      <Input 
                        placeholder="Hoạt động..."
                        defaultValue="Thiết kế và gửi thư mời online cho khách mời của thành viên."
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-background p-4 rounded-lg">
                  <Label className="font-semibold block mb-3">Trong và Sau sự kiện:</Label>
                  <Textarea 
                    rows={3}
                    placeholder="Nhập kế hoạch truyền thông trong và sau sự kiện..."
                    defaultValue="- Lên kế hoạch Livestream phần Lễ chuyển giao quan trọng.&#10;- Tổng hợp hình ảnh và đăng bài recap sự kiện trong vòng 24h."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Sự kiện: Gala Dinner */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-bni-gold">
              <h3 className="text-xl font-bold text-bni-red">
                2. Sự kiện: Gala Dinner & Business Matching Cuối năm
              </h3>
              <Badge className="bg-yellow-500">Dự kiến Tháng 12/2025</Badge>
            </div>

            {/* Báo cáo Ban Sự kiện */}
            <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Báo cáo Ban Sự kiện:
              </h4>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-background p-4 rounded-lg">
                  <Label className="font-semibold block mb-2">Mục tiêu:</Label>
                  <Textarea 
                    rows={2}
                    placeholder="Nhập mục tiêu sự kiện..."
                    defaultValue="Tạo không gian kết nối kinh doanh trang trọng, tổng kết năm và vinh danh thành viên."
                  />
                </div>

                <div className="bg-white dark:bg-background p-4 rounded-lg">
                  <Label className="font-semibold block mb-3">Tiến độ:</Label>
                  <Textarea 
                    rows={4}
                    placeholder="Nhập tiến độ chuẩn bị..."
                    defaultValue="- Đã lên ý tưởng và chủ đề chính.&#10;- Đang trong quá trình khảo sát 3 địa điểm tiềm năng.&#10;- Dự kiến ngân sách và bắt đầu lên kế hoạch kêu gọi tài trợ."
                  />
                </div>

                <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border-l-4 border-orange-500">
                  <Label className="font-semibold block mb-2 text-orange-700 dark:text-orange-400">
                    Cần hỗ trợ:
                  </Label>
                  <Textarea 
                    rows={2}
                    className="bg-white dark:bg-background"
                    placeholder="Nhập yêu cầu hỗ trợ..."
                    defaultValue="Các thành viên có mối quan hệ với các trung tâm hội nghị, nhà hàng lớn vui lòng kết nối với Ban Sự kiện."
                  />
                </div>
              </div>
            </div>

            {/* Báo cáo Ban Truyền thông */}
            <div className="bg-purple-50 dark:bg-purple-950/20 p-6 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-purple-600" />
                Báo cáo Ban Truyền thông:
              </h4>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-background p-4 rounded-lg">
                  <Label className="font-semibold block mb-2">Kế hoạch:</Label>
                  <Textarea 
                    rows={2}
                    placeholder="Nhập kế hoạch truyền thông tổng thể..."
                    defaultValue="Sẽ khởi động chiến dịch truyền thông 6 tuần trước sự kiện."
                  />
                </div>

                <div className="bg-white dark:bg-background p-4 rounded-lg">
                  <Label className="font-semibold block mb-3">Giai đoạn 1 (Lên ý tưởng):</Label>
                  <Textarea 
                    rows={2}
                    placeholder="Nhập hoạt động giai đoạn 1..."
                    defaultValue="Đang thiết kế bộ nhận diện (logo, theme) cho sự kiện."
                  />
                </div>

                <div className="bg-white dark:bg-background p-4 rounded-lg">
                  <Label className="font-semibold block mb-3">Giai đoạn 2 (Truyền thông sớm):</Label>
                  <Textarea 
                    rows={2}
                    placeholder="Nhập hoạt động giai đoạn 2..."
                    defaultValue='Sẽ tung "Save the Date" và các gói tài trợ vào đầu tháng 11.'
                  />
                </div>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* III. HOẠT ĐỘNG TRUYỀN THÔNG THƯỜNG XUYÊN */}
      <Card className="shadow-lg border-bni-gold border-2">
        <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-bni-red" />
            III. HOẠT ĐỘNG TRUYỀN THÔNG THƯỜNG XUYÊN
          </CardTitle>
          <CardDescription className="text-base">Các hoạt động truyền thông định kỳ và hiệu quả</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          
          {/* Thành viên của Tuần */}
          <div className="bg-gradient-to-r from-bni-gold/20 to-bni-red/20 p-6 rounded-lg border-2 border-bni-gold">
            <Label className="font-bold text-lg block mb-3">Thành viên của Tuần:</Label>
            <Textarea 
              rows={2}
              className="bg-white dark:bg-background"
              placeholder="Nhập thông tin về series vinh danh thành viên..."
              defaultValue="Series bài viết vinh danh thành viên trên fanpage đang nhận được sự tương tác rất tốt."
            />
          </div>

          {/* Bản tin Chapter */}
          <div className="bg-white dark:bg-background p-6 rounded-lg border-2 border-blue-500">
            <Label className="font-bold text-lg block mb-3">Bản tin Chapter:</Label>
            <Textarea 
              rows={2}
              placeholder="Nhập thông tin về bản tin..."
              defaultValue="Bản tin email tổng hợp hoạt động tháng 9 sẽ được gửi vào cuối tuần này."
            />
          </div>

          {/* Hiệu quả Fanpage */}
          <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border-l-4 border-green-500">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Hiệu quả Fanpage (7 ngày qua):
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white dark:bg-background p-4 rounded-lg border">
                <Label className="font-semibold block mb-2">Lượt tiếp cận bài viết:</Label>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="15" className="text-2xl font-bold w-24" defaultValue="15" />
                  <span className="text-2xl font-bold">%</span>
                  <Badge className="bg-green-500">Tăng</Badge>
                </div>
              </div>

              <div className="bg-white dark:bg-background p-4 rounded-lg border">
                <Label className="font-semibold block mb-2">Lượt tương tác:</Label>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="20" className="text-2xl font-bold w-24" defaultValue="20" />
                  <span className="text-2xl font-bold">%</span>
                  <Badge className="bg-green-500">Tăng</Badge>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                📊 Hành động đề xuất:
              </p>
              <Textarea 
                rows={2}
                className="bg-white dark:bg-background"
                defaultValue="Khuyến khích tất cả thành viên tích cực chia sẻ các bài đăng từ fanpage của Chapter để lan tỏa hình ảnh của chúng ta mạnh mẽ hơn."
              />
            </div>
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
            const eventsLead = chapterData.leadership.find(l => l.role === 'Ban Sự kiện')?.name || '';
            const commsLead = chapterData.leadership.find(l => l.role === 'Ban Truyền thông')?.name || '';
            submitReport('eventsCommunications', `${eventsLead} & ${commsLead}`);
            toast.success('Báo cáo đã hoàn thành', {
              description: 'Báo cáo Sự kiện & Truyền thông đã được gửi và đồng bộ real-time lên Tổng quan',
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
