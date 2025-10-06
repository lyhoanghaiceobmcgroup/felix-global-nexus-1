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
import { Clock, Users, Play, Pause, Settings, Plus, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MemberCheckIn {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  industry: string;
  joinDate: Date;
  checkInTime: Date;
  image1?: string;
  image1Duration?: number;
  image2?: string;
  image2Duration?: number;
  powerTeam?: string;
}

interface PowerTeam {
  id: string;
  name: string;
}

const MemberSlideshow = () => {
  const [cutoffTime, setCutoffTime] = useState("07:00");
  const [isPlaying, setIsPlaying] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [editingMember, setEditingMember] = useState<MemberCheckIn | null>(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isManageTeamsOpen, setIsManageTeamsOpen] = useState(false);
  
  const [powerTeams, setPowerTeams] = useState<PowerTeam[]>([
    { id: "1", name: "Tư vấn & Dịch vụ" },
    { id: "2", name: "Xây dựng & BĐS" },
    { id: "3", name: "Công nghệ & Truyền thông" },
    { id: "4", name: "Sản xuất & Thương mại" },
    { id: "5", name: "Y tế & Sức khỏe" },
  ]);

  const [newTeamName, setNewTeamName] = useState("");
  
  const [members, setMembers] = useState<MemberCheckIn[]>([
    {
      id: "1",
      fullName: "Nguyễn Văn A",
      phoneNumber: "0901234567",
      email: "nguyenvana@email.com",
      industry: "Công nghệ thông tin",
      joinDate: new Date("2024-01-15"),
      checkInTime: new Date(new Date().setHours(6, 45, 0)),
      image1: "/placeholder.svg",
      image1Duration: 5,
      image2: "/placeholder.svg",
      image2Duration: 5,
      powerTeam: "Công nghệ & Truyền thông",
    },
    {
      id: "2",
      fullName: "Trần Thị B",
      phoneNumber: "0912345678",
      email: "tranthib@email.com",
      industry: "Kinh doanh",
      joinDate: new Date("2024-02-20"),
      checkInTime: new Date(new Date().setHours(6, 50, 0)),
      image1: "/placeholder.svg",
      image1Duration: 5,
      powerTeam: "Tư vấn & Dịch vụ",
    },
    {
      id: "3",
      fullName: "Lê Văn C",
      phoneNumber: "0923456789",
      email: "levanc@email.com",
      industry: "Marketing",
      joinDate: new Date("2024-03-10"),
      checkInTime: new Date(new Date().setHours(6, 55, 0)),
      image1: "/placeholder.svg",
      image1Duration: 5,
      powerTeam: "Công nghệ & Truyền thông",
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

  const handleAddTeam = () => {
    if (newTeamName.trim()) {
      setPowerTeams([...powerTeams, { id: Date.now().toString(), name: newTeamName }]);
      setNewTeamName("");
    }
  };

  const handleDeleteTeam = (teamId: string) => {
    setPowerTeams(powerTeams.filter(t => t.id !== teamId));
  };

  const handleSaveMember = (member: MemberCheckIn) => {
    if (editingMember) {
      setMembers(members.map(m => m.id === member.id ? member : m));
    } else {
      setMembers([...members, { ...member, id: Date.now().toString() }]);
    }
    setEditingMember(null);
    setIsAddMemberOpen(false);
  };

  const handleDeleteMember = (memberId: string) => {
    setMembers(members.filter(m => m.id !== memberId));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <Tabs defaultValue="slideshow" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Danh sách thành viên
            </h1>
            <TabsList>
              <TabsTrigger value="slideshow">Slideshow</TabsTrigger>
              <TabsTrigger value="management">Quản lý thành viên</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex items-center gap-4">
            <Dialog open={isManageTeamsOpen} onOpenChange={setIsManageTeamsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Quản lý Power Team
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Quản lý Power Team</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Tên Power Team mới"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                    />
                    <Button onClick={handleAddTeam}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {powerTeams.map((team) => (
                      <div key={team.id} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span>{team.name}</span>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteTeam(team.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

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

        <TabsContent value="slideshow" className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                  src={member.image1 || "/placeholder.svg"}
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
        </TabsContent>

        <TabsContent value="management" className="space-y-6">
          <div className="flex justify-end mb-4">
            <Button onClick={() => setIsAddMemberOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm thành viên
            </Button>
          </div>

          {/* Display members grouped by Power Team */}
          <div className="space-y-6">
            {powerTeams.map((team) => {
              const teamMembers = members.filter(m => m.powerTeam === team.name);
              
              return (
                <Card key={team.id}>
                  <div className="p-4 border-b bg-muted/50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">
                        {team.name}
                      </h3>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {teamMembers.length} thành viên
                      </span>
                    </div>
                  </div>
                  
                  {teamMembers.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tên</TableHead>
                          <TableHead>SĐT</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Ngành nghề</TableHead>
                          <TableHead>Ngày gia nhập</TableHead>
                          <TableHead>Ảnh 1</TableHead>
                          <TableHead>Ảnh 2</TableHead>
                          <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teamMembers.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell className="font-medium">{member.fullName}</TableCell>
                            <TableCell>{member.phoneNumber}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>{member.industry}</TableCell>
                            <TableCell>
                              {member.joinDate.toLocaleDateString('vi-VN')}
                            </TableCell>
                            <TableCell>
                              {member.image1 && (
                                <span className="text-xs text-muted-foreground">
                                  {member.image1Duration}s
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              {member.image2 && (
                                <span className="text-xs text-muted-foreground">
                                  {member.image2Duration}s
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setEditingMember(member);
                                    setIsAddMemberOpen(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteMember(member.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      Chưa có thành viên trong team này
                    </div>
                  )}
                </Card>
              );
            })}

            {/* Members without Power Team */}
            {members.filter(m => !m.powerTeam || !powerTeams.find(t => t.name === m.powerTeam)).length > 0 && (
              <Card>
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      Chưa phân Power Team
                    </h3>
                    <span className="px-3 py-1 bg-orange-500/10 text-orange-600 rounded-full text-sm font-medium">
                      {members.filter(m => !m.powerTeam || !powerTeams.find(t => t.name === m.powerTeam)).length} thành viên
                    </span>
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên</TableHead>
                      <TableHead>SĐT</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Ngành nghề</TableHead>
                      <TableHead>Ngày gia nhập</TableHead>
                      <TableHead>Ảnh 1</TableHead>
                      <TableHead>Ảnh 2</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members
                      .filter(m => !m.powerTeam || !powerTeams.find(t => t.name === m.powerTeam))
                      .map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.fullName}</TableCell>
                          <TableCell>{member.phoneNumber}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{member.industry}</TableCell>
                          <TableCell>
                            {member.joinDate.toLocaleDateString('vi-VN')}
                          </TableCell>
                          <TableCell>
                            {member.image1 && (
                              <span className="text-xs text-muted-foreground">
                                {member.image1Duration}s
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {member.image2 && (
                              <span className="text-xs text-muted-foreground">
                                {member.image2Duration}s
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setEditingMember(member);
                                  setIsAddMemberOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteMember(member.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Member Dialog */}
      <MemberFormDialog
        open={isAddMemberOpen}
        onOpenChange={setIsAddMemberOpen}
        member={editingMember}
        powerTeams={powerTeams}
        onSave={handleSaveMember}
      />
    </div>
  );
};

// Member Form Dialog Component
const MemberFormDialog = ({
  open,
  onOpenChange,
  member,
  powerTeams,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: MemberCheckIn | null;
  powerTeams: PowerTeam[];
  onSave: (member: MemberCheckIn) => void;
}) => {
  const [formData, setFormData] = useState<Partial<MemberCheckIn>>({
    fullName: "",
    phoneNumber: "",
    email: "",
    industry: "",
    joinDate: new Date(),
    checkInTime: new Date(),
    image1Duration: 5,
    image2Duration: 5,
    powerTeam: "",
  });

  useEffect(() => {
    if (member) {
      setFormData(member);
    } else {
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        industry: "",
        joinDate: new Date(),
        checkInTime: new Date(),
        image1Duration: 5,
        image2Duration: 5,
        powerTeam: "",
      });
    }
  }, [member, open]);

  const handleSubmit = () => {
    if (formData.fullName && formData.phoneNumber && formData.email) {
      onSave({
        ...formData,
        id: member?.id || Date.now().toString(),
      } as MemberCheckIn);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {member ? "Chỉnh sửa thành viên" : "Thêm thành viên mới"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label>Tên đầy đủ *</Label>
            <Input
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Nguyễn Văn A"
            />
          </div>
          <div className="space-y-2">
            <Label>Số điện thoại *</Label>
            <Input
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="0901234567"
            />
          </div>
          <div className="space-y-2">
            <Label>Email *</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Ngành nghề</Label>
            <Input
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              placeholder="Công nghệ thông tin"
            />
          </div>
          <div className="space-y-2">
            <Label>Ngày gia nhập</Label>
            <Input
              type="date"
              value={formData.joinDate instanceof Date ? formData.joinDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setFormData({ ...formData, joinDate: new Date(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label>Power Team</Label>
            <Select
              value={formData.powerTeam}
              onValueChange={(value) => setFormData({ ...formData, powerTeam: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn Power Team" />
              </SelectTrigger>
              <SelectContent>
                {powerTeams.map((team) => (
                  <SelectItem key={team.id} value={team.name}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Ảnh 1 URL</Label>
              <Input
                value={formData.image1}
                onChange={(e) => setFormData({ ...formData, image1: e.target.value })}
                placeholder="/placeholder.svg"
              />
              <div className="flex items-center gap-2">
                <Label className="text-xs">Thời gian (giây)</Label>
                <Input
                  type="number"
                  min="1"
                  max="30"
                  value={formData.image1Duration}
                  onChange={(e) => setFormData({ ...formData, image1Duration: parseInt(e.target.value) })}
                  className="w-20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Ảnh 2 URL</Label>
              <Input
                value={formData.image2}
                onChange={(e) => setFormData({ ...formData, image2: e.target.value })}
                placeholder="/placeholder.svg"
              />
              <div className="flex items-center gap-2">
                <Label className="text-xs">Thời gian (giây)</Label>
                <Input
                  type="number"
                  min="1"
                  max="30"
                  value={formData.image2Duration}
                  onChange={(e) => setFormData({ ...formData, image2Duration: parseInt(e.target.value) })}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>
            {member ? "Cập nhật" : "Thêm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemberSlideshow;
