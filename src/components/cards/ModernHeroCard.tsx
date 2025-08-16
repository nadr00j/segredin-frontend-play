import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Share2, Copy, ExternalLink, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export function ModernHeroCard() {
  const [isSharing, setIsSharing] = useState(false);

  const handleCopyLink = async () => {
    const link = `${window.location.origin}/s/your-username`;
    
    try {
      await navigator.clipboard.writeText(link);
      toast({
        title: "Link copiado! 📋",
        description: "Cole em qualquer lugar para receber mensagens anônimas.",
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    const link = `${window.location.origin}/s/your-username`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Send me anonymous messages!',
          text: 'Manda em off pra mim! 💌',
          url: link,
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copy
      handleCopyLink();
    }
    
    setTimeout(() => setIsSharing(false), 1000);
  };

  return (
    <div className="space-y-4">
      {/* Main Profile Card */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 border-0 shadow-2xl">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative p-8 text-center text-white">
          {/* Avatar */}
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-xl border-4 border-white/30">
              S
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-4 border-white shadow-lg" />
            
            {/* Sparkle decorations */}
            <Sparkles className="absolute -top-2 -left-2 w-5 h-5 text-yellow-300 animate-pulse" />
            <Sparkles className="absolute -bottom-1 -right-3 w-4 h-4 text-pink-300 animate-pulse delay-500" />
          </div>
          
          {/* Content */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight">
              Send me anonymous messages!
            </h2>
            <p className="text-white/90 font-medium">
              Manda em off pra mim! 💌
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-4 pt-2">
              <div className="text-center">
                <div className="text-lg font-bold">12</div>
                <div className="text-xs text-white/80">Messages</div>
              </div>
              <div className="w-px bg-white/30 my-1" />
              <div className="text-center">
                <div className="text-lg font-bold">5</div>
                <div className="text-xs text-white/80">Today</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Settings button */}
        <Button 
          size="icon" 
          variant="ghost"
          className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20"
          asChild
        >
          <Link to="/app/link">
            <Settings className="w-5 h-5" />
          </Link>
        </Button>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="glass" 
          onClick={handleCopyLink}
          className="h-14 rounded-2xl shadow-lg border-2 border-white/20"
        >
          <Copy className="w-5 h-5 mr-2" />
          <div className="text-left">
            <div className="font-semibold text-sm">Copy Link</div>
            <div className="text-xs text-muted-foreground">Share anywhere</div>
          </div>
        </Button>
        
        <Button 
          variant="primary-ig" 
          onClick={handleShare}
          disabled={isSharing}
          className="h-14 rounded-2xl shadow-lg"
        >
          <Share2 className="w-5 h-5 mr-2" />
          <div className="text-left">
            <div className="font-semibold text-sm">
              {isSharing ? "Sharing..." : "Share"}
            </div>
            <div className="text-xs text-white/90">Instagram Story</div>
          </div>
        </Button>
      </div>

      {/* Quick Stats */}
      <Card variant="glass" className="p-4 border-2 border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-sm">Link ativo</div>
              <div className="text-xs text-muted-foreground">Recebendo mensagens</div>
            </div>
          </div>
          <Badge variant="success" className="rounded-full">
            Online
          </Badge>
        </div>
      </Card>
    </div>
  );
}