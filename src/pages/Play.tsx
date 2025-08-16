import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ModernHeroCard } from "@/components/cards/ModernHeroCard";
import { StepCard } from "@/components/cards/StepCard";
import { ModalStepper } from "@/components/modals/ModalStepper";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, MessageCircle, Users, TrendingUp } from "lucide-react";

export default function Play() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AppLayout>
      <div className="space-y-6">
        <ModernHeroCard />
        
        <div className="space-y-4">
          <StepCard step={1} />
          <StepCard step={2} onShareClick={() => setIsModalOpen(true)} />
        </div>
        
        {/* Features Preview */}
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-bold text-text mb-2">Why Segredin?</h3>
            <p className="text-sm text-text-muted">The best way to receive anonymous messages</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Card variant="glass" className="p-4 text-center border-2 border-white/10">
              <MessageCircle className="w-8 h-8 text-brand mx-auto mb-2" />
              <div className="font-semibold text-sm mb-1">Anonymous</div>
              <div className="text-xs text-muted-foreground">100% private messages</div>
            </Card>
            
            <Card variant="glass" className="p-4 text-center border-2 border-white/10">
              <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="font-semibold text-sm mb-1">Safe</div>
              <div className="text-xs text-muted-foreground">Moderated content</div>
            </Card>
            
            <Card variant="glass" className="p-4 text-center border-2 border-white/10">
              <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="font-semibold text-sm mb-1">Popular</div>
              <div className="text-xs text-muted-foreground">Join millions of users</div>
            </Card>
            
            <Card variant="glass" className="p-4 text-center border-2 border-white/10">
              <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="font-semibold text-sm mb-1">Pro Features</div>
              <div className="text-xs text-muted-foreground">Get hints & more</div>
            </Card>
          </div>
        </div>
        
        {/* Pro Upgrade Teaser */}
        <Card className="relative overflow-hidden gradient-brand border-0 shadow-xl">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative p-6 text-center text-white">
            <Sparkles className="w-10 h-10 mx-auto mb-3 text-yellow-300" />
            <h3 className="font-bold text-lg mb-2">Upgrade to Pro</h3>
            <p className="text-white/90 text-sm mb-4">
              Get hints about who sent messages and unlock premium features
            </p>
            <Badge variant="default" className="bg-white/20 text-white border-white/30">
              Coming Soon
            </Badge>
          </div>
        </Card>
      </div>

      <ModalStepper 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </AppLayout>
  );
}