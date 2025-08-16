import * as React from "react";
import { cn } from "@/lib/utils";

interface StepperProps {
  steps: Array<{
    title: string;
    description: string;
    content?: React.ReactNode;
  }>;
  currentStep: number;
  onStepChange?: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepChange }: StepperProps) {
  return (
    <div className="w-full">
      {/* Step indicators */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((_, index) => (
          <React.Fragment key={index}>
            <button
              onClick={() => onStepChange?.(index)}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                index <= currentStep
                  ? "bg-brand text-white shadow-brand"
                  : "bg-gray-200 text-gray-400"
              )}
            >
              {index + 1}
            </button>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-12 h-0.5 mx-2 transition-colors",
                  index < currentStep ? "bg-brand" : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step content */}
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">{steps[currentStep]?.title}</h3>
        <p className="text-muted-foreground mb-6">{steps[currentStep]?.description}</p>
        {steps[currentStep]?.content}
      </div>
    </div>
  );
}