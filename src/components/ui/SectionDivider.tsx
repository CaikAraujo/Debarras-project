import React from 'react'

type SectionDividerProps = {
  variant?: 'default' | 'accent' | 'dots'
}

export default function SectionDivider({ variant = 'default' }: SectionDividerProps) {
  if (variant === 'accent') {
    return <div className="section-divider-accent" />
  }

  if (variant === 'dots') {
    // A classe `bg-pattern-dots` precisa de altura, que `py-8` fornece.
    return <div className="py-8 bg-pattern-dots" />
  }

  return <div className="section-divider" />
} 