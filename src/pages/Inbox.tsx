import { AppLayout } from "@/components/layout/AppLayout";
import { MessageEnvelopeGrid } from "@/components/inbox/MessageEnvelopeGrid";
import { MessageModal } from "@/components/modals/MessageModal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Sparkles } from "lucide-react";
import messagesData from "@/mocks/messages.json";
import { Message } from "@/types";
import { useState } from "react";

const messages = messagesData as Message[];

export default function Inbox() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };
  
  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-3 py-4">
          <div className="relative inline-block">
            <Mail className="w-10 h-10 text-brand mx-auto" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {unreadCount}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text mb-1">Your Messages</h1>
            <p className="text-sm text-text-muted">
              {unreadCount > 0 ? `${unreadCount} new messages waiting` : "All caught up! 🎉"}
            </p>
          </div>
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-3 gap-3 px-2">
          {messages.map((message) => (
            <MessageEnvelopeGrid 
              key={message.id} 
              message={message} 
              onClick={() => handleMessageClick(message)}
            />
          ))}
          
          {/* Empty slots for visual balance */}
          {Array.from({ length: Math.max(0, 3 - (messages.length % 3)) }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square rounded-3xl bg-gray-100 opacity-50" />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
          <Button 
            variant="primary-ig" 
            size="lg"
            asChild
            className="shadow-2xl rounded-full px-8 py-4 text-base font-semibold"
          >
            <Link to="/app/play">
              <Sparkles className="w-5 h-5 mr-2" />
              Who sent these? 👀
            </Link>
          </Button>
        </div>
        
        {/* Message Modal */}
        <MessageModal 
          message={selectedMessage}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </AppLayout>
  );
}