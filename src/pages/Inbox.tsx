import { AppLayout } from "@/components/layout/AppLayout";
import { MessageRow } from "@/components/inbox/MessageRow";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import messagesData from "@/mocks/messages.json";
import { Message } from "@/types";

const messages = messagesData as Message[];

export default function Inbox() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Messages List */}
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          {messages.map((message) => (
            <MessageRow key={message.id} message={message} />
          ))}
        </div>

        {/* Fixed bottom CTA */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <Button 
            variant="pill-black" 
            size="pill"
            asChild
          >
            <Link to="/app/play">
              Get messages!
            </Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}