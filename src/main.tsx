import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext'
import { AccessProvider } from './context/AccessContext.tsx'
import { MusicProvider } from './context/MusicContext.tsx'
import { VideoProvider } from './context/VideoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <AccessProvider>
        <MusicProvider>
          <VideoProvider>
            <App />
          </VideoProvider>
        </MusicProvider>
      </AccessProvider>
    </LanguageProvider >
  </StrictMode >,
)
