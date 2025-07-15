import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error = false, ...props }, ref) => {
    const baseClasses = 'flex min-h-[80px] w-full rounded-md border border-border bg-white/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none';
    
    const errorClasses = error ? 'border-destructive focus-visible:ring-destructive' : '';
    
    const classes = [baseClasses, errorClasses, className]
      .filter(Boolean)
      .join(' ');

    return (
      <textarea
        className={classes}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
export type { TextareaProps }; 