import { cn } from '@/lib/cn';
import { BadgeProps, badgeVariants } from './types/badgeVariants';

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge };
