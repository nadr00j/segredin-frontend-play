import { useState } from "react";
import { Heart } from "lucide-react";
import { Message } from "@/types";
import { cn } from "@/lib/utils";

interface MessageEnvelopeGridProps {
  message: Message;
  onClick: () => void;
}

function getTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d`;
}

export function MessageEnvelopeGrid({ message, onClick }: MessageEnvelopeGridProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={cn(
        "relative w-full aspect-square rounded-3xl transition-all duration-200 ease-out",
        "transform-gpu will-change-transform",
        message.read 
          ? "bg-gradient-to-br from-gray-200 to-gray-300" 
          : "bg-gradient-to-br from-pink-500 via-red-500 to-orange-500",
        "shadow-lg hover:shadow-xl",
        isPressed ? "scale-95" : "hover:scale-105",
        "group overflow-hidden"
      )}
    >
      {/* Envelope Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-4 border-2 border-white/40 rounded-2xl" />
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-6 border-l-2 border-r-2 border-b-2 border-white/40 rounded-b-lg" />
      </div>

      {/* Heart Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={cn(
          "relative transition-all duration-300",
          "group-hover:scale-110"
        )}>
          <Heart 
            className={cn(
              "w-8 h-8 transition-all duration-300",
              message.read 
                ? "text-gray-500 fill-gray-400" 
                : "text-white fill-white drop-shadow-lg"
            )} 
          />
          
          {/* Glow effect for unread messages */}
          {!message.read && (
            <div className="absolute inset-0 w-8 h-8 bg-white/30 rounded-full blur-md animate-pulse" />
          )}
        </div>
      </div>

      {/* Unread indicator */}
      {!message.read && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full shadow-lg animate-pulse" />
      )}

      {/* Time stamp */}
      <div className="absolute bottom-2 right-2">
        <span className={cn(
          "text-xs font-medium px-2 py-1 rounded-full",
          message.read 
            ? "bg-gray-400/80 text-gray-700" 
            : "bg-white/20 text-white backdrop-blur-sm"
        )}>
          {getTimeAgo(message.createdAt)}
        </span>
      </div>

      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse" />
      </div>
    </button>
  );
}