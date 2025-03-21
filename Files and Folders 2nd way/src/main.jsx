import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Explorer } from './context/Explorer.jsx'

createRoot(document.getElementById('root')).render(
    <Explorer>
        <App />
    </Explorer>
)
