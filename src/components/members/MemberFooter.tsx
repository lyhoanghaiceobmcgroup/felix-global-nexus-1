import { Button } from "@/components/ui/button";
export const MemberFooter = () => {
  return <footer className="bg-[#2E2E2E] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">
            BNI <span className="text-[#D71920]">FELIX</span>
          </div>
          <p className="text-white/80 mb-6">
            Chapter chuyên nghiệp thuộc BNI Hanoi 6
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="border-white hover:bg-white text-zinc-950">
              📧 Liên hệ
            </Button>
            <Button className="bg-[#D71920] hover:bg-[#8B0000]">
              🚀 Tham gia ngay
            </Button>
          </div>
        </div>
      </div>
    </footer>;
};