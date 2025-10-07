import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Crown, Target, TrendingUp, Users, Calendar, CheckCircle2, AlertTriangle, Lightbulb, ChevronLeft, ChevronRight, Play, Edit, Download, Link, Save, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useChapterData } from "@/contexts/ChapterDataContext";
import { toast } from "sonner";
import { LeadershipEditor } from "@/components/leadership/LeadershipEditor";
export default function PresidentReport() {
  const {
    chapterData,
    updateStrategicObjectives,
    updatePerformanceMetrics,
    submitReport,
    updateLeadership
  } = useChapterData();
  const [meetingDate, setMeetingDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 5;
  const [isLeadershipEditorOpen, setIsLeadershipEditorOpen] = useState(false);

  // Local state for form inputs
  const [objectives, setObjectives] = useState({
    memberTarget: chapterData.strategicObjectives.memberCount.target,
    memberCurrent: chapterData.strategicObjectives.memberCount.current,
    revenueTarget: chapterData.strategicObjectives.revenue.target,
    attendanceTarget: chapterData.strategicObjectives.attendance.target,
    attendanceCurrent: chapterData.strategicObjectives.attendance.current,
    kpiGreenTarget: chapterData.strategicObjectives.kpiGreenMembers.target,
    kpiGreenCurrent: chapterData.strategicObjectives.kpiGreenMembers.current,
    oneToOneTarget: chapterData.strategicObjectives.oneToOneMeetings?.target || "344 – 544",
    oneToOneCurrent: chapterData.strategicObjectives.oneToOneMeetings?.current || 344
  });
  const [metrics, setMetrics] = useState({
    referralsThisWeek: chapterData.performanceMetrics.referralsThisWeek,
    revenueLastMonth: chapterData.performanceMetrics.revenueLastMonth,
    visitorsLastWeek: chapterData.performanceMetrics.visitorsLastWeek,
    newMemberApplications: chapterData.performanceMetrics.newMemberApplications,
    membersNeedingRenewal: chapterData.performanceMetrics.membersNeedingRenewal,
    trainingPointsLastMonth: chapterData.performanceMetrics.trainingPointsLastMonth,
    upcomingEvent: chapterData.performanceMetrics.upcomingEvent
  });

  // Sync local state with context when context changes
  useEffect(() => {
    setObjectives({
      memberTarget: chapterData.strategicObjectives.memberCount.target,
      memberCurrent: chapterData.strategicObjectives.memberCount.current,
      revenueTarget: chapterData.strategicObjectives.revenue.target,
      attendanceTarget: chapterData.strategicObjectives.attendance.target,
      attendanceCurrent: chapterData.strategicObjectives.attendance.current,
      kpiGreenTarget: chapterData.strategicObjectives.kpiGreenMembers.target,
      kpiGreenCurrent: chapterData.strategicObjectives.kpiGreenMembers.current,
      oneToOneTarget: chapterData.strategicObjectives.oneToOneMeetings?.target || "344 – 544",
      oneToOneCurrent: chapterData.strategicObjectives.oneToOneMeetings?.current || 344
    });
    setMetrics({
      referralsThisWeek: chapterData.performanceMetrics.referralsThisWeek,
      revenueLastMonth: chapterData.performanceMetrics.revenueLastMonth,
      visitorsLastWeek: chapterData.performanceMetrics.visitorsLastWeek,
      newMemberApplications: chapterData.performanceMetrics.newMemberApplications,
      membersNeedingRenewal: chapterData.performanceMetrics.membersNeedingRenewal,
      trainingPointsLastMonth: chapterData.performanceMetrics.trainingPointsLastMonth,
      upcomingEvent: chapterData.performanceMetrics.upcomingEvent
    });
  }, [chapterData]);
  const handleSaveReport = () => {
    // Calculate progress for each objective
    const memberProgress = typeof objectives.memberCurrent === 'number' ? Math.round(objectives.memberCurrent / 75 * 100) : 56;
    const attendanceProgress = typeof objectives.attendanceCurrent === 'string' && objectives.attendanceCurrent.includes('%') ? 100 : 100;
    const kpiGreenProgress = typeof objectives.kpiGreenCurrent === 'string' && objectives.kpiGreenCurrent.includes('%') ? 100 : 100;

    // Update strategic objectives
    updateStrategicObjectives({
      memberCount: {
        target: objectives.memberTarget.toString(),
        current: objectives.memberCurrent,
        progress: memberProgress,
        status: memberProgress >= 100 ? 'achieved' : memberProgress >= 50 ? 'in-progress' : 'needs-attention'
      },
      revenue: {
        target: objectives.revenueTarget.toString(),
        current: chapterData.strategicObjectives.revenue.current,
        progress: chapterData.strategicObjectives.revenue.progress,
        status: chapterData.strategicObjectives.revenue.status
      },
      attendance: {
        target: objectives.attendanceTarget.toString(),
        current: objectives.attendanceCurrent.toString(),
        progress: attendanceProgress,
        status: attendanceProgress >= 98 ? 'achieved' : 'needs-attention'
      },
      kpiGreenMembers: {
        target: objectives.kpiGreenTarget.toString(),
        current: objectives.kpiGreenCurrent.toString(),
        progress: kpiGreenProgress,
        status: kpiGreenProgress >= 100 ? 'achieved' : 'needs-attention'
      },
      oneToOneMeetings: {
        target: objectives.oneToOneTarget.toString(),
        current: objectives.oneToOneCurrent,
        progress: typeof objectives.oneToOneCurrent === 'number' ? Math.round(objectives.oneToOneCurrent / 344 * 100) : 100,
        status: 'achieved'
      }
    });

    // Update performance metrics
    updatePerformanceMetrics(metrics);
    toast.success("Đã lưu báo cáo và cập nhật Tổng quan!");
  };
  return <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="border-b pb-4 sm:pb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bni-red flex items-center gap-2 sm:gap-3">
            
            <span>BÁO CÁO CỦA CHỦ TỊCH</span>
          </h1>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              Cập nhật: {chapterData.lastUpdated}
            </Badge>
            <Badge className="bg-green-500 text-xs whitespace-nowrap">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Đồng bộ với Tổng quan
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Label className="font-semibold shrink-0">Buổi họp ngày:</Label>
            <Input type="date" value={meetingDate} onChange={e => setMeetingDate(e.target.value)} className="w-auto" />
          </div>
          <div className="flex items-center gap-2">
            <Label className="font-semibold shrink-0">Nhiệm kỳ:</Label>
            <Input type="text" value={chapterData.termName} disabled className="w-32 bg-muted" />
            <span className="text-muted-foreground">
              ({chapterData.termStart} – {chapterData.termEnd})
            </span>
          </div>
        </div>
      </div>

      {/* Lời chào */}
      

      {/* Thông tin Đồng bộ */}
      

      {/* I. NHÌN LẠI TẦM NHÌN & MỤC TIÊU NHIỆM KỲ */}
      <Card className="shadow-lg border-bni-red border-2">
        <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="h-6 w-6 text-bni-red" />
                I. NHÌN LẠI TẦM NHÌN & MỤC TIÊU NHIỆM KỲ
              </CardTitle>
              <CardDescription className="text-base">
                Hãy cùng nhắc lại những mục tiêu mà chúng ta đã cam kết cùng nhau đạt được ({chapterData.termName})
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm">
              Liên kết với Tổng quan
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <div className="min-w-[600px] px-6 sm:px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-base">Hạng mục</TableHead>
                <TableHead className="font-bold text-base text-center">Mục tiêu Nhiệm kỳ</TableHead>
                <TableHead className="font-bold text-base text-center">Tiến độ Hiện tại</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Số lượng Thành viên</TableCell>
                <TableCell className="text-center">
                  <Input placeholder="75+" className="w-32 mx-auto font-bold" value={objectives.memberTarget} onChange={e => setObjectives({
                      ...objectives,
                      memberTarget: e.target.value
                    })} />
                </TableCell>
                <TableCell className="text-center">
                  <Input type="number" placeholder="42" className="w-32 mx-auto font-bold" value={objectives.memberCurrent} onChange={e => setObjectives({
                      ...objectives,
                      memberCurrent: parseInt(e.target.value) || 0
                    })} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Doanh thu Cả nhiệm kỳ</TableCell>
                <TableCell className="text-center">
                  <Input placeholder="33 Tỷ VNĐ" className="w-40 mx-auto font-bold" value={objectives.revenueTarget} onChange={e => setObjectives({
                      ...objectives,
                      revenueTarget: e.target.value
                    })} />
                </TableCell>
                <TableCell className="text-center text-muted-foreground">
                  (Bắt đầu tính từ 01/10)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Tỷ lệ Hiện diện</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Input placeholder="98%" className="w-24 mx-auto font-bold" value={objectives.attendanceTarget} onChange={e => setObjectives({
                        ...objectives,
                        attendanceTarget: e.target.value
                      })} />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Input placeholder="98%" className="w-24 mx-auto font-bold" value={objectives.attendanceCurrent} onChange={e => setObjectives({
                        ...objectives,
                        attendanceCurrent: e.target.value
                      })} />
                    <Badge className="bg-green-500">Đạt</Badge>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Tỷ lệ Thành viên KPI Xanh</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Input placeholder="50%" className="w-24 mx-auto font-bold" value={objectives.kpiGreenTarget} onChange={e => setObjectives({
                        ...objectives,
                        kpiGreenTarget: e.target.value
                      })} />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Input placeholder="50%" className="w-24 mx-auto font-bold" value={objectives.kpiGreenCurrent} onChange={e => setObjectives({
                        ...objectives,
                        kpiGreenCurrent: e.target.value
                      })} />
                    <Badge className="bg-green-500">Đạt</Badge>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Số lượt 1-2-1 / tháng</TableCell>
                <TableCell className="text-center">
                  <Input placeholder="344 – 544" className="w-40 mx-auto font-bold" value={objectives.oneToOneTarget} onChange={e => setObjectives({
                      ...objectives,
                      oneToOneTarget: e.target.value
                    })} />
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Input type="number" placeholder="344" className="w-24 mx-auto font-bold" value={objectives.oneToOneCurrent} onChange={e => setObjectives({
                        ...objectives,
                        oneToOneCurrent: parseInt(e.target.value) || 0
                      })} />
                    <Badge className="bg-green-500">Đạt tối thiểu</Badge>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button className="bg-bni-gold text-bni-black hover:bg-bni-gold/90">
              Xuất sang Trang tính
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
            <p className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
              💭 Góc nhìn của Chủ tịch:
            </p>
            <Textarea rows={2} className="bg-white dark:bg-background" defaultValue="Chúng ta đang làm rất tốt việc duy trì sự hiện diện và chất lượng hoạt động. Nền tảng con người đã vững, giờ là lúc tập trung vào sự tăng trưởng về quy mô và doanh thu trong nhiệm kỳ mới." />
          </div>
        </CardContent>
      </Card>

      {/* II. BẢNG ĐIỀU KHIỂN TỔNG QUAN CHAPTER */}
      <Card className="shadow-lg border-bni-gold border-2">
        <CardHeader className="bg-gradient-to-r from-bni-gold/10 to-bni-red/10">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-bni-red" />
                II. BẢNG ĐIỀU KHIỂN (DASHBOARD) TỔNG QUAN CHAPTER
              </CardTitle>
              <CardDescription className="text-base">(Số liệu cập nhật từ các Trưởng ban)</CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm">
              Đồng bộ real-time
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          
          {/* Hiệu suất Kinh doanh & Kết nối */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-bni-red">Hiệu suất Kinh doanh & Kết nối</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 p-6 rounded-lg border-2 border-green-500">
                <Label className="font-semibold text-sm text-muted-foreground block mb-2">
                  Cơ hội Kinh doanh (Tuần qua):
                </Label>
                <Input type="number" placeholder="53" className="text-3xl font-bold" value={metrics.referralsThisWeek} onChange={e => setMetrics({
                ...metrics,
                referralsThisWeek: parseInt(e.target.value) || 0
              })} />
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 p-6 rounded-lg border-2 border-blue-500">
                <Label className="font-semibold text-sm text-muted-foreground block mb-2">
                  Giá trị Giao dịch (Tháng trước):
                </Label>
                <Input placeholder="> 1,23 Tỷ VNĐ" className="text-3xl font-bold" value={metrics.revenueLastMonth} onChange={e => setMetrics({
                ...metrics,
                revenueLastMonth: e.target.value
              })} />
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 p-6 rounded-lg border-2 border-purple-500">
                <Label className="font-semibold text-sm text-muted-foreground block mb-2">
                  Số lượng Khách mời (Tuần trước):
                </Label>
                <Input type="number" placeholder="4" className="text-3xl font-bold" value={metrics.visitorsLastWeek} onChange={e => setMetrics({
                ...metrics,
                visitorsLastWeek: parseInt(e.target.value) || 0
              })} />
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 p-6 rounded-lg border-2 border-orange-500">
                <Label className="font-semibold text-sm text-muted-foreground block mb-2">
                  Số hồ sơ TV mới đã nộp:
                </Label>
                <Input type="number" placeholder="1" className="text-3xl font-bold" value={metrics.newMemberApplications} onChange={e => setMetrics({
                ...metrics,
                newMemberApplications: parseInt(e.target.value) || 0
              })} />
              </div>
            </div>
          </div>

          {/* Sức khỏe & Gắn kết Nội bộ */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-bni-red">Sức khỏe & Gắn kết Nội bộ</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 p-6 rounded-lg border-2 border-yellow-500">
                <Label className="font-semibold text-sm text-muted-foreground block mb-2">
                  Thành viên cần gia hạn (90 ngày tới):
                </Label>
                <Input type="number" placeholder="7" className="text-3xl font-bold" value={metrics.membersNeedingRenewal} onChange={e => setMetrics({
                ...metrics,
                membersNeedingRenewal: parseInt(e.target.value) || 0
              })} />
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 p-6 rounded-lg border-2 border-green-500">
                <Label className="font-semibold text-sm text-muted-foreground block mb-2">
                  Tổng điểm Đào tạo (Tháng trước):
                </Label>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="486" className="text-3xl font-bold" value={metrics.trainingPointsLastMonth} onChange={e => setMetrics({
                  ...metrics,
                  trainingPointsLastMonth: parseInt(e.target.value) || 0
                })} />
                  <Badge className="bg-green-500">Vượt MTC</Badge>
                </div>
              </div>

              <div className="bg-gradient-to-br from-bni-gold/30 to-bni-red/30 p-6 rounded-lg border-2 border-bni-gold">
                <Label className="font-semibold text-sm text-muted-foreground block mb-2">
                  Sự kiện quan trọng sắp tới:
                </Label>
                <Input placeholder="Lễ Chuyển giao BĐH (07/10/2025)" className="text-lg font-bold" value={metrics.upcomingEvent} onChange={e => setMetrics({
                ...metrics,
                upcomingEvent: e.target.value
              })} />
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* IIA. BAN LÃNH ĐẠO NHIỆM KỲ */}
      <Card className="shadow-lg border-bni-gold border-2">
        <CardHeader className="bg-gradient-to-r from-bni-gold/10 to-bni-red/10">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6 text-bni-gold" />
                Ban Lãnh đạo {chapterData.termName}
              </CardTitle>
              <CardDescription className="text-base">
                Thông tin được đồng bộ từ Tổng quan Dashboard
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsLeadershipEditorOpen(true)} className="gap-2">
                <Edit className="h-4 w-4" />
                Sửa thông tin
              </Button>
              <Badge variant="outline" className="text-sm">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Đã đồng bộ
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapterData.leadership.map((leader, index) => leader.isPrimary ? <div key={index} className="col-span-full p-4 border-2 border-bni-gold rounded-lg bg-bni-gold/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="h-5 w-5 text-bni-gold" />
                    <span className="font-semibold">{leader.role}:</span>
                    <span className="font-bold text-bni-red">{leader.name}</span>
                  </div>
                  {leader.support && <div className="ml-7 text-sm text-muted-foreground">
                      Hỗ trợ: <span className="font-medium">{leader.support}</span>
                    </div>}
                </div> : <div key={index} className="p-3 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                  <div className="font-semibold text-sm text-bni-red">{leader.role}</div>
                  <div className="text-sm mt-1">{leader.name}</div>
                  {leader.support && <div className="text-xs text-muted-foreground mt-1">
                      Hỗ trợ: {leader.support}
                    </div>}
                </div>)}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-blue-900 dark:text-blue-300">
              💡 <strong>Ghi chú:</strong> Thông tin Ban Lãnh đạo được quản lý tập trung tại Tổng quan Dashboard. 
              Mọi thay đổi sẽ tự động cập nhật ở đây.
            </p>
          </div>
        </CardContent>
      </Card>

      <LeadershipEditor open={isLeadershipEditorOpen} onOpenChange={setIsLeadershipEditorOpen} leadership={chapterData.leadership} onSave={updatedLeadership => {
      updateLeadership(updatedLeadership);
      toast.success("Đã cập nhật thông tin lãnh đạo!");
    }} />

      {/* III. GÓC NHÌN & ĐỊNH HƯỚNG CỦA CHỦ TỊCH */}
      <Card className="shadow-lg border-bni-red border-2">
        <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-bni-gold" />
            III. GÓC NHÌN & ĐỊNH HƯỚNG CỦA CHỦ TỊCH
          </CardTitle>
          <CardDescription className="text-base">Nhìn vào các con số trên, tôi muốn chia sẻ một vài điểm nhấn</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          
          {/* Điều chúng ta đang làm rất tốt */}
          <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border-l-4 border-green-500">
            <h4 className="font-bold text-lg mb-4 text-green-700 dark:text-green-400 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Điều chúng ta đang làm rất tốt:
            </h4>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-background p-4 rounded-lg">
                <Label className="font-semibold block mb-2">✨ Năng lượng & Sự Gắn kết:</Label>
                <Textarea rows={2} placeholder="Nhập đánh giá..." defaultValue="Tỷ lệ hiện diện 98% và số lượt 1-2-1 đạt mức tối thiểu cho thấy sự cam kết mạnh mẽ của Chapter. Đây là nền tảng vững chắc nhất của chúng ta." />
              </div>

              <div className="bg-white dark:bg-background p-4 rounded-lg">
                <Label className="font-semibold block mb-2">📚 Tinh thần Học tập:</Label>
                <Textarea rows={2} placeholder="Nhập đánh giá..." defaultValue="Việc vượt mục tiêu điểm đào tạo cho thấy chúng ta là một tập thể ham học hỏi, luôn nỗ lực để trở nên tốt hơn." />
              </div>

              <div className="bg-white dark:bg-background p-4 rounded-lg">
                <Label className="font-semibold block mb-2">🤝 Trải nghiệm Khách mời:</Label>
                <Textarea rows={2} placeholder="Nhập đánh giá..." defaultValue="Quy trình chăm sóc khách mời đang phát huy hiệu quả, bằng chứng là chúng ta đã có 1 hồ sơ tiềm năng được nộp ngay sau buổi họp." />
              </div>
            </div>
          </div>

          {/* Vấn đề cần tập trung */}
          <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-lg border-l-4 border-orange-500">
            <h4 className="font-bold text-lg mb-4 text-orange-700 dark:text-orange-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Vấn đề cần tập trung:
            </h4>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-background p-4 rounded-lg">
                <Label className="font-semibold block mb-2">📈 Tăng trưởng Sĩ số:</Label>
                <Textarea rows={2} placeholder="Nhập phân tích..." defaultValue="Chúng ta cần một cú hích mạnh mẽ để đạt được mục tiêu 75+ thành viên. Sức mạnh của tập thể đến từ sự đa dạng và quy mô." />
              </div>

              <div className="bg-white dark:bg-background p-4 rounded-lg">
                <Label className="font-semibold block mb-2">💎 Chất lượng Cơ hội Kinh doanh:</Label>
                <Textarea rows={2} placeholder="Nhập phân tích..." defaultValue='Số lượng referral rất tốt, nhưng chúng ta cần tập trung hơn nữa vào việc tìm kiếm những cơ hội kinh doanh "cấp 7-8", những cơ hội thực sự chất lượng và có khả năng chuyển đổi cao.' />
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* IV. KÊU GỌI HÀNH ĐỘNG TRỌNG TÂM TUẦN TỚI */}
      <Card className="shadow-lg border-bni-gold border-2 bg-gradient-to-r from-bni-gold/10 to-bni-red/10">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Target className="h-6 w-6 text-bni-red" />
            IV. KÊU GỌI HÀNH ĐỘNG TRỌNG TÂM TUẦN TỚI
          </CardTitle>
          <CardDescription className="text-base">
            Để khởi động Nhiệm kỳ XI một cách bùng nổ, tôi kêu gọi mỗi thành viên tập trung vào 2 hành động cụ thể sau
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <div className="bg-white dark:bg-background p-6 rounded-lg border-2 border-bni-red">
            <div className="flex items-start gap-3 mb-3">
              <Badge className="bg-bni-red text-lg px-3 py-1 shrink-0">Hành động 1</Badge>
              <Label className="font-bold text-lg">Mỗi thành viên mời 1 khách mời:</Label>
            </div>
            <Textarea rows={3} placeholder="Nhập chi tiết hành động..." defaultValue="Tuần tới là Lễ Chuyển giao, một sự kiện rất đặc biệt. Hãy mời một khách mời chất lượng, đúng ngành nghề Chapter đang tìm kiếm, để họ cảm nhận được năng lượng và văn hóa của chúng ta. Đây là trách nhiệm của tất cả mọi người, không chỉ riêng Ban Khách mời." />
          </div>

          <div className="bg-white dark:bg-background p-6 rounded-lg border-2 border-bni-gold">
            <div className="flex items-start gap-3 mb-3">
              <Badge className="bg-bni-gold text-bni-black text-lg px-3 py-1 shrink-0">Hành động 2</Badge>
              <Label className="font-bold text-lg">Lên lịch 1-2-1 với Ban Điều hành mới:</Label>
            </div>
            <Textarea rows={3} placeholder="Nhập chi tiết hành động..." defaultValue="Hãy chủ động đặt lịch 1-2-1 với các thành viên trong Ban Điều hành nhiệm kỳ mới. Hãy chia sẻ cho họ biết mục tiêu của bạn, mong muốn của bạn và bạn sẽ đóng góp gì cho Chapter. Sự thấu hiểu này sẽ là chất keo kết dính chúng ta trong 6 tháng tới." />
          </div>

        </CardContent>
      </Card>

      {/* V. TRÌNH CHIẾU SLIDE BUỔI HỌP */}
      <Card className="shadow-lg border-bni-gold border-2">
        <CardHeader className="bg-gradient-to-r from-bni-gold/10 to-bni-red/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Play className="h-6 w-6 text-bni-gold" />
            V. TRÌNH CHIẾU SLIDE BUỔI HỌP
          </CardTitle>
          <CardDescription className="text-base">
            Phần dưới đây là công cụ trình chiếu slide tương tác. Chủ tịch có thể tùy chỉnh nội dung và sử dụng để dẫn dắt buổi họp một cách trực quan.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          
          {/* Control Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button className="bg-bni-gold text-bni-black hover:bg-bni-gold/90">
              <Play className="h-4 w-4 mr-2" />
              Bắt đầu Trình chiếu
            </Button>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh sửa Slide
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Tải về (.pptx)
            </Button>
            <Button variant="outline">
              <Link className="h-4 w-4 mr-2" />
              Tích hợp Báo cáo
            </Button>
          </div>

          <div className="flex justify-end">
            <Button className="bg-bni-gold text-bni-black hover:bg-bni-gold/90">
              Xuất sang Trang tính
            </Button>
          </div>

          {/* Slide Viewer */}
          <div className="border-2 border-border rounded-lg p-6 bg-muted/30">
            
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <Button variant="outline" size="sm" onClick={() => setCurrentSlide(Math.max(1, currentSlide - 1))} disabled={currentSlide === 1}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Slide Trước
              </Button>
              
              <div className="font-semibold text-lg">
                Slide {currentSlide}/{totalSlides}: {currentSlide === 1 ? "CHÀO MỪNG & TUYÊN BỐ SỨ MỆNH" : currentSlide === 2 ? "TẦM NHÌN & MỤC TIÊU NHIỆM KỲ XI" : currentSlide === 3 ? "CÁC THÔNG BÁO QUAN TRỌNG" : currentSlide === 4 ? "TÍCH HỢP BÁO CÁO BAN KHÁCH MỜI" : "KÊU GỌI HÀNH ĐỘNG"}
              </div>
              
              <Button variant="outline" size="sm" onClick={() => setCurrentSlide(Math.min(totalSlides, currentSlide + 1))} disabled={currentSlide === totalSlides}>
                Slide Tiếp
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {/* Slide Content */}
            <div className="min-h-[400px] bg-white dark:bg-background p-8 rounded-lg">
              
              {/* Slide 1: Welcome */}
              {currentSlide === 1 && <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-bni-red">
                      CHÀO MỪNG ĐẾN VỚI BUỔI HỌP BNI FELIX CHAPTER
                    </h2>
                    <p className="text-xl text-bni-gold font-semibold">
                      SỰ KIỆN KẾT NỐI KINH DOANH NGÀY {meetingDate.split('-').reverse().join('/')}
                    </p>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Edit className="h-4 w-4 mr-1" />
                      Chỉnh sửa nội dung
                    </Button>
                  </div>

                  <div className="space-y-4 mt-8">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <Label className="font-bold text-lg block mb-2">Sứ mệnh của chúng ta:</Label>
                      <Textarea rows={3} className="bg-white dark:bg-background" defaultValue="Giúp các thành viên phát triển kinh doanh thông qua một chương trình referral marketing chuyên nghiệp, tích cực và có cấu trúc, tạo điều kiện cho các thành viên phát triển những mối quan hệ ý nghĩa và lâu dài." />
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <Label className="font-bold text-lg block mb-2">Triết lý cốt lõi:</Label>
                      <Textarea rows={2} className="bg-white dark:bg-background" defaultValue="Givers Gain® - Cho là Nhận. Bằng việc cho đi cơ hội kinh doanh, bạn cũng sẽ nhận lại cơ hội kinh doanh cho mình." />
                    </div>
                  </div>
                </div>}

              {/* Slide 2: Vision & Goals */}
              {currentSlide === 2 && <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-bni-red">
                      TẦM NHÌN & MỤC TIÊU NHIỆM KỲ XI
                    </h2>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Edit className="h-4 w-4 mr-1" />
                      Chỉnh sửa nội dung & số liệu
                    </Button>
                  </div>

                  <div className="space-y-4 mt-8">
                    <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                      <Label className="font-bold text-lg block mb-2">Tầm nhìn:</Label>
                      <Textarea rows={2} className="bg-white dark:bg-background" defaultValue="Trở thành Chapter Platinum với 75+ thành viên, dẫn đầu khu vực về giá trị giao dịch và mức độ gắn kết." />
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <Label className="font-bold text-lg block mb-2">Mục tiêu chính:</Label>
                      <div className="space-y-3 mt-3">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold min-w-[100px]">Thành viên:</span>
                          <Input defaultValue="Đạt 75+ thành viên" className="bg-white dark:bg-background" />
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold min-w-[100px]">Doanh thu:</span>
                          <Input defaultValue="Đạt 33 Tỷ VNĐ trong 6 tháng" className="bg-white dark:bg-background" />
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold min-w-[100px]">Gắn kết:</span>
                          <Input defaultValue="Duy trì tỷ lệ hiện diện 98%" className="bg-white dark:bg-background" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}

              {/* Slide 3: Announcements */}
              {currentSlide === 3 && <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-bni-red">
                      THÔNG BÁO & SỰ KIỆN SẮP TỚI
                    </h2>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Edit className="h-4 w-4 mr-1" />
                      Chỉnh sửa nội dung
                    </Button>
                  </div>

                  <div className="space-y-4 mt-8">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <Label className="font-semibold block mb-2">📅 Lễ Chuyển giao BĐH Nhiệm kỳ XI:</Label>
                      <Textarea rows={2} className="bg-white dark:bg-background" defaultValue="Sẽ diễn ra vào tuần tới, ngày 07/10/2025. Đề nghị tất cả thành viên tham dự đầy đủ và đúng giờ." />
                    </div>

                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                      <Label className="font-semibold block mb-2">🎯 Kêu gọi ngành nghề:</Label>
                      <Textarea rows={2} className="bg-white dark:bg-background" defaultValue="Chapter đang tập trung tìm kiếm các ngành nghề trong Power Team Xây dựng như: Thi công ME, Thang máy, Lọc nước, PCCC." />
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <Label className="font-semibold block mb-2">🏆 Vinh danh Thành viên:</Label>
                      <div className="space-y-2">
                        <div className="p-3 bg-white dark:bg-background rounded">
                          <Textarea rows={1} defaultValue="Chúc mừng Mrs. Hà Thị Hạnh, thành viên trao giá trị thương vụ lớn nhất tháng 8 (>312 triệu VNĐ)." />
                        </div>
                        <div className="p-3 bg-white dark:bg-background rounded">
                          <Textarea rows={1} defaultValue="Chúc mừng Mrs. Lưu Thị Châu, thành viên trao nhiều cơ hội kinh doanh nhất tháng 8 (12 cơ hội)." />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}

              {/* Slide 4: Visitor Report */}
              {currentSlide === 4 && <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-bni-red">
                      CHÀO ĐÓN KHÁCH MỜI & BÁO CÁO
                    </h2>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Link className="h-4 w-4 mr-1" />
                      Tích hợp trang Báo cáo Ban Khách mời
                    </Button>
                  </div>

                  <div className="space-y-4 mt-8">
                    <div className="text-center p-4 bg-gradient-to-r from-bni-gold/10 to-bni-red/10 rounded-lg">
                      <p className="text-xl font-semibold">
                        Chào mừng <span className="text-bni-red font-bold">4 vị khách quý</span> đã đến tham dự buổi họp của chúng ta ngày hôm nay!
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <Label className="font-bold text-lg block mb-3">Quy trình chăm sóc khách mời:</Label>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span><strong>Trước buổi họp:</strong> 100% khách mời đã được liên hệ và gửi thông tin.</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span><strong>Trong buổi họp:</strong> Mỗi khách mời đều có thành viên hỗ trợ.</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span><strong>Sau buổi họp:</strong> Đã có 1 khách mời tiềm năng nộp hồ sơ.</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <Label className="font-bold text-lg block mb-2">💬 Phản hồi nổi bật:</Label>
                      <Textarea rows={2} className="bg-white dark:bg-background italic" defaultValue="Khách mời rất ấn tượng với năng lượng và sự chuyên nghiệp của Chapter." />
                    </div>
                  </div>
                </div>}

              {/* Slide 5: Call to Action */}
              {currentSlide === 5 && <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-bni-red">
                      KÊU GỌI HÀNH ĐỘNG TRỌNG TÂM
                    </h2>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Edit className="h-4 w-4 mr-1" />
                      Chỉnh sửa nội dung
                    </Button>
                  </div>

                  <div className="space-y-4 mt-8">
                    <div className="p-6 bg-gradient-to-br from-bni-red/10 to-bni-gold/10 rounded-lg border-2 border-bni-red">
                      <div className="flex items-start gap-3 mb-3">
                        <Badge className="bg-bni-red text-lg px-3 py-1 shrink-0">1</Badge>
                        <Label className="font-bold text-lg">Mỗi thành viên mời 1 khách mời:</Label>
                      </div>
                      <Textarea rows={2} className="bg-white dark:bg-background" defaultValue="Cho buổi Lễ Chuyển giao BĐH tuần tới. Hãy tập trung vào các ngành nghề chúng ta đang tìm kiếm." />
                    </div>

                    <div className="p-6 bg-gradient-to-br from-bni-gold/10 to-bni-red/10 rounded-lg border-2 border-bni-gold">
                      <div className="flex items-start gap-3 mb-3">
                        <Badge className="bg-bni-gold text-bni-black text-lg px-3 py-1 shrink-0">2</Badge>
                        <Label className="font-bold text-lg">Chủ động 1-2-1 với BĐH mới:</Label>
                      </div>
                      <Textarea rows={2} className="bg-white dark:bg-background" defaultValue="Để chia sẻ mục tiêu và mong muốn của bạn, tạo sự kết nối ngay từ đầu nhiệm kỳ." />
                    </div>

                    <div className="mt-8 text-center p-6 bg-gradient-to-r from-bni-red to-bni-gold rounded-lg">
                      <p className="text-2xl font-bold text-white">
                        HÃY CÙNG NHAU HÀNH ĐỘNG VÌ MỘT NHIỆM KỲ XI BÙNG NỔ!
                      </p>
                    </div>
                  </div>
                </div>}

            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <Button variant="outline" size="sm" onClick={() => setCurrentSlide(Math.max(1, currentSlide - 1))} disabled={currentSlide === 1}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Slide Trước
              </Button>
              
              <div className="flex gap-2">
                {Array.from({
                length: totalSlides
              }, (_, i) => i + 1).map(num => <button key={num} onClick={() => setCurrentSlide(num)} className={`w-3 h-3 rounded-full transition-colors ${currentSlide === num ? 'bg-bni-red' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'}`} aria-label={`Go to slide ${num}`} />)}
              </div>
              
              <Button variant="outline" size="sm" onClick={() => setCurrentSlide(Math.min(totalSlides, currentSlide + 1))} disabled={currentSlide === totalSlides}>
                Slide Tiếp
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

          </div>

        </CardContent>
      </Card>

      {/* Lời kết */}
      <Card className="shadow-lg border-bni-red border-2 bg-gradient-to-r from-bni-red/5 to-bni-gold/5">
        <CardContent className="pt-6">
          <Textarea rows={2} className="text-lg font-semibold text-center bg-white dark:bg-background" placeholder="Nhập lời kết từ Chủ tịch..." defaultValue="Chúng ta là BNI Felix Chapter, một Chapter của sự hành động và hiệu quả. Hãy cùng nhau biến những mục tiêu trên thành hiện thực!" />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" size="lg">
          Hủy
        </Button>
        <Button className="bg-bni-gold text-bni-black hover:bg-bni-gold/90" size="lg">
          <Download className="h-5 w-5 mr-2" />
          Xuất sang Trang tính
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="lg" onClick={handleSaveReport}>
          <Save className="h-5 w-5 mr-2" />
          Lưu & Cập nhật Tổng quan
        </Button>
        <Button className="bg-bni-red hover:bg-bni-red/90 text-white" size="lg" onClick={() => {
        handleSaveReport();
        submitReport('president', chapterData.leadership.find(l => l.role === 'Chủ tịch')?.name || 'Chủ tịch');
        toast.success('Báo cáo đã hoàn thành', {
          description: 'Báo cáo Chủ tịch đã được gửi và đồng bộ real-time lên Tổng quan',
          duration: 5000
        });
      }}>
          <Send className="h-5 w-5 mr-2" />
          Báo cáo
        </Button>
      </div>
    </div>;
}