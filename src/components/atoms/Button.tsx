import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = '', 
    size = 'md', 
    fullWidth = false,
    children, 
    ...props 
  }, ref) => {
    // Hand-drawn style classes
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-500 ease-in-out focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none bg-transparent border-[7px] border-solid border-foreground tracking-wide shadow-[20px_38px_34px_-26px_rgba(0,0,0,0.2)] hover:shadow-[2px_8px_4px_-6px_rgba(0,0,0,0.3)] text-foreground hover:text-foreground/90';
    
    // Hand-drawn irregular border radius
    const handDrawnRadius = '[border-radius:255px_15px_225px_15px/15px_225px_15px_255px]';
    
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-4 text-base',
      lg: 'px-6 py-5 text-lg',
    };

    const classes = [
      baseClasses,
      handDrawnRadius,
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