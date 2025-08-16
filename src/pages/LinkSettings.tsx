import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Copy, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type UTMSource = 'story' | 'bio' | 'ext';

export default function LinkSettings() {
  const navigate = useNavigate();
  const [selectedUTM, setSelectedUTM] = useState<UTMSource>('story');
  const baseSlug = "your-username";

  const utmOptions = [
    { value: 'story' as UTMSource, label: 'Instagram Story', description: 'Para stories' },
    { value: 'bio' as UTMSource, label: 'Bio Link', description: 'Para biografia' },
    { value: 'ext' as UTMSource, label: 'External', description: 'Outros lugares' }
  ];

  const getFullLink = () => {
    return `${window.location.origin}/s/${baseSlug}?utm_source=${selectedUTM}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getFullLink());
      toast({
        title: "Link copiado!",
        description: "Seu link foi copiado para a área de transferência.",
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link.",
        variant: "destructive",
      });
    }
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
            <h1 className="text-lg font-semibold ml-3">Link Settings</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Current Link */}
        <Card variant="surface" className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Seu link pessoal</h3>
              <div className="p-3 bg-gray-100 rounded-lg font-mono text-sm break-all">
                {getFullLink()}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="glass" onClick={handleCopyLink} className="flex-1">
                <Copy className="w-4 h-4 mr-2" />
                Copiar
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href={getFullLink()} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </Card>

        {/* UTM Source Selector */}
        <Card variant="surface" className="p-4">
          <h3 className="font-semibold mb-4">Onde você vai compartilhar?</h3>
          <div className="space-y-3">
            {utmOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedUTM(option.value)}
                className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                  selectedUTM === option.value
                    ? 'border-brand bg-brand/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </div>
                  {selectedUTM === option.value && (
                    <Badge variant="default">Selecionado</Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Info */}
        <Card variant="glass" className="p-4">
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">💡 <strong>Dica:</strong></p>
            <p>
              Selecionando a origem, você pode ver estatísticas de onde suas mensagens vêm no Segredin Pro.
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}