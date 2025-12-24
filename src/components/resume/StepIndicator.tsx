import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export const StepIndicator = ({ steps, currentStep, onStepClick }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-1 md:gap-2">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={step} className="flex items-center">
            <button
              onClick={() => onStepClick?.(index)}
              disabled={!onStepClick}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1.5 md:px-3 md:py-2 rounded-lg transition-all duration-300",
                isCompleted && "bg-accent/10 text-accent",
                isCurrent && "bg-primary text-primary-foreground shadow-card",
                !isCompleted && !isCurrent && "text-muted-foreground",
                onStepClick && "cursor-pointer hover:bg-muted"
              )}
            >
              <span
                className={cn(
                  "w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[10px] md:text-xs font-semibold transition-all duration-300",
                  isCompleted && "gradient-accent text-accent-foreground",
                  isCurrent && "bg-primary-foreground text-primary",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-3 w-3" />
                ) : (
                  index + 1
                )}
              </span>
              <span className="hidden md:inline text-xs font-medium">{step}</span>
            </button>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-4 md:w-8 h-0.5 mx-1 transition-colors duration-300",
                  isCompleted ? "bg-accent" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
