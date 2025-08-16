import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Share, ArrowRight, Instagram } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface StepCardProps {
  step: 1 | 2;
  onShareClick?: () => void;
}

export function StepCard({ step, onShareClick }: StepCardProps) {
  const handleCopyLink = async () => {
    const link = `${window.location.origin}/s/your-username`;
    
    try {
      await navigator.clipboard.writeText(link);
      toast({
        title: "Link copiado!",
        description: "Seu link foi copiado para a área de transferência.",
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link.",
        variant: "destructive",
      });
    }
  };

  if (step === 1) {
    return (
      <Card className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 border-0 shadow-xl mb-4">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative p-6 space-y-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Copy your link</h3>
                <p className="text-white/80 text-sm">Share it anywhere you want</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white/60" />
          </div>
          
          <Button 
            variant="ghost" 
            onClick={handleCopyLink}
            className="w-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-2 border-white/30 rounded-xl h-12"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden gradient-ig border-0 shadow-xl">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative p-6 space-y-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <span className="text-white font-bold text-sm">2</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">Share on Story</h3>
              <p className="text-white/80 text-sm">Let everyone send you messages</p>
            </div>
          </div>
          <Instagram className="w-6 h-6 text-white/80" />
        </div>
        
        <Button 
          variant="ghost" 
          onClick={onShareClick}
          className="w-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-2 border-white/30 rounded-xl h-12"
        >
          <Share className="w-4 h-4 mr-2" />
          Share on Instagram Story ✨
        </Button>
      </div>
    </Card>
  );
}