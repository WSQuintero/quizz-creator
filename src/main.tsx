import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router.tsx'
import { ContextProvider } from './context/GeneralContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
)
