import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type SubmissionState = 'idle' | 'success' | 'blocked' | 'review';

export default function WebForm() {
  const { slug } = useParams<{ slug: string }>();
  const [message, setMessage] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const maxChars = 300;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, escreva uma mensagem.",
        variant: "destructive",
      });
      return;
    }

    // Simulate different outcomes
    const outcomes: SubmissionState[] = ['success', 'blocked', 'review'];
    const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    
    setSubmissionState(randomOutcome);
    
    if (randomOutcome === 'success') {
      toast({
        title: "✅ Mensagem enviada!",
        description: "Sua mensagem anônima foi enviada com sucesso.",
      });
      setMessage("");
    }
  };

  const StateIndicator = () => {
    switch (submissionState) {
      case 'success':
        return (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">Mensagem enviada!</h3>
            <p className="text-green-600">Sua mensagem anônima foi entregue com sucesso.</p>
          </div>
        );
      case 'blocked':
        return (
          <div className="text-center py-8">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-800 mb-2">Mensagem bloqueada</h3>
            <p className="text-red-600">Esta mensagem não atende às nossas diretrizes.</p>
          </div>
        );
      case 'review':
        return (
          <div className="text-center py-8">
            <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-yellow-800 mb-2">Em revisão</h3>
            <p className="text-yellow-600">Sua mensagem está sendo revisada antes do envio.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Enviar mensagem anônima
          </h1>
          <p className="text-muted-foreground">
            Para @{slug}
          </p>
        </div>

        <Card variant="surface" className="p-6">
          {submissionState === 'idle' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Diz algo legal… ou pergunta em off."
                  className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  maxLength={maxChars}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">
                    {message.length}/{maxChars} caracteres
                  </span>
                  {message.length > maxChars * 0.8 && (
                    <Badge variant="muted">
                      {maxChars - message.length} restantes
                    </Badge>
                  )}
                </div>
              </div>
              
              <Button 
                type="submit" 
                variant="primary-ig" 
                className="w-full"
                disabled={!message.trim()}
              >
                Enviar
              </Button>
            </form>
          ) : (
            <StateIndicator />
          )}
          
          {submissionState !== 'idle' && (
            <Button 
              variant="ghost" 
              onClick={() => setSubmissionState('idle')}
              className="w-full mt-4"
            >
              Enviar outra mensagem
            </Button>
          )}
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            Mensagens são anônimas e moderadas.
            <br />
            Powered by Segredin
          </p>
        </div>
      </div>
    </div>
  );
}