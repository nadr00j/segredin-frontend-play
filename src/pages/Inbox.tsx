import { AppLayout } from "@/components/layout/AppLayout";
import { MessageEnvelope } from "@/components/inbox/MessageEnvelope";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import messagesData from "@/mocks/messages.json";
import { Message } from "@/types";

const messages = messagesData as Message[];

export default function Inbox() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Mail className="w-8 h-8 text-brand mx-auto" />
          <h1 className="text-xl font-bold text-text">Your Letters</h1>
          <p className="text-sm text-text-muted">Anonymous messages waiting to be opened</p>
        </div>

        {/* Messages List */}
        <div className="space-y-1">
          {messages.map((message) => (
            <MessageEnvelope key={message.id} message={message} />
          ))}
        </div>

        {/* Fixed bottom CTA */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <Button 
            variant="primary-ig" 
            size="pill"
            asChild
            className="shadow-elevated"
          >
            <Link to="/app/play">
              Get more letters! ✨
            </Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}