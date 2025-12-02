'use client';

import { type ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  collapsible?: boolean;
  className?: string;
  badge?: string;
}

export function SectionCard({
  title,
  description,
  children,
  defaultOpen = true,
  collapsible = false,
  className,
  badge,
}: SectionCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        'bg-white border border-gray-200 rounded-xl overflow-hidden',
        className
      )}
    >
      <div
        className={cn(
          'px-5 py-4 bg-gray-50 border-b border-gray-200',
          collapsible && 'cursor-pointer hover:bg-gray-100 transition-colors'
        )}
        onClick={() => collapsible && setIsOpen(!isOpen)}
        role={collapsible ? 'button' : undefined}
        aria-expanded={collapsible ? isOpen : undefined}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            {badge && (
              <span className="px-2 py-0.5 text-xs font-medium bg-[var(--mibanco-yellow)] text-gray-900 rounded-full">
                {badge}
              </span>
            )}
          </div>
          {collapsible && (
            <ChevronDown
              className={cn(
                'w-5 h-5 text-gray-500 transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
            />
          )}
        </div>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
      {(!collapsible || isOpen) && (
        <div className="p-5 animate-fadeIn">{children}</div>
      )}
    </div>
  );
}
