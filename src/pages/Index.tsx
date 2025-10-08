import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Menu, X, Users, TrendingUp, Globe, Award, Phone, Mail, MapPin, ChevronRight, Calendar, Clock, Download, Star, Trophy, Camera, Play, Facebook, Youtube, Linkedin, Zap, Bell, BookOpen, BarChart3, Video, FileText, UserCheck, Search, Target, Handshake, AlertTriangle } from "lucide-react";
import heroImage from "../assets/bni-meeting-hero.jpg";
const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('vi');
  const [showLocationAlert, setShowLocationAlert] = useState(false);
  const [isLocationValid, setIsLocationValid] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguage = () => setLanguage(language === 'vi' ? 'en' : 'vi');
  const handleRegisterMeeting = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const {
          latitude,
          longitude
        } = position.coords;
        // Kiểm tra nếu đang ở khu vực 91 Trần Hưng Đạo, Hà Nội (tọa độ ước lượng)
        const targetLat = 21.0245;
        const targetLng = 105.8412;
        const distance = Math.sqrt(Math.pow(latitude - targetLat, 2) + Math.pow(longitude - targetLng, 2));
        if (distance < 0.01) {
          // Trong bán kính 1km
          setIsLocationValid(true);
          alert(language === 'vi' ? 'Đăng ký thành công!' : 'Registration successful!');
        } else {
          setShowLocationAlert(true);
        }
      }, () => {
        setShowLocationAlert(true);
      });
    } else {
      setShowLocationAlert(true);
    }
  };
  const text = {
    vi: {
      nav: {
        home: "Trang chủ",
        about: "Giới thiệu",
        members: "Thành viên",
        schedule: "Lịch họp",
        kpi: "KPI Hall",
        media: "Media Hub",
        contact: "Liên hệ"
      },
      hero: {
        title: "FELIX Chapter – Nơi kết nối kinh doanh vững mạnh",
        subtitle: "Chapter chuyên nghiệp thuộc BNI Vietnam - Xây dựng mạng lưới kinh doanh bền vững thông qua việc trao referral chất lượng",
        registerMeeting: "📝 Đăng ký họp",
        viewMembers: "👥 Xem thành viên",
        learnChapter: "🎯 Đăng ký check-in"
      },
      quickIntro: {
        title: "Giới thiệu Chapter FELIX",
        description: "FELIX Chapter là cộng đồng doanh nhân chuyên nghiệp, nơi các thành viên xây dựng mối quan hệ kinh doanh bền vững. Chúng tôi cam kết tạo ra môi trường tin cậy để các doanh nghiệp phát triển thông qua referral chất lượng và hỗ trợ lẫn nhau.",
        members: "Thành viên",
        referrals: "Referral/tháng",
        revenue: "Doanh thu tạo ra",
        viewDetails: "📘 Xem chi tiết giới thiệu Chapter"
      },
      schedule: {
        title: "Lịch họp & Diễn giả tuần",
        nextMeeting: "Họp tuần tới",
        speaker: "Diễn giả",
        topic: "Chủ đề",
        viewSchedule: "📅 Xem lịch họp",
        registerGuest: "📢 Đăng ký khách mời"
      },
      featuredMembers: {
        title: "Thành viên nổi bật",
        contact: "Liên hệ",
        viewAll: "📖 Xem toàn bộ danh sách thành viên"
      },
      kpi: {
        title: "KPI & Vinh danh",
        referralCompletion: "Hoàn thành Referral",
        oneOnOneCompletion: "Hoàn thành 1-1",
        weeklyKpi: "KPI tuần",
        memberOfWeek: "Thành viên xuất sắc tuần",
        viewKpiDetails: "📊 Xem chi tiết KPI",
        viewHallOfFame: "🏆 Xem bảng vinh danh"
      },
      media: {
        title: "Truyền thông & Media",
        meetingPhotos: "Hình ảnh buổi họp",
        introVideo: "Video giới thiệu",
        brochure: "Brochure tài liệu",
        viewGallery: "🎥 Xem thư viện",
        downloadBrochure: "📎 Tải brochure"
      },
      checkin: {
        title: "Check-in nhanh dành cho thành viên",
        memberName: "Tên thành viên",
        thirtySecIntro: "Giới thiệu 30 giây",
        iAmPresent: "✅ Tôi đã có mặt"
      },
      registration: {
        title: "Đăng ký tham dự & ngành nghề trống",
        availableIndustries: "Các ngành nghề chưa có người đại diện",
        registerTrial: "📥 Đăng ký họp thử",
        viewOpenIndustries: "🕵️ Xem ngành nghề trống"
      },
      partnership: {
        title: "Kết nối & Liên hệ đối tác",
        description: "Tham gia cùng chúng tôi để xây dựng mạng lưới kinh doanh mạnh mẽ",
        contact: "Liên hệ",
        registerPartner: "Đăng ký đối tác",
        suggestReferral: "Đề xuất Referral"
      }
    },
    en: {
      nav: {
        home: "Home",
        about: "About",
        members: "Members",
        schedule: "Schedule",
        kpi: "KPI Hall",
        media: "Media Hub",
        contact: "Contact"
      },
      hero: {
        title: "FELIX Chapter – Where Strong Business Connections Thrive",
        subtitle: "Professional Chapter of BNI Vietnam - Building sustainable business networks through quality referral exchange",
        registerMeeting: "📝 Register Meeting",
        viewMembers: "👥 View Members",
        learnChapter: "🎯 Register Check-in"
      },
      quickIntro: {
        title: "About FELIX Chapter",
        description: "FELIX Chapter is a professional business community where members build sustainable business relationships. We are committed to creating a trusted environment for businesses to grow through quality referrals and mutual support.",
        members: "Members",
        referrals: "Referrals/month",
        revenue: "Revenue Generated",
        viewDetails: "📘 View Chapter Details"
      },
      schedule: {
        title: "Schedule & Weekly Speaker",
        nextMeeting: "Next Meeting",
        speaker: "Speaker",
        topic: "Topic",
        viewSchedule: "📅 View Schedule",
        registerGuest: "📢 Register Guest"
      },
      featuredMembers: {
        title: "Featured Members",
        contact: "Contact",
        viewAll: "📖 View All Members"
      },
      kpi: {
        title: "KPI & Recognition",
        referralCompletion: "Referral Completion",
        oneOnOneCompletion: "1-1 Completion",
        weeklyKpi: "Weekly KPI",
        memberOfWeek: "Member of the Week",
        viewKpiDetails: "📊 View KPI Details",
        viewHallOfFame: "🏆 View Hall of Fame"
      },
      media: {
        title: "Media & Communications",
        meetingPhotos: "Meeting Photos",
        introVideo: "Introduction Video",
        brochure: "Brochure Materials",
        viewGallery: "🎥 View Gallery",
        downloadBrochure: "📎 Download Brochure"
      },
      checkin: {
        title: "Quick Check-in for Members",
        memberName: "Member Name",
        thirtySecIntro: "30-second Introduction",
        iAmPresent: "✅ I Am Present"
      },
      registration: {
        title: "Registration & Open Industries",
        availableIndustries: "Industries without representation",
        registerTrial: "📥 Register Trial Meeting",
        viewOpenIndustries: "🕵️ View Open Industries"
      },
      partnership: {
        title: "Connect & Partner Contacts",
        description: "Join us to build a powerful business network",
        contact: "Contact",
        registerPartner: "Register Partner",
        suggestReferral: "Suggest Referral"
      }
    }
  };
  const currentText = text[language];
  const stats = [{
    number: "35+",
    label: currentText.quickIntro.members,
    icon: Users
  }, {
    number: "120+",
    label: currentText.quickIntro.referrals,
    icon: TrendingUp
  }, {
    number: "15B+",
    label: currentText.quickIntro.revenue,
    icon: BarChart3
  }];
  const featuredMembers = [{
    name: "Nguyễn Văn A",
    industry: "Marketing Digital",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }, {
    name: "Trần Thị B",
    industry: "Thiết kế nội thất",
    avatar: "/placeholder.svg"
  }, {
    name: "Lê Minh C",
    industry: "Tư vấn tài chính",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }, {
    name: "Phạm Thu D",
    industry: "Bất động sản",
    avatar: "/placeholder.svg"
  }, {
    name: "Hoàng Văn E",
    industry: "Công nghệ IT",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }];
  const openIndustries = ["Luật sư/Tư vấn pháp lý", "Bảo hiểm", "Dịch vụ kế toán", "In ấn/Quảng cáo", "Vận tải/Logistics", "Y tế/Sức khỏe"];
  return <div className="min-h-screen bg-white font-inter">
      {/* Header */}
      <header className="bg-[#D71920] shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-white">
                BNI <span className="text-white">FELIX</span>
              </div>
            </div>
            
            {/* Language Toggle */}
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={toggleLanguage} className="text-white hover:text-gray-200 transition-colors text-sm border border-white px-3 py-1 rounded">
                {language === 'vi' ? 'EN' : 'VI'}
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-white border-b-2 border-white transition-colors">{currentText.nav.home}</a>
              <a href="/about" className="text-white hover:text-gray-200 transition-colors">{currentText.nav.about}</a>
              <a href="/members" className="text-white hover:text-gray-200 transition-colors">{currentText.nav.members}</a>
              <a href="/schedule" className="text-white hover:text-gray-200 transition-colors">{currentText.nav.schedule}</a>
              <a href="/kpi-hall-of-impact" className="text-white hover:text-gray-200 transition-colors">{currentText.nav.kpi}</a>
              <a href="/media" className="text-white hover:text-gray-200 transition-colors">{currentText.nav.media}</a>
              <a href="/contact" className="text-white hover:text-gray-200 transition-colors">{currentText.nav.contact}</a>
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
              <a href="/" className="block px-3 py-2 text-white border-l-4 border-white">{currentText.nav.home}</a>
              <a href="/about" className="block px-3 py-2 text-white hover:text-gray-200">{currentText.nav.about}</a>
              <a href="/members" className="block px-3 py-2 text-white hover:text-gray-200">{currentText.nav.members}</a>
              <a href="/schedule" className="block px-3 py-2 text-white hover:text-gray-200">{currentText.nav.schedule}</a>
              <a href="/kpi-hall-of-impact" className="block px-3 py-2 text-white hover:text-gray-200">{currentText.nav.kpi}</a>
              <a href="/media" className="block px-3 py-2 text-white hover:text-gray-200">{currentText.nav.media}</a>
              <a href="/contact" className="block px-3 py-2 text-white hover:text-gray-200">{currentText.nav.contact}</a>
              <button onClick={toggleLanguage} className="block px-3 py-2 text-white hover:text-gray-200 text-left w-full">
                {language === 'vi' ? 'English' : 'Tiếng Việt'}
              </button>
            </div>
          </div>}
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#D71920] via-[#8B0000] to-[#D71920] text-white">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${heroImage})`
      }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#D71920]/80 to-[#8B0000]/80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              {currentText.hero.title}
            </h1>
            <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto">
              {currentText.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => window.location.href = '/meeting-register'} className="bg-white hover:bg-gray-100 text-[#D71920] text-lg px-8 py-6 font-semibold">
                {currentText.hero.registerMeeting}
                <ChevronRight className="ml-2" size={20} />
              </Button>
              
              <Button size="lg" className="bg-[#2E2E2E] hover:bg-[#2E2E2E]/90 text-white text-lg px-8 py-6" onClick={() => window.location.href = '/checkin'}>
                {currentText.hero.learnChapter}
              </Button>

              <Button size="lg" onClick={() => window.location.href = '/referral'} className="text-white text-lg px-8 py-6 bg-green-600 hover:bg-green-500">
                <TrendingUp className="mr-2" size={20} />
                {currentText.partnership.suggestReferral}
              </Button>
            </div>
            
            {/* Location Alert */}
            {showLocationAlert && <div className="mt-8 p-4 bg-yellow-500 text-black rounded-lg flex items-center justify-center max-w-2xl mx-auto">
                <AlertTriangle className="mr-2" size={20} />
                <span>
                  {language === 'vi' ? 'Vui lòng bật định vị và có mặt tại địa điểm họp để đăng ký' : 'Please enable location and be at the meeting venue to register'}
                </span>
                <button onClick={() => setShowLocationAlert(false)} className="ml-4 text-black hover:text-gray-700">
                  <X size={16} />
                </button>
              </div>}
          </div>
        </div>
      </section>

      {/* Quick Intro Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-[#2E2E2E]">{currentText.quickIntro.title}</h2>
            <p className="text-lg text-[#2E2E2E] max-w-4xl mx-auto leading-relaxed mb-12">
              {currentText.quickIntro.description}
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {stats.map((stat, index) => <Card key={index} className="border-[#D71920] shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="text-center">
                    <stat.icon className="w-12 h-12 text-[#D71920] mx-auto mb-4" />
                    <CardTitle className="text-3xl font-bold text-[#D71920]">{stat.number}</CardTitle>
                    <CardDescription className="text-[#2E2E2E]">{stat.label}</CardDescription>
                  </CardHeader>
                </Card>)}
            </div>
            
            <Button className="bg-[#D71920] hover:bg-[#8B0000] text-white text-lg px-8 py-3" onClick={() => window.location.href = '/about'}>
              {currentText.quickIntro.viewDetails}
            </Button>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-[#2E2E2E]">{currentText.schedule.title}</h2>
          </div>

          <Card className="border-[#D71920] shadow-xl mb-8">
            <CardHeader className="bg-[#D71920] text-white">
              <CardTitle className="text-center text-xl">{currentText.schedule.nextMeeting}</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Calendar className="w-8 h-8 text-[#D71920] mx-auto mb-2" />
                  <p className="font-semibold text-[#2E2E2E]">Thứ 3, 18/06/2024</p>
                  <p className="text-gray-600">6:45 AM - 8:45 AM</p>
                </div>
                <div>
                  <Users className="w-8 h-8 text-[#D71920] mx-auto mb-2" />
                  <p className="font-semibold text-[#2E2E2E]">{currentText.schedule.speaker}</p>
                  <p className="text-gray-600">Nguyễn Văn A</p>
                </div>
                <div>
                  <BookOpen className="w-8 h-8 text-[#D71920] mx-auto mb-2" />
                  <p className="font-semibold text-[#2E2E2E]">{currentText.schedule.topic}</p>
                  <p className="text-gray-600">Marketing Digital hiệu quả</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-[#2E2E2E] hover:bg-[#2E2E2E]/90 text-white" onClick={() => window.location.href = '/schedule'}>
              {currentText.schedule.viewSchedule}
            </Button>
            <Button variant="outline" className="border-[#D71920] text-[#D71920] hover:bg-[#D71920] hover:text-white" onClick={() => window.location.href = '/register'}>
              {currentText.schedule.registerGuest}
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Members */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-[#2E2E2E]">{currentText.featuredMembers.title}</h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6 mb-12">
            {featuredMembers.map((member, index) => <Card key={index} className="border-[#D71920] shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="relative mx-auto mb-4">
                    <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full border-4 border-[#D71920] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-[#2E2E2E] text-sm">{member.name}</CardTitle>
                  <CardDescription className="text-[#D71920] text-xs">{member.industry}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button size="sm" className="bg-[#D71920] hover:bg-[#8B0000] text-white text-xs">
                    {currentText.featuredMembers.contact}
                  </Button>
                </CardContent>
              </Card>)}
          </div>

          <div className="text-center">
            <Button className="bg-[#D71920] hover:bg-[#8B0000] text-white">
              {currentText.featuredMembers.viewAll}
            </Button>
          </div>
        </div>
      </section>

      {/* KPI & Recognition */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-[#2E2E2E]">{currentText.kpi.title}</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="border-[#D71920] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#2E2E2E] text-center">{currentText.kpi.weeklyKpi}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#2E2E2E]">{currentText.kpi.referralCompletion}</span>
                    <span className="font-bold text-[#D71920]">85%</span>
                  </div>
                  <Progress value={85} className="bg-gray-200" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#2E2E2E]">{currentText.kpi.oneOnOneCompletion}</span>
                    <span className="font-bold text-[#D71920]">92%</span>
                  </div>
                  <Progress value={92} className="bg-gray-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#D71920] shadow-lg">
              <CardHeader className="text-center">
                <Trophy className="w-12 h-12 text-[#D71920] mx-auto mb-4" />
                <CardTitle className="text-[#2E2E2E]">{currentText.kpi.memberOfWeek}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Member of the week" className="w-20 h-20 rounded-full border-4 border-[#D71920] mx-auto mb-4" />
                <h3 className="font-bold text-[#2E2E2E] mb-2">Nguyễn Văn A</h3>
                <p className="text-gray-600 text-sm">15 referrals trong tuần, xuất sắc nhất tháng 6</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-[#2E2E2E] hover:bg-[#2E2E2E]/90 text-white" onClick={() => window.location.href = '/kpi-hall-of-impact'}>
              {currentText.kpi.viewKpiDetails}
            </Button>
            <Button variant="outline" className="border-[#2E2E2E] text-[#2E2E2E] hover:bg-[#2E2E2E] hover:text-white" onClick={() => window.location.href = '/kpi-hall-of-impact'}>
              {currentText.kpi.viewHallOfFame}
            </Button>
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-[#2E2E2E]">{currentText.media.title}</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="border-[#D71920] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#2E2E2E] flex items-center">
                  <Camera className="mr-2 text-[#D71920]" />
                  {currentText.media.meetingPhotos}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[1, 2, 3, 4].map(img => <div key={img} className="bg-[#D71920] h-20 rounded-lg"></div>)}
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#D71920] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#2E2E2E] flex items-center">
                  <Video className="mr-2 text-[#D71920]" />
                  {currentText.media.introVideo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-[#D71920] rounded-lg p-8 text-white text-center mb-4">
                  <Play className="w-12 h-12 mx-auto mb-2" />
                  <p>Video giới thiệu FELIX</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#D71920] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#2E2E2E] flex items-center">
                  <FileText className="mr-2 text-[#D71920]" />
                  {currentText.media.brochure}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg p-8 text-center mb-4">
                  <FileText className="w-12 h-12 mx-auto mb-2 text-[#D71920]" />
                  <p className="text-[#2E2E2E]">Brochure FELIX Chapter</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-[#8B0000] hover:bg-[#8B0000]/90 text-white" onClick={() => window.location.href = '/media'}>
              {currentText.media.viewGallery}
            </Button>
            <Button variant="outline" className="border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white" onClick={() => {
            // Simulate download
            const link = document.createElement('a');
            link.href = '#';
            link.download = 'FELIX-Brochure.pdf';
            link.click();
          }}>
              {currentText.media.downloadBrochure}
            </Button>
          </div>
        </div>
      </section>


      {/* Registration & Open Industries */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-[#2E2E2E]">{currentText.registration.title}</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-[#D71920] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#2E2E2E]">{currentText.registration.availableIndustries}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {openIndustries.map((industry, index) => <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-[#2E2E2E]">{industry}</span>
                      <Button size="sm" className="bg-[#D71920] hover:bg-[#8B0000] text-white">
                        Đăng ký
                      </Button>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <div className="text-center">
                <Target className="w-16 h-16 text-[#D71920] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#2E2E2E] mb-4">Cơ hội tham gia</h3>
                <p className="text-[#2E2E2E] mb-6">
                  Tham gia FELIX Chapter để mở rộng mạng lưới kinh doanh và nhận referral chất lượng từ các doanh nhân chuyên nghiệp.
                </p>
                <div className="flex flex-col gap-4">
                  <Button className="bg-[#2E2E2E] hover:bg-[#2E2E2E]/90 text-white" onClick={() => window.location.href = '/meeting-register'}>
                    {currentText.registration.registerTrial}
                  </Button>
                  <Button variant="outline" className="border-[#2E2E2E] text-[#2E2E2E] hover:bg-[#2E2E2E] hover:text-white" onClick={() => window.location.href = '/members'}>
                    {currentText.registration.viewOpenIndustries}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-20 bg-[#D71920] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">{currentText.partnership.title}</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {currentText.partnership.description}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white hover:bg-gray-100 text-[#D71920] text-lg px-8 py-3" onClick={() => window.location.href = '/contact'}>
              <Phone className="mr-2" size={20} />
              {currentText.partnership.contact}
            </Button>
            <Button size="lg" variant="outline" className="border-white hover:bg-white text-lg px-8 py-3 text-red-600" onClick={() => window.location.href = '/register'}>
              <Handshake className="mr-2" size={20} />
              {currentText.partnership.registerPartner}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2E2E2E] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                BNI <span className="text-[#D71920]">FELIX</span>
              </div>
              <p className="text-white/80 mb-4">
                Chapter chuyên nghiệp thuộc BNI Vietnam
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-white/80 hover:text-[#D71920] cursor-pointer transition-colors" />
                <Youtube className="w-6 h-6 text-white/80 hover:text-[#D71920] cursor-pointer transition-colors" />
                <Linkedin className="w-6 h-6 text-white/80 hover:text-[#D71920] cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Liên kết</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-[#D71920] transition-colors">BNI Global</a></li>
                <li><a href="#" className="hover:text-[#D71920] transition-colors">BNI Vietnam</a></li>
                <li><a href="#" className="hover:text-[#D71920] transition-colors">BNI Hanoi</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Địa điểm họp</h4>
              <p className="text-white/80">
                Cung văn hóa Hữu Nghị Việt Xô<br />
                Số 91 Trần Hưng Đạo<br />
                Hoàn Kiếm, Hà Nội
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Liên hệ</h4>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +84 123 456 789
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  contact@bnifelix.com
                </li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-white/20" />
          
          <div className="flex flex-col md:flex-row justify-between items-center text-white/60">
            <p>&copy; 2024 BNI FELIX Chapter. Tất cả quyền được bảo lưu.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#D71920] transition-colors">Chính sách bảo mật</a>
              <a href="#" className="hover:text-[#D71920] transition-colors">Điều khoản sử dụng</a>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;