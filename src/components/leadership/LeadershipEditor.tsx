import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LeadershipMember } from "@/types/chapter";
import { ArrowUpDown } from "lucide-react";
import { useState, useEffect } from "react";

interface LeadershipEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leadership: LeadershipMember[];
  onSave: (leadership: LeadershipMember[]) => void;
}

export function LeadershipEditor({ open, onOpenChange, leadership, onSave }: LeadershipEditorProps) {
  const [editedLeadership, setEditedLeadership] = useState<LeadershipMember[]>(leadership);

  // Sync with props when dialog opens
  useEffect(() => {
    if (open) {
      setEditedLeadership(leadership);
    }
  }, [open, leadership]);

  const handleUpdateMember = (index: number, field: keyof LeadershipMember, value: string) => {
    const updated = [...editedLeadership];
    updated[index] = { ...updated[index], [field]: value };
    setEditedLeadership(updated);
  };

  const handleSwapMembers = (index: number) => {
    const updated = [...editedLeadership];
    const member = updated[index];
    
    // Swap name and support
    if (member.support) {
      const temp = member.name;
      member.name = member.support;
      member.support = temp;
      setEditedLeadership(updated);
    }
  };

  const handleSave = () => {
    onSave(editedLeadership);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Chỉnh sửa Ban Lãnh đạo</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin lãnh đạo, thêm người hỗ trợ và đảo vị trí khi cần
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {editedLeadership.map((member, index) => (
            <div key={index} className="border rounded-lg p-4 bg-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-bni-red">{member.role}</h3>
                {member.support && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSwapMembers(index)}
                    className="gap-2"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    Đảo vị trí
                  </Button>
                )}
              </div>

              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tên chính</Label>
                    <Input
                      value={member.name}
                      onChange={(e) => handleUpdateMember(index, 'name', e.target.value)}
                      placeholder="Nhập tên..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Người hỗ trợ phụ trách</Label>
                    <Input
                      value={member.support || ''}
                      onChange={(e) => handleUpdateMember(index, 'support', e.target.value)}
                      placeholder="Nhập tên người hỗ trợ..."
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handleSave} className="bg-bni-red hover:bg-bni-red/90">
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
