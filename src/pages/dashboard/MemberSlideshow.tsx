import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi 
} from "@/components/ui/carousel";
import { Clock, Users, Play, Pause, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface MemberCheckIn {
  id: string;
  fullName: string;
  phoneNumber: string;
  industry: string;
  checkInTime: Date;
  image?: string;
  presentationSlide?: string;
}

const MemberSlideshow = () => {
  const [cutoffTime, setCutoffTime] = useState("07:00");
  const [isPlaying, setIsPlaying] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  
  // Mock data - In real app, this would come from check-in system
  const [members, setMembers] = useState<MemberCheckIn[]>([
    {
      id: "1",
      fullName: "Nguyễn Văn A",
      phoneNumber: "0901234567",
      industry: "Công nghệ thông tin",
      checkInTime: new Date(new Date().setHours(6, 45, 0)),
      image: "/placeholder.svg",
    },
    {
      id: "2",
      fullName: "Trần Thị B",
      phoneNumber: "0912345678",
      industry: "Kinh doanh",
      checkInTime: new Date(new Date().setHours(6, 50, 0)),
      image: "/placeholder.svg",
    },
    {
      id: "3",
      fullName: "Lê Văn C",
      phoneNumber: "0923456789",
      industry: "Marketing",
      checkInTime: new Date(new Date().setHours(6, 55, 0)),
      image: "/placeholder.svg",
    },
  ]);

  // Filter members who checked in before cutoff time
  const eligibleMembers = members.filter(member => {
    const [cutoffHour, cutoffMinute] = cutoffTime.split(':').map(Number);
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffHour, cutoffMinute, 0, 0);
    
    return member.checkInTime <= cutoffDate;
  });

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || !api) return;

    const slideDuration = eligibleMembers.length > 0 ? (30000 / eligibleMembers.length) : 5000;
    
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, slideDuration);

    return () => clearInterval(interval);
  }, [isPlaying, api, eligibleMembers.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Danh sách thành viên
            </h1>
            <p className="text-muted-foreground">
              Thành viên check-in đúng giờ (trước {cutoffTime})
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cài đặt</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="cutoff-time">Giờ giới hạn check-in</Label>
                    <Input
                      id="cutoff-time"
                      type="time"
                      value={cutoffTime}
                      onChange={(e) => setCutoffTime(e.target.value)}
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant={isPlaying ? "destructive" : "default"}
              onClick={handlePlayPause}
              className="gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4" />
                  Tạm dừng
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Phát
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tổng thành viên check-in</p>
              <p className="text-2xl font-bold">{members.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Check-in đúng giờ</p>
              <p className="text-2xl font-bold text-green-600">{eligibleMembers.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Check-in muộn</p>
              <p className="text-2xl font-bold text-orange-600">
                {members.length - eligibleMembers.length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Slideshow */}
      {eligibleMembers.length > 0 ? (
        <Card className="p-8">
          <div className="mb-4 text-center">
            <p className="text-sm text-muted-foreground">
              Slide {current} / {count} • Tổng thời gian: 30 giây • 
              {count > 0 && ` ~${Math.round(30 / count)} giây/slide`}
            </p>
          </div>

          <Carousel
            setApi={setApi}
            className="w-full max-w-5xl mx-auto"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {eligibleMembers.map((member) => (
                <CarouselItem key={member.id}>
                  <div className="p-1">
                    <Card className="border-2">
                      <div className="grid md:grid-cols-2 gap-6 p-8">
                        {/* Member Image */}
                        <div className="flex items-center justify-center">
                          <div className="w-full aspect-square rounded-lg overflow-hidden bg-muted">
                            <img
                              src={member.image || "/placeholder.svg"}
                              alt={member.fullName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Member Info */}
                        <div className="flex flex-col justify-center space-y-4">
                          <div>
                            <h2 className="text-4xl font-bold text-foreground mb-2">
                              {member.fullName}
                            </h2>
                            <p className="text-xl text-primary font-semibold">
                              {member.industry}
                            </p>
                          </div>

                          <div className="space-y-2 text-muted-foreground">
                            <p className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Check-in: {member.checkInTime.toLocaleTimeString('vi-VN', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>

                          <div className="pt-4">
                            <div className="inline-flex items-center px-4 py-2 bg-green-500/10 text-green-600 rounded-full font-semibold">
                              ✓ Đúng giờ
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Card>
      ) : (
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">⏰</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Chưa có thành viên check-in đúng giờ
          </h3>
          <p className="text-muted-foreground">
            Các thành viên check-in trước {cutoffTime} sẽ xuất hiện tại đây
          </p>
        </Card>
      )}

      {/* Late Check-in List */}
      {members.length - eligibleMembers.length > 0 && (
        <Card className="mt-6 p-6">
          <h3 className="text-lg font-semibold mb-4">
            Thành viên check-in muộn ({members.length - eligibleMembers.length})
          </h3>
          <div className="space-y-2">
            {members
              .filter(member => !eligibleMembers.includes(member))
              .map(member => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{member.fullName}</p>
                    <p className="text-sm text-muted-foreground">{member.industry}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-orange-600 font-medium">
                      {member.checkInTime.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default MemberSlideshow;
