import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface MemberHeroProps {
  currentText: any;
}
export const MemberHero = ({
  currentText
}: MemberHeroProps) => {
  const navigate = useNavigate();
  return <section className="relative overflow-hidden bg-gradient-to-br from-bni-red via-bni-dark-red to-bni-red text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-white">
            {currentText.hero.title}
          </h1>
          <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            {currentText.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white hover:bg-white/90 text-bni-red text-lg px-8 py-6 font-semibold">
              👁️ {currentText.hero.viewAll}
            </Button>
            <Button size="lg" variant="outline" className="border-white bg-white/10 hover:bg-white text-white hover:text-bni-red text-lg px-8 py-6">
              📅 {currentText.hero.schedule11}
            </Button>
            <Button 
              onClick={() => navigate('/presentation-30s')}
              size="lg" 
              className="bg-bni-black hover:bg-bni-black/90 text-white text-lg px-8 py-6"
            >
              🎤 {currentText.hero.start30s}
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Button size="lg" variant="outline" className="border-white bg-white/10 hover:bg-white text-white hover:text-bni-red text-lg px-8 py-6">
              📤 {currentText.hero.register30s}
            </Button>
            <Button size="lg" className="bg-bni-red/80 hover:bg-bni-red text-white text-lg px-8 py-6 border border-white/30">
              👥 {currentText.hero.referFriend}
            </Button>
          </div>
        </div>
      </div>
    </section>;
};