import React, { LabelHTMLAttributes, forwardRef } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = '', ...props }, ref) => {
    const classes = [
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    ].filter(Boolean).join(' ');

    return (
      <label ref={ref} className={classes} {...props} />
    );
  }
);

Label.displayName = 'Label';

export { Label };
export type { LabelProps }; 