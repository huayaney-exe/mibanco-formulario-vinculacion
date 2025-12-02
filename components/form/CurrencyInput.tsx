'use client';

import { forwardRef, useState, type ChangeEvent } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency, parseCurrency } from '@/lib/utils';

export interface CurrencyInputProps {
  label?: string;
  error?: string;
  warning?: string;
  hint?: string;
  required?: boolean;
  name?: string;
  id?: string;
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
  readOnly?: boolean;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      label,
      error,
      warning,
      hint,
      required,
      name,
      id,
      value = 0,
      onChange,
      disabled,
      className,
      readOnly,
    },
    ref
  ) => {
    const inputId = id || name;
    const [displayValue, setDisplayValue] = useState(formatDisplayValue(value));

    function formatDisplayValue(num: number): string {
      if (num === 0) return '';
      return num.toLocaleString('es-CO');
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const numericValue = parseCurrency(rawValue);
      setDisplayValue(formatDisplayValue(numericValue));
      if (onChange) {
        onChange(numericValue);
      }
    };

    const getStateStyles = () => {
      if (error) return 'border-[var(--error)] focus:border-[var(--error)] focus:ring-red-100';
      if (warning) return 'border-[var(--warning)] focus:border-[var(--warning)] focus:ring-amber-100';
      return 'border-gray-300 focus:border-[var(--mibanco-green)] focus:ring-green-100';
    };

    return (
      <div className={cn('w-full', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            $
          </span>
          <input
            ref={ref}
            id={inputId}
            name={name}
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            disabled={disabled}
            readOnly={readOnly}
            placeholder="0"
            className={cn(
              'w-full pl-8 pr-4 py-3 text-base border rounded-lg transition-all duration-150',
              'placeholder:text-gray-400 text-right',
              'focus:outline-none focus:ring-2',
              'disabled:bg-gray-50 disabled:cursor-not-allowed',
              readOnly && 'bg-gray-50 cursor-default',
              getStateStyles()
            )}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : warning
                ? `${inputId}-warning`
                : hint
                ? `${inputId}-hint`
                : undefined
            }
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
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
          <p id={`${inputId}-warning`} className="mt-1.5 text-sm text-amber-600 flex items-center gap-1">
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
        {hint && !error && !warning && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-gray-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';

export { CurrencyInput };
