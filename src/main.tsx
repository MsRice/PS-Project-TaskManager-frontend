import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/style/index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import AuthenticationProvider from './contexts/auth/AuthenticationProvider.tsx'
import TasksProvider from './contexts/task/TasksProvider.tsx'
import ThemeProvider from './contexts/themes/ThemeProvider.tsx'
import ModalProvider from './contexts/modal/ModalProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthenticationProvider>
      <ModalProvider>
        <ThemeProvider>
          <TasksProvider>
              <Router>
                <App />
              </Router>
          </TasksProvider>
        </ThemeProvider>
      </ModalProvider>
    </AuthenticationProvider>

  </StrictMode>,
)
