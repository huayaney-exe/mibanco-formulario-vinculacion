'use client';

import { forwardRef, useState, type ChangeEvent } from 'react';
import { cn } from '@/lib/utils';
import { formatPhone } from '@/lib/utils';

export interface PhoneInputProps {
  label?: string;
  error?: string;
  warning?: string;
  hint?: string;
  required?: boolean;
  name?: string;
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      label,
      error,
      warning,
      hint,
      required,
      name,
      id,
      value = '',
      onChange,
      disabled,
      className,
    },
    ref
  ) => {
    const inputId = id || name;
    const [displayValue, setDisplayValue] = useState(formatPhone(value));

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, '').slice(0, 10);
      setDisplayValue(formatPhone(rawValue));
      if (onChange) {
        onChange(rawValue);
      }
    };

    // Auto-generate warning for incomplete phone
    const autoWarning =
      !error && value && value.length > 0 && value.length < 10
        ? `Parece que faltan dígitos (${value.length}/10)`
        : warning;

    const getStateStyles = () => {
      if (error) return 'border-[var(--error)] focus:border-[var(--error)] focus:ring-red-100';
      if (autoWarning) return 'border-[var(--warning)] focus:border-[var(--warning)] focus:ring-amber-100';
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
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </span>
          <input
            ref={ref}
            id={inputId}
            name={name}
            type="tel"
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            disabled={disabled}
            placeholder="300 123 4567"
            className={cn(
              'w-full pl-12 pr-4 py-3 text-base border rounded-lg transition-all duration-150',
              'placeholder:text-gray-400',
              'focus:outline-none focus:ring-2',
              'disabled:bg-gray-50 disabled:cursor-not-allowed',
              getStateStyles()
            )}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : autoWarning
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
        {autoWarning && !error && (
          <p id={`${inputId}-warning`} className="mt-1.5 text-sm text-amber-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {autoWarning}
          </p>
        )}
        {hint && !error && !autoWarning && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-gray-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
