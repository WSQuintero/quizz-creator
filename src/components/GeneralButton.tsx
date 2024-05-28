import { GeneralButtonProps } from '../types/GeneralComponentsTypes'

function GeneralButton({ children, ...props }: GeneralButtonProps) {
  return <button className='w-auto p-3 rounded-xl border border-gray-400' {...props}>{children}</button>
}

export default GeneralButton
