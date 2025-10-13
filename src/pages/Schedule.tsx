import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, Calendar as CalendarIcon, Clock, MapPin, Download, User, Phone, Mail, Users, Search, AlertTriangle, FileText, ChevronLeft, ChevronRight, Video, Share2, Bell, ExternalLink } from "lucide-react";
import { MemberFooter } from "@/components/members/MemberFooter";
const Schedule = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('vi');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguage = () => setLanguage(language === 'vi' ? 'en' : 'vi');

  // Countdown to next meeting (Tuesday 6:45 AM)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextTuesday = new Date();

      // Find next Tuesday at 6:45 AM
      const daysUntilTuesday = (2 - now.getDay() + 7) % 7 || 7;
      nextTuesday.setDate(now.getDate() + daysUntilTuesday);
      nextTuesday.setHours(6, 45, 0, 0);

      // If it's Tuesday and before 6:45 AM, use today
      if (now.getDay() === 2 && now.getHours() < 6 || now.getHours() === 6 && now.getMinutes() < 45) {
        nextTuesday.setDate(now.getDate());
      }
      const difference = nextTuesday.getTime() - now.getTime();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(difference / (1000 * 60 * 60) % 24);
        const minutes = Math.floor(difference / 1000 / 60 % 60);
        const seconds = Math.floor(difference / 1000 % 60);
        setTimeLeft({
          days,
          hours,
          minutes,
          seconds
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);
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
      title: "Lịch Họp & Diễn Giả Tuần",
      subtitle: "Thông tin chi tiết về lịch trình họp tuần và diễn giả",
      countdown: {
        title: "Buổi họp tiếp theo",
        days: "Ngày",
        hours: "Giờ",
        minutes: "Phút",
        seconds: "Giây",
        checkin: "Đăng ký check-in",
        invite: "Mời khách tham dự"
      },
      meetingInfo: {
        title: "Thông tin lịch họp cố định",
        schedule: "Thứ Ba hàng tuần, 6:45 AM – 8:45 AM",
        location: "Cung Văn Hóa Hữu Nghị Việt Xô, số 91 Trần Hưng Đạo, Hà Nội",
        directions: "Xem bản đồ",
        note: "Mỗi thành viên có thể mời 1 đối tác/đồng nghiệp tham dự họp thử"
      },
      weeklySchedule: {
        title: "Lịch họp từng tuần",
        speaker: "Diễn giả",
        topic: "Chủ đề",
        coordinator: "Thành viên trực",
        duration: "Thời lượng: 6 phút giới thiệu chi tiết",
        viewProfile: "Xem hồ sơ",
        viewVideo: "Xem lại video",
        downloadMaterials: "Tải tài liệu tuần",
        sendSlide: "Gửi Slide 30s"
      },
      speakers: {
        title: "Thông tin diễn giả",
        industry: "Ngành nghề",
        description: "Mô tả chủ đề"
      },
      features: {
        title: "Chức năng hỗ trợ",
        invite: "Gửi lời mời khách mời",
        notification: "Thông báo nhắc lịch",
        calendar: "Đồng bộ lịch"
      },
      actions: {
        monthView: "Xem lịch tháng",
        submitSlide: "Gửi slide 30s",
        inviteGuest: "Mời khách mời",
        downloadMaterials: "Tải tài liệu tuần",
        shareQuick: "Chia sẻ nhanh",
        syncCalendar: "Đồng bộ Google Calendar"
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
      title: "Meeting Schedule & Weekly Speakers",
      subtitle: "Detailed information about weekly meeting schedule and speakers",
      countdown: {
        title: "Next Meeting",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
        checkin: "Register Check-in",
        invite: "Invite Guests"
      },
      meetingInfo: {
        title: "Fixed Meeting Schedule Information",
        schedule: "Tuesday Weekly, 6:45 AM – 8:45 AM",
        location: "Vietnam-Soviet Friendship Cultural Palace, 91 Tran Hung Dao, Hanoi",
        directions: "View Map",
        note: "Each member can invite 1 partner/colleague to trial meeting"
      },
      weeklySchedule: {
        title: "Weekly Meeting Schedule",
        speaker: "Speaker",
        topic: "Topic",
        coordinator: "Coordinator",
        duration: "Duration: 6-minute detailed presentation",
        viewProfile: "View Profile",
        viewVideo: "Watch Recording",
        downloadMaterials: "Download Materials",
        sendSlide: "Submit 30s Slide"
      },
      speakers: {
        title: "Speaker Information",
        industry: "Industry",
        description: "Topic Description"
      },
      features: {
        title: "Support Features",
        invite: "Send Guest Invitations",
        notification: "Meeting Reminders",
        calendar: "Calendar Sync"
      },
      actions: {
        monthView: "Monthly View",
        submitSlide: "Submit 30s slide",
        inviteGuest: "Invite Guest",
        downloadMaterials: "Download Materials",
        shareQuick: "Quick Share",
        syncCalendar: "Sync Google Calendar"
      }
    }
  };
  const currentText = text[language];
  const weeklySchedule = [{
    week: "Tuần 24",
    date: "14/01/2025",
    speaker: {
      name: "Nguyễn Văn A",
      nameEn: "Nguyen Van A",
      avatar: "/placeholder.svg",
      industry: "Thiết kế nội thất",
      industryEn: "Interior Design",
      company: "ABC Design Studio"
    },
    topic: "Xu hướng thiết kế nội thất 2025",
    topicEn: "Interior Design Trends 2025",
    coordinator: "Trần Thị B",
    hasVideo: true,
    hasMaterials: true
  }, {
    week: "Tuần 25",
    date: "21/01/2025",
    speaker: {
      name: "Lê Minh C",
      nameEn: "Le Minh C",
      avatar: "/placeholder.svg",
      industry: "Marketing Digital",
      industryEn: "Digital Marketing",
      company: "XYZ Marketing Agency"
    },
    topic: "Chiến lược marketing trong kỷ nguyên AI",
    topicEn: "Marketing Strategy in AI Era",
    coordinator: "Phạm Thị D",
    hasVideo: false,
    hasMaterials: true
  }, {
    week: "Tuần 26",
    date: "28/01/2025",
    speaker: {
      name: "Hoàng Thị E",
      nameEn: "Hoang Thi E",
      avatar: "/placeholder.svg",
      industry: "Luật doanh nghiệp",
      industryEn: "Corporate Law",
      company: "Legal Partners"
    },
    topic: "Quy định pháp lý mới cho doanh nghiệp",
    topicEn: "New Legal Regulations for Businesses",
    coordinator: "Vũ Văn F",
    hasVideo: true,
    hasMaterials: false
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
            
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={toggleLanguage} className="text-white hover:text-[#2E2E2E] transition-colors text-sm">
                {language === 'vi' ? 'EN' : 'VI'}
              </button>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-white hover:text-[#2E2E2E] transition-colors">{currentText.nav.home}</a>
              <a href="/about" className="text-white hover:text-[#2E2E2E] transition-colors">{currentText.nav.about}</a>
              <a href="/members" className="text-white hover:text-[#2E2E2E] transition-colors">{currentText.nav.members}</a>
              <a href="/schedule" className="text-[#2E2E2E] font-semibold transition-colors">{currentText.nav.schedule}</a>
              <a href="/kpi-hall-of-impact" className="text-white hover:text-[#2E2E2E] transition-colors">{currentText.nav.kpi}</a>
              <a href="/media" className="text-white hover:text-[#2E2E2E] transition-colors">{currentText.nav.media}</a>
              <a href="/contact" className="text-white hover:text-[#2E2E2E] transition-colors">{currentText.nav.contact}</a>
            </nav>

            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-white">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && <div className="md:hidden bg-[#D71920] border-t border-[#8B0000]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 text-white hover:text-[#2E2E2E]">{currentText.nav.home}</a>
              <a href="/about" className="block px-3 py-2 text-white hover:text-[#2E2E2E]">{currentText.nav.about}</a>
              <a href="/members" className="block px-3 py-2 text-white hover:text-[#2E2E2E]">{currentText.nav.members}</a>
              <a href="/schedule" className="block px-3 py-2 text-[#2E2E2E] font-semibold">{currentText.nav.schedule}</a>
              <a href="/kpi-hall-of-impact" className="block px-3 py-2 text-white hover:text-[#2E2E2E]">{currentText.nav.kpi}</a>
              <a href="/media" className="block px-3 py-2 text-white hover:text-[#2E2E2E]">{currentText.nav.media}</a>
              <a href="/contact" className="block px-3 py-2 text-white hover:text-[#2E2E2E]">{currentText.nav.contact}</a>
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
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              {currentText.title}
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              {currentText.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 bg-[#2E2E2E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">{currentText.countdown.title}</h2>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-4 gap-8 text-center">
              <div className="bg-[#D71920] p-6 rounded-lg">
                <div className="text-4xl font-bold">{timeLeft.days}</div>
                <div className="text-sm uppercase tracking-wide">{currentText.countdown.days}</div>
              </div>
              <div className="bg-[#D71920] p-6 rounded-lg">
                <div className="text-4xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm uppercase tracking-wide">{currentText.countdown.hours}</div>
              </div>
              <div className="bg-[#D71920] p-6 rounded-lg">
                <div className="text-4xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm uppercase tracking-wide">{currentText.countdown.minutes}</div>
              </div>
              <div className="bg-[#D71920] p-6 rounded-lg">
                <div className="text-4xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm uppercase tracking-wide">{currentText.countdown.seconds}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <Button className="bg-[#D71920] hover:bg-[#8B0000]">
              ✅ {currentText.countdown.checkin}
            </Button>
            <Button variant="outline" className="border-white hover:bg-white text-red-600">
              🎫 {currentText.countdown.invite}
            </Button>
          </div>
        </div>
      </section>

      {/* Meeting Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#2E2E2E]">{currentText.meetingInfo.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-[#D71920] shadow-lg">
              <CardHeader className="text-center">
                <Clock className="w-12 h-12 text-[#D71920] mx-auto mb-4" />
                <CardTitle className="text-[#2E2E2E]">Lịch họp cố định</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-[#2E2E2E] font-semibold">{currentText.meetingInfo.schedule}</p>
              </CardContent>
            </Card>

            <Card className="border-[#D71920] shadow-lg">
              <CardHeader className="text-center">
                <MapPin className="w-12 h-12 text-[#D71920] mx-auto mb-4" />
                <CardTitle className="text-[#2E2E2E]">Địa điểm</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-[#2E2E2E] mb-4">{currentText.meetingInfo.location}</p>
                <Button size="sm" variant="outline" className="border-[#D71920] text-[#D71920]">
                  <MapPin size={16} className="mr-2" />
                  {currentText.meetingInfo.directions}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-[#8B0000] shadow-lg">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 text-[#8B0000] mx-auto mb-4" />
                <CardTitle className="text-[#2E2E2E]">Khách mời</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-[#2E2E2E]">{currentText.meetingInfo.note}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Weekly Schedule Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#2E2E2E]">{currentText.weeklySchedule.title}</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-[#D71920] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#2E2E2E] flex items-center">
                  <CalendarIcon className="mr-2" />
                  Lịch tháng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border border-[#D71920]" />
              </CardContent>
            </Card>

            <div className="space-y-6">
              {weeklySchedule.map((item, index) => <Card key={index} className="border-[#D71920] shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-[#2E2E2E]">{item.week} - {item.date}</CardTitle>
                        <CardDescription className="text-[#D71920] mt-2">
                          {currentText.weeklySchedule.duration}
                        </CardDescription>
                      </div>
                      <Badge className="bg-[#8B0000] text-white">6 phút</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-16 h-16 border-2 border-[#D71920]">
                        <AvatarImage src={item.speaker.avatar} />
                        <AvatarFallback>{(language === 'vi' ? item.speaker.name : item.speaker.nameEn).charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-[#2E2E2E]">
                          {language === 'vi' ? item.speaker.name : item.speaker.nameEn}
                        </h4>
                        <p className="text-[#D71920] text-sm font-medium">
                          {language === 'vi' ? item.speaker.industry : item.speaker.industryEn}
                        </p>
                        <p className="text-[#2E2E2E] text-sm">{item.speaker.company}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-[#2E2E2E] mb-1">{currentText.weeklySchedule.topic}:</p>
                      <p className="text-[#D71920]">{language === 'vi' ? item.topic : item.topicEn}</p>
                      <p className="text-xs text-[#2E2E2E] mt-2">
                        {currentText.weeklySchedule.coordinator}: {item.coordinator}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" className="bg-[#D71920] hover:bg-[#8B0000]">
                        👤 {currentText.weeklySchedule.viewProfile}
                      </Button>
                      {item.hasVideo && <Button size="sm" variant="outline" className="border-[#D71920] text-[#D71920]">
                          <Video size={16} className="mr-1" />
                          {currentText.weeklySchedule.viewVideo}
                        </Button>}
                      {item.hasMaterials && <Button size="sm" className="bg-[#2E2E2E] hover:bg-[#2E2E2E]/90 text-white">
                          <Download size={16} className="mr-1" />
                          {currentText.weeklySchedule.downloadMaterials}
                        </Button>}
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </div>
      </section>

      {/* Support Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#2E2E2E]">{currentText.features.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-[#D71920] shadow-lg text-center">
              <CardContent className="p-6">
                <Share2 className="w-12 h-12 text-[#D71920] mx-auto mb-4" />
                <h3 className="font-semibold text-[#2E2E2E] mb-2">{currentText.features.invite}</h3>
                <p className="text-sm text-[#2E2E2E] mb-4">Chia sẻ nhanh qua Zalo/Email</p>
                <Button size="sm" className="bg-[#D71920] hover:bg-[#8B0000]">
                  📤 {currentText.actions.shareQuick}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-[#D71920] shadow-lg text-center">
              <CardContent className="p-6">
                <Bell className="w-12 h-12 text-[#D71920] mx-auto mb-4" />
                <h3 className="font-semibold text-[#2E2E2E] mb-2">{currentText.features.notification}</h3>
                <p className="text-sm text-[#2E2E2E] mb-4">Tự động thông báo nhắc lịch</p>
                <Button size="sm" variant="outline" className="border-[#D71920] text-[#D71920]">
                  🔔 Cài đặt nhắc nhở
                </Button>
              </CardContent>
            </Card>

            <Card className="border-[#D71920] shadow-lg text-center">
              <CardContent className="p-6">
                <ExternalLink className="w-12 h-12 text-[#D71920] mx-auto mb-4" />
                <h3 className="font-semibold text-[#2E2E2E] mb-2">{currentText.features.calendar}</h3>
                <p className="text-sm text-[#2E2E2E] mb-4">Google Calendar / Outlook</p>
                <Button size="sm" className="bg-[#2E2E2E] hover:bg-[#2E2E2E]/90 text-white">
                  📅 {currentText.actions.syncCalendar}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#D71920] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">Tham gia ngay hôm nay</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#D71920] hover:bg-gray-100">
              📅 {currentText.actions.monthView}
            </Button>
            <Button size="lg" variant="outline" className="border-white hover:bg-white text-red-600">
              📤 {currentText.actions.submitSlide}
            </Button>
            <Button size="lg" className="bg-[#2E2E2E] hover:bg-[#2E2E2E]/90">
              🎫 {currentText.actions.inviteGuest}
            </Button>
            <Button size="lg" variant="outline" className="border-white hover:bg-white text-red-600">
              📥 {currentText.actions.downloadMaterials}
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
              <h3 className="font-semibold mb-4">Liên kết</h3>
              <div className="space-y-2 text-white/70">
                <p>🌍 BNI Global</p>
                <p>🇻🇳 BNI Vietnam</p>
                <p>🏢 BNI Hanoi 6</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Địa điểm họp</h3>
              <p className="text-white/70">
                📍 Cung Văn Hóa Hữu Nghị Việt Xô<br />
                91 Trần Hưng Đạo<br />
                Quận Hoàn Kiếm, Hà Nội
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Liên hệ</h3>
              <div className="space-y-2 text-white/70">
                <p className="flex items-center"><Phone size={16} className="mr-2" /> Hotline</p>
                <p className="flex items-center"><Mail size={16} className="mr-2" /> Email</p>
                <p>📱 Zalo OA</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/70">
            <p>&copy; 2025 BNI FELIX Chapter. All rights reserved.</p>
            <p className="mt-2">🔒 Chính sách bảo mật | Điều khoản sử dụng</p>
          </div>
        </div>
      </footer>

      <MemberFooter />
    </div>;
};
export default Schedule;