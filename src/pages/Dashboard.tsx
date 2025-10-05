import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Calendar, Award, Target, UserPlus, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mockup data - Mục tiêu nhiệm kỳ
const termGoals = [
  {
    title: "Mục tiêu thành viên",
    target: "60",
    current: "45",
    icon: Users,
    percentage: 75,
    color: "text-blue-600"
  },
  {
    title: "Mục tiêu khách mời",
    target: "200",
    current: "156",
    icon: UserPlus,
    percentage: 78,
    color: "text-green-600"
  },
  {
    title: "Cuộc họp & Sự kiện",
    target: "48",
    current: "32",
    icon: Calendar,
    percentage: 67,
    color: "text-purple-600"
  },
  {
    title: "Tổng TYFCB",
    target: "5B",
    current: "3.2B",
    icon: Award,
    percentage: 64,
    color: "text-bni-gold"
  }
];

// Dữ liệu biểu đồ 6 tháng
const chartData = [
  {
    month: "Tháng 5",
    thanhVien: 38,
    khachMoi: 112,
    cuocHop: 24,
    tyfcb: 1.8
  },
  {
    month: "Tháng 6",
    thanhVien: 40,
    khachMoi: 128,
    cuocHop: 26,
    tyfcb: 2.1
  },
  {
    month: "Tháng 7",
    thanhVien: 42,
    khachMoi: 135,
    cuocHop: 26,
    tyfcb: 2.4
  },
  {
    month: "Tháng 8",
    thanhVien: 43,
    khachMoi: 142,
    cuocHop: 26,
    tyfcb: 2.7
  },
  {
    month: "Tháng 9",
    thanhVien: 44,
    khachMoi: 150,
    cuocHop: 26,
    tyfcb: 2.9
  },
  {
    month: "Tháng 10",
    thanhVien: 45,
    khachMoi: 156,
    cuocHop: 32,
    tyfcb: 3.2
  }
];

const recentReferrals = [
  {
    id: 1,
    from: "Nguyễn Văn A",
    to: "Trần Thị B",
    service: "Tư vấn doanh nghiệp",
    value: "150M",
    status: "pending",
    date: "2025-10-04"
  },
  {
    id: 2,
    from: "Lê Minh C",
    to: "Phạm Văn D",
    service: "Dịch vụ kế toán",
    value: "80M",
    status: "completed",
    date: "2025-10-03"
  },
  {
    id: 3,
    from: "Hoàng Thị E",
    to: "Đặng Văn F",
    service: "Marketing Digital",
    value: "120M",
    status: "completed",
    date: "2025-10-02"
  },
  {
    id: 4,
    from: "Võ Văn G",
    to: "Bùi Thị H",
    service: "Đào tạo nhân sự",
    value: "200M",
    status: "pending",
    date: "2025-10-01"
  },
  {
    id: 5,
    from: "Phan Minh I",
    to: "Lý Thị K",
    service: "Tư vấn pháp lý",
    value: "95M",
    status: "completed",
    date: "2025-09-30"
  }
];

const upcomingMeetings = [
  {
    id: 1,
    title: "Họp Chapter hàng tuần",
    date: "2025-10-07",
    time: "07:00 - 09:00",
    location: "Khách sạn Nikko",
    attendees: 42,
    type: "weekly"
  },
  {
    id: 2,
    title: "1-to-1 Meeting",
    date: "2025-10-08",
    time: "14:00 - 15:00",
    location: "Cafe Highlands",
    attendees: 2,
    type: "one-to-one"
  },
  {
    id: 3,
    title: "Training Session",
    date: "2025-10-10",
    time: "18:00 - 20:00",
    location: "Văn phòng Chapter",
    attendees: 25,
    type: "training"
  }
];

const topMembers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    category: "Tư vấn doanh nghiệp",
    referralsGiven: 15,
    referralsReceived: 12,
    tyfcb: "450M",
    rank: 1
  },
  {
    id: 2,
    name: "Lê Minh C",
    category: "Dịch vụ kế toán",
    referralsGiven: 13,
    referralsReceived: 10,
    tyfcb: "380M",
    rank: 2
  },
  {
    id: 3,
    name: "Hoàng Thị E",
    category: "Marketing Digital",
    referralsGiven: 11,
    referralsReceived: 14,
    tyfcb: "420M",
    rank: 3
  },
  {
    id: 4,
    name: "Võ Văn G",
    category: "Đào tạo nhân sự",
    referralsGiven: 10,
    referralsReceived: 9,
    tyfcb: "320M",
    rank: 4
  },
  {
    id: 5,
    name: "Phan Minh I",
    category: "Tư vấn pháp lý",
    referralsGiven: 9,
    referralsReceived: 11,
    tyfcb: "360M",
    rank: 5
  }
];

const Dashboard = () => {
  const location = useLocation();
  const isMainDashboard = location.pathname === "/dashboard";

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-bni-gold/5 to-background w-full flex flex-col">
        {/* Header */}
        <header className="bg-bni-red text-white py-6 px-4 md:px-8 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-white hover:bg-white/10" />
              <div>
                <h1 className="text-3xl font-bold">BNI Dashboard</h1>
                <p className="text-white/80 mt-1">Quản lý hoạt động Chapter</p>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Về trang chủ
              </Button>
            </Link>
          </div>
        </header>

        <div className="flex w-full flex-1">
          <DashboardSidebar />
          
          <main className="flex-1 px-4 md:px-8 py-8 overflow-auto">
            {isMainDashboard ? (
              <div>
        {/* Mục tiêu nhiệm kỳ */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-bni-red" />
            Mục tiêu nhiệm kỳ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {termGoals.map((goal, index) => {
              const Icon = goal.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-bni-red">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {goal.title}
                    </CardTitle>
                    <Icon className={`h-5 w-5 ${goal.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-3xl font-bold">{goal.current}</div>
                          <div className="text-xs text-muted-foreground">Mục tiêu: {goal.target}</div>
                        </div>
                        <div className={`text-2xl font-bold ${goal.color}`}>
                          {goal.percentage}%
                        </div>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-bni-red h-2 rounded-full transition-all" 
                          style={{ width: `${goal.percentage}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Biểu đồ theo dõi 6 tháng */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-bni-red" />
              Theo dõi hoạt động 6 tháng
            </CardTitle>
            <CardDescription>
              Biểu đồ thống kê các chỉ số hoạt động chính
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="thanhVien" stroke="#dc2626" name="Thành viên" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="khachMoi" stroke="#16a34a" name="Khách mời" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="cuocHop" stroke="#9333ea" name="Cuộc họp" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="tyfcb" stroke="#ca8a04" name="TYFCB (tỷ)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="meetings">Lịch họp</TabsTrigger>
            <TabsTrigger value="lt-reports">Báo cáo LT</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top thành viên xuất sắc</CardTitle>
                  <CardDescription>
                    Bảng xếp hạng hoạt động tháng này
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Hạng</TableHead>
                        <TableHead>Tên</TableHead>
                        <TableHead>TYFCB</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topMembers.slice(0, 5).map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-bni-gold/20 text-bni-gold font-bold">
                              {member.rank}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{member.name}</TableCell>
                          <TableCell className="font-semibold text-bni-gold">{member.tyfcb}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lịch họp sắp tới</CardTitle>
                  <CardDescription>
                    Các cuộc họp trong tuần này
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingMeetings.slice(0, 3).map((meeting) => (
                      <div
                        key={meeting.id}
                        className="flex items-start space-x-4 p-3 rounded-lg border bg-card"
                      >
                        <Calendar className="h-8 w-8 text-bni-red flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold">{meeting.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(meeting.date).toLocaleDateString('vi-VN')} • {meeting.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
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
                    {recentReferrals.map((referral) => (
                      <TableRow key={referral.id}>
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
                      </TableRow>
                    ))}
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
                  {upcomingMeetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="flex items-start space-x-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
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
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LT Reports Tab */}
          <TabsContent value="lt-reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-bni-red" />
                  Báo cáo Leadership Team
                </CardTitle>
                <CardDescription>
                  Nhập báo cáo hoạt động theo từng vị trí LT
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lt-position">Vị trí LT</Label>
                      <Select>
                        <SelectTrigger id="lt-position">
                          <SelectValue placeholder="Chọn vị trí" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="president">President (Chủ tịch)</SelectItem>
                          <SelectItem value="vice-president">Vice President (Phó Chủ tịch)</SelectItem>
                          <SelectItem value="secretary">Secretary/Treasurer (Thư ký/Thủ quỹ)</SelectItem>
                          <SelectItem value="membership">Membership Coordinator (Điều phối viên thành viên)</SelectItem>
                          <SelectItem value="visitor">Visitor Host (Tiếp khách)</SelectItem>
                          <SelectItem value="education">Education Coordinator (Điều phối viên đào tạo)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="report-period">Kỳ báo cáo</Label>
                      <Input type="date" id="report-period" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="report-title">Tiêu đề báo cáo</Label>
                    <Input 
                      id="report-title" 
                      placeholder="Ví dụ: Báo cáo hoạt động tháng 10/2025"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="achievements">Thành tích đạt được</Label>
                    <Textarea 
                      id="achievements"
                      placeholder="Mô tả các thành tích, mục tiêu đã hoàn thành..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="challenges">Thách thức gặp phải</Label>
                    <Textarea 
                      id="challenges"
                      placeholder="Các khó khăn, vấn đề cần giải quyết..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="next-steps">Kế hoạch tiếp theo</Label>
                    <Textarea 
                      id="next-steps"
                      placeholder="Kế hoạch hành động cho kỳ tiếp theo..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="metric-1">Chỉ số 1</Label>
                      <Input 
                        id="metric-1" 
                        type="number"
                        placeholder="Ví dụ: Số lượng referrals"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metric-2">Chỉ số 2</Label>
                      <Input 
                        id="metric-2" 
                        type="number"
                        placeholder="Ví dụ: Số khách mời"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metric-3">Chỉ số 3</Label>
                      <Input 
                        id="metric-3" 
                        type="number"
                        placeholder="Ví dụ: Số 1-to-1"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="outline">
                      Hủy
                    </Button>
                    <Button type="submit" className="bg-bni-red hover:bg-bni-red/90">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Gửi báo cáo
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Danh sách báo cáo đã gửi */}
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử báo cáo</CardTitle>
                <CardDescription>
                  Các báo cáo đã được gửi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ngày</TableHead>
                      <TableHead>Vị trí</TableHead>
                      <TableHead>Tiêu đề</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>01/10/2025</TableCell>
                      <TableCell>President</TableCell>
                      <TableCell>Báo cáo tháng 9/2025</TableCell>
                      <TableCell>
                        <Badge>Đã duyệt</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Xem</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>01/09/2025</TableCell>
                      <TableCell>Membership Coordinator</TableCell>
                      <TableCell>Báo cáo tháng 8/2025</TableCell>
                      <TableCell>
                        <Badge>Đã duyệt</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Xem</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>01/08/2025</TableCell>
                      <TableCell>Visitor Host</TableCell>
                      <TableCell>Báo cáo tháng 7/2025</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Chờ duyệt</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Xem</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
              </div>
            ) : (
              <Outlet />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
