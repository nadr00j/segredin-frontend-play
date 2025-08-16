import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Reply, X, Heart } from "lucide-react";
import { Message, GradientVariant } from "@/types";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface MessageModalProps {
  message: Message | null;
  isOpen: boolean;
  onClose: () => void;
}

const gradientClasses: Record<GradientVariant, string> = {
  'ig': 'gradient-ig',
  'alt-1': 'gradient-alt-1', 
  'alt-2': 'gradient-alt-2'
};

const colorOptions: Array<{ variant: GradientVariant; color: string }> = [
  { variant: 'ig', color: 'bg-gradient-to-r from-pink-400 to-orange-400' },
  { variant: 'alt-1', color: 'bg-gradient-to-r from-purple-400 to-blue-400' },
  { variant: 'alt-2', color: 'bg-gradient-to-r from-orange-400 to-yellow-400' }
];

export function MessageModal({ message, isOpen, onClose }: MessageModalProps) {
  const [selectedGradient, setSelectedGradient] = useState<GradientVariant>('ig');
  const navigate = useNavigate();

  if (!message) return null;

  const handleGetHint = () => {
    const isProActive = window.__entitlements?.pro_active;
    
    if (!isProActive) {
      onClose();
      navigate("/pro/upgrade");
      return;
    }

    toast({
      title: "💡 Hint revealed!",
      description: message.hint || "This person seems curious about you!",
    });
  };

  const handleReply = () => {
    toast({
      title: "Reply feature",
      description: "Reply functionality coming soon!",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto p-0 bg-transparent border-none shadow-none">
        <div className="relative">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute -top-12 right-0 z-50 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Message Card */}
          <div className="space-y-6 p-6">
            {/* Message Display */}
            <div 
              className={cn(
                "w-full min-h-[200px] rounded-3xl flex items-center justify-center p-8 text-center shadow-2xl relative overflow-hidden",
                gradientClasses[selectedGradient]
              )}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-4 border-2 border-white/40 rounded-2xl" />
              </div>
              
              {/* Heart decoration */}
              <div className="absolute top-4 right-4">
                <Heart className="w-6 h-6 text-white/60 fill-white/40" />
              </div>
              
              <p className="text-white text-lg font-medium leading-relaxed max-w-xs relative z-10">
                {message.body || message.preview}
              </p>
            </div>

            {/* Color Selector */}
            <div className="flex justify-center gap-3">
              {colorOptions.map(({ variant, color }) => (
                <button
                  key={variant}
                  onClick={() => setSelectedGradient(variant)}
                  className={cn(
                    "w-10 h-10 rounded-full border-3 transition-all duration-200",
                    color,
                    selectedGradient === variant 
                      ? "border-white scale-110 shadow-lg" 
                      : "border-white/50 hover:border-white/80 hover:scale-105"
                  )}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                variant="primary-ig" 
                onClick={handleGetHint}
                className="flex-1 rounded-2xl h-12 shadow-lg"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Get a hint
              </Button>
              <Button 
                variant="pill-black" 
                onClick={handleReply}
                className="flex-1 rounded-2xl h-12 shadow-lg"
              >
                <Reply className="w-4 h-4 mr-2" />
                Reply
              </Button>
            </div>

            {/* Message info */}
            <div className="text-center">
              <Badge variant="muted" className="rounded-full">
                {new Date(message.createdAt).toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}