import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Users, TrendingUp, Target, Award, Calendar, 
  UserCheck, MessageSquare, Trophy, AlertCircle,
  CheckCircle2, Download, Crown
} from "lucide-react";

const ExecutiveOverview = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Crown className="h-10 w-10 text-bni-gold" />
            TỔNG QUAN ĐIỀU HÀNH BNI FELIX CHAPTER
          </h1>
          <p className="text-muted-foreground mt-2">
            Nhiệm kỳ XI (01/10/2025 – 31/3/2026) | Cập nhật Real-time: 30/09/2025
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Xuất sang Trang tính
        </Button>
      </div>

      {/* I. Organization Chart & Strategic Objectives */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-bni-red">I. SƠ ĐỒ TỔ CHỨC & MỤC TIÊU CHIẾN LƯỢC</h2>
        
        {/* Leadership Structure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-bni-gold" />
              Sơ đồ Ban Lãnh đạo (LT) Nhiệm kỳ XI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* President */}
              <div className="p-4 border-2 border-bni-gold rounded-lg bg-bni-gold/5">
                <div className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-bni-gold" />
                  <span className="font-semibold">Chủ tịch:</span>
                  <span className="font-bold text-bni-red">Mrs. Đoàn Thị Ánh Khuyên</span>
                </div>
              </div>

              {/* Vice President & Secretary */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-card">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-bni-red" />
                    <span className="font-semibold">Phó Chủ tịch:</span>
                    <span className="font-bold">Mr. Lý Hoàng Hải</span>
                  </div>
                </div>
                <div className="p-4 border rounded-lg bg-card">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-bni-red" />
                    <span className="font-semibold">Tổng Thư ký:</span>
                    <span className="font-bold">Ms. Lưu Thị Châu</span>
                  </div>
                </div>
              </div>

              {/* Department Heads */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Trưởng các Ban:</h4>
                
                {/* Members Team */}
                <div className="p-3 border rounded-lg bg-card">
                  <div className="font-semibold mb-2">🔹 Trưởng Ban Thành viên: Mrs. Lê Thị Lan</div>
                  <div className="ml-4 space-y-1 text-sm">
                    <div>• PT Chất lượng Thành viên: Mr. Nguyễn Sơn Tùng</div>
                    <div>• PT Gắn kết Thành viên: Ms. Nguyễn Thị Hiền Giang</div>
                    <div>• PT Mối quan hệ Thành viên: Mrs. Lê Thị Phượng</div>
                    <div>• PT Xây dựng Chapter: Mr. Phạm Ngọc Tuấn</div>
                  </div>
                </div>

                {/* Visitors Team */}
                <div className="p-3 border rounded-lg bg-card">
                  <div className="font-semibold mb-2">🔹 Trưởng Ban Khách mời: Ms. Nguyễn Thị Mến</div>
                  <div className="ml-4 space-y-1 text-sm">
                    <div>• Đón tiếp & Hỗ trợ: Mr. Nguyễn Đăng Cương, Mrs. Hà Thị Hạnh</div>
                  </div>
                </div>

                {/* Other Teams */}
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="p-3 border rounded-lg bg-card">
                    <div className="font-semibold">🔹 Trưởng Ban Đào tạo</div>
                    <div className="text-sm">Mrs. Đào Thị Thanh Trà</div>
                  </div>
                  <div className="p-3 border rounded-lg bg-card">
                    <div className="font-semibold">🔹 Trưởng Ban Sự kiện</div>
                    <div className="text-sm">Mr. Lê Ngọc Minh</div>
                  </div>
                  <div className="p-3 border rounded-lg bg-card">
                    <div className="font-semibold">🔹 Trưởng Ban Truyền thông</div>
                    <div className="text-sm">Ms. Phùng Trang Linh</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Objectives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-bni-gold" />
              Các Mục tiêu Trọng tâm Nhiệm kỳ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hạng mục</TableHead>
                  <TableHead>Mục tiêu</TableHead>
                  <TableHead>Tiến độ Real-time</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold">Doanh thu Nhiệm kỳ</TableCell>
                  <TableCell className="font-bold text-lg">33 Tỷ VNĐ</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="font-semibold">1.23 Tỷ VNĐ</div>
                      <Progress value={3.7} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-500/10 text-green-700 border-green-200">
                      🟩 Bắt đầu tốt
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Sĩ số Thành viên</TableCell>
                  <TableCell className="font-bold text-lg">75+</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="font-semibold">42</div>
                      <Progress value={56} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                      🟨 Đang phát triển
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Tỷ lệ Hiện diện</TableCell>
                  <TableCell className="font-bold text-lg">98%</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="font-semibold">98%</div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-500/10 text-green-700 border-green-200">
                      <CheckCircle2 className="h-4 w-4 mr-1 inline" />
                      Đạt mục tiêu
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Tỷ lệ TV KPI Xanh</TableCell>
                  <TableCell className="font-bold text-lg">50%</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="font-semibold">50%</div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-500/10 text-green-700 border-green-200">
                      <CheckCircle2 className="h-4 w-4 mr-1 inline" />
                      Đạt mục tiêu
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* II. Real-Time Performance Dashboard */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-bni-red">II. BẢNG ĐIỀU KHIỂN HIỆU SUẤT (REAL-TIME PERFORMANCE)</h2>
        
        {/* Business Performance */}
        <Card>
          <CardHeader>
            <CardTitle>1. Hiệu suất Kinh doanh & Kết nối (Tháng 8 & Tuần qua)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Transaction Value */}
            <div>
              <h4 className="font-semibold mb-2">Giá trị Giao dịch (Thank You Note) Tháng 8:</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mục tiêu Tháng: ~5.5 Tỷ</span>
                  <span className="font-bold">Thực tế: 1.23 Tỷ</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={22.4} className="h-3 flex-1" />
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700">
                    🟨 22%
                  </Badge>
                </div>
              </div>
            </div>

            {/* Referrals */}
            <div>
              <h4 className="font-semibold mb-2">Cơ hội Kinh doanh (Referrals) Tháng 8:</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mục tiêu Tháng: 258 - 408</span>
                  <span className="font-bold">Thực tế: 103</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={25.2} className="h-3 flex-1" />
                  <Badge variant="outline" className="bg-red-500/10 text-red-700">
                    🔴 25%
                  </Badge>
                </div>
              </div>
            </div>

            {/* 1-2-1 Meetings */}
            <div>
              <h4 className="font-semibold mb-2">Số lượt 1-2-1 Tháng 8:</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mục tiêu Tháng: 344 - 544</span>
                  <span className="font-bold">Thực tế: 344</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={63.2} className="h-3 flex-1" />
                  <Badge variant="outline" className="bg-green-500/10 text-green-700">
                    🟢 Đạt mức tối thiểu
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Meeting Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-bni-red" />
              2. Tổng quan Buổi họp Hôm nay (30/09/2025)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg bg-card">
                <div className="text-sm text-muted-foreground mb-1">Số Khách mời tham dự</div>
                <div className="text-3xl font-bold text-bni-gold">4</div>
              </div>
              <div className="p-4 border rounded-lg bg-card">
                <div className="text-sm text-muted-foreground mb-1">Số Cơ hội Kinh doanh trao đi</div>
                <div className="text-3xl font-bold text-bni-red">53</div>
              </div>
              <div className="p-4 border rounded-lg bg-card">
                <div className="text-sm text-muted-foreground mb-1">Diễn giả chính</div>
                <div className="text-lg font-bold">Mr. Lý Hoàng Hải</div>
              </div>
              <div className="p-4 border rounded-lg bg-card">
                <div className="text-sm text-muted-foreground mb-1">Thành viên mới kết nạp</div>
                <div className="text-3xl font-bold text-green-600">2</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* III. Member Tracking & Care */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-bni-red">III. THEO DÕI & CHĂM SÓC THÀNH VIÊN</h2>
        
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên Thành viên</TableHead>
                    <TableHead>Vai trò LT / Power Team</TableHead>
                    <TableHead>KPI Status</TableHead>
                    <TableHead>Hoạt động Nổi bật (Tháng 8)</TableHead>
                    <TableHead>Lưu ý Chăm sóc & Hỗ trợ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold">Mrs. Đoàn Thị Ánh Khuyên</TableCell>
                    <TableCell>
                      <div>Chủ tịch</div>
                      <div className="text-sm text-muted-foreground">Sức khỏe</div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500/10 text-green-700 border-green-200">
                        🟢 Xanh
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div>• 19 lượt 1-2-1</div>
                        <div>• 486 điểm CEU</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      Đang thể hiện vai trò lãnh đạo xuất sắc. Cần duy trì năng lượng.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Mr. Lý Hoàng Hải</TableCell>
                    <TableCell>
                      <div>Phó Chủ tịch</div>
                      <div className="text-sm text-muted-foreground">Dịch vụ DN</div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500/10 text-green-700 border-green-200">
                        🟢 Xanh
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        Diễn giả chính tuần này
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      Hỗ trợ truyền thông bài diễn giả để tìm kiếm cơ hội kinh doanh.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Mrs. Lưu Thị Châu</TableCell>
                    <TableCell>
                      <div>Tổng Thư ký</div>
                      <div className="text-sm text-muted-foreground">F&B</div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500/10 text-green-700 border-green-200">
                        🟢 Xanh
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        Trao 12 cơ hội kinh doanh
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      Vinh danh và khuyến khích tiếp tục phát huy.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Mrs. Hà Thị Hạnh</TableCell>
                    <TableCell>
                      <div>Ban Khách mời</div>
                      <div className="text-sm text-muted-foreground">Bảo hiểm</div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500/10 text-green-700 border-green-200">
                        🟢 Xanh
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <Trophy className="h-4 w-4 inline mr-1 text-bni-gold" />
                        Thank You Note {'>'} 312 Triệu VNĐ
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      Một case study thành công điển hình, cần chia sẻ câu chuyện.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Mr. Nguyễn Sơn Tùng</TableCell>
                    <TableCell>
                      <div>PT Chất lượng TV</div>
                      <div className="text-sm text-muted-foreground">Nội thất</div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                        🟡 Vàng
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        Diễn giả đào tạo kỹ năng networking
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <AlertCircle className="h-4 w-4 inline mr-1 text-yellow-600" />
                      Cần cải thiện chỉ số Referrals. Ban LT sẽ 1-2-1 để hỗ trợ.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Ms. Phùng Trang Linh</TableCell>
                    <TableCell>
                      <div>Ban Truyền thông</div>
                      <div className="text-sm text-muted-foreground">F&B</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">N/A</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        Thành viên mới
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      Cần kết nối Mentor và tham gia định hướng thành viên mới.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Mrs. Trần Thị Mừng</TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">(Chưa có)</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">N/A</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        Thành viên mới
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      Cần kết nối Mentor và tham gia định hướng thành viên mới.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Ghi chú:</strong> KPI Status (🟢 Xanh, 🟡 Vàng, 🔴 Đỏ) được cập nhật hàng tuần dựa trên báo cáo của Ban Chất lượng Thành viên.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default ExecutiveOverview;
