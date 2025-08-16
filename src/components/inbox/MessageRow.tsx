import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Message } from "@/types";

interface MessageRowProps {
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

export function MessageRow({ message }: MessageRowProps) {
  return (
    <Link 
      to={`/app/message/${message.id}`}
      className="block p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
    >
      <div className="flex items-center gap-3">
        {/* Heart icon */}
        <Heart className="w-5 h-5 text-pink-500 fill-current flex-shrink-0" />
        
        {/* Message content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900">{message.title}</span>
            {!message.read && (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {message.preview}
          </p>
        </div>
        
        {/* Time */}
        <div className="text-xs text-muted-foreground flex-shrink-0">
          {getTimeAgo(message.createdAt)}
        </div>
      </div>
    </Link>
  );
}