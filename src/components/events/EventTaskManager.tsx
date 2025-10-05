import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, User, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

export interface TaskAssignment {
  id: string;
  personName: string;
  role: string;
  task: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

interface EventTaskManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventTitle: string;
  tasks: TaskAssignment[];
  onSaveTasks: (tasks: TaskAssignment[]) => void;
}

export default function EventTaskManager({
  open,
  onOpenChange,
  eventTitle,
  tasks: initialTasks,
  onSaveTasks,
}: EventTaskManagerProps) {
  const [tasks, setTasks] = useState<TaskAssignment[]>(initialTasks);
  const [newTask, setNewTask] = useState({
    personName: '',
    role: '',
    task: '',
    status: 'not-started' as const,
  });

  const handleAddTask = () => {
    if (!newTask.personName.trim() || !newTask.role.trim() || !newTask.task.trim()) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const task: TaskAssignment = {
      id: Date.now().toString(),
      ...newTask,
    };

    setTasks([...tasks, task]);
    setNewTask({
      personName: '',
      role: '',
      task: '',
      status: 'not-started',
    });
    toast.success('Đã thêm nhiệm vụ');
  };

  const handleRemoveTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    toast.success('Đã xóa nhiệm vụ');
  };

  const handleUpdateTaskStatus = (taskId: string, status: TaskAssignment['status']) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status } : t));
  };

  const handleSave = () => {
    onSaveTasks(tasks);
    toast.success('Đã cập nhật thông tin');
    onOpenChange(false);
  };

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const progressPercentage = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Quản lý Phân công & Tiến độ</DialogTitle>
          <DialogDescription>{eventTitle}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-bni-red" />
                Tổng quan Tiến độ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Hoàn thành: {completedTasks}/{tasks.length} nhiệm vụ</span>
                <span className="font-bold">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </CardContent>
          </Card>

          {/* Task List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-bni-red" />
                Danh sách Phân công ({tasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {tasks.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    Chưa có nhiệm vụ nào được phân công
                  </p>
                ) : (
                  tasks.map((task) => (
                    <Card key={task.id} className="border-2">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="font-semibold">
                                {task.personName}
                              </Badge>
                              <Badge className="bg-bni-gold text-bni-black">
                                {task.role}
                              </Badge>
                            </div>
                            <p className="text-sm">{task.task}</p>
                            <Select
                              value={task.status}
                              onValueChange={(value) => 
                                handleUpdateTaskStatus(task.id, value as TaskAssignment['status'])
                              }
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="not-started">Chưa bắt đầu</SelectItem>
                                <SelectItem value="in-progress">Đang thực hiện</SelectItem>
                                <SelectItem value="completed">Hoàn thành</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveTask(task.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Add New Task */}
          <Card className="border-2 border-bni-red">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus className="h-5 w-5 text-bni-red" />
                Thêm Người & Nhiệm vụ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tên người thực hiện *</Label>
                  <Input
                    placeholder="Nguyễn Văn A"
                    value={newTask.personName}
                    onChange={(e) => setNewTask({ ...newTask, personName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Vai trò *</Label>
                  <Input
                    placeholder="Trưởng ban Sự kiện, Thành viên..."
                    value={newTask.role}
                    onChange={(e) => setNewTask({ ...newTask, role: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Nhiệm vụ *</Label>
                <Input
                  placeholder="Mô tả nhiệm vụ cần làm..."
                  value={newTask.task}
                  onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
                />
              </div>
              <Button
                onClick={handleAddTask}
                className="w-full bg-bni-red hover:bg-bni-red/90 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm Nhiệm vụ
              </Button>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handleSave} className="bg-bni-red hover:bg-bni-red/90 text-white">
            Lưu Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
