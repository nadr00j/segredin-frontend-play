import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroCard() {
  return (
    <Card variant="surface" className="relative mb-6 shadow-elevated border border-border">
      <div className="flex items-center gap-4 p-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full gradient-ig flex items-center justify-center text-white font-bold text-xl shadow-ig">
            S
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <h2 className="text-lg font-bold text-text mb-1 tracking-tight">
            send me anonymous messages!
          </h2>
          <p className="text-sm text-text-muted font-medium">
            manda em off pra mim! 💌
          </p>
        </div>
        
        {/* Settings button */}
        <Button 
          size="icon" 
          variant="ghost"
          className="text-text-muted hover:text-text"
          asChild
        >
          <Link to="/app/link">
            <Settings className="w-5 h-5" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}