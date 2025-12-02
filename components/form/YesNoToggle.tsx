'use client';

import { cn } from '@/lib/utils';

interface YesNoToggleProps {
  label: string;
  description?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  required?: boolean;
  error?: string;
  className?: string;
  name?: string;
}

export function YesNoToggle({
  label,
  description,
  value,
  onChange,
  required,
  error,
  className,
  name,
}: YesNoToggleProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-900">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
          {description && (
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden shrink-0">
          <button
            type="button"
            role="radio"
            aria-checked={value === false}
            name={name}
            onClick={() => onChange(false)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-all',
              value === false
                ? 'bg-[var(--mibanco-green)] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            )}
          >
            No
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={value === true}
            name={name}
            onClick={() => onChange(true)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-all border-l border-gray-200',
              value === true
                ? 'bg-[var(--mibanco-green)] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            )}
          >
            Sí
          </button>
        </div>
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
