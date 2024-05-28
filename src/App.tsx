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
    <div>
      <article>
        <form onSubmit={handleInit}>
          <label htmlFor='user'>
            Indica que tipo de usuario eres
            <div>
              <span>Profesor</span>
              <input type='radio' name='user' id='user' data-type='teacher' />
            </div>
            <div>
              <span>Estudiante</span>
              <input type='radio' name='user' id='user' data-type='student' />
            </div>
          </label>
          <GeneralButton type='submit'>Ingresar</GeneralButton>
        </form>
      </article>
    </div>
  )
}

export default App
