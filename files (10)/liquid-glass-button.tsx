"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const liquidButtonVariants = cva(
  "relative inline-flex items-center justify-content cursor-pointer gap-2 whitespace-nowrap font-medium transition-all duration-250 disabled:pointer-events-none disabled:opacity-50 rounded-full border backdrop-blurของ",
  {
    variants: {
      variant: {
        default:
          "border-white/25 bg-white/6 text-white hover:bg-white/12 hover:border-white/40 hover:-translate-y-px",
        primary:
          "border-emerald-400/50 bg-emerald-400/15 text-emerald-400 hover:bg-emerald-400/25 hover:text-white hover:shadow-[0_0_30px_rgba(74,222,128,0.25)]",
      },
      size: {
        default: "h-9 px-5 text-xs tracking-widest uppercase",
        lg:      "h-11 px-7 text-xs tracking-widest uppercase",
        xl:      "h-13 px-9 text-sm tracking-widest uppercase",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidButtonVariants> {
  asChild?: boolean
  href?: string
}

function GlassFilter() {
  return (
    <svg className="hidden" aria-hidden>
      <defs>
        <filter id="glass-filter" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence"/>
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise"/>
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="40" xChannelSelector="R" yChannelSelector="B" result="displaced"/>
          <feGaussianBlur in="displaced" stdDeviation="2" result="finalBlur"/>
          <feComposite in="finalBlur" in2="finalBlur" operator="over"/>
        </filter>
      </defs>
    </svg>
  )
}

export function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  href,
  ...props
}: LiquidButtonProps & { href?: string }) {
  const Comp = href ? "a" : asChild ? Slot : "button"

  return (
    <>
      <GlassFilter />
      <Comp
        href={href}
        className={cn(
          liquidButtonVariants({ variant, size }),
          "shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.4),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.2),inset_0_0_6px_6px_rgba(255,255,255,0.04),0_0_12px_rgba(0,0,0,0.15)]",
          "active:scale-[0.98] active:translate-y-px",
          className
        )}
        style={{ backdropFilter: 'blur(12px) url("#glass-filter")' }}
        {...(props as any)}
      >
        <span className="relative z-10">{children}</span>
      </Comp>
    </>
  )
}
