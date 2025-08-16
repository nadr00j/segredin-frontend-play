import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Check, Sparkles } from "lucide-react";

export default function Paywall() {
  const navigate = useNavigate();

  const features = [
    "Receba pistas sobre quem enviou",
    "Acesso a hints personalizados",
    "Prioridade na moderação",
    "Estatísticas detalhadas",
    "Resposta automática"
  ];

  const handleSubscribe = () => {
    // Simulate subscription - just redirect back
    window.__entitlements = window.__entitlements || {};
    window.__entitlements.pro_active = true;
    
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center h-16">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold ml-3">Segredin Pro</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-md mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 gradient-brand rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Desbloqueie o Segredin Pro
          </h2>
          <p className="text-muted-foreground">
            Descubra quem está por trás das mensagens anônimas
          </p>
        </div>

        {/* Pricing Card */}
        <Card variant="surface" className="p-6 mb-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl font-bold">R$ 19,90</span>
              <Badge variant="success">mensal</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Cancele quando quiser
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <Button 
            variant="primary-brand" 
            size="lg" 
            className="w-full"
            onClick={handleSubscribe}
          >
            Assinar agora
          </Button>
        </Card>

        {/* Legal */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Ao assinar, você concorda com nossos{" "}
            <a href="#" className="text-brand underline">
              Termos de Uso
            </a>{" "}
            e{" "}
            <a href="#" className="text-brand underline">
              Política de Privacidade
            </a>
            . Renovação automática. Cancele a qualquer momento.
          </p>
        </div>
      </main>
    </div>
  );
}