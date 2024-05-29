import { GeneralButtonProps } from '../types/GeneralComponentsTypes'

function GeneralButton({
  children,
  className = '',
  ...props
}: GeneralButtonProps) {
  const baseStyles = 'w-auto p-3 rounded-xl bg-white border border-gray-400'
  const combinedClassName = `${baseStyles} ${className}`

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  )
}

export default GeneralButton
