export type Message = {
  id: string;
  title: string;
  preview: string;
  createdAt: string;
  read?: boolean;
  body?: string;
  hint?: string;
};

export type GradientVariant = 'ig' | 'alt-1' | 'alt-2';

export type StepperStep = {
  title: string;
  description: string;
  image?: string;
};