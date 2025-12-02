'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  warning?: string;
  required?: boolean;
  options: RadioOption[];
  orientation?: 'horizontal' | 'vertical';
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      label,
      error,
      warning,
      required,
      options,
      orientation = 'vertical',
      name,
      value,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const handleChange = (optionValue: string) => {
      if (onValueChange) {
        onValueChange(optionValue);
      }
    };

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <div
          className={cn(
            'flex gap-3',
            orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
          )}
          role="radiogroup"
          aria-label={label}
        >
          {options.map((option) => (
            <label
              key={option.value}
              className={cn(
                'relative flex items-start gap-3 p-3 cursor-pointer rounded-lg border transition-all',
                value === option.value
                  ? 'border-[var(--mibanco-green)] bg-[var(--green-50)]'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              )}
            >
              <div className="flex items-center h-5">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => handleChange(option.value)}
                  className={cn(
                    'w-5 h-5 border-2 rounded-full appearance-none cursor-pointer transition-all',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--mibanco-green)]',
                    value === option.value
                      ? 'border-[var(--mibanco-green)] bg-[var(--mibanco-green)]'
                      : 'border-gray-300 bg-white'
                  )}
                  style={{
                    backgroundImage:
                      value === option.value
                        ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e")`
                        : 'none',
                  }}
                  {...props}
                />
              </div>
              <div className="flex-1">
                <span
                  className={cn(
                    'text-sm font-medium',
                    value === option.value ? 'text-[var(--mibanco-green)]' : 'text-gray-900'
                  )}
                >
                  {option.label}
                </span>
                {option.description && (
                  <p className="text-sm text-gray-500 mt-0.5">{option.description}</p>
                )}
              </div>
            </label>
          ))}
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
        {warning && !error && (
          <p className="mt-1.5 text-sm text-amber-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {warning}
          </p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };
