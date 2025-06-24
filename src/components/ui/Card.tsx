import React, { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => {
    const classes = [
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props} />
    );
  }
);

const CardHeader = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => {
    const classes = [
      'flex flex-col space-y-1.5 p-6',
      className
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props} />
    );
  }
);

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', ...props }, ref) => {
    const classes = [
      'text-2xl font-semibold leading-none tracking-tight',
      className
    ].filter(Boolean).join(' ');

    return (
      <h3 ref={ref} className={classes} {...props} />
    );
  }
);

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className = '', ...props }, ref) => {
    const classes = [
      'text-sm text-muted-foreground',
      className
    ].filter(Boolean).join(' ');

    return (
      <p ref={ref} className={classes} {...props} />
    );
  }
);

const CardContent = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => {
    const classes = [
      'p-6 pt-0',
      className
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props} />
    );
  }
);

const CardFooter = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => {
    const classes = [
      'flex items-center p-6 pt-0',
      className
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props} />
    );
  }
);

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export type { CardProps }; 