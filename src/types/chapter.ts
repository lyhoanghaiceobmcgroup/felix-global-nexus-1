// Shared data types for BNI Chapter

export interface StrategicObjective {
  target: string;
  current: string | number;
  progress: number;
  status: 'achieved' | 'in-progress' | 'needs-attention';
}

export interface StrategicObjectives {
  revenue: StrategicObjective;
  memberCount: StrategicObjective;
  attendance: StrategicObjective;
  kpiGreenMembers: StrategicObjective;
  oneToOneMeetings?: StrategicObjective;
}

export interface LeadershipMember {
  role: string;
  name: string;
  isPrimary?: boolean;
}

export interface PerformanceMetrics {
  referralsThisWeek: number;
  revenueLastMonth: string;
  visitorsLastWeek: number;
  newMemberApplications: number;
  membersNeedingRenewal: number;
  trainingPointsLastMonth: number;
  upcomingEvent: string;
}

export interface ChapterData {
  termName: string;
  termStart: string;
  termEnd: string;
  lastUpdated: string;
  strategicObjectives: StrategicObjectives;
  leadership: LeadershipMember[];
  performanceMetrics: PerformanceMetrics;
}

export const initialChapterData: ChapterData = {
  termName: "Nhiệm kỳ XI",
  termStart: "2025-10-01",
  termEnd: "2026-03-31",
  lastUpdated: "2025-09-30",
  strategicObjectives: {
    revenue: {
      target: "33 Tỷ VNĐ",
      current: "1.23 Tỷ",
      progress: 3.7,
      status: 'in-progress'
    },
    memberCount: {
      target: "75+",
      current: 42,
      progress: 56,
      status: 'in-progress'
    },
    attendance: {
      target: "98%",
      current: "98%",
      progress: 100,
      status: 'achieved'
    },
    kpiGreenMembers: {
      target: "50%",
      current: "50%",
      progress: 100,
      status: 'achieved'
    },
    oneToOneMeetings: {
      target: "344 – 544",
      current: 344,
      progress: 63.2,
      status: 'achieved'
    }
  },
  leadership: [
    { role: "Chủ tịch", name: "Mrs. Đoàn Thị Ánh Khuyên", isPrimary: true },
    { role: "Phó Chủ tịch", name: "Mr. Lý Hoàng Hải" },
    { role: "Tổng Thư ký", name: "Ms. Lưu Thị Châu" },
    { role: "Ban Thành viên", name: "Mrs. Lê Thị Lan" },
    { role: "Ban Khách mời", name: "Ms. Nguyễn Thị Mến" },
    { role: "Ban Đào tạo", name: "Mrs. Đào Thị Thanh Trà" },
    { role: "Ban Sự kiện", name: "Mr. Lê Ngọc Minh" },
    { role: "Ban Truyền thông", name: "Ms. Phùng Trang Linh" }
  ],
  performanceMetrics: {
    referralsThisWeek: 53,
    revenueLastMonth: "1.23 Tỷ VNĐ",
    visitorsLastWeek: 4,
    newMemberApplications: 1,
    membersNeedingRenewal: 7,
    trainingPointsLastMonth: 486,
    upcomingEvent: "Lễ Chuyển giao BĐH (07/10/2025)"
  }
};
