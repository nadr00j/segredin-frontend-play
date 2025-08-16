import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const isPlayPage = location.pathname === "/app/play";
  const isInboxPage = location.pathname === "/app/inbox";
  
  const currentTab = isPlayPage ? "play" : isInboxPage ? "inbox" : "play";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/app/play" className="text-xl font-bold text-brand">
              Segredin
            </Link>
            
            {/* Dev entitlements toggle */}
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={() => {
                  window.__entitlements = window.__entitlements || {};
                  window.__entitlements.pro_active = !window.__entitlements.pro_active;
                  console.log('Pro status:', window.__entitlements.pro_active);
                }}
                className="text-xs px-2 py-1 bg-gray-100 rounded"
              >
                Toggle Pro
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-md mx-auto px-4 pt-4">
        <Tabs value={currentTab} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="play" asChild className="flex-1">
              <Link to="/app/play">PLAY</Link>
            </TabsTrigger>
            <TabsTrigger value="inbox" asChild className="flex-1">
              <Link to="/app/inbox">INBOX</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}

// Global entitlements for development
declare global {
  interface Window {
    __entitlements?: {
      pro_active?: boolean;
    };
  }
}