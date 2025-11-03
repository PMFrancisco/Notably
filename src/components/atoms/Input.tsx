import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error = false, type = 'text', ...props }, ref) => {
    const baseClasses = 'flex h-10 w-full rounded-md border border-border bg-white/50 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-sm disabled:cursor-not-allowed disabled:opacity-50';
    
    const errorClasses = error ? 'border-destructive focus-visible:border-destructive' : '';
    
    const classes = [baseClasses, errorClasses, className]
      .filter(Boolean)
      .join(' ');

    return (
      <input
        type={type}
        className={classes}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
export type { InputProps }; 