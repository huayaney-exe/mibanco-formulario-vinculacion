'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, checked, onChange, id, ...props }, ref) => {
    const checkboxId = id || props.name;

    return (
      <div className={cn('relative', className)}>
        <label
          htmlFor={checkboxId}
          className="flex items-start gap-3 cursor-pointer"
        >
          <div className="flex items-center h-5 mt-0.5">
            <div className="relative">
              <input
                ref={ref}
                type="checkbox"
                id={checkboxId}
                checked={checked}
                onChange={onChange}
                className="sr-only peer"
                {...props}
              />
              <div
                className={cn(
                  'w-5 h-5 border-2 rounded transition-all duration-150',
                  'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-[var(--mibanco-green)]',
                  checked
                    ? 'bg-[var(--mibanco-green)] border-[var(--mibanco-green)]'
                    : 'bg-white border-gray-300',
                  error && !checked && 'border-red-500'
                )}
              >
                {checked && (
                  <Check className="w-full h-full text-white p-0.5" strokeWidth={3} />
                )}
              </div>
            </div>
          </div>
          <div className="flex-1">
            {label && (
              <span className="text-sm font-medium text-gray-900">{label}</span>
            )}
            {description && (
              <p className="text-sm text-gray-500 mt-0.5">{description}</p>
            )}
          </div>
        </label>
        {error && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1 ml-8">
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
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
