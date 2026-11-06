import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-300 ease-base active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#FFFFFF] text-[#000000] hover:bg-[#FFFFFF]/90 border border-transparent",
        destructive: "bg-red-950/80 text-red-200 border border-red-900/50 hover:bg-red-900/60",
        outline: "border border-[#272727] bg-[#181818] hover:bg-[#1F1F1F] text-[#FFFFFF]",
        secondary: "bg-[#1F1F1F] text-[#FFFFFF] border border-[#272727] hover:bg-[#272727]",
        ghost: "hover:bg-[#181818] text-[#9B9B9B] hover:text-[#FFFFFF]",
        link: "text-[#FFFFFF] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-3 py-2 text-sm", // 8px vertical, 12px horizontal per elayadesign/ai-design-skills
        sm: "h-8 rounded-md px-2.5 text-xs",
        lg: "h-10 rounded-md px-4 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
