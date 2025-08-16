import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroCard() {
  return (
    <Card variant="hero" className="relative mb-6">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-lg">
          S
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <h2 className="text-headline text-gray-900 mb-1">
            send me anonymous messages!
          </h2>
          <p className="text-sm text-muted-foreground">
            manda em off pra mim!
          </p>
        </div>
        
        {/* Settings button */}
        <Button 
          size="icon" 
          variant="ghost"
          className="absolute top-4 right-4"
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