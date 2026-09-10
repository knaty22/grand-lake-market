import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:brightness-95',
        secondary: 'bg-secondary text-secondary-foreground hover:brightness-110',
        outline: 'border border-input bg-background text-foreground hover:bg-muted',
        ghost: 'text-muted-foreground hover:bg-muted hover:text-foreground',
        link: 'text-foreground underline-offset-4 hover:underline',
        destructive: 'bg-destructive text-white hover:brightness-95',
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 px-3 text-[13px]',
        lg: 'h-12 px-6 text-base',
        icon: 'size-10',
        block: 'h-12 w-full px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
