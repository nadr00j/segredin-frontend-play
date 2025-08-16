import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, Reply } from "lucide-react";
import { GradientVariant } from "@/types";
import { cn } from "@/lib/utils";

interface MessageCardGradientProps {
  message: string;
  onGetHint?: () => void;
  onReply?: () => void;
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

export function MessageCardGradient({ message, onGetHint, onReply }: MessageCardGradientProps) {
  const [selectedGradient, setSelectedGradient] = useState<GradientVariant>('ig');

  return (
    <div className="space-y-6">
      {/* Message Card */}
      <div 
        className={cn(
          "w-full h-48 rounded-[var(--radius-card)] flex items-center justify-center p-6 text-center shadow-ig",
          gradientClasses[selectedGradient]
        )}
      >
        <p className="text-white text-lg font-medium leading-relaxed max-w-xs">
          {message}
        </p>
      </div>

      {/* Color Selector */}
      <div className="flex justify-center gap-3">
        {colorOptions.map(({ variant, color }) => (
          <button
            key={variant}
            onClick={() => setSelectedGradient(variant)}
            className={cn(
              "w-8 h-8 rounded-full border-2 transition-all",
              color,
              selectedGradient === variant 
                ? "border-gray-800 scale-110" 
                : "border-gray-300 hover:border-gray-500"
            )}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button 
          variant="primary-ig" 
          onClick={onGetHint}
          className="flex-1"
        >
          <Lightbulb className="w-4 h-4 mr-2" />
          Get a hint
        </Button>
        <Button 
          variant="pill-black" 
          onClick={onReply}
          className="flex-1"
        >
          <Reply className="w-4 h-4 mr-2" />
          reply
        </Button>
      </div>
    </div>
  );
}