import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, TrendingUp, Calendar, Award, ArrowUpRight, ArrowDownRight, Crown, Target, UserCheck, MessageSquare, Trophy, AlertCircle, CheckCircle2, Download, ClipboardCheck, Clock, FileText, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, Outlet, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useChapterData } from "@/contexts/ChapterDataContext";
import UpcomingEventsDisplay from "@/components/dashboard/UpcomingEventsDisplay";

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
  const { chapterData, getUpcomingEvents } = useChapterData();
  const upcomingEvents = getUpcomingEvents(30); // Get events for next 30 days
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
  return <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-bni-gold/5 to-background">
        <DashboardSidebar />
        
        <main className="flex-1 w-full px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
          {isSubRoute ? <Outlet /> :
          <div className="space-y-4 sm:space-y-5 lg:space-y-6 max-w-[1600px] mx-auto">
            {/* Compact Executive Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2">
                  <Crown className="h-5 w-5 sm:h-6 sm:w-6 text-bni-gold flex-shrink-0" />
                  <span className="line-clamp-1">Tổng quan Felix Chapter</span>
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {chapterData.termName} | {chapterData.lastUpdated}
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-1.5 w-full sm:w-auto">
                <Download className="h-3.5 w-3.5" />
                <span>Xuất báo cáo</span>
              </Button>
            </div>

            {/* Compact Strategic Objectives */}
            <Card className="border border-bni-gold/30 bg-gradient-to-br from-bni-gold/5 to-background">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 text-bni-gold" />
                  Mục tiêu {chapterData.termName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="space-y-1.5">
                    <div className="text-xs text-muted-foreground">Doanh thu</div>
                    <div className="text-lg sm:text-xl font-bold text-bni-gold">{chapterData.strategicObjectives.revenue.target}</div>
                    <div className="text-xs">Hiện: {chapterData.strategicObjectives.revenue.current}</div>
                    <Progress value={chapterData.strategicObjectives.revenue.progress} className="h-1.5" />
                    {getStatusBadge(chapterData.strategicObjectives.revenue.status)}
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-xs text-muted-foreground">Thành viên</div>
                    <div className="text-lg sm:text-xl font-bold text-bni-red">{chapterData.strategicObjectives.memberCount.target}</div>
                    <div className="text-xs">Hiện: {chapterData.strategicObjectives.memberCount.current}</div>
                    <Progress value={chapterData.strategicObjectives.memberCount.progress} className="h-1.5" />
                    {getStatusBadge(chapterData.strategicObjectives.memberCount.status)}
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-xs text-muted-foreground">Hiện diện</div>
                    <div className="text-lg sm:text-xl font-bold text-green-600">{chapterData.strategicObjectives.attendance.current}</div>
                    <div className="text-xs">MT: {chapterData.strategicObjectives.attendance.target}</div>
                    <Progress value={chapterData.strategicObjectives.attendance.progress} className="h-1.5" />
                    {getStatusBadge(chapterData.strategicObjectives.attendance.status)}
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-xs text-muted-foreground">KPI Xanh</div>
                    <div className="text-lg sm:text-xl font-bold text-green-600">{chapterData.strategicObjectives.kpiGreenMembers.current}</div>
                    <div className="text-xs">MT: {chapterData.strategicObjectives.kpiGreenMembers.target}</div>
                    <Progress value={chapterData.strategicObjectives.kpiGreenMembers.progress} className="h-1.5" />
                    {getStatusBadge(chapterData.strategicObjectives.kpiGreenMembers.status)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compact Leadership */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-bni-gold" />
                  Ban Lãnh đạo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                  {chapterData.leadership.map((leader, index) => leader.isPrimary ? <div key={index} className="col-span-full p-2.5 sm:p-3 border-2 border-bni-gold rounded-lg bg-bni-gold/5">
                        <div className="flex items-center gap-2">
                          <Crown className="h-4 w-4 text-bni-gold flex-shrink-0" />
                          <span className="font-semibold text-sm">{leader.role}:</span>
                          <span className="font-bold text-bni-red text-sm truncate">{leader.name}</span>
                        </div>
                      </div> : <div key={index} className="p-2 sm:p-2.5 border rounded-lg bg-card">
                        <div className="font-semibold text-xs">{leader.role}</div>
                        <div className="text-xs truncate">{leader.name}</div>
                      </div>)}
                </div>
              </CardContent>
            </Card>

            {/* Compact Performance Metrics */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-bni-red" />
                  Hiệu suất (Tháng 8)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-1.5">Giao dịch (TYFCB)</h4>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span>MT: ~5.5 Tỷ</span>
                      <span className="font-bold">1.23 Tỷ</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={22.4} className="h-2 flex-1" />
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 text-xs">22%</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1.5">Referrals</h4>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span>MT: 258-408</span>
                      <span className="font-bold">103</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={25.2} className="h-2 flex-1" />
                      <Badge variant="outline" className="bg-red-500/10 text-red-700 text-xs">25%</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1.5">1-2-1</h4>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span>MT: 344-544</span>
                      <span className="font-bold">344</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={63.2} className="h-2 flex-1" />
                      <Badge variant="outline" className="bg-green-500/10 text-green-700 text-xs">Đạt tối thiểu</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compact Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 p-3 sm:p-4">
                      <CardTitle className="text-xs sm:text-sm font-medium line-clamp-2">
                        {stat.title}
                      </CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{stat.value}</div>
                      <div className="flex items-center text-xs mt-1">
                        {stat.trend === "up" && <ArrowUpRight className="h-3 w-3 text-green-500 mr-0.5" />}
                        {stat.trend === "down" && <ArrowDownRight className="h-3 w-3 text-red-500 mr-0.5" />}
                        <span className={stat.trend === "up" ? "text-green-500" : stat.trend === "down" ? "text-red-500" : "text-muted-foreground"}>
                          {stat.change}
                        </span>
                      </div>
                    </CardContent>
                  </Card>;
              })}
            </div>

            {/* Compact Tabs */}
            <Tabs defaultValue="members" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1">
                <TabsTrigger value="members" className="text-xs sm:text-sm py-1.5 sm:py-2">Thành viên</TabsTrigger>
                <TabsTrigger value="referrals" className="text-xs sm:text-sm py-1.5 sm:py-2">Referrals</TabsTrigger>
                <TabsTrigger value="meetings" className="text-xs sm:text-sm py-1.5 sm:py-2">Lịch họp</TabsTrigger>
                <TabsTrigger value="top-performers" className="text-xs sm:text-sm py-1.5 sm:py-2">Top</TabsTrigger>
              </TabsList>

              {/* Compact Members Tab */}
              <TabsContent value="members" className="space-y-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base sm:text-lg">Theo dõi Thành viên</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Trạng thái KPI và hoạt động
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto -mx-3 sm:mx-0">
                      <div className="min-w-[600px] px-3 sm:px-0">
                        <Table>
                        <TableHeader>
                          <TableRow className="text-xs">
                            <TableHead className="py-2">Tên</TableHead>
                            <TableHead className="py-2">Vai trò</TableHead>
                            <TableHead className="py-2">KPI</TableHead>
                            <TableHead className="py-2">Hoạt động</TableHead>
                            <TableHead className="py-2">Ghi chú</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="text-xs sm:text-sm">
                            <TableCell className="font-semibold py-2">Mrs. Đ.T.Á. Khuyên</TableCell>
                            <TableCell className="py-2">
                              <div className="font-medium">Chủ tịch</div>
                              <div className="text-xs text-muted-foreground">Sức khỏe</div>
                            </TableCell>
                            <TableCell className="py-2">
                              <Badge className="bg-green-500/10 text-green-700 border-green-200 text-xs">🟢</Badge>
                            </TableCell>
                            <TableCell className="py-2">
                              19 x 1-2-1, 486 CEU
                            </TableCell>
                            <TableCell className="py-2 text-xs">Xuất sắc</TableCell>
                          </TableRow>
                          <TableRow className="text-xs sm:text-sm">
                            <TableCell className="font-semibold py-2">Mr. Lý H. Hải</TableCell>
                            <TableCell className="py-2">
                              <div className="font-medium">Phó CT</div>
                              <div className="text-xs text-muted-foreground">DV DN</div>
                            </TableCell>
                            <TableCell className="py-2">
                              <Badge className="bg-green-500/10 text-green-700 border-green-200 text-xs">🟢</Badge>
                            </TableCell>
                            <TableCell className="py-2">Diễn giả tuần này</TableCell>
                            <TableCell className="py-2 text-xs">HT truyền thông</TableCell>
                          </TableRow>
                          <TableRow className="text-xs sm:text-sm">
                            <TableCell className="font-semibold py-2">Mrs. Lưu T. Châu</TableCell>
                            <TableCell className="py-2">
                              <div className="font-medium">Tổng TK</div>
                              <div className="text-xs text-muted-foreground">F&B</div>
                            </TableCell>
                            <TableCell className="py-2">
                              <Badge className="bg-green-500/10 text-green-700 border-green-200 text-xs">🟢</Badge>
                            </TableCell>
                            <TableCell className="py-2">12 cơ hội KD</TableCell>
                            <TableCell className="py-2 text-xs">Vinh danh</TableCell>
                          </TableRow>
                          <TableRow className="text-xs sm:text-sm">
                            <TableCell className="font-semibold py-2">Mrs. Hà T. Hạnh</TableCell>
                            <TableCell className="py-2">
                              <div className="font-medium">Khách mời</div>
                              <div className="text-xs text-muted-foreground">Bảo hiểm</div>
                            </TableCell>
                            <TableCell className="py-2">
                              <Badge className="bg-green-500/10 text-green-700 border-green-200 text-xs">🟢</Badge>
                            </TableCell>
                            <TableCell className="py-2">
                              <Trophy className="h-3 w-3 inline mr-1 text-bni-gold" />
                              TYN 312M
                            </TableCell>
                            <TableCell className="py-2 text-xs">Case study</TableCell>
                          </TableRow>
                          <TableRow className="text-xs sm:text-sm">
                            <TableCell className="font-semibold py-2">Mr. N. Sơn Tùng</TableCell>
                            <TableCell className="py-2">
                              <div className="font-medium">PT Chất lượng</div>
                              <div className="text-xs text-muted-foreground">Nội thất</div>
                            </TableCell>
                            <TableCell className="py-2">
                              <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200 text-xs">🟡</Badge>
                            </TableCell>
                            <TableCell className="py-2">DG đào tạo</TableCell>
                            <TableCell className="py-2 text-xs">
                              <AlertCircle className="h-3 w-3 inline mr-1 text-yellow-600" />
                              Cải thiện Ref
                            </TableCell>
                          </TableRow>
                          <TableRow className="text-xs sm:text-sm">
                            <TableCell className="font-semibold py-2">Ms. P. Trang Linh</TableCell>
                            <TableCell className="py-2">
                              <div className="font-medium">Truyền thông</div>
                              <div className="text-xs text-muted-foreground">F&B</div>
                            </TableCell>
                            <TableCell className="py-2">
                              <Badge variant="outline" className="text-xs">N/A</Badge>
                            </TableCell>
                            <TableCell className="py-2">TV mới</TableCell>
                            <TableCell className="py-2 text-xs">Cần Mentor</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      </div>
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

              {/* Meetings Tab - Now synced with Chapter Events */}
              <TabsContent value="meetings" className="space-y-4">
                <UpcomingEventsDisplay />
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
          </div>}
        </main>
      </div>
    </SidebarProvider>;
};
export default Dashboard;