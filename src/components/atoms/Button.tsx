import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'icon' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = '', 
    variant = 'default',
    size = 'md', 
    fullWidth = false,
    children, 
    ...props 
  }, ref) => {
    // Base classes for all buttons
    const baseClasses = 'inline-flex items-center justify-center font-medium focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none';
    
    // Variant styles
    const variants = {
      default: 'bg-transparent border-[7px] border-solid border-foreground tracking-wide shadow-[20px_38px_34px_-26px_rgba(0,0,0,0.2)] hover:shadow-[2px_8px_4px_-6px_rgba(0,0,0,0.3)] text-foreground hover:text-foreground/90 transition-all duration-500 ease-in-out [border-radius:255px_15px_225px_15px/15px_225px_15px_255px]',
      ghost: 'border-none bg-transparent hover:bg-accent transition-colors text-foreground',
      icon: 'border-none bg-transparent hover:scale-110 transition-transform text-foreground',
      destructive: 'border-none bg-transparent text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors'
    };
    
    // Size styles
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-4 text-base',
      lg: 'px-6 py-5 text-lg',
      icon: 'p-0 w-auto h-auto text-xl'
    };

    const classes = [
      baseClasses,
      variants[variant],
      sizes[size],
      fullWidth ? 'w-full' : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <button 
        className={classes} 
        ref={ref} 
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps }; 