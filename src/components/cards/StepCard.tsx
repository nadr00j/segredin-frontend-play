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
      <Card variant="surface" className="p-4 mb-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">Step 1</p>
          <h3 className="font-semibold mb-4">Copy your link</h3>
          <Button 
            variant="glass" 
            onClick={handleCopyLink}
            className="w-full"
          >
            <Copy className="w-4 h-4 mr-2" />
            copy link
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="surface" className="p-4">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-3">Step 2</p>
        <h3 className="font-semibold mb-4">Share!</h3>
        <Button 
          variant="primary-ig" 
          onClick={onShareClick}
          className="w-full"
        >
          <Share className="w-4 h-4 mr-2" />
          Share!
        </Button>
      </div>
    </Card>
  );
}