import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, TrendingUp, Calendar, Award, ArrowUpRight, ArrowDownRight,
  Crown, Target, UserCheck, MessageSquare, Trophy, AlertCircle, CheckCircle2, Download,
  ClipboardCheck, Clock, FileText, TrendingDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, Outlet, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useChapterData } from "@/contexts/ChapterDataContext";

// Mockup data
const stats = [{
  title: "Tổng thành viên",
  value: "45",
  change: "+12%",
  trend: "up",
  icon: Users,
  description: "So với tháng trước"
}, {
  title: "Referrals tháng này",
  value: "128",
  change: "+23%",
  trend: "up",
  icon: TrendingUp,
  description: "Tăng trưởng tốt"
}, {
  title: "Cuộc họp",
  value: "16",
  change: "0%",
  trend: "neutral",
  icon: Calendar,
  description: "Buổi trong tháng"
}, {
  title: "Tổng TYFCB",
  value: "2.4M",
  change: "+18%",
  trend: "up",
  icon: Award,
  description: "Thank You For Closed Business"
}];
const recentReferrals = [{
  id: 1,
  from: "Nguyễn Văn A",
  to: "Trần Thị B",
  service: "Tư vấn doanh nghiệp",
  value: "150M",
  status: "pending",
  date: "2025-10-04"
}, {
  id: 2,
  from: "Lê Minh C",
  to: "Phạm Văn D",
  service: "Dịch vụ kế toán",
  value: "80M",
  status: "completed",
  date: "2025-10-03"
}, {
  id: 3,
  from: "Hoàng Thị E",
  to: "Đặng Văn F",
  service: "Marketing Digital",
  value: "120M",
  status: "completed",
  date: "2025-10-02"
}, {
  id: 4,
  from: "Võ Văn G",
  to: "Bùi Thị H",
  service: "Đào tạo nhân sự",
  value: "200M",
  status: "pending",
  date: "2025-10-01"
}, {
  id: 5,
  from: "Phan Minh I",
  to: "Lý Thị K",
  service: "Tư vấn pháp lý",
  value: "95M",
  status: "completed",
  date: "2025-09-30"
}];
const upcomingMeetings = [{
  id: 1,
  title: "Họp Chapter hàng tuần",
  date: "2025-10-07",
  time: "07:00 - 09:00",
  location: "Khách sạn Nikko",
  attendees: 42,
  type: "weekly"
}, {
  id: 2,
  title: "1-to-1 Meeting",
  date: "2025-10-08",
  time: "14:00 - 15:00",
  location: "Cafe Highlands",
  attendees: 2,
  type: "one-to-one"
}, {
  id: 3,
  title: "Training Session",
  date: "2025-10-10",
  time: "18:00 - 20:00",
  location: "Văn phòng Chapter",
  attendees: 25,
  type: "training"
}];
const topMembers = [{
  id: 1,
  name: "Nguyễn Văn A",
  category: "Tư vấn doanh nghiệp",
  referralsGiven: 15,
  referralsReceived: 12,
  tyfcb: "450M",
  rank: 1
}, {
  id: 2,
  name: "Lê Minh C",
  category: "Dịch vụ kế toán",
  referralsGiven: 13,
  referralsReceived: 10,
  tyfcb: "380M",
  rank: 2
}, {
  id: 3,
  name: "Hoàng Thị E",
  category: "Marketing Digital",
  referralsGiven: 11,
  referralsReceived: 14,
  tyfcb: "420M",
  rank: 3
}, {
  id: 4,
  name: "Võ Văn G",
  category: "Đào tạo nhân sự",
  referralsGiven: 10,
  referralsReceived: 9,
  tyfcb: "320M",
  rank: 4
}, {
  id: 5,
  name: "Phan Minh I",
  category: "Tư vấn pháp lý",
  referralsGiven: 9,
  referralsReceived: 11,
  tyfcb: "360M",
  rank: 5
}];
const Dashboard = () => {
  const location = useLocation();
  const isSubRoute = location.pathname !== "/dashboard";
  const { chapterData } = useChapterData();
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'achieved':
        return <Badge className="bg-green-500/10 text-green-700 border-green-200 text-xs">
          <CheckCircle2 className="h-3 w-3 mr-1 inline" />
          Đạt mục tiêu
        </Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200 text-xs">
          🟨 Đang phát triển
        </Badge>;
      case 'needs-attention':
        return <Badge className="bg-red-500/10 text-red-700 border-red-200 text-xs">
          <AlertCircle className="h-3 w-3 mr-1 inline" />
          Cần chú ý
        </Badge>;
      default:
        return null;
    }
  };

  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-bni-gold/5 to-background">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-bni-red text-bni-white py-6 px-4 md:px-8 shadow-lg border-b-4 border-bni-gold">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-bni-white">BNI Dashboard</h1>
                <p className="text-bni-white/90 mt-1">Quản lý hoạt động Chapter</p>
              </div>
              <Link to="/">
                <Button variant="outline" className="bg-bni-white text-bni-red border-bni-white hover:bg-bni-white/90 hover:text-bni-dark-red font-semibold">
                  Về trang chủ
                </Button>
              </Link>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        {/* Show subroute content if navigated to a report page */}
        {isSubRoute ? (
          <Outlet />
        ) : (
          // Enhanced Dashboard Overview with Executive Information
          <div className="space-y-8">
            {/* Executive Header */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Crown className="h-8 w-8 text-bni-gold" />
                  Tổng quan Điều hành BNI Felix Chapter
                </h2>
                <p className="text-muted-foreground mt-2">
                  {chapterData.termName} ({chapterData.termStart} – {chapterData.termEnd}) | Cập nhật: {chapterData.lastUpdated}
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Xuất báo cáo
              </Button>
            </div>

            {/* Strategic Objectives Overview */}
            <Card className="border-2 border-bni-gold/20 bg-gradient-to-br from-bni-gold/5 to-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Target className="h-6 w-6 text-bni-gold" />
                  Mục tiêu Chiến lược {chapterData.termName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Doanh thu Nhiệm kỳ</div>
                    <div className="text-2xl font-bold text-bni-gold">{chapterData.strategicObjectives.revenue.target}</div>
                    <div className="text-sm font-semibold">Hiện tại: {chapterData.strategicObjectives.revenue.current}</div>
                    <Progress value={chapterData.strategicObjectives.revenue.progress} className="h-2" />
                    {getStatusBadge(chapterData.strategicObjectives.revenue.status)}
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Sĩ số Thành viên</div>
                    <div className="text-2xl font-bold text-bni-red">{chapterData.strategicObjectives.memberCount.target}</div>
                    <div className="text-sm font-semibold">Hiện tại: {chapterData.strategicObjectives.memberCount.current}</div>
                    <Progress value={chapterData.strategicObjectives.memberCount.progress} className="h-2" />
                    {getStatusBadge(chapterData.strategicObjectives.memberCount.status)}
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Tỷ lệ Hiện diện</div>
                    <div className="text-2xl font-bold text-green-600">{chapterData.strategicObjectives.attendance.current}</div>
                    <div className="text-sm font-semibold">Mục tiêu: {chapterData.strategicObjectives.attendance.target}</div>
                    <Progress value={chapterData.strategicObjectives.attendance.progress} className="h-2" />
                    {getStatusBadge(chapterData.strategicObjectives.attendance.status)}
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">TV KPI Xanh</div>
                    <div className="text-2xl font-bold text-green-600">{chapterData.strategicObjectives.kpiGreenMembers.current}</div>
                    <div className="text-sm font-semibold">Mục tiêu: {chapterData.strategicObjectives.kpiGreenMembers.target}</div>
                    <Progress value={chapterData.strategicObjectives.kpiGreenMembers.progress} className="h-2" />
                    {getStatusBadge(chapterData.strategicObjectives.kpiGreenMembers.status)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leadership Structure */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-bni-gold" />
                  Ban Lãnh đạo {chapterData.termName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {chapterData.leadership.map((leader, index) => (
                    leader.isPrimary ? (
                      <div key={index} className="col-span-full p-4 border-2 border-bni-gold rounded-lg bg-bni-gold/5">
                        <div className="flex items-center gap-2">
                          <Crown className="h-5 w-5 text-bni-gold" />
                          <span className="font-semibold">{leader.role}:</span>
                          <span className="font-bold text-bni-red">{leader.name}</span>
                        </div>
                      </div>
                    ) : (
                      <div key={index} className="p-3 border rounded-lg bg-card">
                        <div className="font-semibold text-sm">{leader.role}</div>
                        <div className="text-sm">{leader.name}</div>
                      </div>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-bni-red" />
                  Hiệu suất Kinh doanh & Kết nối (Tháng 8)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Giá trị Giao dịch (Thank You Note)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mục tiêu: ~5.5 Tỷ</span>
                      <span className="font-bold">Thực tế: 1.23 Tỷ</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={22.4} className="h-3 flex-1" />
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700">22%</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Cơ hội Kinh doanh (Referrals)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mục tiêu: 258 - 408</span>
                      <span className="font-bold">Thực tế: 103</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={25.2} className="h-3 flex-1" />
                      <Badge variant="outline" className="bg-red-500/10 text-red-700">25%</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Số lượt 1-2-1</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mục tiêu: 344 - 544</span>
                      <span className="font-bold">Thực tế: 344</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={63.2} className="h-3 flex-1" />
                      <Badge variant="outline" className="bg-green-500/10 text-green-700">Đạt mức tối thiểu</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
              const Icon = stat.icon;
              return <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{stat.value}</div>
                      <div className="flex items-center text-xs mt-2">
                        {stat.trend === "up" && <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />}
                        {stat.trend === "down" && <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />}
                        <span className={stat.trend === "up" ? "text-green-500" : stat.trend === "down" ? "text-red-500" : "text-muted-foreground"}>
                          {stat.change}
                        </span>
                        <span className="text-muted-foreground ml-2">{stat.description}</span>
                      </div>
                    </CardContent>
                  </Card>;
            })}
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="members" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="members">Thành viên</TabsTrigger>
                <TabsTrigger value="referrals">Referrals</TabsTrigger>
                <TabsTrigger value="meetings">Lịch họp</TabsTrigger>
                <TabsTrigger value="top-performers">Top xuất sắc</TabsTrigger>
              </TabsList>

              {/* Members Tab - Member Tracking */}
              <TabsContent value="members" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Theo dõi & Chăm sóc Thành viên</CardTitle>
                    <CardDescription>
                      Cập nhật trạng thái KPI và hoạt động của từng thành viên
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Tên</TableHead>
                            <TableHead>Vai trò / Ngành</TableHead>
                            <TableHead>KPI</TableHead>
                            <TableHead>Hoạt động Nổi bật</TableHead>
                            <TableHead>Ghi chú</TableHead>
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
                              <Badge className="bg-green-500/10 text-green-700 border-green-200">🟢 Xanh</Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              19 lượt 1-2-1, 486 điểm CEU
                            </TableCell>
                            <TableCell className="text-sm">Lãnh đạo xuất sắc</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold">Mr. Lý Hoàng Hải</TableCell>
                            <TableCell>
                              <div>Phó Chủ tịch</div>
                              <div className="text-sm text-muted-foreground">Dịch vụ DN</div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/10 text-green-700 border-green-200">🟢 Xanh</Badge>
                            </TableCell>
                            <TableCell className="text-sm">Diễn giả chính tuần này</TableCell>
                            <TableCell className="text-sm">Hỗ trợ truyền thông</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold">Mrs. Lưu Thị Châu</TableCell>
                            <TableCell>
                              <div>Tổng Thư ký</div>
                              <div className="text-sm text-muted-foreground">F&B</div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/10 text-green-700 border-green-200">🟢 Xanh</Badge>
                            </TableCell>
                            <TableCell className="text-sm">Trao 12 cơ hội kinh doanh</TableCell>
                            <TableCell className="text-sm">Vinh danh</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold">Mrs. Hà Thị Hạnh</TableCell>
                            <TableCell>
                              <div>Ban Khách mời</div>
                              <div className="text-sm text-muted-foreground">Bảo hiểm</div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/10 text-green-700 border-green-200">🟢 Xanh</Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              <Trophy className="h-4 w-4 inline mr-1 text-bni-gold" />
                              Thank You Note {'>'}312 Triệu
                            </TableCell>
                            <TableCell className="text-sm">Case study thành công</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold">Mr. Nguyễn Sơn Tùng</TableCell>
                            <TableCell>
                              <div>PT Chất lượng TV</div>
                              <div className="text-sm text-muted-foreground">Nội thất</div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">🟡 Vàng</Badge>
                            </TableCell>
                            <TableCell className="text-sm">Diễn giả đào tạo networking</TableCell>
                            <TableCell className="text-sm">
                              <AlertCircle className="h-4 w-4 inline mr-1 text-yellow-600" />
                              Cần cải thiện Referrals
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
                            <TableCell className="text-sm">Thành viên mới</TableCell>
                            <TableCell className="text-sm">Cần Mentor</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                {/* Task Tracking & Weekly Reports Section */}
                <Card className="border-2 border-bni-red/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardCheck className="h-5 w-5 text-bni-red" />
                      Theo dõi Nhiệm vụ & Báo cáo Hàng tuần Ban LT
                    </CardTitle>
                    <CardDescription>
                      Tiến độ công việc và báo cáo tuần của từng thành viên Ban Lãnh đạo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[180px]">Thành viên LT</TableHead>
                            <TableHead className="w-[140px]">Vai trò</TableHead>
                            <TableHead className="w-[280px]">Nhiệm vụ tuần này</TableHead>
                            <TableHead className="w-[120px]">Tiến độ</TableHead>
                            <TableHead className="w-[120px]">Deadline</TableHead>
                            <TableHead className="w-[120px]">Báo cáo</TableHead>
                            <TableHead className="w-[100px]">Trạng thái</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {/* Chủ tịch */}
                          <TableRow>
                            <TableCell className="font-semibold">Mrs. Đoàn Thị Ánh Khuyên</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-bni-gold/10 text-bni-gold border-bni-gold/30">
                                Chủ tịch
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              <ul className="space-y-1">
                                <li>• Tổ chức họp LT tuần</li>
                                <li>• Review KPI Chapter</li>
                                <li>• 1-2-1 với 5 thành viên</li>
                              </ul>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <Progress value={85} className="h-2" />
                                <span className="text-xs text-muted-foreground">85%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              <div className="flex items-center gap-1 text-green-600">
                                <Clock className="h-3 w-3" />
                                06/10
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/10 text-green-700 border-green-200">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Đã nộp
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/10 text-green-700 border-green-200">
                                Hoàn thành
                              </Badge>
                            </TableCell>
                          </TableRow>

                          {/* Phó Chủ tịch */}
                          <TableRow>
                            <TableCell className="font-semibold">Mr. Lý Hoàng Hải</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-bni-red/10 text-bni-red border-bni-red/30">
                                Phó CT
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              <ul className="space-y-1">
                                <li>• Chuẩn bị bài diễn giả</li>
                                <li>• Hỗ trợ 3 thành viên mới</li>
                                <li>• Review chiến lược tăng trưởng</li>
                              </ul>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <Progress value={100} className="h-2" />
                                <span className="text-xs text-muted-foreground">100%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              <div className="flex items-center gap-1 text-green-600">
                                <Clock className="h-3 w-3" />
                                05/10
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/10 text-green-700 border-green-200">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Đã nộp
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/10 text-green-700 border-green-200">
                                Hoàn thành
                              </Badge>
                            </TableCell>
                          </TableRow>

                          {/* Tổng Thư ký */}
                          <TableRow>
                            <TableCell className="font-semibold">Mrs. Lưu Thị Châu</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-200">
                                Tổng TK
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              <ul className="space-y-1">
                                <li>• Cập nhật biên bản họp</li>
                                <li>• Gửi thông báo sự kiện</li>
                                <li>• Theo dõi tỷ lệ tham dự</li>
                              </ul>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <Progress value={70} className="h-2" />
                                <span className="text-xs text-muted-foreground">70%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              <div className="flex items-center gap-1 text-yellow-600">
                                <Clock className="h-3 w-3" />
                                07/10
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Chưa nộp
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                                Đang làm
                              </Badge>
                            </TableCell>
                          </TableRow>

                          {/* Trưởng Ban Thành viên */}
                          <TableRow>
                            <TableCell className="font-semibold">Mrs. Lê Thị Lan</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-purple-500/10 text-purple-700 border-purple-200">
                                TB Thành viên
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              <ul className="space-y-1">
                                <li>• Đánh giá KPI thành viên</li>
                                <li>• Lập kế hoạch tuyển mới</li>
                                <li>• Chăm sóc TV vàng/đỏ</li>
                              </ul>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <Progress value={60} className="h-2" />
                                <span className="text-xs text-muted-foreground">60%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              <div className="flex items-center gap-1 text-orange-600">
                                <Clock className="h-3 w-3" />
                                08/10
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Chưa nộp
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                                Đang làm
                              </Badge>
                            </TableCell>
                          </TableRow>

                          {/* PT Chất lượng Thành viên */}
                          <TableRow>
                            <TableCell className="font-semibold">Mr. Nguyễn Sơn Tùng</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-purple-500/10 text-purple-700 border-purple-200">
                                PT CL TV
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              <ul className="space-y-1">
                                <li>• Phân tích báo cáo KPI</li>
                                <li>• Đào tạo kỹ năng Referral</li>
                                <li>• Hỗ trợ TV KPI vàng</li>
                              </ul>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <Progress value={45} className="h-2" />
                                <span className="text-xs text-muted-foreground">45%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              <div className="flex items-center gap-1 text-red-600">
                                <Clock className="h-3 w-3" />
                                04/10
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-red-500/10 text-red-700 border-red-200">
                                <TrendingDown className="h-3 w-3 mr-1" />
                                Quá hạn
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-red-500/10 text-red-700 border-red-200">
                                Trễ deadline
                              </Badge>
                            </TableCell>
                          </TableRow>

                          {/* Trưởng Ban Khách mời */}
                          <TableRow>
                            <TableCell className="font-semibold">Ms. Nguyễn Thị Mến</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-teal-500/10 text-teal-700 border-teal-200">
                                TB Khách mời
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              <ul className="space-y-1">
                                <li>• Mời 10 khách mới</li>
                                <li>• Follow up khách tuần trước</li>
                                <li>• Chuẩn bị tài liệu giới thiệu</li>
                              </ul>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <Progress value={90} className="h-2" />
                                <span className="text-xs text-muted-foreground">90%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              <div className="flex items-center gap-1 text-green-600">
                                <Clock className="h-3 w-3" />
                                06/10
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/10 text-green-700 border-green-200">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Đã nộp
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/10 text-green-700 border-green-200">
                                Hoàn thành
                              </Badge>
                            </TableCell>
                          </TableRow>

                          {/* Trưởng Ban Đào tạo */}
                          <TableRow>
                            <TableCell className="font-semibold">Mrs. Đào Thị Thanh Trà</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-indigo-500/10 text-indigo-700 border-indigo-200">
                                TB Đào tạo
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              <ul className="space-y-1">
                                <li>• Tổ chức workshop BNI</li>
                                <li>• Đào tạo TV mới</li>
                                <li>• Cập nhật tài liệu training</li>
                              </ul>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <Progress value={75} className="h-2" />
                                <span className="text-xs text-muted-foreground">75%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              <div className="flex items-center gap-1 text-green-600">
                                <Clock className="h-3 w-3" />
                                07/10
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Chưa nộp
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                                Đang làm
                              </Badge>
                            </TableCell>
                          </TableRow>

                          {/* Trưởng Ban Sự kiện */}
                          <TableRow>
                            <TableCell className="font-semibold">Mr. Lê Ngọc Minh</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-pink-500/10 text-pink-700 border-pink-200">
                                TB Sự kiện
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              <ul className="space-y-1">
                                <li>• Lên kế hoạch sự kiện Q4</li>
                                <li>• Tìm địa điểm Year-end</li>
                                <li>• Phối hợp với nhà tài trợ</li>
                              </ul>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <Progress value={55} className="h-2" />
                                <span className="text-xs text-muted-foreground">55%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              <div className="flex items-center gap-1 text-orange-600">
                                <Clock className="h-3 w-3" />
                                09/10
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Chưa nộp
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                                Đang làm
                              </Badge>
                            </TableCell>
                          </TableRow>

                          {/* Trưởng Ban Truyền thông */}
                          <TableRow>
                            <TableCell className="font-semibold">Ms. Phùng Trang Linh</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-orange-500/10 text-orange-700 border-orange-200">
                                TB Truyền thông
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              <ul className="space-y-1">
                                <li>• Đăng 5 bài social media</li>
                                <li>• Chụp ảnh sự kiện tuần</li>
                                <li>• Cập nhật website Chapter</li>
                              </ul>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <Progress value={80} className="h-2" />
                                <span className="text-xs text-muted-foreground">80%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              <div className="flex items-center gap-1 text-green-600">
                                <Clock className="h-3 w-3" />
                                06/10
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/10 text-green-700 border-green-200">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Đã nộp
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                                Đang làm
                              </Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    {/* Summary Statistics */}
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">4</div>
                        <div className="text-xs text-muted-foreground mt-1">Đã hoàn thành</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">4</div>
                        <div className="text-xs text-muted-foreground mt-1">Đang tiến hành</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">1</div>
                        <div className="text-xs text-muted-foreground mt-1">Quá hạn</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-bni-gold">72%</div>
                        <div className="text-xs text-muted-foreground mt-1">Tỷ lệ hoàn thành</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Referrals Tab */}
              <TabsContent value="referrals" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Referrals gần đây</CardTitle>
                    <CardDescription>
                      Danh sách các referrals được tạo trong tháng này
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Người giới thiệu</TableHead>
                          <TableHead>Người nhận</TableHead>
                          <TableHead>Dịch vụ</TableHead>
                          <TableHead>Giá trị</TableHead>
                          <TableHead>Trạng thái</TableHead>
                          <TableHead>Ngày</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentReferrals.map(referral => <TableRow key={referral.id}>
                            <TableCell className="font-medium">{referral.from}</TableCell>
                            <TableCell>{referral.to}</TableCell>
                            <TableCell>{referral.service}</TableCell>
                            <TableCell>{referral.value}</TableCell>
                            <TableCell>
                              <Badge variant={referral.status === "completed" ? "default" : "secondary"}>
                                {referral.status === "completed" ? "Hoàn thành" : "Đang xử lý"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(referral.date).toLocaleDateString('vi-VN')}
                            </TableCell>
                          </TableRow>)}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Meetings Tab */}
              <TabsContent value="meetings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Lịch họp sắp tới</CardTitle>
                    <CardDescription>
                      Các cuộc họp và sự kiện trong tuần tới
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingMeetings.map(meeting => <div key={meeting.id} className="flex items-start space-x-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                          <div className="flex-shrink-0">
                            <Calendar className="h-10 w-10 text-bni-red" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-base font-semibold">{meeting.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(meeting.date).toLocaleDateString('vi-VN')} • {meeting.time}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              📍 {meeting.location}
                            </p>
                            <div className="flex items-center mt-2 space-x-2">
                              <Badge variant="outline">{meeting.attendees} người tham dự</Badge>
                              <Badge>{meeting.type === "weekly" ? "Họp tuần" : meeting.type === "one-to-one" ? "1-to-1" : "Đào tạo"}</Badge>
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Top Performers Tab */}
              <TabsContent value="top-performers" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Top thành viên xuất sắc</CardTitle>
                    <CardDescription>
                      Bảng xếp hạng dựa trên hoạt động referral và TYFCB
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Hạng</TableHead>
                          <TableHead>Tên</TableHead>
                          <TableHead>Ngành nghề</TableHead>
                          <TableHead>Referrals cho</TableHead>
                          <TableHead>Referrals nhận</TableHead>
                          <TableHead>TYFCB</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topMembers.map(member => <TableRow key={member.id}>
                            <TableCell>
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-bni-gold/20 text-bni-gold font-bold">
                                {member.rank}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{member.name}</TableCell>
                            <TableCell>{member.category}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
                                {member.referralsGiven}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-200">
                                {member.referralsReceived}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-semibold text-bni-gold">{member.tyfcb}</TableCell>
                          </TableRow>)}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
          </main>
        </div>
      </div>
    </SidebarProvider>;
};
export default Dashboard;