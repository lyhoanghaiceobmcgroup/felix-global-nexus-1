import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Play, Pause, ChevronRight, SkipForward, ArrowLeft, Clock, Users, CheckCircle } from "lucide-react";

interface Member {
  id: number;
  name: string;
  nameEn: string;
  position: string;
  positionEn: string;
  company: string;
  companyEn: string;
  industry: string;
  industryEn: string;
  avatar: string;
  introduction: string;
  introductionEn: string;
  checkInTime?: string;
  checkInOrder?: number;
}

const Presentation30s = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('vi');
  const [currentPresenter, setCurrentPresenter] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPresenting, setIsPresenting] = useState(false);

  // Mock data - thành viên đã check-in theo thứ tự
  const checkedInMembers: Member[] = [
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
      avatar: "/placeholder.svg",
      introduction: "Xin chào, tôi là Huệ, chuyên gia Marketing trực tuyến. Chúng tôi giúp doanh nghiệp tăng doanh thu từ Google Ads và Facebook Ads với ROI tối thiểu 300%.",
      introductionEn: "Hello, I'm Hue, digital marketing specialist. We help businesses increase revenue from Google Ads and Facebook Ads with minimum 300% ROI.",
      checkInTime: "08:45:12",
      checkInOrder: 1
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
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      introduction: "Tôi là Tuấn, chuyên thiết kế nội thất cao cấp. Chúng tôi tạo ra không gian sống và làm việc hoàn hảo với 15 năm kinh nghiệm.",
      introductionEn: "I'm Tuan, specialized in luxury interior design. We create perfect living and working spaces with 15 years of experience.",
      checkInTime: "08:46:23",
      checkInOrder: 2
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
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      introduction: "Tôi là Phượng, chuyên gia tư vấn tài chính. Chúng tôi giúp doanh nghiệp tối ưu hóa dòng tiền và đầu tư hiệu quả.",
      introductionEn: "I'm Phuong, financial consulting expert. We help businesses optimize cash flow and invest effectively.",
      checkInTime: "08:47:45",
      checkInOrder: 3
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
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      introduction: "Tôi là Duy, chuyên về chuyển đổi số. Chúng tôi giúp doanh nghiệp SME tối ưu hóa quy trình với công nghệ hiện đại.",
      introductionEn: "I'm Duy, specialized in digital transformation. We help SME businesses optimize processes with modern technology.",
      checkInTime: "08:48:30",
      checkInOrder: 4
    }
  ];

  const text = {
    vi: {
      title: "Giới Thiệu 30 Giây",
      subtitle: "Quản lý trình chiếu theo thứ tự check-in",
      backToMembers: "Quay lại danh sách thành viên",
      currentPresenter: "Đang Trình Bày",
      timeRemaining: "Thời gian còn lại",
      nextUp: "Tiếp theo",
      checkInOrder: "Thứ tự check-in",
      checkInTime: "Thời gian check-in",
      totalCheckedIn: "Tổng số đã check-in",
      start: "Bắt đầu",
      pause: "Tạm dừng",
      next: "Tiếp theo",
      skip: "Bỏ qua",
      upNext: "Sắp tới",
      presenting: "Đang trình bày",
      completed: "Đã hoàn thành"
    },
    en: {
      title: "30-Second Introduction",
      subtitle: "Presentation management by check-in order",
      backToMembers: "Back to member list",
      currentPresenter: "Currently Presenting",
      timeRemaining: "Time Remaining",
      nextUp: "Next Up",
      checkInOrder: "Check-in order",
      checkInTime: "Check-in time",
      totalCheckedIn: "Total checked in",
      start: "Start",
      pause: "Pause",
      next: "Next",
      skip: "Skip",
      upNext: "Up Next",
      presenting: "Presenting",
      completed: "Completed"
    }
  };

  const currentText = text[language];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPresenting && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPresenting) {
      setIsPresenting(false);
      setTimeLeft(30);
      if (currentPresenter < checkedInMembers.length - 1) {
        setCurrentPresenter((prev) => prev + 1);
      }
    }
    return () => clearTimeout(timer);
  }, [isPresenting, timeLeft, currentPresenter, checkedInMembers.length]);

  const startPresentation = () => {
    setIsPresenting(true);
    setTimeLeft(30);
  };

  const pausePresentation = () => {
    setIsPresenting(false);
  };

  const nextPresenter = () => {
    if (currentPresenter < checkedInMembers.length - 1) {
      setCurrentPresenter((prev) => prev + 1);
      setTimeLeft(30);
      setIsPresenting(false);
    }
  };

  const skipPresenter = () => {
    if (currentPresenter < checkedInMembers.length - 1) {
      setCurrentPresenter((prev) => prev + 1);
      setTimeLeft(30);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/members')}
              className="text-primary hover:text-primary/80"
            >
              <ArrowLeft className="mr-2" size={20} />
              {currentText.backToMembers}
            </Button>
            <Button
              variant="outline"
              onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              {language === 'vi' ? '🇬🇧 EN' : '🇻🇳 VI'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            🎤 {currentText.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {currentText.subtitle}
          </p>
        </div>

        {/* Stats Card */}
        <Card className="mb-8 border-primary/20 bg-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{currentText.totalCheckedIn}</p>
                  <p className="text-2xl font-bold text-foreground">{checkedInMembers.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{currentText.completed}</p>
                  <p className="text-2xl font-bold text-foreground">{currentPresenter}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{currentText.presenting}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {currentPresenter + 1}/{checkedInMembers.length}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Presenter */}
        {checkedInMembers.length > 0 && currentPresenter < checkedInMembers.length && (
          <Card className="border-primary shadow-xl mb-8 bg-card">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-foreground">
                  {currentText.currentPresenter}
                </h2>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Avatar & Info */}
                <div className="text-center lg:text-left">
                  <Avatar className="w-32 h-32 mx-auto lg:mx-0 mb-4 border-4 border-primary">
                    <AvatarImage src={checkedInMembers[currentPresenter]?.avatar} />
                    <AvatarFallback>
                      {(language === 'vi' ? checkedInMembers[currentPresenter]?.name : checkedInMembers[currentPresenter]?.nameEn)?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {language === 'vi' ? checkedInMembers[currentPresenter]?.name : checkedInMembers[currentPresenter]?.nameEn}
                  </h3>
                  <p className="text-primary text-lg mb-2 font-semibold">
                    {language === 'vi' ? checkedInMembers[currentPresenter]?.position : checkedInMembers[currentPresenter]?.positionEn}
                  </p>
                  <p className="text-foreground text-lg mb-4">
                    {language === 'vi' ? checkedInMembers[currentPresenter]?.company : checkedInMembers[currentPresenter]?.companyEn}
                  </p>
                  <Badge className="bg-primary text-primary-foreground mb-2">
                    {language === 'vi' ? checkedInMembers[currentPresenter]?.industry : checkedInMembers[currentPresenter]?.industryEn}
                  </Badge>
                  <div className="mt-4 space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {currentText.checkInOrder}: #{checkedInMembers[currentPresenter]?.checkInOrder}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {currentText.checkInTime}: {checkedInMembers[currentPresenter]?.checkInTime}
                    </p>
                  </div>
                </div>

                {/* Presentation Area */}
                <div className="flex-1 text-center">
                  <div className="bg-primary/10 backdrop-blur p-6 rounded-lg mb-6 border border-primary/20">
                    <p className="text-lg leading-relaxed text-foreground">
                      {language === 'vi' ? checkedInMembers[currentPresenter]?.introduction : checkedInMembers[currentPresenter]?.introductionEn}
                    </p>
                  </div>

                  {/* Timer */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="text-center">
                      <div className={`text-5xl font-bold ${timeLeft <= 10 ? 'text-destructive' : 'text-primary'}`}>
                        {timeLeft}s
                      </div>
                      <p className="text-sm text-muted-foreground">{currentText.timeRemaining}</p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex justify-center gap-4">
                    {!isPresenting ? (
                      <Button onClick={startPresentation} className="bg-primary hover:bg-primary/90">
                        <Play className="mr-2" size={16} />
                        {currentText.start}
                      </Button>
                    ) : (
                      <Button onClick={pausePresentation} variant="outline" className="border-primary text-primary">
                        <Pause className="mr-2" size={16} />
                        {currentText.pause}
                      </Button>
                    )}
                    <Button 
                      onClick={nextPresenter} 
                      variant="outline"
                      disabled={currentPresenter >= checkedInMembers.length - 1}
                    >
                      {currentText.next}
                      <ChevronRight className="ml-2" size={16} />
                    </Button>
                    <Button 
                      onClick={skipPresenter} 
                      variant="outline"
                      disabled={currentPresenter >= checkedInMembers.length - 1}
                    >
                      <SkipForward className="mr-2" size={16} />
                      {currentText.skip}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Queue List */}
        <Card className="border-primary/20 bg-card">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">
              📋 {currentText.upNext}
            </h3>
            <div className="space-y-4">
              {checkedInMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                    index === currentPresenter
                      ? 'border-primary bg-primary/10'
                      : index < currentPresenter
                      ? 'border-muted bg-muted opacity-50'
                      : 'border-border bg-background hover:border-primary/50'
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      index === currentPresenter
                        ? 'bg-primary text-primary-foreground'
                        : index < currentPresenter
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {member.checkInOrder}
                    </div>
                  </div>
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>
                      {(language === 'vi' ? member.name : member.nameEn)?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">
                      {language === 'vi' ? member.name : member.nameEn}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {language === 'vi' ? member.company : member.companyEn} • {member.checkInTime}
                    </p>
                  </div>
                  <Badge variant={index === currentPresenter ? "default" : index < currentPresenter ? "secondary" : "outline"}>
                    {language === 'vi' ? member.industry : member.industryEn}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Presentation30s;
