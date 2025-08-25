
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Menu, X, Users, TrendingUp, Globe, Award, Phone, Mail, MapPin, ChevronRight, Calendar, Clock, Star, Trophy, Target, Eye, Heart, Download, Share2, Map } from "lucide-react";

const About = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('vi');
  const [selectedYear, setSelectedYear] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguage = () => setLanguage(language === 'vi' ? 'en' : 'vi');

  const text = {
    vi: {
      nav: {
        home: "Trang chủ",
        about: "Giới thiệu",
        members: "Thành viên",
        schedule: "Lịch họp",
        kpi: "KPI & Vinh danh",
        contact: "Liên hệ",
        media: "Media Hub"
      },
      hero: {
        title: "Giới thiệu Chapter FELIX",
        subtitle: "Kết nối cộng đồng doanh nghiệp thành công - bền vững - nhân văn"
      },
      mission: {
        title: "Sứ mệnh",
        content: "Kết nối cộng đồng doanh nghiệp thành công – bền vững – nhân văn."
      },
      vision: {
        title: "Tầm nhìn",
        content: "Trở thành chapter dẫn đầu về chỉ số Referral, văn hóa kết nối và giá trị cộng đồng trong hệ thống BNI toàn quốc."
      },
      values: {
        title: "Giá trị cốt lõi của BNI (BNI Core Values)",
        givers: "Givers Gain® – Cho là Nhận",
        relationships: "Xây dựng mối quan hệ lâu dài",
        learning: "Trách nhiệm & Cam kết",
        innovation: "Truyền cảm hứng & hỗ trợ",
        attitude: "Tư duy tích cực",
        accountability: "Gắn bó với trách nhiệm cộng đồng",
        recognition: "Công nhận thành tựu"
      },
      timeline: {
        title: "Lịch sử hình thành Chapter FELIX"
      },
      highlights: {
        title: "Các điểm nổi bật FELIX hiện tại",
        members: "53+ thành viên, đa ngành nghề",
        revenue: "Tổng doanh thu Referral đạt >50 tỷ VNĐ",
        referrals: "Trung bình 1,200+ Referral/năm, hơn 1,000 cuộc 1-1",
        ranking: "Top 3 chapter miền Bắc về hiệu quả Referral"
      },
      cta: {
        download: "Tải hồ sơ giới thiệu FELIX Chapter",
        sendReferral: "Gửi Referral đến Chapter",
        viewMap: "Xem bản đồ hoạt động"
      }
    },
    en: {
      nav: {
        home: "Home",
        about: "About",
        members: "Members",
        schedule: "Schedule",
        kpi: "KPI & Recognition",
        contact: "Contact",
        media: "Media Hub"
      },
      hero: {
        title: "About Chapter FELIX",
        subtitle: "Connecting successful, sustainable, and humanistic business community"
      },
      mission: {
        title: "Mission",
        content: "Connecting successful, sustainable, and humanistic business community."
      },
      vision: {
        title: "Vision",
        content: "To become the leading chapter in Referral metrics, connection culture and community value within the national BNI system."
      },
      values: {
        title: "BNI Core Values",
        givers: "Givers Gain®",
        relationships: "Building Relationships",
        learning: "Lifelong Learning",
        innovation: "Traditions + Innovation",
        attitude: "Positive Attitude",
        accountability: "Accountability",
        recognition: "Recognition"
      },
      timeline: {
        title: "Chapter FELIX Formation History"
      },
      highlights: {
        title: "Current FELIX Highlights",
        members: "53+ members, multi-industry",
        revenue: "Total Referral revenue >50 billion VND",
        referrals: "Average 1,200+ Referrals/year, 1,000+ one-to-ones",
        ranking: "Top 3 Northern chapters in Referral effectiveness"
      },
      cta: {
        download: "Download FELIX Chapter Profile",
        sendReferral: "Send Referral to Chapter",
        viewMap: "View Activity Map"
      }
    }
  };

  const currentText = text[language];

  const timelineData = [
    {
      year: "2020",
      presidentA: "Nguyễn Văn A",
      presidentB: "Lê Minh T",
      achievement: "Thành lập FELIX với 21 thành viên ban đầu",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      year: "2021", 
      presidentA: "Trần Thị B",
      presidentB: "Nguyễn Hữu D",
      achievement: "Mở rộng lên 35 thành viên, xây dựng văn hóa 1-1",
      avatar: "/placeholder.svg"
    },
    {
      year: "2022",
      presidentA: "Lê Quốc C",
      presidentB: "Trịnh Thu Yến",
      achievement: "Vượt KPI BNI Vietnam, truyền thông mạnh mẽ",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      year: "2023",
      presidentA: "Phạm Dương D",
      presidentB: "Đặng Quốc K",
      achievement: "Tổ chức hội thảo FELIX CONNECT 300+ người",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      year: "2024",
      presidentA: "Vũ Mai E",
      presidentB: "Nguyễn Đức N",
      achievement: "Gắn kết hệ sinh thái đối tác, doanh thu Referral cao nhất miền Bắc",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      year: "2025",
      presidentA: "Đinh Trí F",
      presidentB: "Trần Thái Hưng",
      achievement: "Chuyển đổi số toàn diện – tối ưu dashboard hoạt động",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
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
              <button 
                onClick={toggleLanguage}
                className="text-white hover:text-gray-200 transition-colors text-sm font-medium"
              >
                {language === 'vi' ? 'EN' : 'VI'}
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-white hover:text-gray-200 transition-colors">{currentText.nav.home}</a>
              <a href="/about" className="text-white font-semibold transition-colors">{currentText.nav.about}</a>
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
        {isMenuOpen && (
          <div className="md:hidden bg-[#8B0000]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 text-white hover:text-gray-200">{currentText.nav.home}</a>
              <a href="/about" className="block px-3 py-2 text-white font-semibold">{currentText.nav.about}</a>
              <a href="/members" className="block px-3 py-2 text-white hover:text-gray-200">{currentText.nav.members}</a>
              <a href="/schedule" className="block px-3 py-2 text-white hover:text-gray-200">{currentText.nav.schedule}</a>
              <a href="/kpi-hall-of-impact" className="block px-3 py-2 text-white hover:text-gray-200">{currentText.nav.kpi}</a>
              <a href="/media" className="block px-3 py-2 text-white hover:text-gray-200">{currentText.nav.media}</a>
              <a href="/contact" className="block px-3 py-2 text-white hover:text-gray-200">{currentText.nav.contact}</a>
              <button 
                onClick={toggleLanguage}
                className="block px-3 py-2 text-white hover:text-gray-200 text-left w-full"
              >
                {language === 'vi' ? 'English' : 'Tiếng Việt'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#D71920] via-[#8B0000] to-[#D71920] text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              {currentText.hero.title}
            </h1>
            <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto">
              {currentText.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-[#D71920] shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center">
                <Heart className="w-12 h-12 text-[#D71920] mx-auto mb-4" />
                <CardTitle className="text-[#2E2E2E] text-2xl">{currentText.mission.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#2E2E2E] text-lg leading-relaxed text-center">
                  {currentText.mission.content}
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#8B0000] shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center">
                <Eye className="w-12 h-12 text-[#8B0000] mx-auto mb-4" />
                <CardTitle className="text-[#2E2E2E] text-2xl">{currentText.vision.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#2E2E2E] text-lg leading-relaxed text-center">
                  {currentText.vision.content}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-[#2E2E2E]">{currentText.values.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center lg:col-span-3 mb-8">
              <div className="bg-[#D71920] text-white py-4 px-8 rounded-lg inline-block">
                <h3 className="text-xl font-bold">{currentText.values.givers}</h3>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-[#8B0000] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-[#2E2E2E]">{currentText.values.relationships}</h4>
            </div>

            <div className="text-center">
              <div className="bg-[#8B0000] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-[#2E2E2E]">{currentText.values.learning}</h4>
            </div>

            <div className="text-center">
              <div className="bg-[#8B0000] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-[#2E2E2E]">{currentText.values.innovation}</h4>
            </div>

            <div className="text-center">
              <div className="bg-[#8B0000] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-[#2E2E2E]">{currentText.values.attitude}</h4>
            </div>

            <div className="text-center">
              <div className="bg-[#8B0000] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-[#2E2E2E]">{currentText.values.accountability}</h4>
            </div>

            <div className="text-center">
              <div className="bg-[#8B0000] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-[#2E2E2E]">{currentText.values.recognition}</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-[#2E2E2E]">{currentText.timeline.title}</h2>
            <p className="text-lg text-gray-600">2020 - 2025</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-[#D71920] transform -translate-y-1/2 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
              {timelineData.map((item, index) => (
                <div key={item.year} className="relative">
                  <Card 
                    className="border-[#D71920] shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
                    onClick={() => setSelectedYear(selectedYear === item.year ? null : item.year)}
                  >
                    <CardHeader className="text-center pb-2">
                      <div className="relative mx-auto mb-4">
                        <img 
                          src={item.avatar}
                          alt={item.presidentA}
                          className="w-20 h-20 rounded-full border-4 border-[#D71920]"
                        />
                        {/* Timeline dot */}
                        <div className="absolute -bottom-2 left-1/2 w-4 h-4 bg-[#D71920] rounded-full transform -translate-x-1/2 hidden lg:block"></div>
                      </div>
                      <CardTitle className="text-[#D71920] text-xl">{item.year}</CardTitle>
                      <CardDescription className="text-[#2E2E2E] font-semibold text-sm">
                        {item.presidentA}
                      </CardDescription>
                      <CardDescription className="text-[#2E2E2E] font-semibold text-sm">
                        {item.presidentB}
                      </CardDescription>
                    </CardHeader>
                    {selectedYear === item.year && (
                      <CardContent className="pt-0">
                        <p className="text-sm text-[#2E2E2E] leading-relaxed">
                          {item.achievement}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-[#D71920] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">{currentText.highlights.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#D71920]" />
              </div>
              <p className="text-lg font-semibold">{currentText.highlights.members}</p>
            </div>

            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-[#D71920]" />
              </div>
              <p className="text-lg font-semibold">{currentText.highlights.revenue}</p>
            </div>

            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-[#D71920]" />
              </div>
              <p className="text-lg font-semibold">{currentText.highlights.referrals}</p>
            </div>

            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-[#D71920]" />
              </div>
              <p className="text-lg font-semibold">{currentText.highlights.ranking}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-[#D71920] hover:bg-[#8B0000] text-white px-8 py-3 text-lg hover:scale-105 transition-all duration-300" onClick={() => window.location.href = '/media'}>
                <Download className="w-5 h-5 mr-2" />
                {currentText.cta.download}
              </Button>
              <Button variant="outline" className="border-[#D71920] text-[#D71920] hover:bg-[#D71920] hover:text-white px-8 py-3 text-lg hover:scale-105 transition-all duration-300" onClick={() => window.location.href = '/referral'}>
                <Share2 className="w-5 h-5 mr-2" />
                {currentText.cta.sendReferral}
              </Button>
              <Button className="bg-[#2E2E2E] hover:bg-[#8B0000] text-white px-8 py-3 text-lg hover:scale-105 transition-all duration-300" onClick={() => window.location.href = '/contact'}>
                <Map className="w-5 h-5 mr-2" />
                {currentText.cta.viewMap}
              </Button>
            </div>
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
          
          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-white/60">
            <p>&copy; 2024 BNI FELIX. Tất cả quyền được bảo lưu.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#D71920] transition-colors">Chính sách bảo mật</a>
              <a href="#" className="hover:text-[#D71920] transition-colors">Điều khoản sử dụng</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
