interface SectionDividerProps {
  variant?: 'default' | 'accent' | 'dots'
  className?: string
}

const SectionDivider = ({ variant = 'default', className = '' }: SectionDividerProps) => {
  if (variant === 'accent') {
    return (
      <div className={`py-12 bg-white ${className}`}>
        <div className="container-swiss">
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className="px-6">
              <div className="w-3 h-3 bg-swiss-red rounded-full"></div>
            </div>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={`py-8 bg-gray-50 ${className}`}>
        <div className="container-swiss">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-swiss-red rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`py-6 bg-gray-50 ${className}`}>
      <div className="container-swiss">
        <div className="h-px bg-gray-200"></div>
      </div>
    </div>
  )
}

export default SectionDivider 