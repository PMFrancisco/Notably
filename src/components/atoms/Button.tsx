import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = '', 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false,
    children, 
    ...props 
  }, ref) => {
    // Base hand-drawn style classes
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-500 ease-in-out focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none bg-transparent border-[7px] border-solid border-foreground tracking-wide shadow-[20px_38px_34px_-26px_rgba(0,0,0,0.2)] hover:shadow-[2px_8px_4px_-6px_rgba(0,0,0,0.3)]';
    
    // Hand-drawn irregular border radius using arbitrary values
    const handDrawnRadius = '[border-radius:255px_15px_225px_15px/15px_225px_15px_255px]';
    
    const variants = {
      primary: 'text-primary hover:text-primary/90',
      secondary: 'text-secondary-foreground hover:text-secondary-foreground/90',
      destructive: 'text-destructive hover:text-destructive/90',
      outline: 'text-foreground hover:text-foreground/90',
      ghost: 'text-foreground hover:text-foreground/90',
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-4 text-base',
      lg: 'px-6 py-5 text-lg',
    };

    const classes = [
      baseClasses,
      handDrawnRadius,
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