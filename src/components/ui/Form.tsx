import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, LabelHTMLAttributes } from 'react'

interface FormProps {
  children: React.ReactNode
  className?: string
}

const Form = ({ children, className = '' }: FormProps) => {
  return (
    <form className={`form-swiss ${className}`}>
      {children}
    </form>
  )
}

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  required?: boolean
}

const Label = ({ children, required = false, className = '', ...props }: LabelProps) => {
  return (
    <label className={`block text-sm font-medium text-primary mb-2 ${className}`} {...props}>
      {children}
      {required && <span className="text-accent ml-1">*</span>}
    </label>
  )
}

type InputProps = React.ComponentPropsWithoutRef<'input'>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-accent focus:outline-none transition-colors ${className}`}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

type TextareaProps = React.ComponentPropsWithoutRef<'textarea'>

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-accent focus:outline-none transition-colors resize-vertical min-h-[120px] ${className}`}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

interface FormFieldProps {
  children: React.ReactNode
  className?: string
}

const FormField = ({ children, className = '' }: FormFieldProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {children}
    </div>
  )
}

Form.Field = FormField
Form.Label = Label
Form.Input = Input
Form.Textarea = Textarea

export default Form 