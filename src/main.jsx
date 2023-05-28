import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Route/Route.jsx'
import { HelmetProvider } from 'react-helmet-async';
import Authproviders from './Providers/Authproviders'
import {
  
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authproviders>
    
    <HelmetProvider>
    <QueryClientProvider client={queryClient}>
    <div className='max-w-4xl mx-auto'>
    <RouterProvider router={router} />
    </div>
    </QueryClientProvider>
   
    </HelmetProvider>

    </Authproviders>
  </React.StrictMode>,
)
