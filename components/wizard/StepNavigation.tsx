'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getStepUrl } from '@/lib/utils';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onBack?: () => void;
  isNextDisabled?: boolean;
  isLoading?: boolean;
  nextLabel?: string;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isNextDisabled = false,
  isLoading = false,
  nextLabel,
}: StepNavigationProps) {
  const router = useRouter();
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (!isFirstStep) {
      router.push(getStepUrl(currentStep - 1));
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
        {!isFirstStep ? (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Atrás
          </Button>
        ) : (
          <div /> // Spacer
        )}

        <Button
          type="button"
          variant="primary"
          onClick={handleNext}
          disabled={isNextDisabled}
          isLoading={isLoading}
          className="flex items-center gap-2"
        >
          {nextLabel || (isLastStep ? 'Revisar' : 'Continuar')}
          {!isLastStep && <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}
