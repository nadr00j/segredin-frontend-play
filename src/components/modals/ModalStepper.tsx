import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ui/stepper";
import { ChevronLeft, ChevronRight, Instagram } from "lucide-react";

interface ModalStepperProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalStepper({ isOpen, onClose }: ModalStepperProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Click the sticker button",
      description: "Open your Instagram story and tap the sticker icon",
      content: (
        <div className="bg-gray-100 rounded-xl p-8 mb-6">
          <div className="w-48 h-48 mx-auto bg-gradient-brand rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">📷 Story Screenshot</span>
          </div>
        </div>
      )
    },
    {
      title: "Click the LINK button", 
      description: "Find and tap the link sticker option",
      content: (
        <div className="bg-gray-100 rounded-xl p-8 mb-6">
          <div className="w-48 h-48 mx-auto bg-gradient-ig rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">🔗 Link Sticker</span>
          </div>
        </div>
      )
    },
    {
      title: "Paste your link!",
      description: "Paste the Segredin link you copied",
      content: (
        <div className="bg-gray-100 rounded-xl p-8 mb-6">
          <div className="w-48 h-48 mx-auto bg-gradient-alt-1 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">📋 Paste Link</span>
          </div>
        </div>
      )
    },
    {
      title: "Frame the link!",
      description: "Position and style your link sticker, then share your story",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-xl p-8">
            <div className="w-48 h-48 mx-auto bg-gradient-alt-2 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">🎨 Frame It</span>
            </div>
          </div>
          <Button variant="pill-black" size="lg" className="w-full" onClick={onClose}>
            <Instagram className="w-5 h-5 mr-2" />
            Instagram Share
          </Button>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Share on Instagram Story</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <Stepper 
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>

        {currentStep < steps.length - 1 && (
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              variant="ghost" 
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button 
              variant="default" 
              onClick={handleNext}
              className="flex-1"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}