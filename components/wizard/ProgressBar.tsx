'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  number: number;
  name: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

export function ProgressBar({ steps, currentStep, completedSteps }: ProgressBarProps) {
  return (
    <div className="w-full">
      {/* Mobile: Simple progress bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">
            Paso {currentStep} de {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {steps.find((s) => s.number === currentStep)?.name}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--mibanco-green)] transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop: Step indicators */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.number);
            const isCurrent = step.number === currentStep;
            const isPast = step.number < currentStep;

            return (
              <div key={step.number} className="flex items-center flex-1 last:flex-none">
                {/* Step circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all',
                      isCompleted
                        ? 'bg-[var(--mibanco-green)] border-[var(--mibanco-green)] text-white'
                        : isCurrent
                        ? 'bg-white border-[var(--mibanco-green)] text-[var(--mibanco-green)]'
                        : 'bg-white border-gray-300 text-gray-400'
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" strokeWidth={3} />
                    ) : (
                      <span className="text-sm font-semibold">{step.number}</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      'mt-2 text-xs font-medium text-center max-w-[80px]',
                      isCurrent ? 'text-[var(--mibanco-green)]' : 'text-gray-500'
                    )}
                  >
                    {step.name}
                  </span>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 -mt-6">
                    <div
                      className={cn(
                        'h-full transition-all duration-300',
                        isPast || isCompleted ? 'bg-[var(--mibanco-green)]' : 'bg-gray-200'
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
