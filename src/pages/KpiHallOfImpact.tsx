import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Menu, X, Trophy, Star, Users, TrendingUp, Download, Target, Award, Crown, Zap, Calendar, FileText, BarChart3, PieChart, ArrowUp, ArrowDown, Medal, Filter, UserPlus, Gift } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
const KpiHallOfImpact = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('vi');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguage = () => setLanguage(language === 'vi' ? 'en' : 'vi');
  const text = {
    vi: {
      nav: {
        home: "Trang chủ",
        about: "Giới thiệu",
        members: "Thành viên",
        schedule: "Lịch họp",
        media: "Media Hub",
        contact: "Liên hệ",
        kpi: "KPI & Vinh danh"
      },
      title: "KPI & Hall of Impact",
      subtitle: "Bảng thành tích và vinh danh thành viên xuất sắc BNI FELIX",
      kpiOverview: {
        title: "Tổng quan KPI Chapter",
        period: "Chọn kỳ báo cáo",
        week: "Tuần này",
        month: "Tháng này",
        quarter: "Quý này",
        year: "Năm này",
        totalReferrals: "Tổng Referral trao đi",
        referralReceived: "Referral nhận về",
        referralValue: "Doanh thu từ Referral",
        meetings: "Cuộc họp 1-1",
        attendance: "Tỷ lệ tham dự",
        filters: "Bộ lọc",
        allMembers: "Tất cả thành viên",
        byIndustry: "Theo ngành nghề",
        byTime: "Theo thời gian"
      },
      kpiDetails: {
        title: "Bảng KPI Chi Tiết Thành Viên",
        member: "Thành viên",
        industry: "Ngành nghề",
        referralsGiven: "Referral trao",
        referralsReceived: "Referral nhận",
        value: "Doanh thu (VNĐ)",
        oneonone: "Cuộc họp 1-1",
        attendance: "Tham dự (%)",
        growth: "Tăng trưởng"
      },
      hallOfFame: {
        title: "Hall of Impact - Bảng Vinh Danh FELIX",
        referralLeader: "Referral Leader",
        topConnector: "Top Connector",
        topOneOne: "Top 1-1 Connect",
        mvpMonth: "MVP Tháng",
        specialAchievements: "Đóng góp đặc biệt",
        newMemberIntro: "Giới thiệu thành viên mới",
        sponsorship: "Đối tác tài trợ",
        milestoneAchieved: "Cột mốc doanh số",
        viewProfile: "Xem hồ sơ",
        connect: "Kết nối",
        nominate: "Đề cử"
      },
      personalKpi: {
        title: "KPI Cá Nhân",
        subtitle: "Dashboard theo dõi thành tích cá nhân",
        viewMyKpi: "Xem KPI của tôi",
        personalGrowth: "Tăng trưởng cá nhân",
        meetingHistory: "Lịch sử tham dự",
        connectionHistory: "Lịch sử kết nối 1-1"
      },
      charts: {
        title: "Biểu Đồ KPI Động",
        referralTrend: "Xu hướng Referral",
        revenueTrend: "Xu hướng Doanh thu",
        meetingTrend: "Xu hướng Cuộc họp 1-1"
      },
      actions: {
        viewChartKpi: "Xem biểu đồ KPI",
        viewHallOfFame: "Xem bảng vinh danh",
        nominateMember: "Đề cử thành viên",
        downloadReport: "Tải báo cáo tháng",
        viewPersonalKpi: "Xem KPI cá nhân",
        exportData: "Xuất dữ liệu Excel"
      }
    },
    en: {
      nav: {
        home: "Home",
        about: "About",
        members: "Members",
        schedule: "Schedule",
        media: "Media Hub",
        contact: "Contact",
        kpi: "KPI & Recognition"
      },
      title: "KPI & Hall of Impact",
      subtitle: "Performance dashboard and recognition of outstanding BNI FELIX members",
      kpiOverview: {
        title: "Chapter KPI Overview",
        period: "Select reporting period",
        week: "This Week",
        month: "This Month",
        quarter: "This Quarter",
        year: "This Year",
        totalReferrals: "Total Referrals Given",
        referralReceived: "Referrals Received",
        referralValue: "Revenue from Referrals",
        meetings: "1-1 Meetings",
        attendance: "Attendance Rate",
        filters: "Filters",
        allMembers: "All Members",
        byIndustry: "By Industry",
        byTime: "By Time"
      },
      kpiDetails: {
        title: "Detailed Member KPI Table",
        member: "Member",
        industry: "Industry",
        referralsGiven: "Referrals Given",
        referralsReceived: "Referrals Received",
        value: "Revenue (VND)",
        oneonone: "1-1 Meetings",
        attendance: "Attendance (%)",
        growth: "Growth"
      },
      hallOfFame: {
        title: "Hall of Impact - FELIX Recognition Board",
        referralLeader: "Referral Leader",
        topConnector: "Top Connector",
        topOneOne: "Top 1-1 Connect",
        mvpMonth: "MVP of Month",
        specialAchievements: "Special Contributions",
        newMemberIntro: "New Member Introduction",
        sponsorship: "Sponsorship Partner",
        milestoneAchieved: "Sales Milestone",
        viewProfile: "View Profile",
        connect: "Connect",
        nominate: "Nominate"
      },
      personalKpi: {
        title: "Personal KPI",
        subtitle: "Personal performance tracking dashboard",
        viewMyKpi: "View My KPI",
        personalGrowth: "Personal Growth",
        meetingHistory: "Meeting History",
        connectionHistory: "1-1 Connection History"
      },
      charts: {
        title: "Dynamic KPI Charts",
        referralTrend: "Referral Trend",
        revenueTrend: "Revenue Trend",
        meetingTrend: "1-1 Meeting Trend"
      },
      actions: {
        viewChartKpi: "View KPI Charts",
        viewHallOfFame: "View Hall of Fame",
        nominateMember: "Nominate Member",
        downloadReport: "Download Monthly Report",
        viewPersonalKpi: "View Personal KPI",
        exportData: "Export Excel Data"
      }
    }
  };
  const currentText = text[language];

  // Chart data
  const chartData = [{
    month: "Jan",
    referrals: 45,
    revenue: 1200,
    meetings: 32
  }, {
    month: "Feb",
    referrals: 52,
    revenue: 1450,
    meetings: 38
  }, {
    month: "Mar",
    referrals: 48,
    revenue: 1350,
    meetings: 35
  }, {
    month: "Apr",
    referrals: 61,
    revenue: 1680,
    meetings: 42
  }, {
    month: "May",
    referrals: 58,
    revenue: 1580,
    meetings: 40
  }, {
    month: "Jun",
    referrals: 67,
    revenue: 1820,
    meetings: 45
  }];
  const kpiData = [{
    id: 1,
    name: "Nguyễn Văn A",
    company: "ABC Marketing",
    industry: "Marketing & Digital",
    referralsGiven: 15,
    referralsReceived: 12,
    value: "450,000,000",
    oneonone: 8,
    attendance: 95,
    growth: 22,
    avatar: "photo-1472099645785-5658abf4ff4e"
  }, {
    id: 2,
    name: "Trần Thị B",
    company: "XYZ Solutions",
    industry: "IT & Technology",
    referralsGiven: 12,
    referralsReceived: 10,
    value: "320,000,000",
    oneonone: 6,
    attendance: 88,
    growth: 15,
    avatar: "photo-1494790108755-2616b612b786"
  }, {
    id: 3,
    name: "Lê Minh C",
    company: "Legal Partners",
    industry: "Legal Services",
    referralsGiven: 10,
    referralsReceived: 8,
    value: "280,000,000",
    oneonone: 7,
    attendance: 92,
    growth: 18,
    avatar: "photo-1507003211169-0a1dd7228f2d"
  }];
  const hallOfFameData = {
    referralLeader: {
      name: "Nguyễn Văn A",
      company: "ABC Marketing",
      achievement: "15 referrals",
      industry: "Marketing & Digital",
      avatar: "photo-1472099645785-5658abf4ff4e"
    },
    topConnector: {
      name: "Trần Thị B",
      company: "XYZ Solutions",
      achievement: "12 referrals nhận",
      industry: "IT & Technology",
      avatar: "photo-1494790108755-2616b612b786"
    },
    topOneOne: {
      name: "Lê Minh C",
      company: "Legal Partners",
      achievement: "12 cuộc họp 1-1",
      industry: "Legal Services",
      avatar: "photo-1507003211169-0a1dd7228f2d"
    },
    mvpMonth: {
      name: "Phạm Thị D",
      company: "Creative Studio",
      achievement: "95% điểm tổng hợp",
      industry: "Design & Creative",
      avatar: "photo-1438761681033-6461ffad8d80"
    }
  };
  const specialAchievements = [{
    name: "Hoàng Văn E",
    company: "Finance Group",
    achievement: "Giới thiệu 5 thành viên mới",
    type: "newMember",
    avatar: "photo-1560250097-0b93528c311a"
  }, {
    name: "Ngô Thị F",
    company: "Event Solutions",
    achievement: "Đối tác tài trợ chính",
    type: "sponsor",
    avatar: "photo-1580489944761-15a19d654956"
  }, {
    name: "Vũ Minh G",
    company: "Real Estate Pro",
    achievement: "Đạt 1 tỷ VNĐ referral",
    type: "milestone",
    avatar: "photo-1519085360753-af0119f7cbe7"
  }];
  return <div className="min-h-screen bg-background font-inter">
      {/* Header */}
      <header className="bg-[#D71920] shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-white">
                BNI <span className="text-[#FFFFFF]">FELIX</span>
              </div>
            </div>
            
            {/* Language Toggle */}
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={toggleLanguage} className="text-white hover:text-[#2E2E2E] transition-colors text-sm bg-white/20 px-3 py-1 rounded">
                {language === 'vi' ? 'EN' : 'VI'}
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-white hover:text-[#2E2E2E] transition-colors">{currentText.nav.home}</a>
              <a href="/about" className="text-white hover:text-[#2E2E2E] transition-colors">{currentText.nav.about}</a>
              <a href="/members" className="text-white hover:text-[#2E2E2E] transition-colors">{currentText.nav.members}</a>
              <a href="/schedule" className="text-white hover:text-[#2E2E2E] transition-colors">{currentText.nav.schedule}</a>
              <a href="/kpi-hall-of-impact" className="text-[#2E2E2E] bg-white px-3 py-1 rounded transition-colors">{currentText.nav.kpi}</a>
              <a href="#contact" className="text-white hover:text-[#2E2E2E] transition-colors">{currentText.nav.contact}</a>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-white">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden bg-[#D71920] border-t border-[#8B0000]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 text-white hover:text-[#2E2E2E]">{currentText.nav.home}</a>
              <a href="/about" className="block px-3 py-2 text-white hover:text-[#2E2E2E]">{currentText.nav.about}</a>
              <a href="/members" className="block px-3 py-2 text-white hover:text-[#2E2E2E]">{currentText.nav.members}</a>
              <a href="/schedule" className="block px-3 py-2 text-white hover:text-[#2E2E2E]">{currentText.nav.schedule}</a>
              <a href="/kpi-hall-of-impact" className="block px-3 py-2 text-[#2E2E2E] bg-white rounded">{currentText.nav.kpi}</a>
              <a href="#contact" className="block px-3 py-2 text-white hover:text-[#2E2E2E]">{currentText.nav.contact}</a>
              <button onClick={toggleLanguage} className="block px-3 py-2 text-white hover:text-[#2E2E2E] text-left w-full">
                {language === 'vi' ? 'English' : 'Tiếng Việt'}
              </button>
            </div>
          </div>}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#D71920] via-[#8B0000] to-[#D71920] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <Trophy className="w-16 h-16 text-[#FFFFFF]" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              {currentText.title}
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              {currentText.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* KPI Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#D71920]">{currentText.kpiOverview.title}</h2>
            
            {/* Period and Filter Selectors */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['week', 'month', 'quarter', 'year'].map(period => <button key={period} onClick={() => setSelectedPeriod(period)} className={`px-4 py-2 rounded-md transition-colors ${selectedPeriod === period ? 'bg-[#D71920] text-white' : 'text-[#D71920] hover:bg-gray-200'}`}>
                    {currentText.kpiOverview[period]}
                  </button>)}
              </div>
              
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['all', 'byIndustry', 'byTime'].map(filter => <button key={filter} onClick={() => setSelectedFilter(filter)} className={`px-4 py-2 rounded-md transition-colors ${selectedFilter === filter ? 'bg-[#8B0000] text-white' : 'text-[#8B0000] hover:bg-gray-200'}`}>
                    {filter === 'all' ? currentText.kpiOverview.allMembers : filter === 'byIndustry' ? currentText.kpiOverview.byIndustry : currentText.kpiOverview.byTime}
                  </button>)}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            <Card className="border-[#D71920] shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-3">
                <TrendingUp className="w-8 h-8 text-[#D71920] mx-auto mb-2" />
                <CardTitle className="text-sm text-[#2E2E2E]">{currentText.kpiOverview.totalReferrals}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <div className="text-2xl font-bold text-[#D71920]">127</div>
                <div className="flex items-center justify-center mt-1">
                  <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+12%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#8B0000] shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-3">
                <Target className="w-8 h-8 text-[#8B0000] mx-auto mb-2" />
                <CardTitle className="text-sm text-[#2E2E2E]">{currentText.kpiOverview.referralReceived}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <div className="text-2xl font-bold text-[#8B0000]">89</div>
                <div className="flex items-center justify-center mt-1">
                  <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+8%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#D71920] shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-3">
                <BarChart3 className="w-8 h-8 text-[#D71920] mx-auto mb-2" />
                <CardTitle className="text-sm text-[#2E2E2E]">{currentText.kpiOverview.referralValue}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <div className="text-2xl font-bold text-[#D71920]">2.1B</div>
                <div className="flex items-center justify-center mt-1">
                  <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+15%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#2E2E2E] shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-3">
                <Users className="w-8 h-8 text-[#2E2E2E] mx-auto mb-2" />
                <CardTitle className="text-sm text-[#2E2E2E]">{currentText.kpiOverview.meetings}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <div className="text-2xl font-bold text-[#2E2E2E]">156</div>
                <div className="flex items-center justify-center mt-1">
                  <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+22%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#8B0000] shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-3">
                <Calendar className="w-8 h-8 text-[#8B0000] mx-auto mb-2" />
                <CardTitle className="text-sm text-[#2E2E2E]">{currentText.kpiOverview.attendance}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <div className="text-2xl font-bold text-[#8B0000]">95%</div>
                <div className="flex items-center justify-center mt-1">
                  <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+3%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dynamic Charts Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#D71920]">{currentText.charts.title}</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="border-[#D71920] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#D71920] flex items-center">
                  <TrendingUp className="mr-2" size={20} />
                  {currentText.charts.referralTrend}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{
                referrals: {
                  label: "Referrals",
                  color: "#D71920"
                }
              }} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="referrals" stroke="#D71920" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="border-[#8B0000] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#8B0000] flex items-center">
                  <BarChart3 className="mr-2" size={20} />
                  {currentText.charts.revenueTrend}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{
                revenue: {
                  label: "Revenue",
                  color: "#8B0000"
                }
              }} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="revenue" fill="#8B0000" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* KPI Details Table */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#D71920]">{currentText.kpiDetails.title}</h2>
          </div>

          <Card className="border-[#D71920] shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#D71920]">
                      <TableHead className="text-white">{currentText.kpiDetails.member}</TableHead>
                      <TableHead className="text-white">{currentText.kpiDetails.industry}</TableHead>
                      <TableHead className="text-white text-center">{currentText.kpiDetails.referralsGiven}</TableHead>
                      <TableHead className="text-white text-center">{currentText.kpiDetails.referralsReceived}</TableHead>
                      <TableHead className="text-white text-center">{currentText.kpiDetails.value}</TableHead>
                      <TableHead className="text-white text-center">{currentText.kpiDetails.oneonone}</TableHead>
                      <TableHead className="text-white text-center">{currentText.kpiDetails.attendance}</TableHead>
                      <TableHead className="text-white text-center">{currentText.kpiDetails.growth}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kpiData.map((member, index) => <TableRow key={member.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10 border-2 border-[#D71920]">
                              <AvatarImage src={`https://images.unsplash.com/${member.avatar}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold text-[#2E2E2E]">{member.name}</div>
                              <div className="text-xs text-gray-500">{member.company}</div>
                              {index === 0 && <Badge className="bg-[#D71920] text-white text-xs mt-1">🏆 Top Performer</Badge>}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-[#8B0000]">{member.industry}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="border-[#D71920] text-[#D71920]">
                            {member.referralsGiven}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="border-[#8B0000] text-[#8B0000]">
                            {member.referralsReceived}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-[#2E2E2E]">{member.value}</TableCell>
                        <TableCell className="text-center text-[#D71920]">{member.oneonone}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={`${member.attendance >= 90 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {member.attendance}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-green-500 font-semibold">{member.growth}%</span>
                          </div>
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Hall of Fame Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#D71920]">{currentText.hallOfFame.title}</h2>
          </div>

          {/* Main Awards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="border-[#D71920] shadow-lg hover:shadow-xl transition-all duration-300 group bg-gradient-to-b from-white to-red-50">
              <CardHeader className="text-center">
                <Trophy className="w-12 h-12 text-[#D71920] mx-auto mb-4" />
                <CardTitle className="text-[#2E2E2E]">{currentText.hallOfFame.referralLeader}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <Avatar className="w-20 h-20 mx-auto border-4 border-[#D71920] group-hover:scale-110 transition-transform duration-300">
                  <AvatarImage src={`https://images.unsplash.com/${hallOfFameData.referralLeader.avatar}?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80`} />
                  <AvatarFallback>{hallOfFameData.referralLeader.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-[#2E2E2E]">{hallOfFameData.referralLeader.name}</h3>
                  <p className="text-sm text-[#8B0000]">{hallOfFameData.referralLeader.company}</p>
                  <p className="text-xs text-gray-500">{hallOfFameData.referralLeader.industry}</p>
                  <Badge className="bg-[#D71920] text-white mt-2">{hallOfFameData.referralLeader.achievement}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-[#D71920] hover:bg-[#8B0000] flex-1">
                    {currentText.hallOfFame.viewProfile}
                  </Button>
                  <Button size="sm" variant="outline" className="border-[#D71920] text-[#D71920] hover:bg-[#D71920] hover:text-white flex-1">
                    {currentText.hallOfFame.connect}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#8B0000] shadow-lg hover:shadow-xl transition-all duration-300 group bg-gradient-to-b from-white to-red-50">
              <CardHeader className="text-center">
                <Target className="w-12 h-12 text-[#8B0000] mx-auto mb-4" />
                <CardTitle className="text-[#2E2E2E]">{currentText.hallOfFame.topConnector}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <Avatar className="w-20 h-20 mx-auto border-4 border-[#8B0000] group-hover:scale-110 transition-transform duration-300">
                  <AvatarImage src={`https://images.unsplash.com/${hallOfFameData.topConnector.avatar}?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80`} />
                  <AvatarFallback>{hallOfFameData.topConnector.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-[#2E2E2E]">{hallOfFameData.topConnector.name}</h3>
                  <p className="text-sm text-[#8B0000]">{hallOfFameData.topConnector.company}</p>
                  <p className="text-xs text-gray-500">{hallOfFameData.topConnector.industry}</p>
                  <Badge className="bg-[#8B0000] text-white mt-2">{hallOfFameData.topConnector.achievement}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-[#8B0000] hover:bg-[#D71920] flex-1">
                    {currentText.hallOfFame.viewProfile}
                  </Button>
                  <Button size="sm" variant="outline" className="border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white flex-1">
                    {currentText.hallOfFame.connect}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#2E2E2E] shadow-lg hover:shadow-xl transition-all duration-300 group bg-gradient-to-b from-white to-gray-50">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 text-[#2E2E2E] mx-auto mb-4" />
                <CardTitle className="text-[#2E2E2E]">{currentText.hallOfFame.topOneOne}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <Avatar className="w-20 h-20 mx-auto border-4 border-[#2E2E2E] group-hover:scale-110 transition-transform duration-300">
                  <AvatarImage src={`https://images.unsplash.com/${hallOfFameData.topOneOne.avatar}?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80`} />
                  <AvatarFallback>{hallOfFameData.topOneOne.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-[#2E2E2E]">{hallOfFameData.topOneOne.name}</h3>
                  <p className="text-sm text-[#8B0000]">{hallOfFameData.topOneOne.company}</p>
                  <p className="text-xs text-gray-500">{hallOfFameData.topOneOne.industry}</p>
                  <Badge className="bg-[#2E2E2E] text-white mt-2">{hallOfFameData.topOneOne.achievement}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-[#2E2E2E] hover:bg-[#D71920] flex-1">
                    {currentText.hallOfFame.viewProfile}
                  </Button>
                  <Button size="sm" variant="outline" className="border-[#2E2E2E] text-[#2E2E2E] hover:bg-[#2E2E2E] hover:text-white flex-1">
                    {currentText.hallOfFame.connect}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#D71920] shadow-lg hover:shadow-xl transition-all duration-300 group bg-gradient-to-b from-yellow-50 to-red-50">
              <CardHeader className="text-center">
                <Crown className="w-12 h-12 text-[#D71920] mx-auto mb-4" />
                <CardTitle className="text-[#2E2E2E]">{currentText.hallOfFame.mvpMonth}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <Avatar className="w-20 h-20 mx-auto border-4 border-[#D71920] group-hover:scale-110 transition-transform duration-300">
                  <AvatarImage src={`https://images.unsplash.com/${hallOfFameData.mvpMonth.avatar}?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80`} />
                  <AvatarFallback>{hallOfFameData.mvpMonth.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-[#2E2E2E]">{hallOfFameData.mvpMonth.name}</h3>
                  <p className="text-sm text-[#8B0000]">{hallOfFameData.mvpMonth.company}</p>
                  <p className="text-xs text-gray-500">{hallOfFameData.mvpMonth.industry}</p>
                  <Badge className="bg-gradient-to-r from-[#D71920] to-[#8B0000] text-white mt-2">{hallOfFameData.mvpMonth.achievement}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-[#D71920] hover:bg-[#8B0000] flex-1">
                    {currentText.hallOfFame.viewProfile}
                  </Button>
                  <Button size="sm" variant="outline" className="border-[#D71920] text-[#D71920] hover:bg-[#D71920] hover:text-white flex-1">
                    {currentText.hallOfFame.connect}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Special Achievements */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#D71920] text-center mb-8">{currentText.hallOfFame.specialAchievements}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {specialAchievements.map((achievement, index) => <Card key={index} className="border-[#8B0000] shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-4 border-2 border-[#8B0000]">
                      <AvatarImage src={`https://images.unsplash.com/${achievement.avatar}?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80`} />
                      <AvatarFallback>{achievement.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold text-[#2E2E2E] mb-1">{achievement.name}</h4>
                    <p className="text-sm text-[#8B0000] mb-2">{achievement.company}</p>
                    <Badge className={`${achievement.type === 'newMember' ? 'bg-blue-100 text-blue-800' : achievement.type === 'sponsor' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                      {achievement.achievement}
                    </Badge>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </div>
      </section>

      {/* Personal KPI Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#D71920]">{currentText.personalKpi.title}</h2>
            <p className="text-lg text-[#2E2E2E] mb-8">{currentText.personalKpi.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-[#D71920] shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <BarChart3 className="w-12 h-12 text-[#D71920] mx-auto mb-4" />
                <CardTitle className="text-[#2E2E2E]">{currentText.personalKpi.personalGrowth}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-[#D71920] mb-2">+22%</div>
                <p className="text-[#2E2E2E]">So với tháng trước</p>
                <Button className="mt-4 bg-[#D71920] hover:bg-[#8B0000] w-full">
                  {currentText.personalKpi.viewMyKpi}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-[#8B0000] shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <Calendar className="w-12 h-12 text-[#8B0000] mx-auto mb-4" />
                <CardTitle className="text-[#2E2E2E]">{currentText.personalKpi.meetingHistory}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-[#8B0000] mb-2">95%</div>
                <p className="text-[#2E2E2E]">Tỷ lệ tham dự</p>
                <Button variant="outline" className="mt-4 border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white w-full">
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>

            <Card className="border-[#2E2E2E] shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 text-[#2E2E2E] mx-auto mb-4" />
                <CardTitle className="text-[#2E2E2E]">{currentText.personalKpi.connectionHistory}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-[#2E2E2E] mb-2">24</div>
                <p className="text-[#2E2E2E]">Cuộc họp 1-1</p>
                <Button variant="outline" className="mt-4 border-[#2E2E2E] text-[#2E2E2E] hover:bg-[#2E2E2E] hover:text-white w-full">
                  Đặt lịch mới
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Actions Section */}
      <section className="py-20 bg-[#D71920] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Hành Động & Báo Cáo KPI</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button size="lg" className="bg-white text-[#D71920] hover:bg-gray-100 font-semibold">
              <BarChart3 className="mr-2" size={20} />
              {currentText.actions.viewChartKpi}
            </Button>
            <Button size="lg" className="bg-[#8B0000] hover:bg-[#2E2E2E]">
              <Trophy className="mr-2" size={20} />
              {currentText.actions.viewHallOfFame}
            </Button>
            <Button size="lg" variant="outline" className="border-white hover:bg-white text-red-600">
              <UserPlus className="mr-2" size={20} />
              {currentText.actions.nominateMember}
            </Button>
            <Button size="lg" variant="outline" className="border-white hover:bg-white text-red-600">
              <Download className="mr-2" size={20} />
              {currentText.actions.downloadReport}
            </Button>
            <Button size="lg" className="bg-[#2E2E2E] hover:bg-[#8B0000]">
              <Users className="mr-2" size={20} />
              {currentText.actions.viewPersonalKpi}
            </Button>
            <Button size="lg" variant="outline" className="border-white hover:bg-white text-red-600">
              <FileText className="mr-2" size={20} />
              {currentText.actions.exportData}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2E2E2E] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                BNI <span className="text-[#D71920]">FELIX</span>
              </div>
              <p className="text-white/70">
                Chapter chuyên nghiệp thuộc BNI Hanoi 6
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[#D71920]">Liên kết</h3>
              <div className="space-y-2 text-white/70">
                <p>🌍 BNI Global</p>
                <p>🇻🇳 BNI Vietnam</p>
                <p>🏢 BNI Hanoi 6</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[#D71920]">Địa điểm họp</h3>
              <p className="text-white/70">
                📍 Cung Văn Hóa Hữu Nghị Việt Xô<br />
                91 Trần Hưng Đạo<br />
                Hoàn Kiếm, Hà Nội
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[#D71920]">Liên hệ</h3>
              <div className="space-y-2 text-white/70">
                <p>📞 Hotline</p>
                <p>📧 Email</p>
                <p>📱 Zalo OA</p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#D71920] mt-12 pt-8 text-center text-white/70">
            <p>© 2025 BNI FELIX Chapter. All rights reserved.</p>
            <p className="mt-2">🔒 Chính sách bảo mật | Điều khoản sử dụng</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default KpiHallOfImpact;