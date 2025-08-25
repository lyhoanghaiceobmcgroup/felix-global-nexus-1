
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MemberHeader } from "@/components/members/MemberHeader";
import { MemberHero } from "@/components/members/MemberHero";
import { MemberFilters } from "@/components/members/MemberFilters";
import { MemberList } from "@/components/members/MemberList";
import { PresentationTab } from "@/components/members/PresentationTab";
import { ConnectTab } from "@/components/members/ConnectTab";
import { OutstandingTab } from "@/components/members/OutstandingTab";
import { MemberFooter } from "@/components/members/MemberFooter";

const Members = () => {
  const [language, setLanguage] = useState('vi');
  const [currentPresenter, setCurrentPresenter] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPresenting, setIsPresenting] = useState(false);
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const toggleLanguage = () => setLanguage(language === 'vi' ? 'en' : 'vi');

  const text = {
    vi: {
      nav: {
        home: "Trang chủ",
        about: "Giới thiệu", 
        members: "Thành viên",
        schedule: "Lịch họp",
        kpi: "KPI & Vinh danh",
        contact: "Liên hệ"
      },
      hero: {
        title: "Thành Viên & Giới Thiệu Ngành Nghề 30s",
        subtitle: "Kết nối chuyên nghiệp - Chia sẻ cơ hội - Phát triển cùng nhau",
        viewAll: "Xem tất cả thành viên",
        schedule11: "Đặt lịch 1-1",
        start30s: "Bắt đầu giới thiệu 30s",
        register30s: "Đăng ký Slide 30s",
        referFriend: "Giới thiệu bạn bè tham gia"
      },
      filters: {
        search: "Tìm kiếm thành viên...",
        industry: "Lọc theo ngành",
        region: "Lọc theo khu vực",
        all: "Tất cả",
        allIndustries: "Tất cả ngành nghề",
        allRegions: "Tất cả khu vực"
      },
      presentation: {
        currentPresenter: "Đang Trình Bày",
        timeRemaining: "Thời gian còn lại",
        nextUp: "Tiếp theo",
        start: "Bắt đầu",
        pause: "Tạm dừng",
        next: "Tiếp theo",
        skip: "Bỏ qua"
      },
      member: {
        contact: "Liên hệ",
        website: "Website",
        schedule11: "Đặt lịch 1-1",
        sendReferral: "Gửi Referral",
        callZalo: "Gọi Zalo",
        sendEmail: "Gửi Email"
      },
      connect: {
        title: "Hệ thống 1-1 CONNECT",
        smartScheduling: "Đặt lịch 1-1 thông minh",
        suggestions: "Gợi ý kết nối",
        history: "Lịch sử cuộc hẹn"
      },
      outstanding: {
        title: "Thành Viên Nổi Bật",
        topReferral: "TOP Referral",
        connectLeader: "CONNECT Leader",
        fastGrowth: "Tăng trưởng nhanh"
      },
      tabs: {
        memberList: "Danh sách thành viên",
        presentation: "Giới thiệu 30s",
        connect: "1-1 CONNECT",
        outstanding: "Thành viên nổi bật"
      }
    },
    en: {
      nav: {
        home: "Home",
        about: "About",
        members: "Members", 
        schedule: "Schedule",
        kpi: "KPI & Recognition",
        contact: "Contact"
      },
      hero: {
        title: "Members & 30s Industry Introduction",
        subtitle: "Professional Networking - Share Opportunities - Grow Together",
        viewAll: "View All Members",
        schedule11: "Schedule 1-1",
        start30s: "Start 30s Introduction",
        register30s: "Register 30s Slide",
        referFriend: "Refer Friends to Join"
      },
      filters: {
        search: "Search members...",
        industry: "Filter by industry",
        region: "Filter by region",
        all: "All",
        allIndustries: "All Industries",
        allRegions: "All Regions"
      },
      presentation: {
        currentPresenter: "Currently Presenting",
        timeRemaining: "Time Remaining",
        nextUp: "Next Up",
        start: "Start",
        pause: "Pause",
        next: "Next",
        skip: "Skip"
      },
      member: {
        contact: "Contact",
        website: "Website", 
        schedule11: "Schedule 1-1",
        sendReferral: "Send Referral",
        callZalo: "Call Zalo",
        sendEmail: "Send Email"
      },
      connect: {
        title: "1-1 CONNECT System",
        smartScheduling: "Smart 1-1 Scheduling",
        suggestions: "Connection Suggestions",
        history: "Meeting History"
      },
      outstanding: {
        title: "Outstanding Members",
        topReferral: "TOP Referral",
        connectLeader: "CONNECT Leader",
        fastGrowth: "Fast Growth"
      },
      tabs: {
        memberList: "Member List",
        presentation: "30s Introduction",
        connect: "1-1 CONNECT",
        outstanding: "Outstanding Members"
      }
    }
  };

  const currentText = text[language];

  const members = [
    {
      id: 1,
      name: "Nguyễn Thị Huệ",
      nameEn: "Hue Nguyen Thi",
      position: "Giám đốc Marketing",
      positionEn: "Marketing Director",
      company: "Digital Marketing Pro",
      companyEn: "Digital Marketing Pro",
      industry: "Marketing",
      industryEn: "Marketing",
      region: "Hà Nội",
      regionEn: "Hanoi",
      avatar: "/placeholder.svg",
      badges: ["TOP Referral", "CONNECT Leader"],
      tagline: "Tăng doanh thu 300% với Google & Facebook Ads",
      taglineEn: "Increase revenue 300% with Google & Facebook Ads",
      introduction: "Xin chào, tôi là Huệ, chuyên gia Marketing trực tuyến. Chúng tôi giúp doanh nghiệp tăng doanh thu từ Google Ads và Facebook Ads với ROI tối thiểu 300%.",
      introductionEn: "Hello, I'm Hue, digital marketing specialist. We help businesses increase revenue from Google Ads and Facebook Ads with minimum 300% ROI.",
      website: "https://digitalmarketingpro.vn",
      email: "hue@digitalmarketingpro.vn",
      phone: "0912345678",
      zalo: "0912345678"
    },
    {
      id: 2,
      name: "Phạm Anh Tuấn",
      nameEn: "Tuan Pham Anh",
      position: "Kiến trúc sư trưởng",
      positionEn: "Chief Architect",
      company: "Interior Design Studio",
      companyEn: "Interior Design Studio", 
      industry: "Thiết kế",
      industryEn: "Design",
      region: "Hà Nội",
      regionEn: "Hanoi",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      badges: ["Star Member"],
      tagline: "15 năm kinh nghiệm thiết kế không gian hoàn hảo",
      taglineEn: "15 years experience designing perfect spaces",
      introduction: "Tôi là Tuấn, chuyên thiết kế nội thất cao cấp. Chúng tôi tạo ra không gian sống và làm việc hoàn hảo với 15 năm kinh nghiệm.",
      introductionEn: "I'm Tuan, specialized in luxury interior design. We create perfect living and working spaces with 15 years of experience.",
      website: "https://interiordesign.vn",
      email: "tuan@interiordesign.vn", 
      phone: "0987654321",
      zalo: "0987654321"
    },
    {
      id: 3,
      name: "Lê Thị Phượng",
      nameEn: "Phuong Le Thi",
      position: "Chuyên gia tài chính",
      positionEn: "Financial Expert",
      company: "Financial Consulting",
      companyEn: "Financial Consulting",
      industry: "Tài chính",
      industryEn: "Finance",
      region: "Hà Nội",
      regionEn: "Hanoi",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      badges: ["TOP Connector", "Tăng trưởng nhanh"],
      tagline: "Tối ưu dòng tiền và đầu tư hiệu quả",
      taglineEn: "Optimize cash flow and efficient investment",
      introduction: "Tôi là Phượng, chuyên gia tư vấn tài chính. Chúng tôi giúp doanh nghiệp tối ưu hóa dòng tiền và đầu tư hiệu quả.",
      introductionEn: "I'm Phuong, financial consulting expert. We help businesses optimize cash flow and invest effectively.",
      website: "https://financialconsulting.vn",
      email: "phuong@financialconsulting.vn",
      phone: "0901234567",
      zalo: "0901234567"
    },
    {
      id: 4,
      name: "Đinh Thúy Nga",
      nameEn: "Nga Dinh Thuy",
      position: "Luật sư doanh nghiệp",
      positionEn: "Corporate Lawyer",
      company: "Legal Solutions",
      companyEn: "Legal Solutions",
      industry: "Pháp lý",
      industryEn: "Legal",
      region: "Hà Nội",
      regionEn: "Hanoi",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      badges: ["Expert Member"],
      tagline: "Giải pháp pháp lý toàn diện cho doanh nghiệp",
      taglineEn: "Comprehensive legal solutions for businesses",
      introduction: "Tôi là Nga, chuyên tư vấn pháp lý doanh nghiệp. Chúng tôi cung cấp dịch vụ pháp lý toàn diện từ thành lập đến phát triển doanh nghiệp.",
      introductionEn: "I'm Nga, specialized in corporate legal consulting. We provide comprehensive legal services from business establishment to development.",
      website: "https://legalsolutions.vn",
      email: "nga@legalsolutions.vn",
      phone: "0903456789",
      zalo: "0903456789"
    },
    {
      id: 5,
      name: "Phạm Khánh Duy",
      nameEn: "Duy Pham Khanh",
      position: "Giám đốc Công nghệ",
      positionEn: "Technology Director",
      company: "Tech Innovation",
      companyEn: "Tech Innovation",
      industry: "Công nghệ",
      industryEn: "Technology",
      region: "Hà Nội",
      regionEn: "Hanoi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      badges: ["Innovation Leader"],
      tagline: "Chuyển đổi số cho doanh nghiệp SME",
      taglineEn: "Digital transformation for SME businesses",
      introduction: "Tôi là Duy, chuyên về chuyển đổi số. Chúng tôi giúp doanh nghiệp SME tối ưu hóa quy trình với công nghệ hiện đại.",
      introductionEn: "I'm Duy, specialized in digital transformation. We help SME businesses optimize processes with modern technology.",
      website: "https://techinnovation.vn",
      email: "duy@techinnovation.vn",
      phone: "0905678901",
      zalo: "0905678901"
    },
    {
      id: 6,
      name: "Giang Iran",
      nameEn: "Iran Giang",
      position: "Chuyên gia Nhân sự",
      positionEn: "HR Specialist",
      company: "HR Solutions",
      companyEn: "HR Solutions",
      industry: "Nhân sự",
      industryEn: "Human Resources",
      region: "Hà Nội",
      regionEn: "Hanoi",
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      badges: ["HR Expert"],
      tagline: "Tối ưu hóa nguồn nhân lực doanh nghiệp",
      taglineEn: "Optimize enterprise human resources",
      introduction: "Tôi là Iran, chuyên gia về tối ưu hóa nguồn nhân lực. Chúng tôi giúp doanh nghiệp xây dựng đội ngũ hiệu quả và văn hóa tích cực.",
      introductionEn: "I'm Iran, specialized in human resource optimization. We help businesses build effective teams and positive culture.",
      website: "https://hrsolutions.vn",
      email: "iran@hrsolutions.vn",
      phone: "0907890123",
      zalo: "0907890123"
    }
  ];

  const industries = [...new Set(members.map(m => language === 'vi' ? m.industry : m.industryEn))];
  const regions = [...new Set(members.map(m => language === 'vi' ? m.region : m.regionEn))];

  const filteredMembers = members.filter(member => {
    const matchesSearch = (language === 'vi' ? member.name : member.nameEn)
      .toLowerCase().includes(searchTerm.toLowerCase()) ||
      (language === 'vi' ? member.company : member.companyEn)
      .toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = filterIndustry === 'all' || 
      (language === 'vi' ? member.industry : member.industryEn) === filterIndustry;
    
    const matchesRegion = filterRegion === 'all' || 
      (language === 'vi' ? member.region : member.regionEn) === filterRegion;
    
    return matchesSearch && matchesIndustry && matchesRegion;
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPresenting && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPresenting) {
      setIsPresenting(false);
      setTimeLeft(30);
      setCurrentPresenter((prev) => (prev + 1) % filteredMembers.length);
    }
    return () => clearTimeout(timer);
  }, [isPresenting, timeLeft, filteredMembers.length]);

  const startPresentation = () => {
    setIsPresenting(true);
    setTimeLeft(30);
  };

  const pausePresentation = () => {
    setIsPresenting(false);
  };

  const nextPresenter = () => {
    setCurrentPresenter((prev) => (prev + 1) % filteredMembers.length);
    setTimeLeft(30);
    setIsPresenting(false);
  };

  const skipPresenter = () => {
    setCurrentPresenter((prev) => (prev + 1) % filteredMembers.length);
    setTimeLeft(30);
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <MemberHeader 
        language={language} 
        toggleLanguage={toggleLanguage} 
        currentText={currentText} 
      />

      <MemberHero currentText={currentText} />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#2E2E2E]">
              📘 {language === 'vi' ? 'Danh sách thành viên FELIX Chapter' : 'FELIX Chapter Member Directory'}
            </h2>
            <p className="text-lg text-[#8B0000] max-w-3xl mx-auto">
              {language === 'vi' 
                ? '53+ thành viên đa ngành nghề, kết nối và hỗ trợ phát triển kinh doanh bền vững'
                : '53+ members across diverse industries, connecting and supporting sustainable business growth'
              }
            </p>
          </div>

          <Tabs defaultValue="members" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              <TabsTrigger value="members" className="text-sm">{currentText.tabs.memberList}</TabsTrigger>
              <TabsTrigger value="presentation" className="text-sm">{currentText.tabs.presentation}</TabsTrigger>
              <TabsTrigger value="connect" className="text-sm">{currentText.tabs.connect}</TabsTrigger>
              <TabsTrigger value="outstanding" className="text-sm">{currentText.tabs.outstanding}</TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="space-y-8">
              <MemberFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterIndustry={filterIndustry}
                setFilterIndustry={setFilterIndustry}
                filterRegion={filterRegion}
                setFilterRegion={setFilterRegion}
                viewMode={viewMode}
                setViewMode={setViewMode}
                industries={industries}
                regions={regions}
                currentText={currentText}
              />

              <MemberList
                members={filteredMembers}
                viewMode={viewMode}
                language={language}
                currentText={currentText}
              />
            </TabsContent>

            <TabsContent value="presentation">
              <PresentationTab
                filteredMembers={filteredMembers}
                currentPresenter={currentPresenter}
                timeLeft={timeLeft}
                isPresenting={isPresenting}
                startPresentation={startPresentation}
                pausePresentation={pausePresentation}
                nextPresenter={nextPresenter}
                skipPresenter={skipPresenter}
                language={language}
                currentText={currentText}
              />
            </TabsContent>

            <TabsContent value="connect">
              <ConnectTab currentText={currentText} />
            </TabsContent>

            <TabsContent value="outstanding">
              <OutstandingTab
                filteredMembers={filteredMembers}
                language={language}
                currentText={currentText}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <MemberFooter />
    </div>
  );
};

export default Members;
