import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Copy, Share2, Facebook, CheckCircle2, Calendar, Clock, Trash2, Edit2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ContentGeneratorProps {
  contentType: string;
  defaultPrompt?: string;
}

interface ScheduledPost {
  id: string;
  content: string;
  platforms: {
    facebook: boolean;
    zalo: boolean;
  };
  facebookGroups: string[];
  zaloGroups: string[];
  scheduleDate: string;
  scheduleTimes: string[];
  repeatInterval?: string;
}

const CONTENT_SUGGESTIONS = {
  "member-of-week": {
    title: "Thành viên của Tuần",
    prompt: "Viết bài giới thiệu thành viên xuất sắc của tuần với phong cách chuyên nghiệp, truyền cảm hứng",
    example: "🌟 THÀNH VIÊN CỦA TUẦN 🌟\n\nChúng tôi tự hào giới thiệu [Tên thành viên] - [Chức danh/Ngành nghề]...",
  },
  "newsletter": {
    title: "Bản tin Chapter",
    prompt: "Tạo bản tin email tổng hợp hoạt động chapter tháng này",
    example: "📰 BẢN TIN CHAPTER THÁNG [Tháng/Năm]\n\nKính gửi các thành viên,\n\nTrong tháng vừa qua...",
  },
  "event-announcement": {
    title: "Thông báo Sự kiện",
    prompt: "Viết bài đăng thông báo sự kiện sắp tới một cách hấp dẫn và chuyên nghiệp",
    example: "🎉 THÔNG BÁO SỰ KIỆN QUAN TRỌNG 🎉\n\n📅 Thời gian: [Ngày/Giờ]\n📍 Địa điểm: [Địa điểm]...",
  },
  "recap-post": {
    title: "Bài viết Tổng kết",
    prompt: "Viết bài tổng kết sự kiện vừa diễn ra với những điểm nhấn quan trọng",
    example: "✨ TỔNG KẾT SỰ KIỆN [Tên sự kiện] ✨\n\nSự kiện đã khép lại thành công rực rở...",
  },
  "fanpage-growth": {
    title: "Bài đăng Tăng trưởng",
    prompt: "Viết bài đăng khuyến khích thành viên tương tác và chia sẻ để tăng độ phủ sóng",
    example: "📈 CÙNG NHAU LAN TỎA GIÁ TRỊ BNI FELIX 📈\n\nChúng ta đang có sự tăng trưởng tuyệt vời...",
  },
};

export default function ContentGenerator({ contentType, defaultPrompt }: ContentGeneratorProps) {
  const [selectedType, setSelectedType] = useState<string>(contentType);
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [scheduleForm, setScheduleForm] = useState({
    date: "",
    times: [""],
    platforms: {
      facebook: false,
      zalo: false
    },
    facebookGroups: [""],
    zaloGroups: [""],
    repeatInterval: "none"
  });

  const suggestion = CONTENT_SUGGESTIONS[selectedType as keyof typeof CONTENT_SUGGESTIONS];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Simulate AI generation (replace with actual AI API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const prompt = customPrompt || suggestion?.prompt || defaultPrompt;
      const mockContent = suggestion?.example || `Nội dung được tạo dựa trên: ${prompt}`;
      
      setGeneratedContent(mockContent);
      toast.success("Đã tạo nội dung thành công");
    } catch (error) {
      toast.error("Không thể tạo nội dung. Vui lòng thử lại.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      toast.success("Đã sao chép nội dung");
    }
  };

  const handleShareToFacebook = () => {
    if (generatedContent) {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(generatedContent)}`;
      window.open(facebookUrl, '_blank', 'width=600,height=400');
      toast.success("Đang mở Facebook để chia sẻ");
    }
  };

  const handleShareToZalo = () => {
    if (generatedContent) {
      // Zalo sharing (requires Zalo integration)
      toast.info("Đang mở Zalo để chia sẻ", {
        description: "Tính năng này cần tài khoản Zalo được kết nối"
      });
    }
  };

  const handleSchedulePost = () => {
    if (!generatedContent) {
      toast.error('Vui lòng tạo nội dung trước khi đặt lịch');
      return;
    }
    if (!scheduleForm.date) {
      toast.error('Vui lòng chọn ngày đăng bài');
      return;
    }
    if (scheduleForm.times.every(t => !t)) {
      toast.error('Vui lòng chọn ít nhất một giờ đăng bài');
      return;
    }
    if (!scheduleForm.platforms.facebook && !scheduleForm.platforms.zalo) {
      toast.error('Vui lòng chọn ít nhất một nền tảng');
      return;
    }

    const validTimes = scheduleForm.times.filter(t => t);
    const newPost: ScheduledPost = {
      id: Date.now().toString(),
      content: generatedContent,
      platforms: scheduleForm.platforms,
      facebookGroups: scheduleForm.platforms.facebook ? scheduleForm.facebookGroups.filter(g => g) : [],
      zaloGroups: scheduleForm.platforms.zalo ? scheduleForm.zaloGroups.filter(g => g) : [],
      scheduleDate: scheduleForm.date,
      scheduleTimes: validTimes,
      repeatInterval: scheduleForm.repeatInterval !== "none" ? scheduleForm.repeatInterval : undefined
    };

    setScheduledPosts([...scheduledPosts, newPost]);
    setIsScheduleDialogOpen(false);
    toast.success('Đã đặt lịch đăng bài thành công', {
      description: `Sẽ đăng vào ${scheduleForm.date} vào ${validTimes.length} giờ khác nhau`
    });
    
    // Reset form
    setScheduleForm({
      date: "",
      times: [""],
      platforms: {
        facebook: false,
        zalo: false
      },
      facebookGroups: [""],
      zaloGroups: [""],
      repeatInterval: "none"
    });
  };

  const handleDeleteScheduledPost = (id: string) => {
    setScheduledPosts(scheduledPosts.filter(post => post.id !== id));
    toast.success('Đã xóa lịch đăng bài');
  };

  const handleEditScheduledPost = (post: ScheduledPost) => {
    setGeneratedContent(post.content);
    setScheduleForm({
      date: post.scheduleDate,
      times: post.scheduleTimes,
      platforms: post.platforms,
      facebookGroups: post.facebookGroups.length > 0 ? post.facebookGroups : [""],
      zaloGroups: post.zaloGroups.length > 0 ? post.zaloGroups : [""],
      repeatInterval: post.repeatInterval || "none"
    });
    handleDeleteScheduledPost(post.id);
    setIsScheduleDialogOpen(true);
  };

  return (
    <Card className="border-purple-500 border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          {suggestion?.title || "Tạo Nội dung với AI"}
        </CardTitle>
        <CardDescription>
          Sử dụng AI để tạo nội dung truyền thông chuyên nghiệp hoặc tự điền nội dung
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Content Type Selection */}
        <div className="space-y-2">
          <Label>Loại Nội dung</Label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CONTENT_SUGGESTIONS).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Custom Prompt */}
        <div className="space-y-2">
          <Label>Yêu cầu tùy chỉnh (Tùy chọn)</Label>
          <Textarea
            rows={2}
            placeholder={suggestion?.prompt || "Nhập yêu cầu của bạn cho AI..."}
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
          />
        </div>

        {/* Generate Button */}
        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {isGenerating ? (
            <>Đang tạo nội dung...</>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Tạo Nội dung với AI
            </>
          )}
        </Button>

        {/* Generated Content */}
        {generatedContent && (
          <div className="space-y-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border-2 border-green-500">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Nội dung đã tạo
              </Label>
              <Badge className="bg-green-500">Sẵn sàng</Badge>
            </div>
            
            <Textarea
              rows={8}
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              className="bg-white dark:bg-background"
            />

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={handleCopy} 
                  variant="outline"
                  className="flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Sao chép
                </Button>
                <Button 
                  onClick={handleShareToFacebook}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button 
                  onClick={handleShareToZalo}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Zalo
                </Button>
              </div>
              
              <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" className="w-full bg-bni-red hover:bg-bni-red/90 text-white">
                    <Calendar className="h-4 w-4 mr-2" />
                    Đặt lịch đăng bài
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Đặt lịch đăng bài tự động</DialogTitle>
                    <DialogDescription>
                      Cấu hình thời gian và tần suất đăng bài
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Nền tảng</Label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={scheduleForm.platforms.facebook}
                            onChange={(e) => setScheduleForm({
                              ...scheduleForm,
                              platforms: { ...scheduleForm.platforms, facebook: e.target.checked }
                            })}
                            className="w-4 h-4"
                          />
                          <span>Facebook</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={scheduleForm.platforms.zalo}
                            onChange={(e) => setScheduleForm({
                              ...scheduleForm,
                              platforms: { ...scheduleForm.platforms, zalo: e.target.checked }
                            })}
                            className="w-4 h-4"
                          />
                          <span>Zalo</span>
                        </label>
                      </div>
                    </div>

                    {scheduleForm.platforms.facebook && (
                      <div className="space-y-2">
                        <Label>Link nhóm Facebook</Label>
                        {scheduleForm.facebookGroups.map((group, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              placeholder="https://facebook.com/groups/..."
                              value={group}
                              onChange={(e) => {
                                const newGroups = [...scheduleForm.facebookGroups];
                                newGroups[index] = e.target.value;
                                setScheduleForm({ ...scheduleForm, facebookGroups: newGroups });
                              }}
                            />
                            {scheduleForm.facebookGroups.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newGroups = scheduleForm.facebookGroups.filter((_, i) => i !== index);
                                  setScheduleForm({ ...scheduleForm, facebookGroups: newGroups });
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setScheduleForm({
                            ...scheduleForm,
                            facebookGroups: [...scheduleForm.facebookGroups, ""]
                          })}
                        >
                          + Thêm nhóm Facebook
                        </Button>
                      </div>
                    )}

                    {scheduleForm.platforms.zalo && (
                      <div className="space-y-2">
                        <Label>Link nhóm Zalo</Label>
                        {scheduleForm.zaloGroups.map((group, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              placeholder="Link nhóm Zalo..."
                              value={group}
                              onChange={(e) => {
                                const newGroups = [...scheduleForm.zaloGroups];
                                newGroups[index] = e.target.value;
                                setScheduleForm({ ...scheduleForm, zaloGroups: newGroups });
                              }}
                            />
                            {scheduleForm.zaloGroups.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newGroups = scheduleForm.zaloGroups.filter((_, i) => i !== index);
                                  setScheduleForm({ ...scheduleForm, zaloGroups: newGroups });
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setScheduleForm({
                            ...scheduleForm,
                            zaloGroups: [...scheduleForm.zaloGroups, ""]
                          })}
                        >
                          + Thêm nhóm Zalo
                        </Button>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Ngày đăng</Label>
                      <Input 
                        type="date" 
                        value={scheduleForm.date}
                        onChange={(e) => setScheduleForm({...scheduleForm, date: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Giờ đăng</Label>
                      {scheduleForm.times.map((time, index) => (
                        <div key={index} className="flex gap-2">
                          <Input 
                            type="time" 
                            value={time}
                            onChange={(e) => {
                              const newTimes = [...scheduleForm.times];
                              newTimes[index] = e.target.value;
                              setScheduleForm({...scheduleForm, times: newTimes});
                            }}
                          />
                          {scheduleForm.times.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newTimes = scheduleForm.times.filter((_, i) => i !== index);
                                setScheduleForm({...scheduleForm, times: newTimes});
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setScheduleForm({
                          ...scheduleForm,
                          times: [...scheduleForm.times, ""]
                        })}
                      >
                        + Thêm giờ đăng
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Khoảng cách giữa các lần đăng</Label>
                      <Select value={scheduleForm.repeatInterval} onValueChange={(value) => setScheduleForm({...scheduleForm, repeatInterval: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Không lặp lại</SelectItem>
                          <SelectItem value="daily">Mỗi ngày</SelectItem>
                          <SelectItem value="weekly">Mỗi tuần</SelectItem>
                          <SelectItem value="monthly">Mỗi tháng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={handleSchedulePost} className="w-full bg-bni-red hover:bg-bni-red/90 text-white">
                      <Clock className="h-4 w-4 mr-2" />
                      Xác nhận đặt lịch
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}

        {/* Scheduled Posts List */}
        {scheduledPosts.length > 0 && (
          <div className="mt-6 space-y-3">
            <Label className="text-sm font-semibold">Lịch đăng bài đã đặt ({scheduledPosts.length})</Label>
            <div className="space-y-2">
              {scheduledPosts.map((post) => (
                <Card key={post.id} className="bg-muted/50">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(post.scheduleDate).toLocaleDateString('vi-VN')}
                          </Badge>
                          {post.scheduleTimes.map((time, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {time}
                            </Badge>
                          ))}
                          {post.platforms.facebook && (
                            <Badge className="text-xs bg-blue-600 text-white">
                              Facebook ({post.facebookGroups.length} nhóm)
                            </Badge>
                          )}
                          {post.platforms.zalo && (
                            <Badge className="text-xs bg-blue-500 text-white">
                              Zalo ({post.zaloGroups.length} nhóm)
                            </Badge>
                          )}
                          {post.repeatInterval && (
                            <Badge variant="secondary" className="text-xs">
                              Lặp lại ({post.repeatInterval === 'daily' ? 'Mỗi ngày' : post.repeatInterval === 'weekly' ? 'Mỗi tuần' : 'Mỗi tháng'})
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{post.content}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditScheduledPost(post)}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteScheduledPost(post.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
