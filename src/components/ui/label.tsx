import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(
  (
    {
      className,
      children,
      id,
      htmlFor,
      form,
      slot,
      style,
      title,
      key,
      asChild,
    },
    ref,
  ) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      id={id}
      htmlFor={htmlFor}
      form={form}
      slot={slot}
      style={style}
      title={title}
      key={key}
      asChild={asChild}
    >
      {children}
    </LabelPrimitive.Root>
  ),
);
Label.displayName = LabelPrimitive.Root.displayName;

export default Label;
