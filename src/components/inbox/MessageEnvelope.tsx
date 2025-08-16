import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Message } from "@/types";
import { cn } from "@/lib/utils";

interface MessageEnvelopeProps {
  message: Message;
}

function getTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

export function MessageEnvelope({ message }: MessageEnvelopeProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/app/message/${message.id}`}
      className="block transition-all duration-300 ease-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "relative p-4 mb-3 rounded-2xl transition-all duration-300 ease-out",
        "gradient-envelope border border-white/50 shadow-envelope",
        isHovered ? "shadow-elevated scale-[1.02] border-white/70" : ""
      )}>
        {/* Envelope flap effect */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
          <div className={cn(
            "w-8 h-6 bg-gradient-to-b from-white/40 to-transparent",
            "rounded-b-lg border-l border-r border-white/30",
            "transition-all duration-300",
            isHovered ? "scale-110" : ""
          )} />
        </div>

        {/* Envelope content */}
        <div className="flex items-center gap-4">
          {/* Heart icon with glow */}
          <div className="relative">
            <Heart className={cn(
              "w-6 h-6 text-pink-500 fill-current transition-all duration-300",
              isHovered ? "scale-110 drop-shadow-lg" : ""
            )} />
            {isHovered && (
              <div className="absolute inset-0 w-6 h-6 bg-pink-400 rounded-full blur-md opacity-50 animate-pulse" />
            )}
          </div>
          
          {/* Message preview */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4 text-text-muted" />
              <span className="font-semibold text-text text-sm tracking-tight">New Message</span>
              {!message.read && (
                <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-pulse" />
              )}
            </div>
            <p className="text-xs text-text-muted font-medium opacity-80">
              Tap to open your letter...
            </p>
          </div>
          
          {/* Time stamp */}
          <div className="text-xs text-text-muted font-medium bg-white/60 px-2 py-1 rounded-full">
            {getTimeAgo(message.createdAt)}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-2 right-2">
          <div className="w-1 h-1 bg-gold-400 rounded-full opacity-60" />
        </div>
        <div className="absolute bottom-2 left-2">
          <div className="w-1 h-1 bg-gold-400 rounded-full opacity-40" />
        </div>
      </div>
    </Link>
  );
}