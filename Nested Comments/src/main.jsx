import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CommentContext } from './CommentContext.jsx'

createRoot(document.getElementById('root')).render(
    <CommentContext>
        <App />
    </CommentContext>
)
