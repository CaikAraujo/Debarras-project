import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
}

const Card = ({ children, hover = false, className = '', ...props }: CardProps) => {
  const baseClasses = 'card-swiss p-6'
  const hoverClasses = hover ? 'hover:shadow-md cursor-pointer' : ''
  const classes = `${baseClasses} ${hoverClasses} ${className}`.trim()
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardHeader = ({ children, className = '', ...props }: CardHeaderProps) => {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardContent = ({ children, className = '', ...props }: CardContentProps) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const CardTitle = ({ children, className = '', ...props }: CardTitleProps) => {
  return (
    <h3 className={`text-primary font-semibold text-lg mb-2 ${className}`} {...props}>
      {children}
    </h3>
  )
}

Card.Header = CardHeader
Card.Content = CardContent
Card.Title = CardTitle

export default Card 