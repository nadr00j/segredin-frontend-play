import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageCardGradient } from "@/components/cards/MessageCardGradient";
import { toast } from "@/hooks/use-toast";
import messagesData from "@/mocks/messages.json";
import { Message } from "@/types";

const messages = messagesData as Message[];

export default function MessageDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const message = messages.find(m => m.id === id);

  if (!message) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Message not found</h1>
          <Button asChild>
            <Link to="/app/inbox">Back to Inbox</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleGetHint = () => {
    const isProActive = window.__entitlements?.pro_active;
    
    if (!isProActive) {
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center h-16">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold ml-3">Message</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        <MessageCardGradient
          message={message.body || message.preview}
          onGetHint={handleGetHint}
          onReply={handleReply}
        />
      </main>
    </div>
  );
}