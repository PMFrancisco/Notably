import { HTMLAttributes, forwardRef } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const baseClasses = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
    
    const variants = {
      default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
      secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      outline: 'text-foreground',
    };

    const classes = [baseClasses, variants[variant], className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props} />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps }; 