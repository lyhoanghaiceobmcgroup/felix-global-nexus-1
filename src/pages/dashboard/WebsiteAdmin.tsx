import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Globe, Home, Info, Users, Calendar, Trophy, Image, Mail, Save, Upload, Edit, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export default function WebsiteAdmin() {
  const [activeTab, setActiveTab] = useState("home");
  const [isSaving, setIsSaving] = useState(false);

  // Home Page Content - đồng bộ với Index.tsx
  const [homeContent, setHomeContent] = useState({
    // Hero Section
    heroTitle: "FELIX Chapter – Nơi kết nối kinh doanh vững mạnh",
    heroSubtitle: "Chapter chuyên nghiệp thuộc BNI Vietnam - Xây dựng mạng lưới kinh doanh bền vững thông qua việc trao referral chất lượng",
    heroImage: "/src/assets/bni-meeting-hero.jpg",
    
    // Quick Intro Section
    introTitle: "Giới thiệu Chapter FELIX",
    introDescription: "FELIX Chapter là cộng đồng doanh nhân chuyên nghiệp, nơi các thành viên xây dựng mối quan hệ kinh doanh bền vững. Chúng tôi cam kết tạo ra môi trường tin cậy để các doanh nghiệp phát triển thông qua referral chất lượng và hỗ trợ lẫn nhau.",
    
    // Stats
    stats: [
      { label: "Thành viên", value: "35+", icon: "Users" },
      { label: "Referral/tháng", value: "120+", icon: "TrendingUp" },
      { label: "Doanh thu tạo ra", value: "15B+", icon: "BarChart3" }
    ],
    
    // Schedule Info
    nextMeetingDate: "Thứ 3, 18/06/2024",
    nextMeetingTime: "6:45 AM - 8:45 AM",
    nextSpeaker: "Nguyễn Văn A",
    nextTopic: "Chiến lược Marketing 2024",
    
    // Featured Members
    featuredMembers: [
      { name: "Nguyễn Văn A", industry: "Marketing Digital", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
      { name: "Trần Thị B", industry: "Thiết kế nội thất", avatar: "/placeholder.svg" },
      { name: "Lê Minh C", industry: "Tư vấn tài chính", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
      { name: "Phạm Thu D", industry: "Bất động sản", avatar: "/placeholder.svg" },
      { name: "Hoàng Văn E", industry: "Công nghệ IT", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" }
    ],
    
    // KPI Section
    kpiReferralCompletion: 85,
    kpiOneOnOneCompletion: 92,
    memberOfWeek: "Nguyễn Văn A",
    
    // Open Industries
    openIndustries: ["Luật sư/Tư vấn pháp lý", "Bảo hiểm", "Dịch vụ kế toán", "In ấn/Quảng cáo", "Vận tải/Logistics", "Y tế/Sức khỏe"]
  });

  // About Page Content - đồng bộ với About.tsx
  const [aboutContent, setAboutContent] = useState({
    heroTitle: "Giới thiệu Chapter FELIX",
    heroSubtitle: "Kết nối cộng đồng doanh nghiệp thành công - bền vững - nhân văn",
    mission: "Kết nối cộng đồng doanh nghiệp thành công – bền vững – nhân văn.",
    vision: "Trở thành chapter dẫn đầu về chỉ số Referral, văn hóa kết nối và giá trị cộng đồng trong hệ thống BNI toàn quốc.",
    coreValuesTitle: "Giá trị cốt lõi của BNI (BNI Core Values)",
    values: [
      { name: "Givers Gain® – Cho là Nhận", icon: "Heart" },
      { name: "Xây dựng mối quan hệ lâu dài", icon: "Heart" },
      { name: "Trách nhiệm & Cam kết", icon: "Target" },
      { name: "Truyền cảm hứng & hỗ trợ", icon: "TrendingUp" },
      { name: "Tư duy tích cực", icon: "Star" },
      { name: "Gắn bó với trách nhiệm cộng đồng", icon: "Users" },
      { name: "Công nhận thành tựu", icon: "Award" }
    ],
    timelineTitle: "Lịch sử hình thành Chapter FELIX",
    timeline: [
      { year: "2020", presidentA: "Nguyễn Văn A", presidentB: "Lê Minh T", achievement: "Thành lập FELIX với 21 thành viên ban đầu", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
      { year: "2021", presidentA: "Trần Thị B", presidentB: "Nguyễn Hữu D", achievement: "Mở rộng lên 35 thành viên, xây dựng văn hóa 1-1", avatar: "/placeholder.svg" },
      { year: "2022", presidentA: "Lê Quốc C", presidentB: "Trịnh Thu Yến", achievement: "Vượt KPI BNI Vietnam, truyền thông mạnh mẽ", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
      { year: "2023", presidentA: "Phạm Dương D", presidentB: "Đặng Quốc K", achievement: "Tổ chức hội thảo FELIX CONNECT 300+ người", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
      { year: "2024", presidentA: "Vũ Mai E", presidentB: "Nguyễn Đức N", achievement: "Gắn kết hệ sinh thái đối tác, doanh thu Referral cao nhất miền Bắc", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
      { year: "2025", presidentA: "Đinh Trí F", presidentB: "Trần Thái Hưng", achievement: "Chuyển đổi số toàn diện – tối ưu dashboard hoạt động", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" }
    ],
    highlightsTitle: "Các điểm nổi bật FELIX hiện tại",
    highlights: [
      { label: "53+ thành viên, đa ngành nghề", icon: "Users" },
      { label: "Tổng doanh thu Referral đạt >50 tỷ VNĐ", icon: "TrendingUp" },
      { label: "Trung bình 1,200+ Referral/năm, hơn 1,000 cuộc 1-1", icon: "Star" },
      { label: "Top 3 chapter miền Bắc về hiệu quả Referral", icon: "Trophy" }
    ]
  });

  // Contact Info
  const [contactInfo, setContactInfo] = useState({
    phone: "084 890 5555",
    email: "info@bnifelix.vn",
    address: "Cung văn hóa Hữu Nghị Việt Xô, 91 Trần Hưng Đạo, Hà Nội",
    meetingTime: "06:45 – 8:45 (Thứ 3 hàng tuần)",
    facebook: "https://facebook.com/bnifelix",
    youtube: "https://youtube.com/@bnifelix",
    linkedin: "https://linkedin.com/company/bnifelix"
  });

  const handleSave = (section: string) => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success(`Đã lưu thay đổi cho ${section}`);
    }, 1000);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="border-b pb-4 sm:pb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bni-red flex items-center gap-2 sm:gap-3">
              <Globe className="h-8 w-8" />
              <span>QUẢN TRỊ TRANG WEBSITE</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Cập nhật và quản lý nội dung các trang website của BNI FELIX Chapter
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            Chế độ Developer
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 gap-2">
          <TabsTrigger value="home" className="data-[state=active]:bg-bni-red data-[state=active]:text-white">
            <Home className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Trang chủ</span>
          </TabsTrigger>
          <TabsTrigger value="about" className="data-[state=active]:bg-bni-red data-[state=active]:text-white">
            <Info className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Giới thiệu</span>
          </TabsTrigger>
          <TabsTrigger value="members" className="data-[state=active]:bg-bni-red data-[state=active]:text-white">
            <Users className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Thành viên</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-bni-red data-[state=active]:text-white">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Lịch họp</span>
          </TabsTrigger>
          <TabsTrigger value="kpi" className="data-[state=active]:bg-bni-red data-[state=active]:text-white">
            <Trophy className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">KPI Hall</span>
          </TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:bg-bni-red data-[state=active]:text-white">
            <Image className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Media Hub</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-bni-red data-[state=active]:text-white">
            <Mail className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Liên hệ</span>
          </TabsTrigger>
        </TabsList>

        {/* Trang chủ */}
        <TabsContent value="home" className="space-y-6">
          <Card className="shadow-lg border-bni-red border-2">
            <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
              <CardTitle className="flex items-center gap-2">
                <Home className="h-6 w-6 text-bni-red" />
                Quản lý Trang chủ
              </CardTitle>
              <CardDescription>Chỉnh sửa nội dung Hero Section và thông tin tổng quan</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Hero Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Hero Section</h3>
                
                <div className="space-y-2">
                  <Label>Tiêu đề chính *</Label>
                  <Input
                    value={homeContent.heroTitle}
                    onChange={(e) => setHomeContent({...homeContent, heroTitle: e.target.value})}
                    placeholder="Nhập tiêu đề chính"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phụ đề</Label>
                  <Input
                    value={homeContent.heroSubtitle}
                    onChange={(e) => setHomeContent({...homeContent, heroSubtitle: e.target.value})}
                    placeholder="Nhập phụ đề"
                  />
                </div>


                <div className="space-y-2">
                  <Label>Hình ảnh Hero</Label>
                  <div className="flex gap-2">
                    <Input
                      value={homeContent.heroImage}
                      onChange={(e) => setHomeContent({...homeContent, heroImage: e.target.value})}
                      placeholder="URL hình ảnh"
                    />
                    <Button variant="outline">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Intro Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Giới thiệu Chapter</h3>
                
                <div className="space-y-2">
                  <Label>Tiêu đề giới thiệu</Label>
                  <Input
                    value={homeContent.introTitle}
                    onChange={(e) => setHomeContent({...homeContent, introTitle: e.target.value})}
                    placeholder="Nhập tiêu đề giới thiệu"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Mô tả giới thiệu</Label>
                  <Textarea
                    value={homeContent.introDescription}
                    onChange={(e) => setHomeContent({...homeContent, introDescription: e.target.value})}
                    placeholder="Nhập mô tả giới thiệu"
                    rows={4}
                  />
                </div>
              </div>

              {/* Stats Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Thống kê Tổng quan</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {homeContent.stats.map((stat, index) => (
                    <Card key={index} className="border-bni-gold">
                      <CardContent className="pt-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="font-semibold">Chỉ số {index + 1}</Label>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                        <Input
                          placeholder="Nhãn"
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...homeContent.stats];
                            newStats[index].label = e.target.value;
                            setHomeContent({...homeContent, stats: newStats});
                          }}
                        />
                        <Input
                          placeholder="Giá trị"
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...homeContent.stats];
                            newStats[index].value = e.target.value;
                            setHomeContent({...homeContent, stats: newStats});
                          }}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm chỉ số
                </Button>
              </div>

              {/* Schedule Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Lịch họp tuần tới</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ngày họp</Label>
                    <Input
                      value={homeContent.nextMeetingDate}
                      onChange={(e) => setHomeContent({...homeContent, nextMeetingDate: e.target.value})}
                      placeholder="VD: Thứ 3, 18/06/2024"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Giờ họp</Label>
                    <Input
                      value={homeContent.nextMeetingTime}
                      onChange={(e) => setHomeContent({...homeContent, nextMeetingTime: e.target.value})}
                      placeholder="VD: 6:45 AM - 8:45 AM"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Diễn giả</Label>
                    <Input
                      value={homeContent.nextSpeaker}
                      onChange={(e) => setHomeContent({...homeContent, nextSpeaker: e.target.value})}
                      placeholder="Tên diễn giả"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Chủ đề</Label>
                    <Input
                      value={homeContent.nextTopic}
                      onChange={(e) => setHomeContent({...homeContent, nextTopic: e.target.value})}
                      placeholder="Chủ đề trình bày"
                    />
                  </div>
                </div>
              </div>

              {/* Featured Members Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Thành viên nổi bật</h3>
                <div className="space-y-3">
                  {homeContent.featuredMembers.map((member, index) => (
                    <Card key={index} className="border-bni-gold">
                      <CardContent className="pt-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="font-semibold">Thành viên {index + 1}</Label>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <Input
                            placeholder="Tên"
                            value={member.name}
                            onChange={(e) => {
                              const newMembers = [...homeContent.featuredMembers];
                              newMembers[index].name = e.target.value;
                              setHomeContent({...homeContent, featuredMembers: newMembers});
                            }}
                          />
                          <Input
                            placeholder="Ngành nghề"
                            value={member.industry}
                            onChange={(e) => {
                              const newMembers = [...homeContent.featuredMembers];
                              newMembers[index].industry = e.target.value;
                              setHomeContent({...homeContent, featuredMembers: newMembers});
                            }}
                          />
                          <Input
                            placeholder="URL Avatar"
                            value={member.avatar}
                            onChange={(e) => {
                              const newMembers = [...homeContent.featuredMembers];
                              newMembers[index].avatar = e.target.value;
                              setHomeContent({...homeContent, featuredMembers: newMembers});
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm thành viên nổi bật
                </Button>
              </div>

              {/* KPI Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">KPI & Vinh danh</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Hoàn thành Referral (%)</Label>
                    <Input
                      type="number"
                      value={homeContent.kpiReferralCompletion}
                      onChange={(e) => setHomeContent({...homeContent, kpiReferralCompletion: parseInt(e.target.value)})}
                      placeholder="85"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Hoàn thành 1-1 (%)</Label>
                    <Input
                      type="number"
                      value={homeContent.kpiOneOnOneCompletion}
                      onChange={(e) => setHomeContent({...homeContent, kpiOneOnOneCompletion: parseInt(e.target.value)})}
                      placeholder="92"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Thành viên xuất sắc tuần</Label>
                    <Input
                      value={homeContent.memberOfWeek}
                      onChange={(e) => setHomeContent({...homeContent, memberOfWeek: e.target.value})}
                      placeholder="Tên thành viên xuất sắc"
                    />
                  </div>
                </div>
              </div>

              {/* Open Industries Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Ngành nghề trống</h3>
                <div className="space-y-2">
                  {homeContent.openIndustries.map((industry, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={industry}
                        onChange={(e) => {
                          const newIndustries = [...homeContent.openIndustries];
                          newIndustries[index] = e.target.value;
                          setHomeContent({...homeContent, openIndustries: newIndustries});
                        }}
                        placeholder={`Ngành nghề ${index + 1}`}
                      />
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm ngành nghề
                </Button>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline">Xem trước</Button>
                <Button 
                  onClick={() => handleSave("Trang chủ")}
                  disabled={isSaving}
                  className="bg-bni-red hover:bg-bni-red/90 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Giới thiệu */}
        <TabsContent value="about" className="space-y-6">
          <Card className="shadow-lg border-bni-red border-2">
            <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
              <CardTitle className="flex items-center gap-2">
                <Info className="h-6 w-6 text-bni-red" />
                Quản lý Trang Giới thiệu
              </CardTitle>
              <CardDescription>Chỉnh sửa toàn bộ nội dung trang Giới thiệu</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Hero Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Hero Section</h3>
                
                <div className="space-y-2">
                  <Label>Tiêu đề chính</Label>
                  <Input
                    value={aboutContent.heroTitle}
                    onChange={(e) => setAboutContent({...aboutContent, heroTitle: e.target.value})}
                    placeholder="Nhập tiêu đề chính"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phụ đề</Label>
                  <Input
                    value={aboutContent.heroSubtitle}
                    onChange={(e) => setAboutContent({...aboutContent, heroSubtitle: e.target.value})}
                    placeholder="Nhập phụ đề"
                  />
                </div>
              </div>

              {/* Mission & Vision */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Sứ mệnh & Tầm nhìn</h3>
                
                <div className="space-y-2">
                  <Label>Sứ mệnh *</Label>
                  <Textarea
                    value={aboutContent.mission}
                    onChange={(e) => setAboutContent({...aboutContent, mission: e.target.value})}
                    placeholder="Nhập sứ mệnh"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tầm nhìn *</Label>
                  <Textarea
                    value={aboutContent.vision}
                    onChange={(e) => setAboutContent({...aboutContent, vision: e.target.value})}
                    placeholder="Nhập tầm nhìn"
                    rows={3}
                  />
                </div>
              </div>

              {/* Core Values */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Giá trị cốt lõi BNI</h3>
                
                <div className="space-y-2">
                  <Label>Tiêu đề phần giá trị cốt lõi</Label>
                  <Input
                    value={aboutContent.coreValuesTitle}
                    onChange={(e) => setAboutContent({...aboutContent, coreValuesTitle: e.target.value})}
                    placeholder="Tiêu đề"
                  />
                </div>

                <Label className="text-lg font-semibold">Danh sách giá trị cốt lõi (7 giá trị)</Label>
                <div className="space-y-2">
                  {aboutContent.values.map((value, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={value.name}
                        onChange={(e) => {
                          const newValues = [...aboutContent.values];
                          newValues[index].name = e.target.value;
                          setAboutContent({...aboutContent, values: newValues});
                        }}
                        placeholder={`Giá trị ${index + 1}`}
                      />
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm giá trị
                </Button>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Lịch sử hình thành (2020-2025)</h3>
                
                <div className="space-y-2">
                  <Label>Tiêu đề phần lịch sử</Label>
                  <Input
                    value={aboutContent.timelineTitle}
                    onChange={(e) => setAboutContent({...aboutContent, timelineTitle: e.target.value})}
                    placeholder="Tiêu đề lịch sử"
                  />
                </div>

                <div className="space-y-3">
                  {aboutContent.timeline.map((item, index) => (
                    <Card key={index} className="border-bni-gold">
                      <CardContent className="pt-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="font-semibold">Năm {item.year}</Label>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <Input
                            placeholder="Năm"
                            value={item.year}
                            onChange={(e) => {
                              const newTimeline = [...aboutContent.timeline];
                              newTimeline[index].year = e.target.value;
                              setAboutContent({...aboutContent, timeline: newTimeline});
                            }}
                          />
                          <Input
                            placeholder="Chủ tịch A"
                            value={item.presidentA}
                            onChange={(e) => {
                              const newTimeline = [...aboutContent.timeline];
                              newTimeline[index].presidentA = e.target.value;
                              setAboutContent({...aboutContent, timeline: newTimeline});
                            }}
                          />
                          <Input
                            placeholder="Chủ tịch B"
                            value={item.presidentB}
                            onChange={(e) => {
                              const newTimeline = [...aboutContent.timeline];
                              newTimeline[index].presidentB = e.target.value;
                              setAboutContent({...aboutContent, timeline: newTimeline});
                            }}
                          />
                          <Input
                            placeholder="URL Avatar"
                            value={item.avatar}
                            onChange={(e) => {
                              const newTimeline = [...aboutContent.timeline];
                              newTimeline[index].avatar = e.target.value;
                              setAboutContent({...aboutContent, timeline: newTimeline});
                            }}
                          />
                        </div>
                        <Textarea
                          placeholder="Thành tựu"
                          value={item.achievement}
                          onChange={(e) => {
                            const newTimeline = [...aboutContent.timeline];
                            newTimeline[index].achievement = e.target.value;
                            setAboutContent({...aboutContent, timeline: newTimeline});
                          }}
                          rows={2}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm năm mới
                </Button>
              </div>

              {/* Highlights */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Điểm nổi bật FELIX</h3>
                
                <div className="space-y-2">
                  <Label>Tiêu đề phần điểm nổi bật</Label>
                  <Input
                    value={aboutContent.highlightsTitle}
                    onChange={(e) => setAboutContent({...aboutContent, highlightsTitle: e.target.value})}
                    placeholder="Tiêu đề điểm nổi bật"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aboutContent.highlights.map((highlight, index) => (
                    <Card key={index} className="border-bni-gold">
                      <CardContent className="pt-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="font-semibold">Điểm nổi bật {index + 1}</Label>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                        <Input
                          placeholder="Nội dung điểm nổi bật"
                          value={highlight.label}
                          onChange={(e) => {
                            const newHighlights = [...aboutContent.highlights];
                            newHighlights[index].label = e.target.value;
                            setAboutContent({...aboutContent, highlights: newHighlights});
                          }}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm điểm nổi bật
                </Button>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline">Xem trước</Button>
                <Button 
                  onClick={() => handleSave("Giới thiệu")}
                  disabled={isSaving}
                  className="bg-bni-red hover:bg-bni-red/90 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Thành viên */}
        <TabsContent value="members" className="space-y-6">
          <Card className="shadow-lg border-bni-red border-2">
            <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-bni-red" />
                Quản lý Trang Thành viên
              </CardTitle>
              <CardDescription>Quản lý danh sách và thông tin thành viên</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold mb-2">Quản lý thành viên</p>
                <p className="mb-4">Sử dụng trang "Danh sách thành viên" trong Dashboard để quản lý chi tiết</p>
                <Button variant="outline">
                  Đi đến Danh sách thành viên
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lịch họp */}
        <TabsContent value="schedule" className="space-y-6">
          <Card className="shadow-lg border-bni-red border-2">
            <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-bni-red" />
                Quản lý Lịch họp
              </CardTitle>
              <CardDescription>Cập nhật thông tin lịch họp và diễn giả</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>Thời gian họp cố định</Label>
                <Input defaultValue="Thứ Ba hàng tuần, 6:45 AM – 8:45 AM" />
              </div>

              <div className="space-y-2">
                <Label>Địa điểm họp</Label>
                <Textarea
                  defaultValue="Cung Văn Hóa Hữu Nghị Việt Xô, số 91 Trần Hưng Đạo, Hà Nội"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Link Google Maps</Label>
                <Input placeholder="https://maps.google.com/..." />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline">Xem trước</Button>
                <Button 
                  onClick={() => handleSave("Lịch họp")}
                  disabled={isSaving}
                  className="bg-bni-red hover:bg-bni-red/90 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* KPI Hall */}
        <TabsContent value="kpi" className="space-y-6">
          <Card className="shadow-lg border-bni-red border-2">
            <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-bni-red" />
                Quản lý KPI & Hall of Impact
              </CardTitle>
              <CardDescription>Cập nhật tiêu đề và mô tả trang</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>Tiêu đề trang</Label>
                <Input defaultValue="KPI & Hall of Impact" />
              </div>

              <div className="space-y-2">
                <Label>Mô tả</Label>
                <Textarea
                  defaultValue="Bảng thành tích và vinh danh thành viên xuất sắc BNI FELIX"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline">Xem trước</Button>
                <Button 
                  onClick={() => handleSave("KPI Hall")}
                  disabled={isSaving}
                  className="bg-bni-red hover:bg-bni-red/90 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Hub */}
        <TabsContent value="media" className="space-y-6">
          <Card className="shadow-lg border-bni-red border-2">
            <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
              <CardTitle className="flex items-center gap-2">
                <Image className="h-6 w-6 text-bni-red" />
                Quản lý Media Hub
              </CardTitle>
              <CardDescription>Quản lý tài liệu, hình ảnh và video</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-muted-foreground">
                <Image className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold mb-2">Quản lý Media</p>
                <p className="mb-4">Tải lên và quản lý tài liệu, hình ảnh, video</p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Tải tài liệu
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Tải hình ảnh
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Tải video
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Liên hệ */}
        <TabsContent value="contact" className="space-y-6">
          <Card className="shadow-lg border-bni-red border-2">
            <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-6 w-6 text-bni-red" />
                Quản lý Thông tin Liên hệ
              </CardTitle>
              <CardDescription>Cập nhật thông tin liên lạc và mạng xã hội</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Số điện thoại *</Label>
                  <Input
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    placeholder="Số điện thoại"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    placeholder="Email"
                    type="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Địa chỉ *</Label>
                <Textarea
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                  placeholder="Địa chỉ"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Thời gian họp</Label>
                <Input
                  value={contactInfo.meetingTime}
                  onChange={(e) => setContactInfo({...contactInfo, meetingTime: e.target.value})}
                  placeholder="Thời gian họp"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold border-b pb-2">Mạng xã hội</h3>
                
                <div className="space-y-2">
                  <Label>Facebook</Label>
                  <Input
                    value={contactInfo.facebook}
                    onChange={(e) => setContactInfo({...contactInfo, facebook: e.target.value})}
                    placeholder="Link Facebook"
                  />
                </div>

                <div className="space-y-2">
                  <Label>YouTube</Label>
                  <Input
                    value={contactInfo.youtube}
                    onChange={(e) => setContactInfo({...contactInfo, youtube: e.target.value})}
                    placeholder="Link YouTube"
                  />
                </div>

                <div className="space-y-2">
                  <Label>LinkedIn</Label>
                  <Input
                    value={contactInfo.linkedin}
                    onChange={(e) => setContactInfo({...contactInfo, linkedin: e.target.value})}
                    placeholder="Link LinkedIn"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline">Xem trước</Button>
                <Button 
                  onClick={() => handleSave("Liên hệ")}
                  disabled={isSaving}
                  className="bg-bni-red hover:bg-bni-red/90 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
