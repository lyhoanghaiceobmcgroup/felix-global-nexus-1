import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, DollarSign, Calendar, GraduationCap, CheckCircle2, AlertCircle, Award, Send, PiggyBank, TrendingUp, Heart, Plus, Edit, Trash2, MinusCircle, History, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useState } from "react";
import { useChapterData } from "@/contexts/ChapterDataContext";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface FundContribution {
  memberId: string;
  memberName: string;
  amount: number;
  date: string;
  quarter?: string;
  status: 'paid' | 'pending' | 'overdue';
  note?: string;
}

interface FundExpenditure {
  id: string;
  amount: number;
  date: string;
  purpose: string;
  approvedBy: string;
  note?: string;
}

interface FundTransaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  date: string;
  description: string;
  relatedTo?: string;
}

interface TrainingSchedule {
  id: string;
  memberName: string;
  topic: string;
  date: string;
  time: string;
  type: '5min' | '8min';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

interface MemberRenewal {
  id: string;
  name: string;
  joinDate: string;
  renewalDate: string;
  monthsActive: number;
}

export default function SecretaryTrainingReport() {
  const { chapterData, submitReport } = useChapterData();
  const [weekDate, setWeekDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Fund Management States
  const [meetingFundContributions, setMeetingFundContributions] = useState<FundContribution[]>([
    { memberId: '1', memberName: 'Nguyễn Văn A', amount: 500000, date: '2025-01-15', quarter: 'Q1/2025', status: 'paid' },
    { memberId: '2', memberName: 'Trần Thị B', amount: 500000, date: '2025-01-20', quarter: 'Q1/2025', status: 'paid' },
    { memberId: '3', memberName: 'Lê Văn C', amount: 0, date: '', quarter: 'Q1/2025', status: 'pending' },
  ]);

  const [developmentFundContributions, setDevelopmentFundContributions] = useState<FundContribution[]>([
    { memberId: '1', memberName: 'Nguyễn Văn A', amount: 1000000, date: '2025-01-10', status: 'paid', note: 'Nhận cơ hội kinh doanh' },
    { memberId: '4', memberName: 'Phạm Văn D', amount: 2000000, date: '2025-01-25', status: 'paid', note: 'Tài trợ Gala' },
  ]);

  const [unionFundContributions, setUnionFundContributions] = useState<FundContribution[]>([
    { memberId: '5', memberName: 'Hoàng Thị E', amount: 50000, date: '2025-01-12', status: 'paid', note: 'Vi phạm quy định' },
    { memberId: '6', memberName: 'Vũ Văn F', amount: 100000, date: '2025-01-18', status: 'paid', note: 'Đến muộn' },
  ]);

  // Expenditure states
  const [meetingFundExpenditures, setMeetingFundExpenditures] = useState<FundExpenditure[]>([
    { id: '1', amount: 2000000, date: '2025-01-20', purpose: 'Thuê phòng họp tháng 1', approvedBy: 'Chủ tịch', note: 'Khách sạn ABC' },
  ]);
  
  const [developmentFundExpenditures, setDevelopmentFundExpenditures] = useState<FundExpenditure[]>([
    { id: '1', amount: 5000000, date: '2025-01-15', purpose: 'Chi phí tổ chức BOD', approvedBy: 'Ban Lãnh đạo', note: 'Gồm địa điểm và ăn uống' },
  ]);
  
  const [unionFundExpenditures, setUnionFundExpenditures] = useState<FundExpenditure[]>([
    { id: '1', amount: 500000, date: '2025-01-22', purpose: 'Thăm hỏi TV Nguyễn Văn A ốm', approvedBy: 'Thư ký', note: 'Quà và hoa' },
  ]);

  const [isAddingContribution, setIsAddingContribution] = useState(false);
  const [isAddingExpenditure, setIsAddingExpenditure] = useState(false);
  const [isViewingHistory, setIsViewingHistory] = useState(false);
  const [selectedFundType, setSelectedFundType] = useState<'meeting' | 'development' | 'union'>('meeting');
  const [newContribution, setNewContribution] = useState<Partial<FundContribution>>({
    memberName: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    status: 'paid',
    note: '',
  });
  
  const [newExpenditure, setNewExpenditure] = useState<Partial<FundExpenditure>>({
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    purpose: '',
    approvedBy: '',
    note: '',
  });

  // Training Schedule States
  const [fiveMinTraining, setFiveMinTraining] = useState<TrainingSchedule[]>([
    { id: '1', memberName: 'Nguyễn Văn A', topic: 'Kỹ năng Networking hiệu quả', date: '2025-02-10', time: '07:30', type: '5min', status: 'scheduled' },
    { id: '2', memberName: 'Trần Thị B', topic: 'Xây dựng lòng tin trong kinh doanh', date: '2025-02-17', time: '07:30', type: '5min', status: 'scheduled' },
  ]);

  const [eightMinSpeaker, setEightMinSpeaker] = useState<TrainingSchedule[]>([
    { id: '1', memberName: 'Phạm Văn C', topic: 'Hành trình phát triển doanh nghiệp', date: '2025-02-10', time: '08:00', type: '8min', status: 'scheduled' },
    { id: '2', memberName: 'Lê Thị D', topic: 'Chiến lược Marketing số', date: '2025-02-24', time: '08:00', type: '8min', status: 'scheduled' },
  ]);

  const [isManagingTraining, setIsManagingTraining] = useState(false);
  const [selectedTrainingType, setSelectedTrainingType] = useState<'5min' | '8min'>('5min');
  const [editingTraining, setEditingTraining] = useState<TrainingSchedule | null>(null);
  const [newTraining, setNewTraining] = useState<Partial<TrainingSchedule>>({
    memberName: '',
    topic: '',
    date: new Date().toISOString().split('T')[0],
    time: '07:30',
    type: '5min',
    status: 'scheduled',
    notes: '',
  });

  // Member Renewal States
  const [membersRenewal, setMembersRenewal] = useState<MemberRenewal[]>([
    { id: '1', name: 'Nguyễn Văn A', joinDate: '2024-03-15', renewalDate: '2025-10-15', monthsActive: 7 },
    { id: '2', name: 'Trần Thị B', joinDate: '2024-02-20', renewalDate: '2025-10-20', monthsActive: 8 },
    { id: '3', name: 'Lê Văn C', joinDate: '2024-04-10', renewalDate: '2025-11-10', monthsActive: 6 },
    { id: '4', name: 'Phạm Thị D', joinDate: '2024-03-25', renewalDate: '2025-11-25', monthsActive: 7 },
    { id: '5', name: 'Hoàng Văn E', joinDate: '2024-02-28', renewalDate: '2025-11-28', monthsActive: 8 },
    { id: '6', name: 'Vũ Thị F', joinDate: '2024-05-05', renewalDate: '2025-12-05', monthsActive: 5 },
    { id: '7', name: 'Đặng Văn G', joinDate: '2024-04-18', renewalDate: '2025-12-18', monthsActive: 6 },
  ]);

  // Calculate members needing care in 7th month
  const getSeventhMonthMembers = () => {
    return membersRenewal.filter(member => member.monthsActive === 7);
  };

  // Calculate members needing renewal by month
  const getMembersNeedingRenewal = (targetMonth: string) => {
    return membersRenewal.filter(member => {
      const renewalMonth = member.renewalDate.substring(0, 7); // YYYY-MM format
      return renewalMonth === targetMonth;
    });
  };

  const calculateIncome = (contributions: FundContribution[]) => {
    return contributions.reduce((sum, c) => sum + (c.status === 'paid' ? c.amount : 0), 0);
  };

  const calculateExpense = (expenditures: FundExpenditure[]) => {
    return expenditures.reduce((sum, e) => sum + e.amount, 0);
  };

  const calculateBalance = (contributions: FundContribution[], expenditures: FundExpenditure[]) => {
    return calculateIncome(contributions) - calculateExpense(expenditures);
  };

  const getTransactionHistory = (fundType: 'meeting' | 'development' | 'union'): FundTransaction[] => {
    let contributions: FundContribution[] = [];
    let expenditures: FundExpenditure[] = [];

    if (fundType === 'meeting') {
      contributions = meetingFundContributions;
      expenditures = meetingFundExpenditures;
    } else if (fundType === 'development') {
      contributions = developmentFundContributions;
      expenditures = developmentFundExpenditures;
    } else {
      contributions = unionFundContributions;
      expenditures = unionFundExpenditures;
    }

    const transactions: FundTransaction[] = [
      ...contributions
        .filter(c => c.status === 'paid')
        .map(c => ({
          id: c.memberId,
          type: 'income' as const,
          amount: c.amount,
          date: c.date,
          description: `Thu từ ${c.memberName}${c.note ? ` - ${c.note}` : ''}`,
          relatedTo: c.memberName,
        })),
      ...expenditures.map(e => ({
        id: e.id,
        type: 'expense' as const,
        amount: e.amount,
        date: e.date,
        description: `${e.purpose}${e.note ? ` - ${e.note}` : ''}`,
        relatedTo: e.approvedBy,
      })),
    ];

    return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const handleAddContribution = () => {
    if (!newContribution.memberName || !newContribution.amount) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const contribution: FundContribution = {
      memberId: Date.now().toString(),
      memberName: newContribution.memberName || '',
      amount: newContribution.amount || 0,
      date: newContribution.date || new Date().toISOString().split('T')[0],
      status: newContribution.status as 'paid' | 'pending' | 'overdue' || 'paid',
      note: newContribution.note,
      ...(selectedFundType === 'meeting' && { quarter: newContribution.quarter }),
    };

    if (selectedFundType === 'meeting') {
      setMeetingFundContributions([...meetingFundContributions, contribution]);
    } else if (selectedFundType === 'development') {
      setDevelopmentFundContributions([...developmentFundContributions, contribution]);
    } else {
      setUnionFundContributions([...unionFundContributions, contribution]);
    }

    setNewContribution({ memberName: '', amount: 0, date: new Date().toISOString().split('T')[0], status: 'paid', note: '' });
    setIsAddingContribution(false);
    toast.success('Đã thêm đóng góp thành công');
  };

  const handleDeleteContribution = (fundType: 'meeting' | 'development' | 'union', memberId: string) => {
    if (fundType === 'meeting') {
      setMeetingFundContributions(meetingFundContributions.filter(c => c.memberId !== memberId));
    } else if (fundType === 'development') {
      setDevelopmentFundContributions(developmentFundContributions.filter(c => c.memberId !== memberId));
    } else {
      setUnionFundContributions(unionFundContributions.filter(c => c.memberId !== memberId));
    }
    toast.success('Đã xóa đóng góp');
  };

  const handleUpdateStatus = (fundType: 'meeting' | 'development' | 'union', memberId: string, newStatus: 'paid' | 'pending' | 'overdue') => {
    if (fundType === 'meeting') {
      setMeetingFundContributions(meetingFundContributions.map(c => 
        c.memberId === memberId ? { ...c, status: newStatus, date: newStatus === 'paid' ? new Date().toISOString().split('T')[0] : c.date } : c
      ));
    } else if (fundType === 'development') {
      setDevelopmentFundContributions(developmentFundContributions.map(c => 
        c.memberId === memberId ? { ...c, status: newStatus, date: newStatus === 'paid' ? new Date().toISOString().split('T')[0] : c.date } : c
      ));
    } else {
      setUnionFundContributions(unionFundContributions.map(c => 
        c.memberId === memberId ? { ...c, status: newStatus, date: newStatus === 'paid' ? new Date().toISOString().split('T')[0] : c.date } : c
      ));
    }
    toast.success('Đã cập nhật trạng thái');
  };

  const handleAddExpenditure = () => {
    if (!newExpenditure.purpose || !newExpenditure.amount || !newExpenditure.approvedBy) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const expenditure: FundExpenditure = {
      id: Date.now().toString(),
      amount: newExpenditure.amount || 0,
      date: newExpenditure.date || new Date().toISOString().split('T')[0],
      purpose: newExpenditure.purpose || '',
      approvedBy: newExpenditure.approvedBy || '',
      note: newExpenditure.note,
    };

    if (selectedFundType === 'meeting') {
      setMeetingFundExpenditures([...meetingFundExpenditures, expenditure]);
    } else if (selectedFundType === 'development') {
      setDevelopmentFundExpenditures([...developmentFundExpenditures, expenditure]);
    } else {
      setUnionFundExpenditures([...unionFundExpenditures, expenditure]);
    }

    setNewExpenditure({ amount: 0, date: new Date().toISOString().split('T')[0], purpose: '', approvedBy: '', note: '' });
    setIsAddingExpenditure(false);
    toast.success('Đã thêm chi tiêu thành công');
  };

  // Training Schedule Handlers
  const handleAddOrUpdateTraining = () => {
    if (!newTraining.memberName || !newTraining.topic || !newTraining.date) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (editingTraining) {
      // Update existing training
      const updated: TrainingSchedule = {
        ...editingTraining,
        memberName: newTraining.memberName || '',
        topic: newTraining.topic || '',
        date: newTraining.date || '',
        time: newTraining.time || '07:30',
        notes: newTraining.notes,
      };

      if (selectedTrainingType === '5min') {
        setFiveMinTraining(fiveMinTraining.map(t => t.id === updated.id ? updated : t));
      } else {
        setEightMinSpeaker(eightMinSpeaker.map(t => t.id === updated.id ? updated : t));
      }
      toast.success('Đã cập nhật lịch đào tạo');
    } else {
      // Add new training
      const training: TrainingSchedule = {
        id: Date.now().toString(),
        memberName: newTraining.memberName || '',
        topic: newTraining.topic || '',
        date: newTraining.date || '',
        time: newTraining.time || '07:30',
        type: selectedTrainingType,
        status: 'scheduled',
        notes: newTraining.notes,
      };

      if (selectedTrainingType === '5min') {
        setFiveMinTraining([...fiveMinTraining, training]);
      } else {
        setEightMinSpeaker([...eightMinSpeaker, training]);
      }
      toast.success('Đã thêm lịch đào tạo');
    }

    setNewTraining({ memberName: '', topic: '', date: new Date().toISOString().split('T')[0], time: '07:30', type: selectedTrainingType, status: 'scheduled', notes: '' });
    setEditingTraining(null);
    setIsManagingTraining(false);
  };

  const handleEditTraining = (training: TrainingSchedule) => {
    setEditingTraining(training);
    setNewTraining({
      memberName: training.memberName,
      topic: training.topic,
      date: training.date,
      time: training.time,
      type: training.type,
      status: training.status,
      notes: training.notes,
    });
    setSelectedTrainingType(training.type);
    setIsManagingTraining(true);
  };

  const handleDeleteTraining = (id: string, type: '5min' | '8min') => {
    if (type === '5min') {
      setFiveMinTraining(fiveMinTraining.filter(t => t.id !== id));
    } else {
      setEightMinSpeaker(eightMinSpeaker.filter(t => t.id !== id));
    }
    toast.success('Đã xóa lịch đào tạo');
  };

  const handleUpdateTrainingStatus = (id: string, type: '5min' | '8min', newStatus: 'scheduled' | 'completed' | 'cancelled') => {
    if (type === '5min') {
      setFiveMinTraining(fiveMinTraining.map(t => t.id === id ? { ...t, status: newStatus } : t));
    } else {
      setEightMinSpeaker(eightMinSpeaker.map(t => t.id === id ? { ...t, status: newStatus } : t));
    }
    toast.success('Đã cập nhật trạng thái');
  };

  const renderFundCard = (
    fundType: 'meeting' | 'development' | 'union',
    title: string,
    icon: React.ReactNode,
    colorClass: string,
    bgColorClass: string,
    contributions: FundContribution[],
    expenditures: FundExpenditure[],
    showQuarter: boolean = false
  ) => {
    return (
      <Card className={`border-2 ${colorClass}`}>
        <CardHeader className={bgColorClass}>
          <CardTitle className="text-lg flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          <CardDescription>
            {fundType === 'meeting' && 'Quỹ đóng theo quý cho chi phí hoạt động phòng họp BNI'}
            {fundType === 'development' && 'Quỹ tự nguyện từ cơ hội kinh doanh và tài trợ, dùng cho BOD, Gala'}
            {fundType === 'union' && 'Quỹ từ phí xử phạt vi phạm, dùng cho chăm sóc thành viên và gia đình'}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-4 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-muted-foreground">Thu nhập</div>
                <div className={`text-xl font-bold ${colorClass.replace('border-', 'text-')}`}>
                  {calculateIncome(contributions).toLocaleString('vi-VN')} VNĐ
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Chi tiêu</div>
                <div className="text-xl font-bold text-red-600">
                  {calculateExpense(expenditures).toLocaleString('vi-VN')} VNĐ
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Số dư</div>
                <div className={`text-2xl font-bold ${colorClass.replace('border-', 'text-')}`}>
                  {calculateBalance(contributions, expenditures).toLocaleString('vi-VN')} VNĐ
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              {/* Lịch sử Button */}
              <Dialog open={isViewingHistory && selectedFundType === fundType} onOpenChange={(open) => {
                setIsViewingHistory(open);
                if (open) setSelectedFundType(fundType);
              }}>
                <DialogTrigger asChild>
                  <Button variant="outline" className={`${colorClass} ${colorClass.replace('border-', 'text-')} hover:bg-${fundType === 'meeting' ? 'green' : fundType === 'development' ? 'blue' : 'red'}-50`}>
                    <History className="h-4 w-4 mr-2" />
                    Lịch sử
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Lịch sử Giao dịch - {title}</DialogTitle>
                    <DialogDescription>Theo dõi chi tiết tiền vào/ra theo thời gian</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Tổng thu</div>
                        <div className={`text-lg font-bold ${colorClass.replace('border-', 'text-')}`}>
                          {calculateIncome(contributions).toLocaleString('vi-VN')} VNĐ
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Tổng chi</div>
                        <div className="text-lg font-bold text-red-600">
                          {calculateExpense(expenditures).toLocaleString('vi-VN')} VNĐ
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Số dư hiện tại</div>
                        <div className={`text-lg font-bold ${colorClass.replace('border-', 'text-')}`}>
                          {calculateBalance(contributions, expenditures).toLocaleString('vi-VN')} VNĐ
                        </div>
                      </div>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ngày</TableHead>
                          <TableHead>Loại</TableHead>
                          <TableHead>Mô tả</TableHead>
                          <TableHead>Liên quan</TableHead>
                          <TableHead className="text-right">Số tiền</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getTransactionHistory(fundType).map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>
                              {transaction.type === 'income' ? (
                                <Badge className="bg-green-500">
                                  <ArrowUpCircle className="h-3 w-3 mr-1" />
                                  Thu
                                </Badge>
                              ) : (
                                <Badge className="bg-red-500">
                                  <ArrowDownCircle className="h-3 w-3 mr-1" />
                                  Chi
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>{transaction.relatedTo}</TableCell>
                            <TableCell className={`text-right font-semibold ${transaction.type === 'income' ? colorClass.replace('border-', 'text-') : 'text-red-600'}`}>
                              {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString('vi-VN')} VNĐ
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Sử dụng Button */}
              <Dialog open={isAddingExpenditure && selectedFundType === fundType} onOpenChange={(open) => {
                setIsAddingExpenditure(open);
                if (open) setSelectedFundType(fundType);
              }}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                    <MinusCircle className="h-4 w-4 mr-2" />
                    Sử dụng
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Sử dụng {title}</DialogTitle>
                    <DialogDescription>Nhập thông tin chi tiêu</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>Mục đích chi tiêu</Label>
                      <Input 
                        value={newExpenditure.purpose} 
                        onChange={(e) => setNewExpenditure({...newExpenditure, purpose: e.target.value})}
                        placeholder={fundType === 'meeting' ? 'Thuê phòng họp, thiết bị...' : fundType === 'development' ? 'Chi phí BOD, Gala...' : 'Thăm hỏi thành viên...'}
                      />
                    </div>
                    <div>
                      <Label>Số tiền (VNĐ)</Label>
                      <Input 
                        type="number"
                        value={newExpenditure.amount} 
                        onChange={(e) => setNewExpenditure({...newExpenditure, amount: Number(e.target.value)})}
                        placeholder="2000000"
                      />
                    </div>
                    <div>
                      <Label>Ngày chi</Label>
                      <Input 
                        type="date"
                        value={newExpenditure.date} 
                        onChange={(e) => setNewExpenditure({...newExpenditure, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Người phê duyệt</Label>
                      <Input 
                        value={newExpenditure.approvedBy || ''} 
                        onChange={(e) => setNewExpenditure({...newExpenditure, approvedBy: e.target.value})}
                        placeholder="Chủ tịch, Thư ký..."
                      />
                    </div>
                    <div>
                      <Label>Ghi chú</Label>
                      <Input 
                        value={newExpenditure.note || ''} 
                        onChange={(e) => setNewExpenditure({...newExpenditure, note: e.target.value})}
                        placeholder="Chi tiết bổ sung..."
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setIsAddingExpenditure(false)}>Hủy</Button>
                      <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleAddExpenditure}>
                        Xác nhận
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Thêm Đóng góp Button */}
              <Dialog open={isAddingContribution && selectedFundType === fundType} onOpenChange={(open) => {
                setIsAddingContribution(open);
                if (open) setSelectedFundType(fundType);
              }}>
                <DialogTrigger asChild>
                  <Button className={`bg-${fundType === 'meeting' ? 'green' : fundType === 'development' ? 'blue' : 'red'}-600 hover:bg-${fundType === 'meeting' ? 'green' : fundType === 'development' ? 'blue' : 'red'}-700 text-white`}>
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm Đóng góp
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Thêm Đóng góp {title}</DialogTitle>
                    <DialogDescription>Nhập thông tin đóng góp của thành viên</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>Tên thành viên</Label>
                      <Input 
                        value={newContribution.memberName} 
                        onChange={(e) => setNewContribution({...newContribution, memberName: e.target.value})}
                        placeholder="Nhập tên thành viên"
                      />
                    </div>
                    {showQuarter && (
                      <div>
                        <Label>Quý</Label>
                        <Input 
                          value={newContribution.quarter || ''} 
                          onChange={(e) => setNewContribution({...newContribution, quarter: e.target.value})}
                          placeholder="Q1/2025"
                        />
                      </div>
                    )}
                    <div>
                      <Label>Số tiền (VNĐ)</Label>
                      <Input 
                        type="number"
                        value={newContribution.amount} 
                        onChange={(e) => setNewContribution({...newContribution, amount: Number(e.target.value)})}
                        placeholder={showQuarter ? "500000" : fundType === 'development' ? "1000000" : "50000"}
                      />
                    </div>
                    <div>
                      <Label>Ngày đóng</Label>
                      <Input 
                        type="date"
                        value={newContribution.date} 
                        onChange={(e) => setNewContribution({...newContribution, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Ghi chú</Label>
                      <Input 
                        value={newContribution.note || ''} 
                        onChange={(e) => setNewContribution({...newContribution, note: e.target.value})}
                        placeholder={fundType === 'development' ? 'Nhận cơ hội kinh doanh, tài trợ...' : fundType === 'union' ? 'Đến muộn, vắng mặt...' : ''}
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setIsAddingContribution(false)}>Hủy</Button>
                      <Button className={`bg-${fundType === 'meeting' ? 'green' : fundType === 'development' ? 'blue' : 'red'}-600 hover:bg-${fundType === 'meeting' ? 'green' : fundType === 'development' ? 'blue' : 'red'}-700 text-white`} onClick={handleAddContribution}>
                        Thêm
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thành viên</TableHead>
                {showQuarter && <TableHead>Quý</TableHead>}
                <TableHead>Số tiền</TableHead>
                <TableHead>Ngày đóng</TableHead>
                {!showQuarter && <TableHead>Ghi chú</TableHead>}
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contributions.map((contribution) => (
                <TableRow key={contribution.memberId}>
                  <TableCell className="font-medium">{contribution.memberName}</TableCell>
                  {showQuarter && <TableCell>{contribution.quarter}</TableCell>}
                  <TableCell>{contribution.amount.toLocaleString('vi-VN')} VNĐ</TableCell>
                  <TableCell>{contribution.date || '-'}</TableCell>
                  {!showQuarter && <TableCell className="max-w-xs truncate">{contribution.note || '-'}</TableCell>}
                  <TableCell>
                    <Badge 
                      className={
                        contribution.status === 'paid' ? 'bg-green-500' : 
                        contribution.status === 'pending' ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }
                    >
                      {contribution.status === 'paid' ? 'Đã đóng' : 
                       contribution.status === 'pending' ? 'Chờ đóng' : 
                       'Quá hạn'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {contribution.status !== 'paid' && (
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleUpdateStatus(fundType, contribution.memberId, 'paid')}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteContribution(fundType, contribution.memberId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="border-b pb-4 sm:pb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bni-red mb-2">
          Dashboard Báo Cáo Thư ký & Đào tạo
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-4">
          <Label className="font-semibold text-sm sm:text-base">Cập nhật cho Tuần:</Label>
          <Input 
            type="date" 
            value={weekDate}
            onChange={(e) => setWeekDate(e.target.value)}
            className="w-full sm:w-auto"
          />
        </div>
      </div>

      {/* I. TỔNG QUAN HÀNH CHÍNH & TÀI CHÍNH */}
      <Card className="shadow-lg border-bni-gold border-2">
        <CardHeader className="bg-gradient-to-r from-bni-gold/10 to-bni-red/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <FileText className="h-6 w-6 text-bni-red" />
            I. TỔNG QUAN HÀNH CHÍNH & TÀI CHÍNH
          </CardTitle>
          <CardDescription className="text-base">Báo cáo Tổng Thư ký</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          
          {/* 1. Tình hình Gia hạn Thành viên */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-bni-red" />
              1. Tình hình Gia hạn Thành viên
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg space-y-6">
              
              {/* Thành viên cần chăm sóc tháng thứ 7 */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-6 rounded-lg border-2 border-purple-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-purple-600" />
                    <Label className="font-bold text-lg text-purple-900 dark:text-purple-300">
                      Thành viên cần chăm sóc tháng thứ 7
                    </Label>
                  </div>
                  <Badge className="bg-purple-600 text-white text-base px-3 py-1">
                    {getSeventhMonthMembers().length} thành viên
                  </Badge>
                </div>
                <div className="bg-white dark:bg-background p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-3">
                    Thành viên đã tham gia được 7 tháng cần chăm sóc đặc biệt:
                  </p>
                  {getSeventhMonthMembers().length > 0 ? (
                    <div className="space-y-2">
                      {getSeventhMonthMembers().map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200">
                          <span className="font-semibold text-purple-900 dark:text-purple-300">
                            {member.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Ngày gia hạn: {new Date(member.renewalDate).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground italic">Không có thành viên nào</p>
                  )}
                </div>
              </div>

              <p className="font-semibold">Thành viên cần gia hạn trong 90 ngày tới:</p>
              
              <div className="space-y-4">
                {/* October 2025 */}
                <div className="bg-white dark:bg-background p-5 rounded-lg border-l-4 border-orange-500 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <Label className="font-bold text-lg">Tháng 10/2025:</Label>
                    <Badge className="bg-orange-500 text-base px-3 py-1">
                      Sắp đến hạn - {getMembersNeedingRenewal('2025-10').length} thành viên
                    </Badge>
                  </div>
                  {getMembersNeedingRenewal('2025-10').length > 0 ? (
                    <div className="space-y-2 mt-3">
                      {getMembersNeedingRenewal('2025-10').map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200">
                          <span className="font-semibold text-orange-900 dark:text-orange-300">
                            {member.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Hạn gia hạn: {new Date(member.renewalDate).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic text-center mt-2">Không có thành viên nào</p>
                  )}
                </div>

                {/* November 2025 */}
                <div className="bg-white dark:bg-background p-5 rounded-lg border-l-4 border-yellow-500 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <Label className="font-bold text-lg">Tháng 11/2025:</Label>
                    <Badge className="bg-yellow-500 text-base px-3 py-1">
                      Chuẩn bị - {getMembersNeedingRenewal('2025-11').length} thành viên
                    </Badge>
                  </div>
                  {getMembersNeedingRenewal('2025-11').length > 0 ? (
                    <div className="space-y-2 mt-3">
                      {getMembersNeedingRenewal('2025-11').map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200">
                          <span className="font-semibold text-yellow-900 dark:text-yellow-300">
                            {member.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Hạn gia hạn: {new Date(member.renewalDate).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic text-center mt-2">Không có thành viên nào</p>
                  )}
                </div>

                {/* December 2025 */}
                <div className="bg-white dark:bg-background p-5 rounded-lg border-l-4 border-blue-500 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <Label className="font-bold text-lg">Tháng 12/2025:</Label>
                    <Badge className="bg-blue-500 text-base px-3 py-1">
                      Theo dõi - {getMembersNeedingRenewal('2025-12').length} thành viên
                    </Badge>
                  </div>
                  {getMembersNeedingRenewal('2025-12').length > 0 ? (
                    <div className="space-y-2 mt-3">
                      {getMembersNeedingRenewal('2025-12').map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                          <span className="font-semibold text-blue-900 dark:text-blue-300">
                            {member.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Hạn gia hạn: {new Date(member.renewalDate).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic text-center mt-2">Không có thành viên nào</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Thông tin Phí và Tài khoản */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-bni-red" />
              2. Thông tin Phí và Tài khoản
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Phí Gia nhập */}
                <div className="bg-white dark:bg-background p-6 rounded-lg border-2 border-green-500">
                  <h4 className="font-bold text-lg mb-4 text-green-700 dark:text-green-400">Phí Gia nhập</h4>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm text-muted-foreground">1 năm:</Label>
                      <Input 
                        placeholder="17.027.280 VNĐ" 
                        className="text-xl font-bold mt-1" 
                        defaultValue="17.027.280 VNĐ"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">2 năm:</Label>
                      <Input 
                        placeholder="29.239.056 VNĐ" 
                        className="text-xl font-bold mt-1" 
                        defaultValue="29.239.056 VNĐ"
                      />
                    </div>
                  </div>
                </div>

                {/* Phí Tái Gia nhập */}
                <div className="bg-white dark:bg-background p-6 rounded-lg border-2 border-blue-500">
                  <h4 className="font-bold text-lg mb-4 text-blue-700 dark:text-blue-400">Phí Tái Gia nhập</h4>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm text-muted-foreground">1 năm:</Label>
                      <Input 
                        placeholder="14.867.280 VNĐ" 
                        className="text-xl font-bold mt-1" 
                        defaultValue="14.867.280 VNĐ"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">2 năm:</Label>
                      <Input 
                        placeholder="27.079.056 VNĐ" 
                        className="text-xl font-bold mt-1" 
                        defaultValue="27.079.056 VNĐ"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Thông báo */}
              <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border-l-4 border-red-500">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-red-900 dark:text-red-300 mb-2">
                      Thông báo quan trọng:
                    </p>
                    <Textarea 
                      rows={2}
                      className="bg-white dark:bg-background"
                      defaultValue="Các thành viên trong danh sách gia hạn vui lòng hoàn tất thủ tục trước ngày 15 hàng tháng để tránh bị trễ hạn."
                    />
                  </div>
                </div>
              </div>

              {/* Thông báo hành chính khác */}
              <div className="bg-white dark:bg-background p-4 rounded-lg border">
                <Label className="font-semibold text-base mb-2 block">Các thông báo hành chính khác:</Label>
                <Textarea 
                  rows={3}
                  placeholder="Nhập các thông báo, quy định, chính sách quan trọng của BNI..."
                />
              </div>
            </div>
          </div>

          {/* 3. Quỹ Chapter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-bni-red" />
              3. Quỹ Chapter
            </h3>
            
            {/* Quỹ Phòng họp */}
            {renderFundCard(
              'meeting',
              'Quỹ Phòng họp',
              <Calendar className="h-5 w-5 text-green-600" />,
              'border-green-500',
              'bg-green-50 dark:bg-green-950/20',
              meetingFundContributions,
              meetingFundExpenditures,
              true
            )}

            {/* Quỹ Phát triển */}
            {renderFundCard(
              'development',
              'Quỹ Phát triển',
              <TrendingUp className="h-5 w-5 text-blue-600" />,
              'border-blue-500',
              'bg-blue-50 dark:bg-blue-950/20',
              developmentFundContributions,
              developmentFundExpenditures
            )}

            {/* Quỹ Công đoàn */}
            {renderFundCard(
              'union',
              'Quỹ Công đoàn',
              <Heart className="h-5 w-5 text-red-600" />,
              'border-red-500',
              'bg-red-50 dark:bg-red-950/20',
              unionFundContributions,
              unionFundExpenditures
            )}
          </div>

        </CardContent>
      </Card>

      {/* II. TỔNG QUAN PHÁT TRIỂN NĂNG LỰC */}
      <Card className="shadow-lg border-bni-red border-2">
        <CardHeader className="bg-gradient-to-r from-bni-red/10 to-bni-gold/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-bni-red" />
            II. TỔNG QUAN PHÁT TRIỂN NĂNG LỰC
          </CardTitle>
          <CardDescription className="text-base">Báo cáo Ban Đào tạo</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          
          {/* Hiệu suất Đào tạo */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Award className="h-5 w-5 text-bni-red" />
              Hiệu suất Đào tạo
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg space-y-6">
              
              {/* Tháng báo cáo */}
              <div className="bg-white dark:bg-background p-4 rounded-lg border">
                <Label className="font-semibold text-base mb-2 block">Tháng báo cáo:</Label>
                <Input type="month" defaultValue="2025-08" className="text-lg" />
              </div>

              {/* Các chỉ số */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-background p-6 rounded-lg border-2 border-bni-gold">
                  <Label className="font-semibold text-base block mb-2">Tổng điểm CEU Chapter:</Label>
                  <Input 
                    type="number" 
                    placeholder="486" 
                    className="text-3xl font-bold text-center" 
                    defaultValue="486"
                  />
                  <p className="text-sm text-muted-foreground mt-2 text-center">điểm</p>
                </div>

                <div className="bg-white dark:bg-background p-6 rounded-lg border-2 border-green-500">
                  <Label className="font-semibold text-base block mb-2">Mục tiêu tối thiểu:</Label>
                  <Input 
                    type="number" 
                    placeholder="344" 
                    className="text-3xl font-bold text-center" 
                    defaultValue="344"
                  />
                  <p className="text-sm text-muted-foreground mt-2 text-center">điểm</p>
                </div>

                <div className="bg-white dark:bg-background p-6 rounded-lg border-2 border-blue-500">
                  <Label className="font-semibold text-base block mb-2">Mục tiêu tối đa:</Label>
                  <Input 
                    type="number" 
                    placeholder="544" 
                    className="text-3xl font-bold text-center" 
                    defaultValue="544"
                  />
                  <p className="text-sm text-muted-foreground mt-2 text-center">điểm</p>
                </div>
              </div>

              {/* Thành viên xuất sắc */}
              <div className="bg-gradient-to-r from-bni-gold/20 to-bni-red/20 p-6 rounded-lg border-2 border-bni-gold">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-6 w-6 text-bni-gold" />
                  <Label className="font-bold text-lg">Thành viên xuất sắc nhất:</Label>
                </div>
                <Input 
                  placeholder="Mrs. Đoàn Thị Ánh Khuyên" 
                  className="text-xl font-semibold bg-white dark:bg-background" 
                  defaultValue="Mrs. Đoàn Thị Ánh Khuyên"
                />
              </div>

              {/* Tỷ lệ hoàn thành */}
              <div className="bg-white dark:bg-background p-6 rounded-lg border">
                <Label className="font-semibold text-base block mb-3">Tỷ lệ hoàn thành đào tạo bắt buộc:</Label>
                <div className="flex items-center gap-4">
                  <Input 
                    type="number" 
                    placeholder="85" 
                    className="text-2xl font-bold w-32" 
                    defaultValue="85"
                  />
                  <span className="text-2xl font-bold">%</span>
                  <Badge className="bg-green-500 text-lg px-4 py-2">Đạt mục tiêu</Badge>
                </div>
              </div>

              {/* Lịch đào tạo sắp tới */}
              <div className="bg-white dark:bg-background p-4 rounded-lg border">
                <Label className="font-semibold text-base mb-2 block">Lịch Đào tạo sắp tới:</Label>
                <Textarea 
                  rows={4}
                  placeholder="Nhập danh sách các khóa học, workshop sắp diễn ra..."
                  defaultValue="- Khóa học 'Kỹ năng trình bày 30 giây hiệu quả' - Tuần sau&#10;- Workshop 'Networking trong thời đại số' - 15/10/2025&#10;- Training 'Givers Gain - Triết lý cho là nhận' - 22/10/2025"
                />
              </div>

              {/* Phân tích & Đề xuất */}
              <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border-l-4 border-purple-500">
                <p className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                  📊 Phân tích & Hành động đề xuất:
                </p>
                <Textarea 
                  rows={3}
                  className="bg-white dark:bg-background"
                  defaultValue="Chapter đã đạt và vượt mục tiêu điểm đào tạo trong tháng. Ban Đào tạo sẽ gửi thông tin về khóa học 'Kỹ năng trình bày 30 giây hiệu quả' vào tuần tới, khuyến khích các thành viên tham gia để tối ưu hóa bài giới thiệu hàng tuần."
                />
              </div>
            </div>
          </div>

          {/* Lịch Đào tạo 5 phút & Diễn giả 8 phút */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-bni-red" />
                Lịch Đào tạo & Diễn giả
              </h3>
              <Dialog open={isManagingTraining} onOpenChange={(open) => {
                setIsManagingTraining(open);
                if (!open) {
                  setEditingTraining(null);
                  setNewTraining({ memberName: '', topic: '', date: new Date().toISOString().split('T')[0], time: '07:30', type: selectedTrainingType, status: 'scheduled', notes: '' });
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="bg-bni-red hover:bg-bni-red/90 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm Lịch
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingTraining ? 'Cập nhật' : 'Thêm'} Lịch Đào tạo</DialogTitle>
                    <DialogDescription>Quản lý lịch đào tạo 5 phút và diễn giả 8 phút theo chuẩn BNI</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Loại đào tạo</Label>
                        <div className="flex gap-2 mt-2">
                          <Button
                            type="button"
                            variant={selectedTrainingType === '5min' ? 'default' : 'outline'}
                            className={selectedTrainingType === '5min' ? 'bg-bni-red text-white' : ''}
                            onClick={() => {
                              setSelectedTrainingType('5min');
                              setNewTraining({...newTraining, type: '5min', time: '07:30'});
                            }}
                          >
                            Đào tạo 5 phút
                          </Button>
                          <Button
                            type="button"
                            variant={selectedTrainingType === '8min' ? 'default' : 'outline'}
                            className={selectedTrainingType === '8min' ? 'bg-bni-red text-white' : ''}
                            onClick={() => {
                              setSelectedTrainingType('8min');
                              setNewTraining({...newTraining, type: '8min', time: '08:00'});
                            }}
                          >
                            Diễn giả 8 phút
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label>Tên thành viên</Label>
                      <Input 
                        value={newTraining.memberName} 
                        onChange={(e) => setNewTraining({...newTraining, memberName: e.target.value})}
                        placeholder="Nhập tên thành viên"
                      />
                    </div>
                    <div>
                      <Label>Chủ đề</Label>
                      <Input 
                        value={newTraining.topic} 
                        onChange={(e) => setNewTraining({...newTraining, topic: e.target.value})}
                        placeholder={selectedTrainingType === '5min' ? 'Ví dụ: Kỹ năng Networking hiệu quả' : 'Ví dụ: Hành trình phát triển doanh nghiệp'}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Ngày</Label>
                        <Input 
                          type="date"
                          value={newTraining.date} 
                          onChange={(e) => setNewTraining({...newTraining, date: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Giờ</Label>
                        <Input 
                          type="time"
                          value={newTraining.time} 
                          onChange={(e) => setNewTraining({...newTraining, time: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Ghi chú</Label>
                      <Textarea 
                        value={newTraining.notes || ''} 
                        onChange={(e) => setNewTraining({...newTraining, notes: e.target.value})}
                        placeholder="Thông tin bổ sung..."
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2 justify-end pt-4">
                      <Button variant="outline" onClick={() => {
                        setIsManagingTraining(false);
                        setEditingTraining(null);
                        setNewTraining({ memberName: '', topic: '', date: new Date().toISOString().split('T')[0], time: '07:30', type: selectedTrainingType, status: 'scheduled', notes: '' });
                      }}>
                        Hủy
                      </Button>
                      <Button className="bg-bni-red hover:bg-bni-red/90 text-white" onClick={handleAddOrUpdateTraining}>
                        {editingTraining ? 'Cập nhật' : 'Thêm'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* 5-Minute Training Schedule */}
            <Card className="border-2 border-blue-500">
              <CardHeader className="bg-blue-50 dark:bg-blue-950/20">
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  Lịch Đào tạo 5 phút
                </CardTitle>
                <CardDescription>
                  Đào tạo kỹ năng BNI theo chuẩn 5 phút mỗi buổi họp
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Thành viên</TableHead>
                      <TableHead>Chủ đề</TableHead>
                      <TableHead>Ngày & Giờ</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fiveMinTraining.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          Chưa có lịch đào tạo 5 phút. Nhấn "Thêm Lịch" để thêm mới.
                        </TableCell>
                      </TableRow>
                    ) : (
                      fiveMinTraining.map((training) => (
                        <TableRow key={training.id}>
                          <TableCell className="font-medium">{training.memberName}</TableCell>
                          <TableCell>{training.topic}</TableCell>
                          <TableCell>
                            {new Date(training.date).toLocaleDateString('vi-VN')} - {training.time}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                training.status === 'scheduled' ? 'bg-blue-500' : 
                                training.status === 'completed' ? 'bg-green-500' : 
                                'bg-gray-500'
                              }
                            >
                              {training.status === 'scheduled' ? 'Đã lên lịch' : 
                               training.status === 'completed' ? 'Hoàn thành' : 
                               'Đã hủy'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                                onClick={() => handleEditTraining(training)}
                                title="Cập nhật bài"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              {training.status === 'scheduled' && (
                                <Button 
                                  size="sm" 
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() => handleUpdateTrainingStatus(training.id, '5min', 'completed')}
                                  title="Đánh dấu hoàn thành"
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeleteTraining(training.id, '5min')}
                                title="Xóa lịch"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* 8-Minute Speaker Schedule */}
            <Card className="border-2 border-purple-500">
              <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  Lịch Diễn giả 8 phút
                </CardTitle>
                <CardDescription>
                  Buổi chia sẻ kinh nghiệm kinh doanh 8 phút theo chuẩn BNI
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Thành viên</TableHead>
                      <TableHead>Chủ đề</TableHead>
                      <TableHead>Ngày & Giờ</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eightMinSpeaker.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          Chưa có lịch diễn giả 8 phút. Nhấn "Thêm Lịch" để thêm mới.
                        </TableCell>
                      </TableRow>
                    ) : (
                      eightMinSpeaker.map((training) => (
                        <TableRow key={training.id}>
                          <TableCell className="font-medium">{training.memberName}</TableCell>
                          <TableCell>{training.topic}</TableCell>
                          <TableCell>
                            {new Date(training.date).toLocaleDateString('vi-VN')} - {training.time}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                training.status === 'scheduled' ? 'bg-purple-500' : 
                                training.status === 'completed' ? 'bg-green-500' : 
                                'bg-gray-500'
                              }
                            >
                              {training.status === 'scheduled' ? 'Đã lên lịch' : 
                               training.status === 'completed' ? 'Hoàn thành' : 
                               'Đã hủy'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-purple-600 text-purple-600 hover:bg-purple-50"
                                onClick={() => handleEditTraining(training)}
                                title="Cập nhật bài"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              {training.status === 'scheduled' && (
                                <Button 
                                  size="sm" 
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() => handleUpdateTrainingStatus(training.id, '8min', 'completed')}
                                  title="Đánh dấu hoàn thành"
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeleteTraining(training.id, '8min')}
                                title="Xóa lịch"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
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
            submitReport('secretaryTraining', chapterData.leadership.find(l => l.role === 'Tổng Thư ký')?.name || 'Thư ký');
            toast.success('Báo cáo đã hoàn thành', {
              description: 'Báo cáo Thư ký & Đào tạo đã được gửi và đồng bộ real-time lên Tổng quan',
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
