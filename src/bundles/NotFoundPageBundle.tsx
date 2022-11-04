import React from 'react'
import { createRoot } from 'react-dom/client'
import { HiLink } from 'react-icons/hi2'
import { AppContainer } from '../components/AppContainer'
import { NotFoundPage } from '../components/NotFoundPage'

createRoot(document.getElementById('root')!).render(
  <AppContainer>
    <NotFoundPage icon={HiLink} text="404 - The page doesn't exist" logo={true} />
  </AppContainer>,
)
