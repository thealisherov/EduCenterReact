import React from 'react'

const Button = ({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props 
}) => {
  
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-sm hover:shadow-md',
    outline: 'border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white focus:ring-blue-500',
    outlineSecondary: 'border-2 border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'text-gray-700 bg-transparent hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm hover:shadow-md',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 shadow-sm hover:shadow-md',
    info: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500 shadow-sm hover:shadow-md',
    light: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    dark: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500 shadow-sm hover:shadow-md'
  }
  
  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  }
  
  const classes = `
    ${baseClasses} 
    ${variants[variant]} 
    ${sizes[size]} 
    ${fullWidth ? 'w-full' : ''} 
    ${className}
  `.trim().replace(/\s+/g, ' ')
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="h-4 w-4 mr-2" />
      )}
      
      {children}
      
      {!loading && Icon && iconPosition === 'right' && <Icon className="h-4 w-4 ml-2" />}
    </button>
  )
}

// Button Group Component
export const ButtonGroup = ({ children, className = '' }) => {
  return (
    <div className={`inline-flex rounded-lg shadow-sm ${className}`} role="group">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const isFirst = index === 0
          const isLast = index === React.Children.count(children) - 1
          
          return React.cloneElement(child, {
            className: `
              ${child.props.className || ''}
              ${isFirst ? 'rounded-r-none' : ''}
              ${isLast ? 'rounded-l-none' : ''}
              ${!isFirst && !isLast ? 'rounded-none' : ''}
              ${!isFirst ? '-ml-px' : ''}
            `.trim().replace(/\s+/g, ' ')
          })
        }
        return child
      })}
    </div>
  )
}

export default Button