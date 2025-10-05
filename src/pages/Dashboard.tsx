import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Calendar, Award, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

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
  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-bni-gold/5 to-background">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-bni-red text-white py-6 px-4 md:px-8 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">BNI Dashboard</h1>
                <p className="text-white/80 mt-1">Quản lý hoạt động Chapter</p>
              </div>
              <Link to="/">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Về trang chủ
                </Button>
              </Link>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        <Tabs defaultValue="referrals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="meetings">Lịch họp</TabsTrigger>
            <TabsTrigger value="members">Thành viên</TabsTrigger>
          </TabsList>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="space-y-4">
            <Card className="text-rose-700">
              <CardHeader className="text-gray-900">
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

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-4">
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
          </main>
        </div>
      </div>
    </SidebarProvider>;
};
export default Dashboard;