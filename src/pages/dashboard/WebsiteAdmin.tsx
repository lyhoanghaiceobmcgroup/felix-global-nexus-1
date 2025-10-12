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

  // Media Hub Content - đồng bộ với MediaHub.tsx
  const [mediaContent, setMediaContent] = useState({
    // Hero Section
    heroTitleVi: "📺 MEDIA HUB",
    heroSubtitleVi: "TRUYỀN THÔNG & TÀI NGUYÊN",
    heroSubtitleEn: "Media & Resources Center",
    
    // Filter Options
    filterOptions: [
      { value: 'all', label: 'Tất cả', labelEn: 'All' },
      { value: 'introduction', label: 'Giới thiệu', labelEn: 'Introduction' },
      { value: 'onboarding', label: 'Tài liệu mới', labelEn: 'Onboarding' },
      { value: 'training', label: 'Đào tạo', labelEn: 'Training' }
    ],
    
    // Documents
    documents: [
      {
        id: 1,
        title: "BNI FELIX Chapter Introduction",
        titleEn: "BNI FELIX Chapter Introduction", 
        type: "PDF",
        category: "introduction",
        isPublic: true,
        downloadUrl: "#",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400"
      },
      {
        id: 2,
        title: "Hướng dẫn thành viên mới",
        titleEn: "New Member Onboarding Guide",
        type: "Video",
        category: "onboarding", 
        isPublic: false,
        downloadUrl: "#",
        thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400"
      }
    ],
    
    // Photo Albums
    photoAlbums: [
      {
        id: 1,
        title: "Họp tuần 15/06/2024",
        titleEn: "Weekly Meeting 15/06/2024",
        year: "2024",
        event: "weekly",
        photos: 25,
        coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400"
      },
      {
        id: 2, 
        title: "FELIX Gala Night 2024",
        titleEn: "FELIX Gala Night 2024",
        year: "2024",
        event: "gala",
        photos: 150,
        coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400"
      }
    ],
    
    // Videos
    videos: [
      {
        id: 1,
        title: "Diễn giả: Nguyễn Văn A - Digital Marketing",
        titleEn: "Speaker: Nguyen Van A - Digital Marketing",
        speaker: "Nguyễn Văn A",
        date: "15/06/2024",
        duration: "45:30",
        videoUrl: "#",
        slideUrl: "#",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400"
      }
    ],
    
    // CTA Section
    ctaTitleVi: "📲 Truy cập nhanh tài nguyên FELIX",
    ctaTitleEn: "Quick Access to FELIX Resources",
    ctaButtons: [
      "📎 Tải tài liệu FELIX",
      "🎬 Xem video diễn giả",
      "🖼️ Xem thư viện ảnh",
      "📤 Gửi tài liệu mới"
    ],
    
    // Access Notice
    accessNoticeVi: "🔐 Lưu ý quyền truy cập: Thành viên đăng nhập mới xem được tài liệu nội bộ. Khách chỉ xem được tài liệu công khai.",
    accessNoticeEn: "🔐 Access Notice: Only logged-in members can view internal documents. Guests can only view public documents."
  });

  // Members Page Content - đồng bộ với Members.tsx
  const [membersContent, setMembersContent] = useState({
    // Hero Section
    heroTitleVi: "Thành Viên & Giới Thiệu Ngành Nghề 30s",
    heroTitleEn: "Members & 30s Industry Introduction",
    heroSubtitleVi: "Kết nối chuyên nghiệp - Chia sẻ cơ hội - Phát triển cùng nhau",
    heroSubtitleEn: "Professional Networking - Share Opportunities - Grow Together",
    
    // Hero Buttons
    heroButtons: [
      { textVi: "👁️ Xem tất cả thành viên", textEn: "👁️ View All Members", variant: "default" },
      { textVi: "📅 Đặt lịch 1-1", textEn: "📅 Schedule 1-1", variant: "outline" },
      { textVi: "🎤 Bắt đầu giới thiệu 30s", textEn: "🎤 Start 30s Introduction", variant: "default" },
      { textVi: "📤 Đăng ký Slide 30s", textEn: "📤 Register 30s Slide", variant: "outline" },
      { textVi: "👥 Giới thiệu bạn bè tham gia", textEn: "👥 Refer Friends to Join", variant: "default" }
    ],
    
    // Member Directory Section
    directoryTitleVi: "📘 Danh sách thành viên FELIX Chapter",
    directoryTitleEn: "📘 FELIX Chapter Member Directory",
    directoryDescVi: "53+ thành viên đa ngành nghề, kết nối và hỗ trợ phát triển kinh doanh bền vững",
    directoryDescEn: "53+ members across diverse industries, connecting and supporting sustainable business growth",
    
    // Tabs
    tabs: [
      { value: "members", labelVi: "Danh sách thành viên", labelEn: "Member List" },
      { value: "presentation", labelVi: "Giới thiệu 30s", labelEn: "30s Introduction" },
      { value: "connect", labelVi: "1-1 CONNECT", labelEn: "1-1 CONNECT" },
      { value: "outstanding", labelVi: "Thành viên nổi bật", labelEn: "Outstanding Members" }
    ],
    
    // Members Data
    members: [
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
      }
    ],
    
    // Presentation Tab - Check-in & 30s Slides System
    presentation: {
      titleVi: "⏱️ Hệ thống Check-in & Trình chiếu 30s",
      titleEn: "⏱️ Check-in & 30s Presentation System",
      
      checkInSection: {
        titleVi: "Check-in qua Dashboard",
        titleEn: "Check-in via Dashboard",
        descVi: "Thành viên check-in trước buổi họp để được đưa vào danh sách trình bày",
        descEn: "Members check-in before meeting to be included in presentation list"
      },
      
      slideSection: {
        titleVi: "Slide tự động hiển thị",
        titleEn: "Auto-display Slides",
        descVi: "Thông tin 30s hiển thị: Tên + Ngành nghề + Hình ảnh + Slogan",
        descEn: "30s info displays: Name + Industry + Image + Slogan"
      },
      
      timerSection: {
        titleVi: "Đồng bộ trình chiếu",
        titleEn: "Synchronized Presentation",
        descVi: "Nút Play đếm ngược 30s đồng bộ với slide của cá nhân",
        descEn: "Play button counts down 30s synchronized with individual slide"
      },
      
      slideTemplates: [
        {
          id: 1,
          name: "SLIDE 1",
          color: "#DC143C",
          layout: "standard",
          elements: [
            { type: "logo", position: "top-center" },
            { type: "name", position: "center", text: "Tên thành viên + Vai trò" },
            { type: "tagline", position: "bottom", text: "Tối ưu thuế – Tăng trưởng doanh nghiệp" },
            { type: "services", position: "bottom-center", text: "Kế toán – Tư vấn Thuế – Kiểm toán" }
          ]
        },
        {
          id: 2,
          name: "SLIDE 2",
          color: "#8B0000",
          layout: "product-showcase",
          elements: [
            { type: "product-image", position: "center", text: "Hình ảnh sản phẩm/dịch vụ" },
            { type: "product-highlight", position: "center-bottom", text: "Sản phẩm nổi bật\nTên – Ứng dụng – Ưu điểm" },
            { type: "contact-buttons", position: "bottom", buttons: ["🌐 Website", "📱 QR", "📞 Hotline"] }
          ]
        }
      ]
    },
    
    // 1-1 CONNECT Tab
    connectTab: {
      titleVi: "Hệ thống 1-1 CONNECT",
      titleEn: "1-1 CONNECT System",
      descVi: "Hệ thống đặt lịch 1-1 thông minh với gợi ý kết nối theo ngành bổ trợ",
      descEn: "Smart 1-1 scheduling system with connection suggestions by complementary industry",
      
      sections: [
        {
          icon: "📅",
          titleVi: "Đặt lịch 1-1 thông minh",
          titleEn: "Smart 1-1 Scheduling",
          descVi: "Hiển thị lịch rảnh của các thành viên và đặt lịch tự động",
          descEn: "Display member availability and automatic scheduling",
          buttonVi: "📅 Mở Lịch Đặt Hẹn",
          buttonEn: "📅 Open Schedule"
        },
        {
          icon: "👥",
          titleVi: "Gợi ý kết nối",
          titleEn: "Connection Suggestions",
          descVi: "Gợi ý kết nối 1-1 theo ngành bổ trợ và ưu tiên KPI",
          descEn: "1-1 connection suggestions by complementary industry and KPI priority",
          buttonVi: "🔍 Xem Gợi Ý Kết Nối",
          buttonEn: "🔍 View Suggestions"
        },
        {
          icon: "⏰",
          titleVi: "Lịch sử cuộc hẹn",
          titleEn: "Meeting History",
          descVi: "Lưu lịch sử cuộc hẹn và kết quả kết nối",
          descEn: "Save meeting history and connection results",
          buttonVi: "📊 Xem Lịch Sử",
          buttonEn: "📊 View History"
        }
      ]
    },
    
    // Outstanding Members Tab
    outstandingTab: {
      titleVi: "Thành Viên Nổi Bật",
      titleEn: "Outstanding Members",
      badgeTypes: [
        { id: "top-referral", nameVi: "TOP Referral", nameEn: "TOP Referral", color: "#DC143C" },
        { id: "connect-leader", nameVi: "CONNECT Leader", nameEn: "CONNECT Leader", color: "#8B0000" },
        { id: "fast-growth", nameVi: "Tăng trưởng nhanh", nameEn: "Fast Growth", color: "#B22222" }
      ],
      buttonTextVi: "🏆 Xem Chi Tiết Thành Tích",
      buttonTextEn: "🏆 View Achievement Details"
    }
  });

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

  // Schedule Page Content - đồng bộ với Schedule.tsx
  const [scheduleContent, setScheduleContent] = useState({
    titleVi: "Lịch Họp & Diễn Giả Tuần",
    titleEn: "Meeting Schedule & Weekly Speakers",
    subtitleVi: "Thông tin chi tiết về lịch trình họp tuần và diễn giả",
    subtitleEn: "Detailed information about weekly meeting schedule and speakers",
    scheduleVi: "Thứ Ba hàng tuần, 6:45 AM – 8:45 AM",
    scheduleEn: "Tuesday Weekly, 6:45 AM – 8:45 AM",
    locationVi: "Cung Văn Hóa Hữu Nghị Việt Xô, số 91 Trần Hưng Đạo, Hà Nội",
    locationEn: "Vietnam-Soviet Friendship Cultural Palace, 91 Tran Hung Dao, Hanoi",
    mapsLink: "https://maps.google.com/",
    guestNoteVi: "Mỗi thành viên có thể mời 1 đối tác/đồng nghiệp tham dự họp thử",
    guestNoteEn: "Each member can invite 1 partner/colleague to trial meeting",
    weeklySchedule: [
      {
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
      },
      {
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
      },
      {
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
      }
    ]
  });

  // KPI Hall Content - đồng bộ với KpiHallOfImpact.tsx
  const [kpiContent, setKpiContent] = useState({
    // Hero Section
    titleVi: "KPI & Hall of Impact",
    titleEn: "KPI & Hall of Impact",
    subtitleVi: "Bảng thành tích và vinh danh thành viên xuất sắc BNI FELIX",
    subtitleEn: "Performance dashboard and recognition of outstanding BNI FELIX members",
    
    // KPI Overview Stats
    totalReferrals: 127,
    referralReceived: 89,
    referralValue: "2.1B",
    meetings: 142,
    attendance: 95,
    
    // KPI Table Data
    kpiTableMembers: [
      {
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
      },
      {
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
      },
      {
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
      }
    ],
    
    // Hall of Fame Data
    hallOfFame: {
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
    },
    
    // Special Achievements
    specialAchievements: [
      {
        name: "Hoàng Văn E",
        company: "Finance Group",
        achievement: "Giới thiệu 5 thành viên mới",
        type: "newMember",
        avatar: "photo-1560250097-0b93528c311a"
      },
      {
        name: "Ngô Thị F",
        company: "Event Solutions",
        achievement: "Đối tác tài trợ chính",
        type: "sponsor",
        avatar: "photo-1580489944761-15a19d654956"
      },
      {
        name: "Vũ Minh G",
        company: "Real Estate Pro",
        achievement: "Đạt 1 tỷ VNĐ referral",
        type: "milestone",
        avatar: "photo-1519085360753-af0119f7cbe7"
      }
    ]
  });


  // Contact Info - đồng bộ với Contact.tsx
  const [contactInfo, setContactInfo] = useState({
    // Hero Section
    pageTitleVi: "Liên Hệ & Kết Nối Đối Tác",
    pageTitleEn: "Contact & Partner Connection",
    pageSubtitleVi: "💼 Hãy kết nối để tạo ra giá trị bền vững cùng FELIX Chapter",
    pageSubtitleEn: "💼 Connect to create lasting value with FELIX Chapter",
    pageDescriptionVi: "Chúng tôi luôn chào đón những mối quan hệ mới – dù bạn là doanh nhân, khách mời tiềm năng, nhà tài trợ hay đối tác chiến lược. FELIX mong muốn hợp tác cùng những cá nhân và tổ chức có cùng tầm nhìn về phát triển kinh doanh vững mạnh và kết nối giá trị thực tế.",
    pageDescriptionEn: "We always welcome new relationships - whether you are an entrepreneur, potential guest, sponsor or strategic partner. FELIX desires to cooperate with individuals and organizations with the same vision of strong business development and practical value connections.",
    
    // Contact Details
    phone: "084 890 5555",
    email: "info@bnifelix.vn",
    address: "Cung văn hóa Hữu Nghị Việt Xô, 91 Trần Hưng Đạo, Hà Nội",
    addressEn: "Vietnam-Soviet Friendship Cultural Palace, 91 Tran Hung Dao, Hanoi",
    hours: "06:45 – 8:45 (Thứ 3 hàng tuần)",
    hoursEn: "06:45 – 8:45 (Tuesday Weekly)",
    googleMapsLink: "https://maps.google.com/?q=91+Tran+Hung+Dao+Hanoi",
    
    // Quick Contact Form
    quickContactTitleVi: "📝 Form liên hệ nhanh",
    quickContactTitleEn: "📝 Quick Contact Form",
    quickContactDescVi: "Điền thông tin dưới đây, đội ngũ FELIX sẽ phản hồi bạn trong vòng 24h làm việc.",
    quickContactDescEn: "Fill in the information below, FELIX team will respond to you within 24 working hours.",
    
    // Contact Reasons
    reasons: [
      { value: "meeting", labelVi: "Tham dự họp", labelEn: "Attend meeting" },
      { value: "partner", labelVi: "Đăng ký đối tác", labelEn: "Register partnership" },
      { value: "media", labelVi: "Hợp tác truyền thông", labelEn: "Media collaboration" },
      { value: "sponsor", labelVi: "Nhà tài trợ", labelEn: "Sponsorship" },
      { value: "other", labelVi: "Khác", labelEn: "Other" }
    ],
    
    // QR & Direct Connection
    qrTitleVi: "Kết nối trực tiếp",
    qrTitleEn: "Direct Connection",
    qrDescVi: "Quét QR Code để kết nối Zalo hoặc chat với AI",
    qrDescEn: "Scan QR Code to connect Zalo or chat with AI",
    scanQRVi: "📲 Quét QR để kết nối Zalo",
    scanQREn: "📲 Scan QR to connect Zalo",
    chatAIVi: "🧠 Nhận phản hồi nhanh từ Trợ lý FELIX AI",
    chatAIEn: "🧠 Get quick response from FELIX AI Assistant",
    
    // Strategic Partnership
    partnershipTitleVi: "🤝 Trở thành đối tác chiến lược",
    partnershipTitleEn: "🤝 Become Strategic Partner",
    partnershipDescVi: "FELIX đồng hành cùng các tổ chức uy tín trong:",
    partnershipDescEn: "FELIX cooperates with prestigious organizations in:",
    partnerCategory1Vi: "Đào tạo – Coaching – Truyền thông thương hiệu",
    partnerCategory1En: "Training – Coaching – Brand Communication",
    partnerCategory2Vi: "Công nghệ – Phần mềm – Tài chính – Pháp lý",
    partnerCategory2En: "Technology – Software – Finance – Legal",
    partnerCategory3Vi: "Tổ chức sự kiện – Hội thảo – Hợp tác cộng đồng",
    partnerCategory3En: "Event Organization – Seminars – Community Cooperation",
    partnerQuestionVi: "Bạn muốn đồng hành cùng FELIX?",
    partnerQuestionEn: "Do you want to partner with FELIX?",
    sendProposalVi: "💼 Gửi đề xuất hợp tác",
    sendProposalEn: "💼 Send Partnership Proposal",
    registerSponsorVi: "🏷️ Đăng ký làm Nhà tài trợ",
    registerSponsorEn: "🏷️ Register as Sponsor",
    
    // Newsletter
    newsletterTitleVi: "📬 Nhận bản tin FELIX",
    newsletterTitleEn: "📬 Receive FELIX Newsletter",
    newsletterDescVi: "Đăng ký để cập nhật lịch họp, sự kiện, tài liệu hữu ích mỗi tuần.",
    newsletterDescEn: "Subscribe to get updates on meeting schedules, events, and useful materials every week.",
    subscribeNewsletterVi: "📬 Đăng ký nhận bản tin định kỳ",
    subscribeNewsletterEn: "📬 Subscribe to Newsletter",
    
    // Social Media
    socialMediaTitleVi: "🌐 Kết nối mạng xã hội",
    socialMediaTitleEn: "🌐 Social Media Connection",
    followFanpageVi: "📺 Fanpage Facebook FELIX Chapter",
    followFanpageEn: "📺 Facebook Fanpage FELIX Chapter",
    watchVideoVi: "🎥 YouTube Video giới thiệu hoạt động",
    watchVideoEn: "🎥 YouTube Introduction Video",
    connectLinkedInVi: "🔗 LinkedIn: Cộng đồng Doanh nhân FELIX",
    connectLinkedInEn: "🔗 LinkedIn: FELIX Entrepreneur Community",
    facebook: "https://facebook.com/bnielixhanoi",
    youtube: "https://youtube.com/@bnielixhanoi",
    linkedin: "https://linkedin.com/company/bni-felix-hanoi",
    
    // AI Assistant
    aiAssistantTitleVi: "🤖 Trợ lý FELIX AI – Hỏi đáp nhanh",
    aiAssistantTitleEn: "🤖 FELIX AI Assistant – Quick Q&A",
    aiDescVi: "Trả lời nhanh các câu hỏi về FELIX",
    aiDescEn: "Quick answers to questions about FELIX",
    openAIVi: "🧠 Mở Trợ lý FELIX AI",
    openAIEn: "🧠 Open FELIX AI Assistant",
    
    // Exit Popup
    exitTitleVi: "Đừng vội rời đi!",
    exitTitleEn: "Don't leave yet!",
    exitDescVi: "Bạn đã nhận brochure FELIX chưa?",
    exitDescEn: "Have you received the FELIX brochure?",
    receiveDocsVi: "📩 Nhận tài liệu",
    receiveDocsEn: "📩 Receive Documents",
    connectRepVi: "📞 Kết nối với đại diện Chapter",
    connectRepEn: "📞 Connect with Chapter Representative"
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
              <CardDescription>Quản lý nội dung, bố cục, giao diện và tính năng của trang Thành viên</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Hero Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">🎯 Hero Section</h3>
                
                <div className="space-y-2">
                  <Label>Tiêu đề chính (Tiếng Việt)</Label>
                  <Input
                    value={membersContent.heroTitleVi}
                    onChange={(e) => setMembersContent({...membersContent, heroTitleVi: e.target.value})}
                    placeholder="Thành Viên & Giới Thiệu Ngành Nghề 30s"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tiêu đề chính (English)</Label>
                  <Input
                    value={membersContent.heroTitleEn}
                    onChange={(e) => setMembersContent({...membersContent, heroTitleEn: e.target.value})}
                    placeholder="Members & 30s Industry Introduction"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phụ đề (Tiếng Việt)</Label>
                  <Input
                    value={membersContent.heroSubtitleVi}
                    onChange={(e) => setMembersContent({...membersContent, heroSubtitleVi: e.target.value})}
                    placeholder="Kết nối chuyên nghiệp - Chia sẻ cơ hội - Phát triển cùng nhau"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phụ đề (English)</Label>
                  <Input
                    value={membersContent.heroSubtitleEn}
                    onChange={(e) => setMembersContent({...membersContent, heroSubtitleEn: e.target.value})}
                    placeholder="Professional Networking - Share Opportunities - Grow Together"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Hero Background Color</Label>
                  <Input
                    type="color"
                    value="#DC143C"
                    className="h-10"
                  />
                  <p className="text-xs text-muted-foreground">Màu nền gradient hero section</p>
                </div>
              </div>

              {/* Hero Buttons */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">🔘 Nút chức năng Hero</h3>
                
                {membersContent.heroButtons.map((button, index) => (
                  <Collapsible key={index}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                      <span className="font-semibold">Nút {index + 1}: {button.textVi}</span>
                      <Edit className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 space-y-3 border rounded-b-lg">
                      <div className="space-y-2">
                        <Label>Text (Tiếng Việt)</Label>
                        <Input
                          value={button.textVi}
                          onChange={(e) => {
                            const newButtons = [...membersContent.heroButtons];
                            newButtons[index] = {...button, textVi: e.target.value};
                            setMembersContent({...membersContent, heroButtons: newButtons});
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Text (English)</Label>
                        <Input
                          value={button.textEn}
                          onChange={(e) => {
                            const newButtons = [...membersContent.heroButtons];
                            newButtons[index] = {...button, textEn: e.target.value};
                            setMembersContent({...membersContent, heroButtons: newButtons});
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Variant</Label>
                        <Input
                          value={button.variant}
                          onChange={(e) => {
                            const newButtons = [...membersContent.heroButtons];
                            newButtons[index] = {...button, variant: e.target.value};
                            setMembersContent({...membersContent, heroButtons: newButtons});
                          }}
                          placeholder="default / outline"
                        />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>

              {/* Member Directory Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">📘 Member Directory Section</h3>
                
                <div className="space-y-2">
                  <Label>Tiêu đề danh sách (Tiếng Việt)</Label>
                  <Input
                    value={membersContent.directoryTitleVi}
                    onChange={(e) => setMembersContent({...membersContent, directoryTitleVi: e.target.value})}
                    placeholder="📘 Danh sách thành viên FELIX Chapter"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tiêu đề danh sách (English)</Label>
                  <Input
                    value={membersContent.directoryTitleEn}
                    onChange={(e) => setMembersContent({...membersContent, directoryTitleEn: e.target.value})}
                    placeholder="📘 FELIX Chapter Member Directory"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Mô tả (Tiếng Việt)</Label>
                  <Textarea
                    value={membersContent.directoryDescVi}
                    onChange={(e) => setMembersContent({...membersContent, directoryDescVi: e.target.value})}
                    placeholder="53+ thành viên đa ngành nghề..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Mô tả (English)</Label>
                  <Textarea
                    value={membersContent.directoryDescEn}
                    onChange={(e) => setMembersContent({...membersContent, directoryDescEn: e.target.value})}
                    placeholder="53+ members across diverse industries..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Tabs Configuration */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">📑 Tab Configuration</h3>
                
                {membersContent.tabs.map((tab, index) => (
                  <Collapsible key={index}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                      <span className="font-semibold">Tab: {tab.labelVi}</span>
                      <Edit className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 space-y-3 border rounded-b-lg">
                      <div className="space-y-2">
                        <Label>Label (Tiếng Việt)</Label>
                        <Input
                          value={tab.labelVi}
                          onChange={(e) => {
                            const newTabs = [...membersContent.tabs];
                            newTabs[index] = {...tab, labelVi: e.target.value};
                            setMembersContent({...membersContent, tabs: newTabs});
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Label (English)</Label>
                        <Input
                          value={tab.labelEn}
                          onChange={(e) => {
                            const newTabs = [...membersContent.tabs];
                            newTabs[index] = {...tab, labelEn: e.target.value};
                            setMembersContent({...membersContent, tabs: newTabs});
                          }}
                        />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>

              {/* Members Data */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">👥 Quản lý Danh sách Thành viên</h3>
                <p className="text-sm text-muted-foreground">Tổng số: {membersContent.members.length} thành viên</p>
                
                {membersContent.members.slice(0, 3).map((member, index) => (
                  <Collapsible key={member.id}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                      <div className="flex items-center gap-3">
                        <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                        <div className="text-left">
                          <span className="font-semibold block">{member.name}</span>
                          <span className="text-xs text-muted-foreground">{member.company}</span>
                        </div>
                      </div>
                      <Edit className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 space-y-3 border rounded-b-lg">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label>Tên (VI)</Label>
                          <Input value={member.name} />
                        </div>
                        <div className="space-y-2">
                          <Label>Tên (EN)</Label>
                          <Input value={member.nameEn} />
                        </div>
                        <div className="space-y-2">
                          <Label>Chức vụ (VI)</Label>
                          <Input value={member.position} />
                        </div>
                        <div className="space-y-2">
                          <Label>Chức vụ (EN)</Label>
                          <Input value={member.positionEn} />
                        </div>
                        <div className="space-y-2">
                          <Label>Công ty</Label>
                          <Input value={member.company} />
                        </div>
                        <div className="space-y-2">
                          <Label>Ngành nghề (VI)</Label>
                          <Input value={member.industry} />
                        </div>
                        <div className="space-y-2">
                          <Label>Khu vực</Label>
                          <Input value={member.region} />
                        </div>
                        <div className="space-y-2">
                          <Label>Avatar URL</Label>
                          <Input value={member.avatar} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Tagline (VI)</Label>
                        <Input value={member.tagline} />
                      </div>
                      <div className="space-y-2">
                        <Label>Giới thiệu (VI)</Label>
                        <Textarea value={member.introduction} rows={3} />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input value={member.email} />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone</Label>
                          <Input value={member.phone} />
                        </div>
                        <div className="space-y-2">
                          <Label>Website</Label>
                          <Input value={member.website} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Badges</Label>
                        <div className="flex gap-2">
                          {member.badges.map((badge, i) => (
                            <Badge key={i} variant="secondary">{badge}</Badge>
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm thành viên mới
                </Button>
              </div>

              {/* Presentation Tab Settings */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">⏱️ Cài đặt Tab "Giới thiệu 30s"</h3>
                
                <div className="space-y-2">
                  <Label>Tiêu đề (Tiếng Việt)</Label>
                  <Input
                    value={membersContent.presentation.titleVi}
                    onChange={(e) => setMembersContent({
                      ...membersContent, 
                      presentation: {...membersContent.presentation, titleVi: e.target.value}
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tiêu đề (English)</Label>
                  <Input
                    value={membersContent.presentation.titleEn}
                    onChange={(e) => setMembersContent({
                      ...membersContent, 
                      presentation: {...membersContent.presentation, titleEn: e.target.value}
                    })}
                  />
                </div>

                <h4 className="font-semibold mt-4">Check-in Section</h4>
                <div className="space-y-2">
                  <Label>Tiêu đề Check-in (VI)</Label>
                  <Input value={membersContent.presentation.checkInSection.titleVi} />
                </div>
                <div className="space-y-2">
                  <Label>Mô tả Check-in (VI)</Label>
                  <Textarea value={membersContent.presentation.checkInSection.descVi} rows={2} />
                </div>

                <h4 className="font-semibold mt-4">Slide Templates</h4>
                {membersContent.presentation.slideTemplates.map((template, index) => (
                  <Collapsible key={template.id}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                      <span className="font-semibold">{template.name} - {template.layout}</span>
                      <Edit className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 space-y-3 border rounded-b-lg">
                      <div className="space-y-2">
                        <Label>Tên Slide</Label>
                        <Input value={template.name} />
                      </div>
                      <div className="space-y-2">
                        <Label>Màu nền</Label>
                        <Input type="color" value={template.color} className="h-10" />
                      </div>
                      <div className="space-y-2">
                        <Label>Layout Type</Label>
                        <Input value={template.layout} placeholder="standard / product-showcase" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Elements: {template.elements.length} thành phần
                      </p>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>

              {/* 1-1 CONNECT Tab Settings */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">🤝 Cài đặt Tab "1-1 CONNECT"</h3>
                
                <div className="space-y-2">
                  <Label>Tiêu đề (Tiếng Việt)</Label>
                  <Input
                    value={membersContent.connectTab.titleVi}
                    onChange={(e) => setMembersContent({
                      ...membersContent, 
                      connectTab: {...membersContent.connectTab, titleVi: e.target.value}
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Mô tả (Tiếng Việt)</Label>
                  <Textarea
                    value={membersContent.connectTab.descVi}
                    onChange={(e) => setMembersContent({
                      ...membersContent, 
                      connectTab: {...membersContent.connectTab, descVi: e.target.value}
                    })}
                    rows={3}
                  />
                </div>

                <h4 className="font-semibold mt-4">Connect Sections</h4>
                {membersContent.connectTab.sections.map((section, index) => (
                  <Collapsible key={index}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                      <span className="font-semibold">{section.icon} {section.titleVi}</span>
                      <Edit className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 space-y-3 border rounded-b-lg">
                      <div className="space-y-2">
                        <Label>Icon</Label>
                        <Input value={section.icon} />
                      </div>
                      <div className="space-y-2">
                        <Label>Tiêu đề (VI)</Label>
                        <Input value={section.titleVi} />
                      </div>
                      <div className="space-y-2">
                        <Label>Mô tả (VI)</Label>
                        <Textarea value={section.descVi} rows={2} />
                      </div>
                      <div className="space-y-2">
                        <Label>Button Text (VI)</Label>
                        <Input value={section.buttonVi} />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>

              {/* Outstanding Members Tab Settings */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">🏆 Cài đặt Tab "Thành viên nổi bật"</h3>
                
                <div className="space-y-2">
                  <Label>Tiêu đề (Tiếng Việt)</Label>
                  <Input
                    value={membersContent.outstandingTab.titleVi}
                    onChange={(e) => setMembersContent({
                      ...membersContent, 
                      outstandingTab: {...membersContent.outstandingTab, titleVi: e.target.value}
                    })}
                  />
                </div>

                <h4 className="font-semibold mt-4">Badge Types</h4>
                {membersContent.outstandingTab.badgeTypes.map((badge, index) => (
                  <Collapsible key={badge.id}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{backgroundColor: badge.color}}
                        ></div>
                        <span className="font-semibold">{badge.nameVi}</span>
                      </div>
                      <Edit className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 space-y-3 border rounded-b-lg">
                      <div className="space-y-2">
                        <Label>Tên Badge (VI)</Label>
                        <Input value={badge.nameVi} />
                      </div>
                      <div className="space-y-2">
                        <Label>Tên Badge (EN)</Label>
                        <Input value={badge.nameEn} />
                      </div>
                      <div className="space-y-2">
                        <Label>Màu</Label>
                        <Input type="color" value={badge.color} className="h-10" />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}

                <div className="space-y-2">
                  <Label>Button Text (VI)</Label>
                  <Input
                    value={membersContent.outstandingTab.buttonTextVi}
                    onChange={(e) => setMembersContent({
                      ...membersContent, 
                      outstandingTab: {...membersContent.outstandingTab, buttonTextVi: e.target.value}
                    })}
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-6 border-t">
                <Button 
                  onClick={() => handleSave("Trang Thành viên")}
                  className="bg-bni-red hover:bg-bni-dark-red"
                  disabled={isSaving}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
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
              <CardDescription>Cập nhật thông tin lịch họp và diễn giả tuần</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Hero Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Tiêu đề & Phụ đề</h3>
                
                <div className="space-y-2">
                  <Label>Tiêu đề chính (Tiếng Việt)</Label>
                  <Input
                    value={scheduleContent.titleVi}
                    onChange={(e) => setScheduleContent({...scheduleContent, titleVi: e.target.value})}
                    placeholder="Lịch Họp & Diễn Giả Tuần"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tiêu đề chính (English)</Label>
                  <Input
                    value={scheduleContent.titleEn}
                    onChange={(e) => setScheduleContent({...scheduleContent, titleEn: e.target.value})}
                    placeholder="Meeting Schedule & Weekly Speakers"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phụ đề (Tiếng Việt)</Label>
                  <Input
                    value={scheduleContent.subtitleVi}
                    onChange={(e) => setScheduleContent({...scheduleContent, subtitleVi: e.target.value})}
                    placeholder="Thông tin chi tiết về lịch trình họp tuần và diễn giả"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phụ đề (English)</Label>
                  <Input
                    value={scheduleContent.subtitleEn}
                    onChange={(e) => setScheduleContent({...scheduleContent, subtitleEn: e.target.value})}
                    placeholder="Detailed information about weekly meeting schedule and speakers"
                  />
                </div>
              </div>

              {/* Meeting Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Thông tin lịch họp cố định</h3>
                
                <div className="space-y-2">
                  <Label>Lịch họp cố định (Tiếng Việt)</Label>
                  <Input
                    value={scheduleContent.scheduleVi}
                    onChange={(e) => setScheduleContent({...scheduleContent, scheduleVi: e.target.value})}
                    placeholder="Thứ Ba hàng tuần, 6:45 AM – 8:45 AM"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Lịch họp cố định (English)</Label>
                  <Input
                    value={scheduleContent.scheduleEn}
                    onChange={(e) => setScheduleContent({...scheduleContent, scheduleEn: e.target.value})}
                    placeholder="Tuesday Weekly, 6:45 AM – 8:45 AM"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Địa điểm (Tiếng Việt)</Label>
                  <Textarea
                    value={scheduleContent.locationVi}
                    onChange={(e) => setScheduleContent({...scheduleContent, locationVi: e.target.value})}
                    placeholder="Cung Văn Hóa Hữu Nghị Việt Xô, số 91 Trần Hưng Đạo, Hà Nội"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Địa điểm (English)</Label>
                  <Textarea
                    value={scheduleContent.locationEn}
                    onChange={(e) => setScheduleContent({...scheduleContent, locationEn: e.target.value})}
                    placeholder="Vietnam-Soviet Friendship Cultural Palace, 91 Tran Hung Dao, Hanoi"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Link Google Maps</Label>
                  <Input
                    value={scheduleContent.mapsLink}
                    onChange={(e) => setScheduleContent({...scheduleContent, mapsLink: e.target.value})}
                    placeholder="https://maps.google.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Ghi chú khách mời (Tiếng Việt)</Label>
                  <Textarea
                    value={scheduleContent.guestNoteVi}
                    onChange={(e) => setScheduleContent({...scheduleContent, guestNoteVi: e.target.value})}
                    placeholder="Mỗi thành viên có thể mời 1 đối tác/đồng nghiệp tham dự họp thử"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Ghi chú khách mời (English)</Label>
                  <Textarea
                    value={scheduleContent.guestNoteEn}
                    onChange={(e) => setScheduleContent({...scheduleContent, guestNoteEn: e.target.value})}
                    placeholder="Each member can invite 1 partner/colleague to trial meeting"
                    rows={2}
                  />
                </div>
              </div>

              {/* Weekly Schedule */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Lịch diễn giả từng tuần</h3>
                
                <div className="space-y-3">
                  {scheduleContent.weeklySchedule.map((item, index) => (
                    <Collapsible key={index}>
                      <Card className="border-bni-gold">
                        <CardHeader>
                          <CollapsibleTrigger className="w-full">
                            <div className="flex items-center justify-between">
                              <div className="text-left">
                                <CardTitle className="text-lg">{item.week} - {item.date}</CardTitle>
                                <CardDescription>{item.speaker.name}</CardDescription>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                              </div>
                            </div>
                          </CollapsibleTrigger>
                        </CardHeader>
                        <CollapsibleContent>
                          <CardContent className="space-y-4">
                            {/* Week Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Tuần</Label>
                                <Input
                                  value={item.week}
                                  onChange={(e) => {
                                    const newSchedule = [...scheduleContent.weeklySchedule];
                                    newSchedule[index].week = e.target.value;
                                    setScheduleContent({...scheduleContent, weeklySchedule: newSchedule});
                                  }}
                                  placeholder="Tuần 24"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Ngày</Label>
                                <Input
                                  value={item.date}
                                  onChange={(e) => {
                                    const newSchedule = [...scheduleContent.weeklySchedule];
                                    newSchedule[index].date = e.target.value;
                                    setScheduleContent({...scheduleContent, weeklySchedule: newSchedule});
                                  }}
                                  placeholder="14/01/2025"
                                />
                              </div>
                            </div>

                            {/* Speaker Info */}
                            <div className="space-y-4 border-t pt-4">
                              <h4 className="font-semibold">Thông tin diễn giả</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Tên (Tiếng Việt)</Label>
                                  <Input
                                    value={item.speaker.name}
                                    onChange={(e) => {
                                      const newSchedule = [...scheduleContent.weeklySchedule];
                                      newSchedule[index].speaker.name = e.target.value;
                                      setScheduleContent({...scheduleContent, weeklySchedule: newSchedule});
                                    }}
                                    placeholder="Nguyễn Văn A"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Tên (English)</Label>
                                  <Input
                                    value={item.speaker.nameEn}
                                    onChange={(e) => {
                                      const newSchedule = [...scheduleContent.weeklySchedule];
                                      newSchedule[index].speaker.nameEn = e.target.value;
                                      setScheduleContent({...scheduleContent, weeklySchedule: newSchedule});
                                    }}
                                    placeholder="Nguyen Van A"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Ngành nghề (Tiếng Việt)</Label>
                                  <Input
                                    value={item.speaker.industry}
                                    onChange={(e) => {
                                      const newSchedule = [...scheduleContent.weeklySchedule];
                                      newSchedule[index].speaker.industry = e.target.value;
                                      setScheduleContent({...scheduleContent, weeklySchedule: newSchedule});
                                    }}
                                    placeholder="Thiết kế nội thất"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Ngành nghề (English)</Label>
                                  <Input
                                    value={item.speaker.industryEn}
                                    onChange={(e) => {
                                      const newSchedule = [...scheduleContent.weeklySchedule];
                                      newSchedule[index].speaker.industryEn = e.target.value;
                                      setScheduleContent({...scheduleContent, weeklySchedule: newSchedule});
                                    }}
                                    placeholder="Interior Design"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Công ty</Label>
                                  <Input
                                    value={item.speaker.company}
                                    onChange={(e) => {
                                      const newSchedule = [...scheduleContent.weeklySchedule];
                                      newSchedule[index].speaker.company = e.target.value;
                                      setScheduleContent({...scheduleContent, weeklySchedule: newSchedule});
                                    }}
                                    placeholder="ABC Design Studio"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Avatar URL</Label>
                                  <div className="flex gap-2">
                                    <Input
                                      value={item.speaker.avatar}
                                      onChange={(e) => {
                                        const newSchedule = [...scheduleContent.weeklySchedule];
                                        newSchedule[index].speaker.avatar = e.target.value;
                                        setScheduleContent({...scheduleContent, weeklySchedule: newSchedule});
                                      }}
                                      placeholder="/placeholder.svg"
                                    />
                                    <Button variant="outline" size="sm">
                                      <Upload className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Topic Info */}
                            <div className="space-y-4 border-t pt-4">
                              <h4 className="font-semibold">Chủ đề trình bày</h4>
                              <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                  <Label>Chủ đề (Tiếng Việt)</Label>
                                  <Input
                                    value={item.topic}
                                    onChange={(e) => {
                                      const newSchedule = [...scheduleContent.weeklySchedule];
                                      newSchedule[index].topic = e.target.value;
                                      setScheduleContent({...scheduleContent, weeklySchedule: newSchedule});
                                    }}
                                    placeholder="Xu hướng thiết kế nội thất 2025"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Chủ đề (English)</Label>
                                  <Input
                                    value={item.topicEn}
                                    onChange={(e) => {
                                      const newSchedule = [...scheduleContent.weeklySchedule];
                                      newSchedule[index].topicEn = e.target.value;
                                      setScheduleContent({...scheduleContent, weeklySchedule: newSchedule});
                                    }}
                                    placeholder="Interior Design Trends 2025"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Thành viên trực</Label>
                                  <Input
                                    value={item.coordinator}
                                    onChange={(e) => {
                                      const newSchedule = [...scheduleContent.weeklySchedule];
                                      newSchedule[index].coordinator = e.target.value;
                                      setScheduleContent({...scheduleContent, weeklySchedule: newSchedule});
                                    }}
                                    placeholder="Trần Thị B"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Media Flags */}
                            <div className="space-y-4 border-t pt-4">
                              <h4 className="font-semibold">Tài liệu & Video</h4>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={item.hasVideo}
                                    onChange={(e) => {
                                      const newSchedule = [...scheduleContent.weeklySchedule];
                                      newSchedule[index].hasVideo = e.target.checked;
                                      setScheduleContent({...scheduleContent, weeklySchedule: newSchedule});
                                    }}
                                  />
                                  <span>Có video</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={item.hasMaterials}
                                    onChange={(e) => {
                                      const newSchedule = [...scheduleContent.weeklySchedule];
                                      newSchedule[index].hasMaterials = e.target.checked;
                                      setScheduleContent({...scheduleContent, weeklySchedule: newSchedule});
                                    }}
                                  />
                                  <span>Có tài liệu</span>
                                </label>
                              </div>
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm tuần mới
                </Button>
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
              <CardDescription>Cập nhật thông tin KPI và bảng vinh danh</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Hero Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Tiêu đề & Phụ đề</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tiêu đề (Tiếng Việt)</Label>
                    <Input
                      value={kpiContent.titleVi}
                      onChange={(e) => setKpiContent({...kpiContent, titleVi: e.target.value})}
                      placeholder="KPI & Hall of Impact"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tiêu đề (English)</Label>
                    <Input
                      value={kpiContent.titleEn}
                      onChange={(e) => setKpiContent({...kpiContent, titleEn: e.target.value})}
                      placeholder="KPI & Hall of Impact"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phụ đề (Tiếng Việt)</Label>
                    <Textarea
                      value={kpiContent.subtitleVi}
                      onChange={(e) => setKpiContent({...kpiContent, subtitleVi: e.target.value})}
                      placeholder="Bảng thành tích và vinh danh thành viên xuất sắc"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phụ đề (English)</Label>
                    <Textarea
                      value={kpiContent.subtitleEn}
                      onChange={(e) => setKpiContent({...kpiContent, subtitleEn: e.target.value})}
                      placeholder="Performance dashboard and recognition of outstanding members"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* KPI Overview Stats */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Tổng quan KPI Chapter</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <Label>Tổng Referral</Label>
                    <Input
                      type="number"
                      value={kpiContent.totalReferrals}
                      onChange={(e) => setKpiContent({...kpiContent, totalReferrals: parseInt(e.target.value) || 0})}
                      placeholder="127"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Referral nhận</Label>
                    <Input
                      type="number"
                      value={kpiContent.referralReceived}
                      onChange={(e) => setKpiContent({...kpiContent, referralReceived: parseInt(e.target.value) || 0})}
                      placeholder="89"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Doanh thu</Label>
                    <Input
                      value={kpiContent.referralValue}
                      onChange={(e) => setKpiContent({...kpiContent, referralValue: e.target.value})}
                      placeholder="2.1B"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cuộc họp 1-1</Label>
                    <Input
                      type="number"
                      value={kpiContent.meetings}
                      onChange={(e) => setKpiContent({...kpiContent, meetings: parseInt(e.target.value) || 0})}
                      placeholder="142"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tỷ lệ tham dự (%)</Label>
                    <Input
                      type="number"
                      value={kpiContent.attendance}
                      onChange={(e) => setKpiContent({...kpiContent, attendance: parseInt(e.target.value) || 0})}
                      placeholder="95"
                    />
                  </div>
                </div>
              </div>

              {/* Hall of Fame */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Hall of Impact - Bảng Vinh Danh</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Referral Leader */}
                  <Card className="border-bni-gold">
                    <CardHeader>
                      <CardTitle className="text-base">🏆 Referral Leader</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Input
                        placeholder="Tên"
                        value={kpiContent.hallOfFame.referralLeader.name}
                        onChange={(e) => setKpiContent({
                          ...kpiContent,
                          hallOfFame: {
                            ...kpiContent.hallOfFame,
                            referralLeader: {...kpiContent.hallOfFame.referralLeader, name: e.target.value}
                          }
                        })}
                      />
                      <Input
                        placeholder="Công ty"
                        value={kpiContent.hallOfFame.referralLeader.company}
                        onChange={(e) => setKpiContent({
                          ...kpiContent,
                          hallOfFame: {
                            ...kpiContent.hallOfFame,
                            referralLeader: {...kpiContent.hallOfFame.referralLeader, company: e.target.value}
                          }
                        })}
                      />
                      <Input
                        placeholder="Thành tích"
                        value={kpiContent.hallOfFame.referralLeader.achievement}
                        onChange={(e) => setKpiContent({
                          ...kpiContent,
                          hallOfFame: {
                            ...kpiContent.hallOfFame,
                            referralLeader: {...kpiContent.hallOfFame.referralLeader, achievement: e.target.value}
                          }
                        })}
                      />
                      <Input
                        placeholder="Ngành nghề"
                        value={kpiContent.hallOfFame.referralLeader.industry}
                        onChange={(e) => setKpiContent({
                          ...kpiContent,
                          hallOfFame: {
                            ...kpiContent.hallOfFame,
                            referralLeader: {...kpiContent.hallOfFame.referralLeader, industry: e.target.value}
                          }
                        })}
                      />
                    </CardContent>
                  </Card>

                  {/* Top Connector */}
                  <Card className="border-bni-gold">
                    <CardHeader>
                      <CardTitle className="text-base">🎯 Top Connector</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Input
                        placeholder="Tên"
                        value={kpiContent.hallOfFame.topConnector.name}
                        onChange={(e) => setKpiContent({
                          ...kpiContent,
                          hallOfFame: {
                            ...kpiContent.hallOfFame,
                            topConnector: {...kpiContent.hallOfFame.topConnector, name: e.target.value}
                          }
                        })}
                      />
                      <Input
                        placeholder="Công ty"
                        value={kpiContent.hallOfFame.topConnector.company}
                        onChange={(e) => setKpiContent({
                          ...kpiContent,
                          hallOfFame: {
                            ...kpiContent.hallOfFame,
                            topConnector: {...kpiContent.hallOfFame.topConnector, company: e.target.value}
                          }
                        })}
                      />
                      <Input
                        placeholder="Thành tích"
                        value={kpiContent.hallOfFame.topConnector.achievement}
                        onChange={(e) => setKpiContent({
                          ...kpiContent,
                          hallOfFame: {
                            ...kpiContent.hallOfFame,
                            topConnector: {...kpiContent.hallOfFame.topConnector, achievement: e.target.value}
                          }
                        })}
                      />
                      <Input
                        placeholder="Ngành nghề"
                        value={kpiContent.hallOfFame.topConnector.industry}
                        onChange={(e) => setKpiContent({
                          ...kpiContent,
                          hallOfFame: {
                            ...kpiContent.hallOfFame,
                            topConnector: {...kpiContent.hallOfFame.topConnector, industry: e.target.value}
                          }
                        })}
                      />
                    </CardContent>
                  </Card>

                  {/* Top 1-1 */}
                  <Card className="border-bni-gold">
                    <CardHeader>
                      <CardTitle className="text-base">👥 Top 1-1 Connect</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Input
                        placeholder="Tên"
                        value={kpiContent.hallOfFame.topOneOne.name}
                        onChange={(e) => setKpiContent({
                          ...kpiContent,
                          hallOfFame: {
                            ...kpiContent.hallOfFame,
                            topOneOne: {...kpiContent.hallOfFame.topOneOne, name: e.target.value}
                          }
                        })}
                      />
                      <Input
                        placeholder="Công ty"
                        value={kpiContent.hallOfFame.topOneOne.company}
                        onChange={(e) => setKpiContent({
                          ...kpiContent,
                          hallOfFame: {
                            ...kpiContent.hallOfFame,
                            topOneOne: {...kpiContent.hallOfFame.topOneOne, company: e.target.value}
                          }
                        })}
                      />
                      <Input
                        placeholder="Thành tích"
                        value={kpiContent.hallOfFame.topOneOne.achievement}
                        onChange={(e) => setKpiContent({
                          ...kpiContent,
                          hallOfFame: {
                            ...kpiContent.hallOfFame,
                            topOneOne: {...kpiContent.hallOfFame.topOneOne, achievement: e.target.value}
                          }
                        })}
                      />
                      <Input
                        placeholder="Ngành nghề"
                        value={kpiContent.hallOfFame.topOneOne.industry}
                        onChange={(e) => setKpiContent({
                          ...kpiContent,
                          hallOfFame: {
                            ...kpiContent.hallOfFame,
                            topOneOne: {...kpiContent.hallOfFame.topOneOne, industry: e.target.value}
                          }
                        })}
                      />
                    </CardContent>
                  </Card>

                  {/* MVP Month */}
                  <Card className="border-bni-gold bg-yellow-50">
                    <CardHeader>
                      <CardTitle className="text-base">👑 MVP Tháng</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Input
                        placeholder="Tên"
                        value={kpiContent.hallOfFame.mvpMonth.name}
                        onChange={(e) => setKpiContent({
                          ...kpiContent,
                          hallOfFame: {
                            ...kpiContent.hallOfFame,
                            mvpMonth: {...kpiContent.hallOfFame.mvpMonth, name: e.target.value}
                          }
                        })}
                      />
                      <Input
                        placeholder="Công ty"
                        value={kpiContent.hallOfFame.mvpMonth.company}
                        onChange={(e) => setKpiContent({
                          ...kpiContent,
                          hallOfFame: {
                            ...kpiContent.hallOfFame,
                            mvpMonth: {...kpiContent.hallOfFame.mvpMonth, company: e.target.value}
                          }
                        })}
                      />
                      <Input
                        placeholder="Thành tích"
                        value={kpiContent.hallOfFame.mvpMonth.achievement}
                        onChange={(e) => setKpiContent({
                          ...kpiContent,
                          hallOfFame: {
                            ...kpiContent.hallOfFame,
                            mvpMonth: {...kpiContent.hallOfFame.mvpMonth, achievement: e.target.value}
                          }
                        })}
                      />
                      <Input
                        placeholder="Ngành nghề"
                        value={kpiContent.hallOfFame.mvpMonth.industry}
                        onChange={(e) => setKpiContent({
                          ...kpiContent,
                          hallOfFame: {
                            ...kpiContent.hallOfFame,
                            mvpMonth: {...kpiContent.hallOfFame.mvpMonth, industry: e.target.value}
                          }
                        })}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Special Achievements */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Đóng góp đặc biệt</h3>
                
                <div className="space-y-3">
                  {kpiContent.specialAchievements.map((achievement, index) => (
                    <Collapsible key={index}>
                      <Card className="border-bni-gold">
                        <CardHeader>
                          <CollapsibleTrigger className="w-full">
                            <div className="flex items-center justify-between">
                              <div className="text-left">
                                <CardTitle className="text-base">{achievement.name}</CardTitle>
                                <CardDescription>{achievement.achievement}</CardDescription>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                              </div>
                            </div>
                          </CollapsibleTrigger>
                        </CardHeader>
                        <CollapsibleContent>
                          <CardContent className="space-y-2">
                            <Input
                              placeholder="Tên"
                              value={achievement.name}
                              onChange={(e) => {
                                const newAchievements = [...kpiContent.specialAchievements];
                                newAchievements[index].name = e.target.value;
                                setKpiContent({...kpiContent, specialAchievements: newAchievements});
                              }}
                            />
                            <Input
                              placeholder="Công ty"
                              value={achievement.company}
                              onChange={(e) => {
                                const newAchievements = [...kpiContent.specialAchievements];
                                newAchievements[index].company = e.target.value;
                                setKpiContent({...kpiContent, specialAchievements: newAchievements});
                              }}
                            />
                            <Input
                              placeholder="Thành tích"
                              value={achievement.achievement}
                              onChange={(e) => {
                                const newAchievements = [...kpiContent.specialAchievements];
                                newAchievements[index].achievement = e.target.value;
                                setKpiContent({...kpiContent, specialAchievements: newAchievements});
                              }}
                            />
                            <div className="space-y-2">
                              <Label>Loại</Label>
                              <select
                                className="w-full border rounded-md p-2"
                                value={achievement.type}
                                onChange={(e) => {
                                  const newAchievements = [...kpiContent.specialAchievements];
                                  newAchievements[index].type = e.target.value;
                                  setKpiContent({...kpiContent, specialAchievements: newAchievements});
                                }}
                              >
                                <option value="newMember">Giới thiệu thành viên mới</option>
                                <option value="sponsor">Đối tác tài trợ</option>
                                <option value="milestone">Cột mốc doanh số</option>
                              </select>
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm thành tựu đặc biệt
                </Button>
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
            <CardContent className="pt-6 space-y-6">
              
              {/* Hero Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold border-b pb-2">Hero Section</h3>
                
                <div className="space-y-2">
                  <Label>Tiêu đề chính (VI)</Label>
                  <Input
                    value={mediaContent.heroTitleVi}
                    onChange={(e) => setMediaContent({...mediaContent, heroTitleVi: e.target.value})}
                    placeholder="Tiêu đề hero section"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phụ đề (VI)</Label>
                    <Input
                      value={mediaContent.heroSubtitleVi}
                      onChange={(e) => setMediaContent({...mediaContent, heroSubtitleVi: e.target.value})}
                      placeholder="Phụ đề tiếng Việt"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Phụ đề (EN)</Label>
                    <Input
                      value={mediaContent.heroSubtitleEn}
                      onChange={(e) => setMediaContent({...mediaContent, heroSubtitleEn: e.target.value})}
                      placeholder="Phụ đề tiếng Anh"
                    />
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold border-b pb-2">Quản lý Tài liệu</h3>
                  <Button 
                    size="sm"
                    onClick={() => {
                      const newDoc = {
                        id: Date.now(),
                        title: "Tài liệu mới",
                        titleEn: "New Document",
                        type: "PDF",
                        category: "introduction",
                        isPublic: true,
                        downloadUrl: "#",
                        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400"
                      };
                      setMediaContent({
                        ...mediaContent,
                        documents: [...mediaContent.documents, newDoc]
                      });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Thêm tài liệu
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {mediaContent.documents.map((doc, index) => (
                    <Collapsible key={doc.id}>
                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              <span className="font-semibold">{doc.title}</span>
                            </Button>
                          </CollapsibleTrigger>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setMediaContent({
                                ...mediaContent,
                                documents: mediaContent.documents.filter(d => d.id !== doc.id)
                              });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <CollapsibleContent className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label>Tiêu đề (VI)</Label>
                              <Input
                                value={doc.title}
                                onChange={(e) => {
                                  const updated = [...mediaContent.documents];
                                  updated[index].title = e.target.value;
                                  setMediaContent({...mediaContent, documents: updated});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Tiêu đề (EN)</Label>
                              <Input
                                value={doc.titleEn}
                                onChange={(e) => {
                                  const updated = [...mediaContent.documents];
                                  updated[index].titleEn = e.target.value;
                                  setMediaContent({...mediaContent, documents: updated});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Loại</Label>
                              <Input
                                value={doc.type}
                                onChange={(e) => {
                                  const updated = [...mediaContent.documents];
                                  updated[index].type = e.target.value;
                                  setMediaContent({...mediaContent, documents: updated});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Danh mục</Label>
                              <Input
                                value={doc.category}
                                onChange={(e) => {
                                  const updated = [...mediaContent.documents];
                                  updated[index].category = e.target.value;
                                  setMediaContent({...mediaContent, documents: updated});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>URL tải về</Label>
                              <Input
                                value={doc.downloadUrl}
                                onChange={(e) => {
                                  const updated = [...mediaContent.documents];
                                  updated[index].downloadUrl = e.target.value;
                                  setMediaContent({...mediaContent, documents: updated});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Hình thumbnail</Label>
                              <Input
                                value={doc.thumbnail}
                                onChange={(e) => {
                                  const updated = [...mediaContent.documents];
                                  updated[index].thumbnail = e.target.value;
                                  setMediaContent({...mediaContent, documents: updated});
                                }}
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={doc.isPublic}
                              onChange={(e) => {
                                const updated = [...mediaContent.documents];
                                updated[index].isPublic = e.target.checked;
                                setMediaContent({...mediaContent, documents: updated});
                              }}
                              className="rounded"
                            />
                            <Label>Công khai (khách có thể xem)</Label>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  ))}
                </div>
              </div>

              {/* Photo Albums Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold border-b pb-2">Quản lý Album Ảnh</h3>
                  <Button 
                    size="sm"
                    onClick={() => {
                      const newAlbum = {
                        id: Date.now(),
                        title: "Album mới",
                        titleEn: "New Album",
                        year: "2024",
                        event: "weekly",
                        photos: 0,
                        coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400"
                      };
                      setMediaContent({
                        ...mediaContent,
                        photoAlbums: [...mediaContent.photoAlbums, newAlbum]
                      });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Thêm album
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {mediaContent.photoAlbums.map((album, index) => (
                    <Collapsible key={album.id}>
                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              <span className="font-semibold">{album.title}</span>
                            </Button>
                          </CollapsibleTrigger>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setMediaContent({
                                ...mediaContent,
                                photoAlbums: mediaContent.photoAlbums.filter(a => a.id !== album.id)
                              });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <CollapsibleContent className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label>Tiêu đề (VI)</Label>
                              <Input
                                value={album.title}
                                onChange={(e) => {
                                  const updated = [...mediaContent.photoAlbums];
                                  updated[index].title = e.target.value;
                                  setMediaContent({...mediaContent, photoAlbums: updated});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Tiêu đề (EN)</Label>
                              <Input
                                value={album.titleEn}
                                onChange={(e) => {
                                  const updated = [...mediaContent.photoAlbums];
                                  updated[index].titleEn = e.target.value;
                                  setMediaContent({...mediaContent, photoAlbums: updated});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Năm</Label>
                              <Input
                                value={album.year}
                                onChange={(e) => {
                                  const updated = [...mediaContent.photoAlbums];
                                  updated[index].year = e.target.value;
                                  setMediaContent({...mediaContent, photoAlbums: updated});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Sự kiện</Label>
                              <Input
                                value={album.event}
                                onChange={(e) => {
                                  const updated = [...mediaContent.photoAlbums];
                                  updated[index].event = e.target.value;
                                  setMediaContent({...mediaContent, photoAlbums: updated});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Số lượng ảnh</Label>
                              <Input
                                type="number"
                                value={album.photos}
                                onChange={(e) => {
                                  const updated = [...mediaContent.photoAlbums];
                                  updated[index].photos = parseInt(e.target.value) || 0;
                                  setMediaContent({...mediaContent, photoAlbums: updated});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Ảnh bìa</Label>
                              <Input
                                value={album.coverImage}
                                onChange={(e) => {
                                  const updated = [...mediaContent.photoAlbums];
                                  updated[index].coverImage = e.target.value;
                                  setMediaContent({...mediaContent, photoAlbums: updated});
                                }}
                              />
                            </div>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  ))}
                </div>
              </div>

              {/* Videos Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold border-b pb-2">Quản lý Video</h3>
                  <Button 
                    size="sm"
                    onClick={() => {
                      const newVideo = {
                        id: Date.now(),
                        title: "Video mới",
                        titleEn: "New Video",
                        speaker: "Diễn giả",
                        date: new Date().toLocaleDateString('vi-VN'),
                        duration: "00:00",
                        videoUrl: "#",
                        slideUrl: "#",
                        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400"
                      };
                      setMediaContent({
                        ...mediaContent,
                        videos: [...mediaContent.videos, newVideo]
                      });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Thêm video
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {mediaContent.videos.map((video, index) => (
                    <Collapsible key={video.id}>
                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              <span className="font-semibold">{video.title}</span>
                            </Button>
                          </CollapsibleTrigger>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setMediaContent({
                                ...mediaContent,
                                videos: mediaContent.videos.filter(v => v.id !== video.id)
                              });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <CollapsibleContent className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label>Tiêu đề (VI)</Label>
                              <Input
                                value={video.title}
                                onChange={(e) => {
                                  const updated = [...mediaContent.videos];
                                  updated[index].title = e.target.value;
                                  setMediaContent({...mediaContent, videos: updated});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Tiêu đề (EN)</Label>
                              <Input
                                value={video.titleEn}
                                onChange={(e) => {
                                  const updated = [...mediaContent.videos];
                                  updated[index].titleEn = e.target.value;
                                  setMediaContent({...mediaContent, videos: updated});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Diễn giả</Label>
                              <Input
                                value={video.speaker}
                                onChange={(e) => {
                                  const updated = [...mediaContent.videos];
                                  updated[index].speaker = e.target.value;
                                  setMediaContent({...mediaContent, videos: updated});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Ngày</Label>
                              <Input
                                value={video.date}
                                onChange={(e) => {
                                  const updated = [...mediaContent.videos];
                                  updated[index].date = e.target.value;
                                  setMediaContent({...mediaContent, videos: updated});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Thời lượng</Label>
                              <Input
                                value={video.duration}
                                onChange={(e) => {
                                  const updated = [...mediaContent.videos];
                                  updated[index].duration = e.target.value;
                                  setMediaContent({...mediaContent, videos: updated});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Hình thumbnail</Label>
                              <Input
                                value={video.thumbnail}
                                onChange={(e) => {
                                  const updated = [...mediaContent.videos];
                                  updated[index].thumbnail = e.target.value;
                                  setMediaContent({...mediaContent, videos: updated});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>URL Video</Label>
                              <Input
                                value={video.videoUrl}
                                onChange={(e) => {
                                  const updated = [...mediaContent.videos];
                                  updated[index].videoUrl = e.target.value;
                                  setMediaContent({...mediaContent, videos: updated});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>URL Slide</Label>
                              <Input
                                value={video.slideUrl}
                                onChange={(e) => {
                                  const updated = [...mediaContent.videos];
                                  updated[index].slideUrl = e.target.value;
                                  setMediaContent({...mediaContent, videos: updated});
                                }}
                              />
                            </div>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold border-b pb-2">Call-to-Action Section</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tiêu đề CTA (VI)</Label>
                    <Input
                      value={mediaContent.ctaTitleVi}
                      onChange={(e) => setMediaContent({...mediaContent, ctaTitleVi: e.target.value})}
                      placeholder="Tiêu đề CTA tiếng Việt"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tiêu đề CTA (EN)</Label>
                    <Input
                      value={mediaContent.ctaTitleEn}
                      onChange={(e) => setMediaContent({...mediaContent, ctaTitleEn: e.target.value})}
                      placeholder="Tiêu đề CTA tiếng Anh"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Văn bản các nút CTA (mỗi dòng một nút)</Label>
                  <Textarea
                    value={mediaContent.ctaButtons.join('\n')}
                    onChange={(e) => setMediaContent({
                      ...mediaContent, 
                      ctaButtons: e.target.value.split('\n').filter(line => line.trim())
                    })}
                    rows={4}
                    placeholder="Mỗi dòng là một nút"
                  />
                </div>
              </div>

              {/* Access Notice */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold border-b pb-2">Thông báo Quyền truy cập</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Thông báo (VI)</Label>
                    <Textarea
                      value={mediaContent.accessNoticeVi}
                      onChange={(e) => setMediaContent({...mediaContent, accessNoticeVi: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Thông báo (EN)</Label>
                    <Textarea
                      value={mediaContent.accessNoticeEn}
                      onChange={(e) => setMediaContent({...mediaContent, accessNoticeEn: e.target.value})}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline">Xem trước</Button>
                <Button 
                  onClick={() => {
                    setIsSaving(true);
                    setTimeout(() => {
                      setIsSaving(false);
                      toast.success("Đã lưu thông tin Media Hub");
                    }, 1000);
                  }}
                  disabled={isSaving}
                  className="bg-bni-red hover:bg-bni-red/90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
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
              <CardDescription>Cập nhật thông tin liên lạc, mạng xã hội và nội dung trang</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              {/* Hero Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold border-b pb-2">Hero Section</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tiêu đề trang (VI)</Label>
                    <Input
                      value={contactInfo.pageTitleVi}
                      onChange={(e) => setContactInfo({...contactInfo, pageTitleVi: e.target.value})}
                      placeholder="Tiêu đề tiếng Việt"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tiêu đề trang (EN)</Label>
                    <Input
                      value={contactInfo.pageTitleEn}
                      onChange={(e) => setContactInfo({...contactInfo, pageTitleEn: e.target.value})}
                      placeholder="Tiêu đề tiếng Anh"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phụ đề (VI)</Label>
                    <Input
                      value={contactInfo.pageSubtitleVi}
                      onChange={(e) => setContactInfo({...contactInfo, pageSubtitleVi: e.target.value})}
                      placeholder="Phụ đề tiếng Việt"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Phụ đề (EN)</Label>
                    <Input
                      value={contactInfo.pageSubtitleEn}
                      onChange={(e) => setContactInfo({...contactInfo, pageSubtitleEn: e.target.value})}
                      placeholder="Phụ đề tiếng Anh"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Mô tả trang (VI)</Label>
                    <Textarea
                      value={contactInfo.pageDescriptionVi}
                      onChange={(e) => setContactInfo({...contactInfo, pageDescriptionVi: e.target.value})}
                      placeholder="Mô tả tiếng Việt"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Mô tả trang (EN)</Label>
                    <Textarea
                      value={contactInfo.pageDescriptionEn}
                      onChange={(e) => setContactInfo({...contactInfo, pageDescriptionEn: e.target.value})}
                      placeholder="Mô tả tiếng Anh"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold border-b pb-2">Thông tin liên hệ chính thức</h3>
                
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Địa chỉ (VI) *</Label>
                    <Textarea
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                      placeholder="Địa chỉ tiếng Việt"
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Địa chỉ (EN) *</Label>
                    <Textarea
                      value={contactInfo.addressEn}
                      onChange={(e) => setContactInfo({...contactInfo, addressEn: e.target.value})}
                      placeholder="Địa chỉ tiếng Anh"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Thời gian họp (VI)</Label>
                    <Input
                      value={contactInfo.hours}
                      onChange={(e) => setContactInfo({...contactInfo, hours: e.target.value})}
                      placeholder="Thời gian họp tiếng Việt"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Thời gian họp (EN)</Label>
                    <Input
                      value={contactInfo.hoursEn}
                      onChange={(e) => setContactInfo({...contactInfo, hoursEn: e.target.value})}
                      placeholder="Thời gian họp tiếng Anh"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Google Maps Link</Label>
                  <Input
                    value={contactInfo.googleMapsLink}
                    onChange={(e) => setContactInfo({...contactInfo, googleMapsLink: e.target.value})}
                    placeholder="Link Google Maps"
                  />
                </div>
              </div>

              {/* Quick Contact Form */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold border-b pb-2">Form Liên Hệ Nhanh</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tiêu đề form (VI)</Label>
                    <Input
                      value={contactInfo.quickContactTitleVi}
                      onChange={(e) => setContactInfo({...contactInfo, quickContactTitleVi: e.target.value})}
                      placeholder="Tiêu đề form tiếng Việt"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tiêu đề form (EN)</Label>
                    <Input
                      value={contactInfo.quickContactTitleEn}
                      onChange={(e) => setContactInfo({...contactInfo, quickContactTitleEn: e.target.value})}
                      placeholder="Tiêu đề form tiếng Anh"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Mô tả form (VI)</Label>
                    <Textarea
                      value={contactInfo.quickContactDescVi}
                      onChange={(e) => setContactInfo({...contactInfo, quickContactDescVi: e.target.value})}
                      placeholder="Mô tả form tiếng Việt"
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Mô tả form (EN)</Label>
                    <Textarea
                      value={contactInfo.quickContactDescEn}
                      onChange={(e) => setContactInfo({...contactInfo, quickContactDescEn: e.target.value})}
                      placeholder="Mô tả form tiếng Anh"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* QR & Direct Connection */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold border-b pb-2">Kết nối trực tiếp (QR & AI)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tiêu đề QR (VI)</Label>
                    <Input
                      value={contactInfo.qrTitleVi}
                      onChange={(e) => setContactInfo({...contactInfo, qrTitleVi: e.target.value})}
                      placeholder="Tiêu đề QR tiếng Việt"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tiêu đề QR (EN)</Label>
                    <Input
                      value={contactInfo.qrTitleEn}
                      onChange={(e) => setContactInfo({...contactInfo, qrTitleEn: e.target.value})}
                      placeholder="Tiêu đề QR tiếng Anh"
                    />
                  </div>
                </div>
              </div>

              {/* Strategic Partnership */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold border-b pb-2">Đối tác chiến lược</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tiêu đề đối tác (VI)</Label>
                    <Input
                      value={contactInfo.partnershipTitleVi}
                      onChange={(e) => setContactInfo({...contactInfo, partnershipTitleVi: e.target.value})}
                      placeholder="Tiêu đề đối tác tiếng Việt"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tiêu đề đối tác (EN)</Label>
                    <Input
                      value={contactInfo.partnershipTitleEn}
                      onChange={(e) => setContactInfo({...contactInfo, partnershipTitleEn: e.target.value})}
                      placeholder="Tiêu đề đối tác tiếng Anh"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Loại đối tác 1 (VI)</Label>
                    <Input
                      value={contactInfo.partnerCategory1Vi}
                      onChange={(e) => setContactInfo({...contactInfo, partnerCategory1Vi: e.target.value})}
                      placeholder="Loại đối tác 1 tiếng Việt"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Loại đối tác 1 (EN)</Label>
                    <Input
                      value={contactInfo.partnerCategory1En}
                      onChange={(e) => setContactInfo({...contactInfo, partnerCategory1En: e.target.value})}
                      placeholder="Loại đối tác 1 tiếng Anh"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Loại đối tác 2 (VI)</Label>
                    <Input
                      value={contactInfo.partnerCategory2Vi}
                      onChange={(e) => setContactInfo({...contactInfo, partnerCategory2Vi: e.target.value})}
                      placeholder="Loại đối tác 2 tiếng Việt"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Loại đối tác 2 (EN)</Label>
                    <Input
                      value={contactInfo.partnerCategory2En}
                      onChange={(e) => setContactInfo({...contactInfo, partnerCategory2En: e.target.value})}
                      placeholder="Loại đối tác 2 tiếng Anh"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Loại đối tác 3 (VI)</Label>
                    <Input
                      value={contactInfo.partnerCategory3Vi}
                      onChange={(e) => setContactInfo({...contactInfo, partnerCategory3Vi: e.target.value})}
                      placeholder="Loại đối tác 3 tiếng Việt"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Loại đối tác 3 (EN)</Label>
                    <Input
                      value={contactInfo.partnerCategory3En}
                      onChange={(e) => setContactInfo({...contactInfo, partnerCategory3En: e.target.value})}
                      placeholder="Loại đối tác 3 tiếng Anh"
                    />
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold border-b pb-2">Bản tin Newsletter</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tiêu đề newsletter (VI)</Label>
                    <Input
                      value={contactInfo.newsletterTitleVi}
                      onChange={(e) => setContactInfo({...contactInfo, newsletterTitleVi: e.target.value})}
                      placeholder="Tiêu đề newsletter tiếng Việt"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tiêu đề newsletter (EN)</Label>
                    <Input
                      value={contactInfo.newsletterTitleEn}
                      onChange={(e) => setContactInfo({...contactInfo, newsletterTitleEn: e.target.value})}
                      placeholder="Tiêu đề newsletter tiếng Anh"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media */}
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

              {/* AI Assistant */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold border-b pb-2">Trợ lý AI</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tiêu đề AI (VI)</Label>
                    <Input
                      value={contactInfo.aiAssistantTitleVi}
                      onChange={(e) => setContactInfo({...contactInfo, aiAssistantTitleVi: e.target.value})}
                      placeholder="Tiêu đề AI tiếng Việt"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tiêu đề AI (EN)</Label>
                    <Input
                      value={contactInfo.aiAssistantTitleEn}
                      onChange={(e) => setContactInfo({...contactInfo, aiAssistantTitleEn: e.target.value})}
                      placeholder="Tiêu đề AI tiếng Anh"
                    />
                  </div>
                </div>
              </div>

              {/* Exit Popup */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold border-b pb-2">Exit Popup</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tiêu đề popup (VI)</Label>
                    <Input
                      value={contactInfo.exitTitleVi}
                      onChange={(e) => setContactInfo({...contactInfo, exitTitleVi: e.target.value})}
                      placeholder="Tiêu đề popup tiếng Việt"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tiêu đề popup (EN)</Label>
                    <Input
                      value={contactInfo.exitTitleEn}
                      onChange={(e) => setContactInfo({...contactInfo, exitTitleEn: e.target.value})}
                      placeholder="Tiêu đề popup tiếng Anh"
                    />
                  </div>
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
