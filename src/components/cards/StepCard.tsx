import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Share } from "lucide-react";
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
      <Card variant="surface" className="shadow-soft border border-border mb-4">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">1</span>
            </div>
            <h3 className="font-bold text-text">Copy your link</h3>
          </div>
          
          <Button 
            variant="glass" 
            onClick={handleCopyLink}
            className="w-full shadow-soft"
          >
            <Copy className="w-4 h-4 mr-2" />
            copy link
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="surface" className="shadow-soft border border-border">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full gradient-ig flex items-center justify-center">
            <span className="text-white font-bold text-xs">2</span>
          </div>
          <h3 className="font-bold text-text">Share!</h3>
        </div>
        
        <Button 
          variant="primary-ig" 
          onClick={onShareClick}
          className="w-full shadow-ig"
        >
          <Share className="w-4 h-4 mr-2" />
          Share on Stories! ✨
        </Button>
      </div>
    </Card>
  );
}