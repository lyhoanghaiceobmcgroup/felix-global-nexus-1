import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, CheckCircle2, Clock, MessageSquare, TrendingUp, AlertCircle, FileCheck, Send, Plus, X } from "lucide-react";
import { useState } from "react";
import { useChapterData } from "@/contexts/ChapterDataContext";
import { toast } from "sonner";

interface VisitorInfo {
  id: string;
  meetingDate: string;
  fullName: string;
  phone: string;
  industry: string;
  email: string;
  guestOf: string;
  // Care process status
  beforeMeeting: {
    calledPhone: boolean;
    sentMessage: boolean;
  };
  duringMeeting: {
    guided: boolean;
  };
  afterMeeting: {
    calledPhone: boolean;
    sentMessage: boolean;
  };
}

export default function VisitorsReport() {
  const { chapterData, submitReport } = useChapterData();
  const [meetingDate, setMeetingDate] = useState(new Date().toISOString().split('T')[0]);
  const [visitors, setVisitors] = useState<VisitorInfo[]>([]);
  const [newVisitor, setNewVisitor] = useState<VisitorInfo>({
    id: '',
    meetingDate: new Date().toISOString().split('T')[0],
    fullName: '',
    phone: '',
    industry: '',
    email: '',
    guestOf: '',
    beforeMeeting: { calledPhone: false, sentMessage: false },
    duringMeeting: { guided: false },
    afterMeeting: { calledPhone: false, sentMessage: false }
  });

  const handleAddVisitor = () => {
    if (!newVisitor.fullName || !newVisitor.phone || !newVisitor.email) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc (Họ tên, SĐT, Email)");
      return;
    }
    
    const visitorToAdd = {
      ...newVisitor,
      id: Date.now().toString()
    };
    
    setVisitors([...visitors, visitorToAdd]);
    setNewVisitor({
      id: '',
      meetingDate: new Date().toISOString().split('T')[0],
      fullName: '',
      phone: '',
      industry: '',
      email: '',
      guestOf: '',
      beforeMeeting: { calledPhone: false, sentMessage: false },
      duringMeeting: { guided: false },
      afterMeeting: { calledPhone: false, sentMessage: false }
    });
    toast.success("Đã thêm thông tin khách mời");
  };

  const handleDeleteVisitor = (id: string) => {
    setVisitors(visitors.filter(v => v.id !== id));
    toast.success("Đã xóa thông tin khách mời");
  };

  const handleToggleStatus = (id: string, phase: 'beforeMeeting' | 'duringMeeting' | 'afterMeeting', field: string) => {
    setVisitors(visitors.map(v => {
      if (v.id === id) {
        return {
          ...v,
          [phase]: {
            ...v[phase],
            [field]: !v[phase][field as keyof typeof v[typeof phase]]
          }
        };
      }
      return v;
    }));
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="border-b pb-4 sm:pb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bni-red mb-2">
          Dashboard Báo Cáo Ban Khách mời
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-4">
          <Label className="font-semibold text-sm sm:text-base">Cập nhật cho Buổi họp ngày:</Label>
          <Input 
            type="date" 
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            className="w-full sm:w-auto"
          />
        </div>
      </div>

      {/* I. TỔNG QUAN HOẠT ĐỘNG KHÁCH MỜI */}
      <Card className="shadow-lg border-bni-gold border-2">
        <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <UserPlus className="h-6 w-6 text-bni-red" />
            I. TỔNG QUAN HOẠT ĐỘNG KHÁCH MỜI
          </CardTitle>
          <CardDescription className="text-base">Thống kê và so sánh theo tuần</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <div className="min-w-[600px] px-6 sm:px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-base">Chỉ số</TableHead>
                <TableHead className="font-bold text-base text-center">Tuần này (30/09)</TableHead>
                <TableHead className="font-bold text-base text-center">Tuần trước</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Số lượng Khách mời tham dự</TableCell>
                <TableCell className="text-center">
                  <Input type="number" placeholder="0" className="w-24 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <Input type="number" placeholder="4" className="w-24 mx-auto" defaultValue="4" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Số lượng Khách mời tiềm năng nộp hồ sơ</TableCell>
                <TableCell className="text-center">
                  <Input type="number" placeholder="0" className="w-24 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <Input type="number" placeholder="1" className="w-24 mx-auto" defaultValue="1" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t-2 border-bni-gold/30">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-bni-red" />
              Thông tin Khách mời
            </h3>
            
            {/* Add Visitor Form */}
            <div className="bg-gradient-to-br from-bni-red/5 to-bni-gold/5 p-6 rounded-lg border-2 border-bni-gold/30 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="font-semibold mb-2 block">Ngày họp *</Label>
                  <Input 
                    type="date"
                    value={newVisitor.meetingDate}
                    onChange={(e) => setNewVisitor({...newVisitor, meetingDate: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label className="font-semibold mb-2 block">Họ tên *</Label>
                  <Input 
                    placeholder="Nhập họ tên"
                    value={newVisitor.fullName}
                    onChange={(e) => setNewVisitor({...newVisitor, fullName: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label className="font-semibold mb-2 block">SĐT *</Label>
                  <Input 
                    placeholder="Nhập số điện thoại"
                    value={newVisitor.phone}
                    onChange={(e) => setNewVisitor({...newVisitor, phone: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label className="font-semibold mb-2 block">Ngành nghề</Label>
                  <Input 
                    placeholder="Nhập ngành nghề"
                    value={newVisitor.industry}
                    onChange={(e) => setNewVisitor({...newVisitor, industry: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label className="font-semibold mb-2 block">Email *</Label>
                  <Input 
                    type="email"
                    placeholder="Nhập email"
                    value={newVisitor.email}
                    onChange={(e) => setNewVisitor({...newVisitor, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label className="font-semibold mb-2 block">Khách của ai</Label>
                  <Input 
                    placeholder="Nhập tên thành viên"
                    value={newVisitor.guestOf}
                    onChange={(e) => setNewVisitor({...newVisitor, guestOf: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleAddVisitor}
                  className="bg-bni-red text-white hover:bg-bni-red/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Bổ sung khách mời
                </Button>
              </div>
            </div>

            {/* Visitors List */}
            {visitors.length > 0 && (
              <div className="overflow-x-auto -mx-6 sm:mx-0">
                <div className="min-w-[800px] px-6 sm:px-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Ngày họp</TableHead>
                        <TableHead className="font-bold">Họ tên</TableHead>
                        <TableHead className="font-bold">SĐT</TableHead>
                        <TableHead className="font-bold">Ngành nghề</TableHead>
                        <TableHead className="font-bold">Email</TableHead>
                        <TableHead className="font-bold">Khách của</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {visitors.map((visitor) => (
                        <TableRow key={visitor.id}>
                          <TableCell>{new Date(visitor.meetingDate).toLocaleDateString('vi-VN')}</TableCell>
                          <TableCell className="font-semibold">{visitor.fullName}</TableCell>
                          <TableCell>{visitor.phone}</TableCell>
                          <TableCell>{visitor.industry || '-'}</TableCell>
                          <TableCell>{visitor.email}</TableCell>
                          <TableCell>{visitor.guestOf || '-'}</TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteVisitor(visitor.id)}
                              className="h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <Button className="bg-bni-gold text-bni-black hover:bg-bni-gold/90">
              Xuất sang Trang tính
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* II. CHI TIẾT QUY TRÌNH CHĂM SÓC KHÁCH MỜI */}
      <Card className="shadow-lg border-bni-red border-2">
        <CardHeader className="bg-gradient-to-r from-bni-gold/10 to-bni-red/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-bni-red" />
            II. CHI TIẾT QUY TRÌNH CHĂM SÓC KHÁCH MỜI
          </CardTitle>
          <CardDescription className="text-base">Báo cáo tuần trước - Quy trình 3 giai đoạn</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          
          {/* Danh sách Khách mời và Trạng thái Chăm sóc */}
          {visitors.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2 pb-2 border-b-2 border-bni-gold">
                <UserPlus className="h-5 w-5 text-bni-red" />
                Danh sách Khách mời và Quy trình Chăm sóc
              </h3>
              
              <div className="overflow-x-auto -mx-6 sm:mx-0">
                <div className="min-w-[1000px] px-6 sm:px-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold w-[150px]">Họ tên</TableHead>
                        <TableHead className="font-bold w-[120px]">Ngành nghề</TableHead>
                        <TableHead className="font-bold w-[110px]">SĐT</TableHead>
                        <TableHead className="font-bold w-[150px]">Email</TableHead>
                        <TableHead className="font-bold text-center" colSpan={2}>Trước họp</TableHead>
                        <TableHead className="font-bold text-center" colSpan={2}>Sau họp</TableHead>
                      </TableRow>
                      <TableRow className="bg-muted/50">
                        <TableHead colSpan={4}></TableHead>
                        <TableHead className="text-center text-xs">Gọi điện</TableHead>
                        <TableHead className="text-center text-xs">Nhắn tin</TableHead>
                        <TableHead className="text-center text-xs">Gọi điện</TableHead>
                        <TableHead className="text-center text-xs">Nhắn tin</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {visitors.map((visitor) => (
                        <TableRow key={visitor.id}>
                          <TableCell className="font-semibold">{visitor.fullName}</TableCell>
                          <TableCell>{visitor.industry || '-'}</TableCell>
                          <TableCell>{visitor.phone}</TableCell>
                          <TableCell className="text-sm">{visitor.email}</TableCell>
                          
                          {/* Trước họp - Gọi điện */}
                          <TableCell className="text-center">
                            <Button
                              variant={visitor.beforeMeeting.calledPhone ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleToggleStatus(visitor.id, 'beforeMeeting', 'calledPhone')}
                              className={visitor.beforeMeeting.calledPhone ? "bg-green-600 hover:bg-green-700" : ""}
                            >
                              {visitor.beforeMeeting.calledPhone ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                            </Button>
                          </TableCell>
                          
                          {/* Trước họp - Nhắn tin */}
                          <TableCell className="text-center">
                            <Button
                              variant={visitor.beforeMeeting.sentMessage ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleToggleStatus(visitor.id, 'beforeMeeting', 'sentMessage')}
                              className={visitor.beforeMeeting.sentMessage ? "bg-green-600 hover:bg-green-700" : ""}
                            >
                              {visitor.beforeMeeting.sentMessage ? <CheckCircle2 className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                            </Button>
                          </TableCell>
                          
                          {/* Sau họp - Gọi điện */}
                          <TableCell className="text-center">
                            <Button
                              variant={visitor.afterMeeting.calledPhone ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleToggleStatus(visitor.id, 'afterMeeting', 'calledPhone')}
                              className={visitor.afterMeeting.calledPhone ? "bg-green-600 hover:bg-green-700" : ""}
                            >
                              {visitor.afterMeeting.calledPhone ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                            </Button>
                          </TableCell>
                          
                          {/* Sau họp - Nhắn tin */}
                          <TableCell className="text-center">
                            <Button
                              variant={visitor.afterMeeting.sentMessage ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleToggleStatus(visitor.id, 'afterMeeting', 'sentMessage')}
                              className={visitor.afterMeeting.sentMessage ? "bg-green-600 hover:bg-green-700" : ""}
                            >
                              {visitor.afterMeeting.sentMessage ? <CheckCircle2 className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-bni-gold/20 to-bni-red/20 p-4 rounded-lg border border-bni-gold/30">
                <p className="text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-bni-red" />
                  <span className="font-semibold">Hướng dẫn:</span> 
                  Click vào các nút để đánh dấu hoàn thành các hoạt động chăm sóc khách mời.
                </p>
              </div>
            </div>
          )}

          {/* 1. Hoạt động TRƯỚC buổi họp */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 pb-2 border-b-2 border-bni-gold">
              <Clock className="h-5 w-5 text-bni-red" />
              1. Hoạt động TRƯỚC buổi họp
            </h3>
            
            <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg space-y-4">
              <div>
                <Label className="font-bold text-lg mb-3 block">Mời và xác nhận:</Label>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-background p-4 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-green-500 shrink-0 mt-1">HOÀN THÀNH</Badge>
                      <Textarea 
                        rows={2}
                        className="flex-1"
                        placeholder="Nhập hoạt động..."
                        defaultValue="100% khách mời đã được liên hệ xác nhận tham dự 24h trước buổi họp."
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-background p-4 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-green-500 shrink-0 mt-1">HOÀN THÀNH</Badge>
                      <Textarea 
                        rows={2}
                        className="flex-1"
                        placeholder="Nhập hoạt động..."
                        defaultValue="Thông tin chi tiết về buổi họp đã được gửi qua email/Zalo."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="font-bold text-lg mb-3 block">Chuẩn bị:</Label>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-background p-4 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-green-500 shrink-0 mt-1">HOÀN THÀNH</Badge>
                      <Textarea 
                        rows={2}
                        className="flex-1"
                        placeholder="Nhập hoạt động..."
                        defaultValue="Bảng tên, tài liệu giới thiệu về BNI Felix Chapter đã được chuẩn bị sẵn sàng."
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-background p-4 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-green-500 shrink-0 mt-1">HOÀN THÀNH</Badge>
                      <Textarea 
                        rows={2}
                        className="flex-1"
                        placeholder="Nhập hoạt động..."
                        defaultValue="Ban Khách mời đã họp nhanh 15 phút trước giờ G để phân công nhiệm vụ."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Hoạt động TRONG buổi họp */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 pb-2 border-b-2 border-bni-gold">
              <UserPlus className="h-5 w-5 text-bni-red" />
              2. Hoạt động TRONG buổi họp
            </h3>
            
            <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg space-y-4">
              <div>
                <Label className="font-bold text-lg mb-3 block">Đón tiếp:</Label>
                <div className="bg-white dark:bg-background p-4 rounded-lg">
                  <Textarea 
                    rows={3}
                    placeholder="Nhập hoạt động đón tiếp..."
                    defaultValue="4/4 khách mời được chào đón ngay tại cửa và được giới thiệu với ít nhất 3 thành viên trong Ban Điều hành và Power Team liên quan."
                  />
                </div>
              </div>

              <div>
                <Label className="font-bold text-lg mb-3 block">Định hướng & Hỗ trợ:</Label>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-background p-4 rounded-lg">
                    <Textarea 
                      rows={2}
                      placeholder="Nhập hoạt động..."
                      defaultValue="Mỗi khách mời đều có một thành viên trong Ban Khách mời ngồi cạnh để giải thích về các phần của buổi họp."
                    />
                  </div>
                  <div className="bg-white dark:bg-background p-4 rounded-lg">
                    <Textarea 
                      rows={2}
                      placeholder="Nhập hoạt động..."
                      defaultValue="Tất cả các câu hỏi của khách mời đều được giải đáp kịp thời."
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="font-bold text-lg mb-3 block">Thu thập Phản hồi:</Label>
                <div className="bg-white dark:bg-background p-4 rounded-lg mb-3">
                  <Textarea 
                    rows={2}
                    placeholder="Nhập thông tin thu thập phản hồi..."
                    defaultValue="100% khách mời đã chia sẻ cảm nhận cuối buổi họp."
                  />
                </div>

                <div className="bg-gradient-to-r from-bni-gold/20 to-bni-red/20 p-4 rounded-lg border-2 border-bni-gold">
                  <Label className="font-bold text-base mb-3 block flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-bni-gold" />
                    Phản hồi nổi bật:
                  </Label>
                  <Textarea 
                    rows={5}
                    className="bg-white dark:bg-background"
                    placeholder="Nhập phản hồi nổi bật từ khách mời..."
                    defaultValue='"Tôi rất ấn tượng với phần các thành viên trao cơ hội kinh doanh cho nhau, rất thực tế và hiệu quả."&#10;&#10;"Không khí buổi họp rất năng lượng và chuyên nghiệp."&#10;&#10;"Phần trình bày 30 giây của các thành viên giúp tôi nhanh chóng nắm bắt được rất nhiều ngành nghề."'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Hoạt động SAU buổi họp */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 pb-2 border-b-2 border-bni-gold">
              <TrendingUp className="h-5 w-5 text-bni-red" />
              3. Hoạt động SAU buổi họp
            </h3>
            
            <div className="bg-purple-50 dark:bg-purple-950/20 p-6 rounded-lg space-y-4">
              <div>
                <Label className="font-bold text-lg mb-3 block">Theo dõi (Follow-up):</Label>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-background p-4 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-green-500 shrink-0 mt-1">HOÀN THÀNH</Badge>
                      <Textarea 
                        rows={2}
                        className="flex-1"
                        placeholder="Nhập hoạt động..."
                        defaultValue="Email/tin nhắn cảm ơn đã được gửi đến tất cả khách mời trong vòng 24h."
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-background p-4 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-green-500 shrink-0 mt-1">HOÀN THÀNH</Badge>
                      <Textarea 
                        rows={2}
                        className="flex-1"
                        placeholder="Nhập hoạt động..."
                        defaultValue="Các thành viên mời khách đã được nhắc nhở để tiếp tục chăm sóc mối quan hệ."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="font-bold text-lg mb-3 block">Tình hình Chuyển đổi:</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-background p-4 rounded-lg border">
                    <Label className="font-semibold block mb-2">Số khách mời bày tỏ quan tâm gia nhập:</Label>
                    <Input type="number" placeholder="2" className="text-2xl font-bold" defaultValue="2" />
                  </div>

                  <div className="bg-white dark:bg-background p-4 rounded-lg border">
                    <Label className="font-semibold block mb-2">Số khách mời đã nhận hồ sơ đăng ký:</Label>
                    <Input type="number" placeholder="2" className="text-2xl font-bold" defaultValue="2" />
                  </div>

                  <div className="bg-white dark:bg-background p-4 rounded-lg border-2 border-green-500">
                    <Label className="font-semibold block mb-2">Số hồ sơ đã nộp về Ban Thành viên:</Label>
                    <Input type="number" placeholder="1" className="text-2xl font-bold" defaultValue="1" />
                  </div>

                  <div className="bg-white dark:bg-background p-4 rounded-lg border-2 border-yellow-500">
                    <Label className="font-semibold block mb-2">Số hồ sơ đang chờ hoàn thiện:</Label>
                    <Input type="number" placeholder="1" className="text-2xl font-bold" defaultValue="1" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* III. PHÂN TÍCH & HÀNH ĐỘNG ĐỀ XUẤT */}
      <Card className="shadow-lg border-bni-gold border-2">
        <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-bni-red" />
            III. PHÂN TÍCH & HÀNH ĐỘNG ĐỀ XUẤT
          </CardTitle>
          <CardDescription className="text-base">Đánh giá và kế hoạch cải thiện</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          
          <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border-l-4 border-green-500">
            <Label className="font-bold text-lg mb-3 block text-green-700 dark:text-green-400">
              ✅ Điểm mạnh:
            </Label>
            <Textarea 
              rows={2}
              className="bg-white dark:bg-background"
              placeholder="Nhập điểm mạnh..."
              defaultValue="Quy trình đón tiếp và chăm sóc trong buổi họp đang được thực hiện rất tốt, tạo thiện cảm cao."
            />
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-lg border-l-4 border-orange-500">
            <Label className="font-bold text-lg mb-3 block text-orange-700 dark:text-orange-400">
              ⚠️ Điểm cần cải thiện:
            </Label>
            <Textarea 
              rows={3}
              className="bg-white dark:bg-background"
              placeholder="Nhập điểm cần cải thiện..."
              defaultValue='Cần tạo một bộ tài liệu "Cẩm nang dành cho Khách mời" ngắn gọn, gửi trước cho khách để họ không bị bỡ ngỡ với các thuật ngữ như "Referral", "1-2-1", "Thank You Note".'
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border-l-4 border-blue-500">
            <Label className="font-bold text-lg mb-3 block text-blue-700 dark:text-blue-400">
              🎯 Hành động tuần tới:
            </Label>
            <Textarea 
              rows={4}
              className="bg-white dark:bg-background"
              placeholder="Nhập kế hoạch hành động..."
              defaultValue='- Ban Khách mời sẽ soạn thảo "Cẩm nang Khách mời" và trình duyệt.&#10;&#10;- Phối hợp với Ban Truyền thông để làm một video ngắn 1 phút giới thiệu về một buổi họp của Chapter để gửi cho khách mời tiềm năng.'
            />
          </div>

        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
        <Button variant="outline" size="lg" className="w-full sm:w-auto order-4 sm:order-1">
          Hủy
        </Button>
        <Button className="bg-bni-gold text-bni-black hover:bg-bni-gold/90 w-full sm:w-auto order-3 sm:order-2" size="lg">
          <span className="hidden sm:inline">Xuất sang Trang tính</span>
          <span className="sm:hidden">Xuất Excel</span>
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto order-2 sm:order-3" size="lg">
          <CheckCircle2 className="h-5 w-5 mr-2" />
          Lưu Báo cáo
        </Button>
        <Button 
          className="bg-bni-red hover:bg-bni-red/90 text-white w-full sm:w-auto order-1 sm:order-4" 
          size="lg"
          onClick={() => {
            submitReport('visitors', chapterData.leadership.find(l => l.role === 'Ban Khách mời')?.name || 'Ban Khách mời');
            toast.success('Báo cáo đã hoàn thành', {
              description: 'Báo cáo Khách mời đã được gửi và đồng bộ real-time lên Tổng quan',
              duration: 5000,
            });
          }}
        >
          <Send className="h-5 w-5 mr-2" />
          Báo cáo
        </Button>
      </div>
    </div>
  );
}
