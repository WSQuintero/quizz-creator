import { useNavigate } from 'react-router'
import { FormEvent } from 'react'
import './App.css'
import GeneralButton from './components/GeneralButton'

function App() {
  const navigate = useNavigate()

  const handleInit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const elements = form.elements as HTMLFormControlsCollection
    const userElement = elements.namedItem('user') as RadioNodeList
    const arrayElements = [...userElement]

    arrayElements.forEach((input) => {
      const inputElement = input as HTMLInputElement
      if (inputElement.checked) {
        const type = inputElement.dataset.type
        navigate(`/${type}`)
      }
    })
  }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <article className='w-2/4 h-2/4 border border-gray-400 p-5  rounded-xl flex '>
        <form onSubmit={handleInit} className='w-full flex flex-col items-center justify-center gap-5'>
          <label htmlFor='user' >
            <h3 className='text-center font-bold mb-5'>Indica que tipo de usuario eres</h3>
            <div className='flex gap-2'>
            <div className='flex flex-col justify-around gap-5  w-2/4 items-center border border-gray-400 p-5 shrink-0' >
              <span>Profesor</span>
              <input className='cursor-pointer' type='radio' name='user' id='user' data-type='teacher' />
            </div>
            <div className='flex flex-col w-2/4 justify-around gap-5 h-full items-center border border-gray-400 p-5 shrink-0' >
              <span>Estudiante</span>
              <input className='cursor-pointer' type='radio' name='user' id='user' data-type='student' />
            </div>
            </div>
          </label>
          <GeneralButton type='submit'>Ingresar</GeneralButton>
        </form>
      </article>
    </div>
  )
}

export default App
