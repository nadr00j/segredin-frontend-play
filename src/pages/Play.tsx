import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { HeroCard } from "@/components/cards/HeroCard";
import { StepCard } from "@/components/cards/StepCard";
import { ModalStepper } from "@/components/modals/ModalStepper";

export default function Play() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AppLayout>
      <div className="space-y-6">
        <HeroCard />
        
        <div className="space-y-4">
          <StepCard step={1} />
          <StepCard step={2} onShareClick={() => setIsModalOpen(true)} />
        </div>
      </div>

      <ModalStepper 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </AppLayout>
  );
}