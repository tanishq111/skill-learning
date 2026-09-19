import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Comp1 from './comp1.jsx'
import Comp2 from './comp2.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Comp1 name="Tanishq" />
    <App name="Tanishq" />
    <Comp2 name="Tanishq" />
  </StrictMode>,
)
