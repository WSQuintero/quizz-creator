import { GeneralButtonProps } from '../types/GeneralComponentsTypes'

function GeneralButton({ children, ...props }: GeneralButtonProps) {
  return <button {...props}>{children}</button>
}

export default GeneralButton
