
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Phone, Mail, Users, Clock, Facebook, Youtube, Linkedin, Download, Send, HandHeart, FileText, Globe, Bot, QrCode, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    message: ''
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const { toast } = useToast();

  // Detect browser language
  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('vi')) {
      setLanguage('vi');
    } else {
      setLanguage('en');
    }
  }, []);

  // Exit popup logic
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        timeoutId = setTimeout(() => {
          setShowExitPopup(true);
        }, 1000);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const content = {
    vi: {
      pageTitle: "Liên Hệ & Kết Nối Đối Tác",
      pageSubtitle: "💼 Hãy kết nối để tạo ra giá trị bền vững cùng FELIX Chapter",
      pageDescription: "Chúng tôi luôn chào đón những mối quan hệ mới – dù bạn là doanh nhân, khách mời tiềm năng, nhà tài trợ hay đối tác chiến lược. FELIX mong muốn hợp tác cùng những cá nhân và tổ chức có cùng tầm nhìn về phát triển kinh doanh vững mạnh và kết nối giá trị thực tế.",
      
      // Contact Info Section
      contactInfo: "📞 Thông tin liên hệ chính thức",
      hotline: "Hotline",
      officialEmail: "Email",
      meetingPlace: "Địa điểm họp",
      operatingHours: "Giờ hoạt động",
      viewMap: "📍 Xem chỉ đường trên Google Maps",
      
      // Quick Contact Form
      quickContact: "📝 Form liên hệ nhanh",
      quickContactDesc: "Điền thông tin dưới đây, đội ngũ FELIX sẽ phản hồi bạn trong vòng 24h làm việc.",
      name: "Họ và tên",
      email: "Email",
      phone: "Số điện thoại",
      reason: "Chủ đề quan tâm",
      message: "Tin nhắn chi tiết",
      sendInfo: "📧 Gửi thông tin",
      downloadIntro: "📎 Tải tài liệu giới thiệu FELIX",
      
      // QR Section
      qrTitle: "Kết nối trực tiếp",
      qrDesc: "Quét QR Code để kết nối Zalo hoặc chat với AI",
      scanQR: "📲 Quét QR để kết nối Zalo",
      chatAI: "🧠 Nhận phản hồi nhanh từ Trợ lý FELIX AI",
      
      // Strategic Partnership
      partnership: "🤝 Trở thành đối tác chiến lược",
      partnershipDesc: "FELIX đồng hành cùng các tổ chức uy tín trong:",
      partnerCategory1: "Đào tạo – Coaching – Truyền thông thương hiệu",
      partnerCategory2: "Công nghệ – Phần mềm – Tài chính – Pháp lý", 
      partnerCategory3: "Tổ chức sự kiện – Hội thảo – Hợp tác cộng đồng",
      partnerQuestion: "Bạn muốn đồng hành cùng FELIX?",
      sendProposal: "💼 Gửi đề xuất hợp tác",
      registerSponsor: "🏷️ Đăng ký làm Nhà tài trợ",
      
      // Newsletter Section
      newsletter: "📬 Nhận bản tin FELIX",
      newsletterDesc: "Đăng ký để cập nhật lịch họp, sự kiện, tài liệu hữu ích mỗi tuần.",
      subscribeNewsletter: "📬 Đăng ký nhận bản tin định kỳ",
      
      // Social Media Section
      socialMedia: "🌐 Kết nối mạng xã hội",
      followFanpage: "📺 Fanpage Facebook FELIX Chapter",
      watchVideo: "🎥 YouTube Video giới thiệu hoạt động",
      connectLinkedIn: "🔗 LinkedIn: Cộng đồng Doanh nhân FELIX",
      
      // AI Assistant
      aiAssistant: "🤖 Trợ lý FELIX AI – Hỏi đáp nhanh",
      aiDesc: "Trả lời nhanh các câu hỏi về FELIX",
      openAI: "🧠 Mở Trợ lý FELIX AI",
      
      // Exit Popup
      exitTitle: "Đừng vội rời đi!",
      exitDesc: "Bạn đã nhận brochure FELIX chưa?",
      receiveDocs: "📩 Nhận tài liệu",
      connectRep: "📞 Kết nối với đại diện Chapter",
      
      reasons: {
        meeting: "Tham dự họp",
        partner: "Đăng ký đối tác", 
        media: "Hợp tác truyền thông",
        sponsor: "Nhà tài trợ",
        other: "Khác"
      },
      
      contactDetails: {
        phone: "0988 123 456",
        email: "info@bnifelix.vn",
        address: "Cung văn hóa Hữu Nghị Việt Xô, 91 Trần Hưng Đạo, Hà Nội",
        hours: "06:45 – 8:45 (Thứ 3 hàng tuần)"
      }
    },
    en: {
      pageTitle: "Contact & Partner Connection",
      pageSubtitle: "💼 Connect to create lasting value with FELIX Chapter",
      pageDescription: "We always welcome new relationships - whether you are an entrepreneur, potential guest, sponsor or strategic partner. FELIX desires to cooperate with individuals and organizations with the same vision of strong business development and practical value connections.",
      
      // Contact Info Section
      contactInfo: "📞 Official Contact Information",
      hotline: "Hotline",
      officialEmail: "Email",
      meetingPlace: "Meeting Location",
      operatingHours: "Operating Hours",
      viewMap: "📍 View directions on Google Maps",
      
      // Quick Contact Form
      quickContact: "📝 Quick Contact Form",
      quickContactDesc: "Fill in the information below, FELIX team will respond to you within 24 working hours.",
      name: "Full Name",
      email: "Email",
      phone: "Phone Number",
      reason: "Subject of Interest",
      message: "Detailed Message",
      sendInfo: "📧 Send Information",
      downloadIntro: "📎 Download FELIX Introduction",
      
      // QR Section
      qrTitle: "Direct Connection",
      qrDesc: "Scan QR Code to connect Zalo or chat with AI",
      scanQR: "📲 Scan QR to connect Zalo",
      chatAI: "🧠 Get quick response from FELIX AI Assistant",
      
      // Strategic Partnership
      partnership: "🤝 Become Strategic Partner",
      partnershipDesc: "FELIX cooperates with prestigious organizations in:",
      partnerCategory1: "Training – Coaching – Brand Communication",
      partnerCategory2: "Technology – Software – Finance – Legal",
      partnerCategory3: "Event Organization – Seminars – Community Cooperation",
      partnerQuestion: "Do you want to partner with FELIX?",
      sendProposal: "💼 Send Partnership Proposal",
      registerSponsor: "🏷️ Register as Sponsor",
      
      // Newsletter Section
      newsletter: "📬 Receive FELIX Newsletter",
      newsletterDesc: "Subscribe to get updates on meeting schedules, events, and useful materials every week.",
      subscribeNewsletter: "📬 Subscribe to Newsletter",
      
      // Social Media Section
      socialMedia: "🌐 Social Media Connection",
      followFanpage: "📺 Facebook Fanpage FELIX Chapter",
      watchVideo: "🎥 YouTube Introduction Video",
      connectLinkedIn: "🔗 LinkedIn: FELIX Entrepreneur Community",
      
      // AI Assistant
      aiAssistant: "🤖 FELIX AI Assistant – Quick Q&A",
      aiDesc: "Quick answers to questions about FELIX",
      openAI: "🧠 Open FELIX AI Assistant",
      
      // Exit Popup
      exitTitle: "Don't leave yet!",
      exitDesc: "Have you received the FELIX brochure?",
      receiveDocs: "📩 Receive Documents",
      connectRep: "📞 Connect with Chapter Representative",
      
      reasons: {
        meeting: "Attend meeting",
        partner: "Register partnership",
        media: "Media collaboration", 
        sponsor: "Sponsorship",
        other: "Other"
      },
      
      contactDetails: {
        phone: "0988 123 456",
        email: "info@bnifelix.vn",
        address: "Vietnam-Soviet Friendship Cultural Palace, 91 Tran Hung Dao, Hanoi",
        hours: "06:45 – 8:45 (Tuesday Weekly)"
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: language === 'vi' ? "Gửi thành công!" : "Successfully sent!",
      description: language === 'vi' 
        ? "Chúng tôi sẽ liên hệ với bạn trong vòng 24h làm việc." 
        : "We will contact you within 24 working hours."
    });
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      reason: '',
      message: ''
    });
    
    setShowQR(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: language === 'vi' ? "Đăng ký thành công!" : "Successfully subscribed!",
      description: language === 'vi' 
        ? "Bạn sẽ nhận được bản tin định kỳ từ BNI FELIX." 
        : "You will receive regular newsletters from BNI FELIX."
    });
    
    setNewsletterEmail('');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with BNI Colors */}
      <div className="bg-gradient-to-r from-[#D71920] via-[#8B0000] to-[#2E2E2E] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              {language === 'vi' ? '🇺🇸 English' : '🇻🇳 Tiếng Việt'}
            </Button>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            {t.pageTitle}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-slide-up mb-4">
            {t.pageSubtitle}
          </p>
          <p className="text-lg text-white/80 max-w-4xl mx-auto animate-slide-up">
            {t.pageDescription}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Contact Information */}
        <Card className="mb-12 animate-fade-in border-[#D71920]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-[#D71920]">
              <Phone className="h-6 w-6" />
              {t.contactInfo}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div 
                className="flex items-center gap-3 p-4 border rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer hover:border-[#D71920]"
                onClick={() => window.location.href = 'tel:0848905555'}
              >
                <Phone className="h-5 w-5 text-[#D71920]" />
                <div>
                  <p className="font-semibold text-[#2E2E2E]">{t.hotline}</p>
                  <p className="text-muted-foreground">084 890 5555</p>
                  <p className="text-xs text-[#D71920] font-medium">
                    {language === 'vi' ? 'Bấm để gọi' : 'Tap to call'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 border rounded-lg hover:shadow-md transition-all duration-300">
                <Mail className="h-5 w-5 text-[#D71920]" />
                <div>
                  <p className="font-semibold text-[#2E2E2E]">{t.officialEmail}</p>
                  <p className="text-muted-foreground">{t.contactDetails.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 border rounded-lg hover:shadow-md transition-all duration-300">
                <MapPin className="h-5 w-5 text-[#D71920]" />
                <div>
                  <p className="font-semibold text-[#2E2E2E]">{t.meetingPlace}</p>
                  <p className="text-muted-foreground text-sm">{t.contactDetails.address}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 border rounded-lg hover:shadow-md transition-all duration-300">
                <Clock className="h-5 w-5 text-[#D71920]" />
                <div>
                  <p className="font-semibold text-[#2E2E2E]">{t.operatingHours}</p>
                  <p className="text-muted-foreground text-sm">{t.contactDetails.hours}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button 
                variant="outline" 
                className="border-[#D71920] text-[#D71920] hover:bg-[#D71920] hover:text-white transition-all duration-300"
                onClick={() => window.open('https://maps.google.com/?q=91+Tran+Hung+Dao+Hanoi', '_blank')}
              >
                {t.viewMap}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="animate-fade-in border-[#D71920]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-[#D71920]">
                <FileText className="h-6 w-6" />
                {t.quickContact}
              </CardTitle>
              <CardDescription>{t.quickContactDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">{t.name}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="focus:border-[#D71920] focus:ring-[#D71920]"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="focus:border-[#D71920] focus:ring-[#D71920]"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">{t.phone}</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="focus:border-[#D71920] focus:ring-[#D71920]"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="reason">{t.reason}</Label>
                  <Select onValueChange={(value) => handleInputChange('reason', value)}>
                    <SelectTrigger className="focus:border-[#D71920] focus:ring-[#D71920]">
                      <SelectValue placeholder={language === 'vi' ? "Chọn chủ đề" : "Select subject"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">{t.reasons.meeting}</SelectItem>
                      <SelectItem value="partner">{t.reasons.partner}</SelectItem>
                      <SelectItem value="media">{t.reasons.media}</SelectItem>
                      <SelectItem value="sponsor">{t.reasons.sponsor}</SelectItem>
                      <SelectItem value="other">{t.reasons.other}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message">{t.message}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="focus:border-[#D71920] focus:ring-[#D71920]"
                    rows={4}
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-[#D71920] hover:bg-[#8B0000] transition-all duration-300"
                  >
                    {t.sendInfo}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-[#D71920] text-[#D71920] hover:bg-[#D71920] hover:text-white transition-all duration-300"
                  >
                    {t.downloadIntro}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* QR Code & AI Assistant */}
          <div className="space-y-6">
            {/* QR Code Section */}
            <Card className="animate-fade-in border-[#D71920]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-[#D71920]">
                  <QrCode className="h-6 w-6" />
                  {t.qrTitle}
                </CardTitle>
                <CardDescription>{t.qrDesc}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-gray-100 p-8 rounded-lg mb-4">
                  <div className="w-32 h-32 mx-auto bg-white border-2 border-[#D71920] rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-[#D71920]" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-[#D71920] text-[#D71920] hover:bg-[#D71920] hover:text-white transition-all duration-300"
                  >
                    {t.scanQR}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-[#D71920] text-[#D71920] hover:bg-[#D71920] hover:text-white transition-all duration-300"
                    onClick={() => setShowAI(true)}
                  >
                    {t.chatAI}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="animate-fade-in border-[#D71920]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-[#D71920]">
                  <Mail className="h-5 w-5" />
                  {t.newsletter}
                </CardTitle>
                <CardDescription>{t.newsletterDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder={t.email}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="focus:border-[#D71920] focus:ring-[#D71920]"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-[#D71920] hover:bg-[#8B0000] transition-all duration-300"
                  >
                    {t.subscribeNewsletter}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Strategic Partnership Section */}
        <Card className="mt-12 animate-slide-up border-[#D71920]/20">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-3xl text-[#D71920]">
              <HandHeart className="h-8 w-8" />
              {t.partnership}
            </CardTitle>
            <CardDescription className="text-lg">{t.partnershipDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 border rounded-lg hover:shadow-lg transition-all duration-300 hover:border-[#D71920]/50 text-center">
                <div className="text-4xl mb-4">🎓</div>
                <p className="text-[#2E2E2E] font-medium">{t.partnerCategory1}</p>
              </div>
              
              <div className="p-6 border rounded-lg hover:shadow-lg transition-all duration-300 hover:border-[#D71920]/50 text-center">
                <div className="text-4xl mb-4">💻</div>
                <p className="text-[#2E2E2E] font-medium">{t.partnerCategory2}</p>
              </div>
              
              <div className="p-6 border rounded-lg hover:shadow-lg transition-all duration-300 hover:border-[#D71920]/50 text-center">
                <div className="text-4xl mb-4">🤝</div>
                <p className="text-[#2E2E2E] font-medium">{t.partnerCategory3}</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-lg font-semibold text-[#2E2E2E] mb-6">{t.partnerQuestion}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-[#D71920] hover:bg-[#8B0000] transition-all duration-300"
                >
                  {t.sendProposal}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-[#D71920] text-[#D71920] hover:bg-[#D71920] hover:text-white transition-all duration-300"
                >
                  {t.registerSponsor}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Section */}
        <Card className="mt-12 animate-fade-in border-[#D71920]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-[#D71920]">
              <Globe className="h-6 w-6" />
              {t.socialMedia}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="w-full justify-start border-[#D71920]/30 text-[#D71920] hover:bg-[#D71920] hover:text-white transition-all duration-300"
                onClick={() => window.open('https://facebook.com/bnielixhanoi', '_blank')}
              >
                <Facebook className="h-4 w-4 mr-2" />
                {t.followFanpage}
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-[#D71920]/30 text-[#D71920] hover:bg-[#D71920] hover:text-white transition-all duration-300"
                onClick={() => window.open('https://youtube.com/@bnielixhanoi', '_blank')}
              >
                <Youtube className="h-4 w-4 mr-2" />
                {t.watchVideo}
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-[#D71920]/30 text-[#D71920] hover:bg-[#D71920] hover:text-white transition-all duration-300"
                onClick={() => window.open('https://linkedin.com/company/bni-felix-hanoi', '_blank')}
              >
                <Linkedin className="h-4 w-4 mr-2" />
                {t.connectLinkedIn}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating AI Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full bg-[#D71920] hover:bg-[#8B0000] shadow-lg transition-all duration-300 hover:scale-110"
          onClick={() => setShowAI(true)}
        >
          <Bot className="h-6 w-6 mr-2" />
          {t.openAI}
        </Button>
      </div>

      {/* QR Code Modal */}
      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#D71920]">{t.qrTitle}</DialogTitle>
            <DialogDescription>{t.qrDesc}</DialogDescription>
          </DialogHeader>
          <div className="text-center py-6">
            <div className="bg-gray-100 p-8 rounded-lg mb-4">
              <div className="w-40 h-40 mx-auto bg-white border-2 border-[#D71920] rounded-lg flex items-center justify-center">
                <QrCode className="h-20 w-20 text-[#D71920]" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {language === 'vi' ? 'Quét mã QR để kết nối với FELIX qua Zalo' : 'Scan QR code to connect with FELIX via Zalo'}
            </p>
            <Button 
              className="w-full bg-[#D71920] hover:bg-[#8B0000]"
              onClick={() => setShowQR(false)}
            >
              {language === 'vi' ? 'Đóng' : 'Close'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Assistant Modal */}
      <Dialog open={showAI} onOpenChange={setShowAI}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#D71920]">
              <Bot className="h-6 w-6" />
              {t.aiAssistant}
            </DialogTitle>
            <DialogDescription>{t.aiDesc}</DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <p className="text-sm text-gray-600 mb-4">
                {language === 'vi' ? 'Các câu hỏi thường gặp:' : 'Frequently Asked Questions:'}
              </p>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="text-left justify-start h-auto p-2 text-wrap">
                  {language === 'vi' ? '❓ Cách tham dự họp thử?' : '❓ How to attend trial meeting?'}
                </Button>
                <Button variant="ghost" size="sm" className="text-left justify-start h-auto p-2 text-wrap">
                  {language === 'vi' ? '❓ FELIX phù hợp với ngành nghề nào?' : '❓ What industries suit FELIX?'}
                </Button>
                <Button variant="ghost" size="sm" className="text-left justify-start h-auto p-2 text-wrap">
                  {language === 'vi' ? '❓ Làm sao để trở thành thành viên?' : '❓ How to become a member?'}
                </Button>
                <Button variant="ghost" size="sm" className="text-left justify-start h-auto p-2 text-wrap">
                  {language === 'vi' ? '❓ So sánh BNI với các mô hình networking khác?' : '❓ Compare BNI with other networking models?'}
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Input 
                placeholder={language === 'vi' ? 'Nhập câu hỏi của bạn...' : 'Enter your question...'}
                className="flex-1"
              />
              <Button className="bg-[#D71920] hover:bg-[#8B0000]">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Exit Popup Modal */}
      <Dialog open={showExitPopup} onOpenChange={setShowExitPopup}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#D71920] text-center">{t.exitTitle}</DialogTitle>
            <DialogDescription className="text-center">{t.exitDesc}</DialogDescription>
          </DialogHeader>
          <div className="text-center py-6">
            <div className="space-y-4">
              <Button 
                size="lg"
                className="w-full bg-[#D71920] hover:bg-[#8B0000] transition-all duration-300"
              >
                {t.receiveDocs}
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="w-full border-[#D71920] text-[#D71920] hover:bg-[#D71920] hover:text-white transition-all duration-300"
              >
                {t.connectRep}
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setShowExitPopup(false)}
                className="w-full"
              >
                <X className="h-4 w-4 mr-2" />
                {language === 'vi' ? 'Đóng' : 'Close'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;
