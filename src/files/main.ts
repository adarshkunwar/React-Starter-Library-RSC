export const mainPage = `
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import {Provider} from 'react-redux'
import {store} from '@/config/store'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryDelay: 300,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Toaster 
            position="top-right"
            reverseOrder={false} /> 
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
)

`;
