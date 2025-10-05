import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, DollarSign, Calendar, GraduationCap, CheckCircle2, AlertCircle, Award, Send } from "lucide-react";
import { useState } from "react";
import { useChapterData } from "@/contexts/ChapterDataContext";
import { toast } from "sonner";

export default function SecretaryTrainingReport() {
  const { chapterData, submitReport } = useChapterData();
  const [weekDate, setWeekDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b pb-6">
        <h1 className="text-4xl font-bold text-bni-red mb-2">
          Dashboard Báo Cáo Thư ký & Đào tạo
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

      {/* II. TỔNG QUAN HÀNH CHÍNH & TÀI CHÍNH */}
      <Card className="shadow-lg border-bni-gold border-2">
        <CardHeader className="bg-gradient-to-r from-bni-gold/10 to-bni-red/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <FileText className="h-6 w-6 text-bni-red" />
            II. TỔNG QUAN HÀNH CHÍNH & TÀI CHÍNH
          </CardTitle>
          <CardDescription className="text-base">Báo cáo Tổng Thư ký</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          
          {/* 1. Tình hình Gia hạn Thành viên */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-bni-red" />
              1. Tình hình Gia hạn Thành viên
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <p className="font-semibold mb-4">Thành viên cần gia hạn trong 90 ngày tới:</p>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-background p-4 rounded-lg border-l-4 border-orange-500">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="font-semibold text-base">Tháng 10/2025:</Label>
                    <Badge className="bg-orange-500">Sắp đến hạn</Badge>
                  </div>
                  <Input type="number" placeholder="2 thành viên" className="text-lg font-semibold" defaultValue="2" />
                  <p className="text-sm text-muted-foreground mt-2">thành viên cần gia hạn</p>
                </div>

                <div className="bg-white dark:bg-background p-4 rounded-lg border-l-4 border-yellow-500">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="font-semibold text-base">Tháng 11/2025:</Label>
                    <Badge className="bg-yellow-500">Chuẩn bị</Badge>
                  </div>
                  <Input type="number" placeholder="3 thành viên" className="text-lg font-semibold" defaultValue="3" />
                  <p className="text-sm text-muted-foreground mt-2">thành viên cần gia hạn</p>
                </div>

                <div className="bg-white dark:bg-background p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="font-semibold text-base">Tháng 12/2025:</Label>
                    <Badge className="bg-blue-500">Theo dõi</Badge>
                  </div>
                  <Input type="number" placeholder="2 thành viên" className="text-lg font-semibold" defaultValue="2" />
                  <p className="text-sm text-muted-foreground mt-2">thành viên cần gia hạn</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Thông tin Phí và Tài khoản */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-bni-red" />
              2. Thông tin Phí và Tài khoản
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phí Gia nhập */}
                <div className="bg-white dark:bg-background p-6 rounded-lg border-2 border-green-500">
                  <h4 className="font-bold text-lg mb-4 text-green-700 dark:text-green-400">Phí Gia nhập</h4>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm text-muted-foreground">1 năm:</Label>
                      <Input 
                        placeholder="17.027.280 VNĐ" 
                        className="text-xl font-bold mt-1" 
                        defaultValue="17.027.280 VNĐ"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">2 năm:</Label>
                      <Input 
                        placeholder="29.239.056 VNĐ" 
                        className="text-xl font-bold mt-1" 
                        defaultValue="29.239.056 VNĐ"
                      />
                    </div>
                  </div>
                </div>

                {/* Phí Tái Gia nhập */}
                <div className="bg-white dark:bg-background p-6 rounded-lg border-2 border-blue-500">
                  <h4 className="font-bold text-lg mb-4 text-blue-700 dark:text-blue-400">Phí Tái Gia nhập</h4>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm text-muted-foreground">1 năm:</Label>
                      <Input 
                        placeholder="14.867.280 VNĐ" 
                        className="text-xl font-bold mt-1" 
                        defaultValue="14.867.280 VNĐ"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">2 năm:</Label>
                      <Input 
                        placeholder="27.079.056 VNĐ" 
                        className="text-xl font-bold mt-1" 
                        defaultValue="27.079.056 VNĐ"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Thông báo */}
              <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border-l-4 border-red-500">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-red-900 dark:text-red-300 mb-2">
                      Thông báo quan trọng:
                    </p>
                    <Textarea 
                      rows={2}
                      className="bg-white dark:bg-background"
                      defaultValue="Các thành viên trong danh sách gia hạn vui lòng hoàn tất thủ tục trước ngày 15 hàng tháng để tránh bị trễ hạn."
                    />
                  </div>
                </div>
              </div>

              {/* Thông báo hành chính khác */}
              <div className="bg-white dark:bg-background p-4 rounded-lg border">
                <Label className="font-semibold text-base mb-2 block">Các thông báo hành chính khác:</Label>
                <Textarea 
                  rows={3}
                  placeholder="Nhập các thông báo, quy định, chính sách quan trọng của BNI..."
                />
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* III. TỔNG QUAN PHÁT TRIỂN NĂNG LỰC */}
      <Card className="shadow-lg border-bni-red border-2">
        <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-bni-red" />
            III. TỔNG QUAN PHÁT TRIỂN NĂNG LỰC
          </CardTitle>
          <CardDescription className="text-base">Báo cáo Ban Đào tạo</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          
          {/* Hiệu suất Đào tạo */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Award className="h-5 w-5 text-bni-red" />
              Hiệu suất Đào tạo
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg space-y-6">
              
              {/* Tháng báo cáo */}
              <div className="bg-white dark:bg-background p-4 rounded-lg border">
                <Label className="font-semibold text-base mb-2 block">Tháng báo cáo:</Label>
                <Input type="month" defaultValue="2025-08" className="text-lg" />
              </div>

              {/* Các chỉ số */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-background p-6 rounded-lg border-2 border-bni-gold">
                  <Label className="font-semibold text-base block mb-2">Tổng điểm CEU Chapter:</Label>
                  <Input 
                    type="number" 
                    placeholder="486" 
                    className="text-3xl font-bold text-center" 
                    defaultValue="486"
                  />
                  <p className="text-sm text-muted-foreground mt-2 text-center">điểm</p>
                </div>

                <div className="bg-white dark:bg-background p-6 rounded-lg border-2 border-green-500">
                  <Label className="font-semibold text-base block mb-2">Mục tiêu tối thiểu:</Label>
                  <Input 
                    type="number" 
                    placeholder="344" 
                    className="text-3xl font-bold text-center" 
                    defaultValue="344"
                  />
                  <p className="text-sm text-muted-foreground mt-2 text-center">điểm</p>
                </div>

                <div className="bg-white dark:bg-background p-6 rounded-lg border-2 border-blue-500">
                  <Label className="font-semibold text-base block mb-2">Mục tiêu tối đa:</Label>
                  <Input 
                    type="number" 
                    placeholder="544" 
                    className="text-3xl font-bold text-center" 
                    defaultValue="544"
                  />
                  <p className="text-sm text-muted-foreground mt-2 text-center">điểm</p>
                </div>
              </div>

              {/* Thành viên xuất sắc */}
              <div className="bg-gradient-to-r from-bni-gold/20 to-bni-red/20 p-6 rounded-lg border-2 border-bni-gold">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-6 w-6 text-bni-gold" />
                  <Label className="font-bold text-lg">Thành viên xuất sắc nhất:</Label>
                </div>
                <Input 
                  placeholder="Mrs. Đoàn Thị Ánh Khuyên" 
                  className="text-xl font-semibold bg-white dark:bg-background" 
                  defaultValue="Mrs. Đoàn Thị Ánh Khuyên"
                />
              </div>

              {/* Tỷ lệ hoàn thành */}
              <div className="bg-white dark:bg-background p-6 rounded-lg border">
                <Label className="font-semibold text-base block mb-3">Tỷ lệ hoàn thành đào tạo bắt buộc:</Label>
                <div className="flex items-center gap-4">
                  <Input 
                    type="number" 
                    placeholder="85" 
                    className="text-2xl font-bold w-32" 
                    defaultValue="85"
                  />
                  <span className="text-2xl font-bold">%</span>
                  <Badge className="bg-green-500 text-lg px-4 py-2">Đạt mục tiêu</Badge>
                </div>
              </div>

              {/* Lịch đào tạo sắp tới */}
              <div className="bg-white dark:bg-background p-4 rounded-lg border">
                <Label className="font-semibold text-base mb-2 block">Lịch Đào tạo sắp tới:</Label>
                <Textarea 
                  rows={4}
                  placeholder="Nhập danh sách các khóa học, workshop sắp diễn ra..."
                  defaultValue="- Khóa học 'Kỹ năng trình bày 30 giây hiệu quả' - Tuần sau&#10;- Workshop 'Networking trong thời đại số' - 15/10/2025&#10;- Training 'Givers Gain - Triết lý cho là nhận' - 22/10/2025"
                />
              </div>

              {/* Phân tích & Đề xuất */}
              <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border-l-4 border-purple-500">
                <p className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                  📊 Phân tích & Hành động đề xuất:
                </p>
                <Textarea 
                  rows={3}
                  className="bg-white dark:bg-background"
                  defaultValue="Chapter đã đạt và vượt mục tiêu điểm đào tạo trong tháng. Ban Đào tạo sẽ gửi thông tin về khóa học 'Kỹ năng trình bày 30 giây hiệu quả' vào tuần tới, khuyến khích các thành viên tham gia để tối ưu hóa bài giới thiệu hàng tuần."
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
            submitReport('secretaryTraining', chapterData.leadership.find(l => l.role === 'Tổng Thư ký')?.name || 'Thư ký');
            toast.success('Báo cáo đã hoàn thành', {
              description: 'Báo cáo Thư ký & Đào tạo đã được gửi và đồng bộ real-time lên Tổng quan',
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
