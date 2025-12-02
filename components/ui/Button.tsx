'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-[var(--mibanco-green)] text-white hover:bg-[var(--green-600)] active:bg-[var(--green-700)] focus-visible:ring-[var(--mibanco-green)]',
      secondary:
        'bg-[var(--mibanco-yellow)] text-gray-900 hover:bg-[var(--yellow-600)] active:bg-[var(--yellow-700)] focus-visible:ring-[var(--mibanco-yellow)]',
      outline:
        'border-2 border-[var(--mibanco-green)] text-[var(--mibanco-green)] bg-transparent hover:bg-[var(--mibanco-green)] hover:text-white focus-visible:ring-[var(--mibanco-green)]',
      ghost:
        'text-[var(--mibanco-green)] bg-transparent hover:bg-[var(--green-50)] focus-visible:ring-[var(--mibanco-green)]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-full',
      md: 'px-5 py-2.5 text-base rounded-full',
      lg: 'px-6 py-3 text-lg rounded-full',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Cargando...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
