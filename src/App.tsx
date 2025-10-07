import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useTitle } from '@/hooks/use-title'
import { ThemeProvider } from 'next-themes'
import { Toaster } from "@/components/ui/sonner"
import { AuthGuard } from '@/auth/utils/AuthGuard'
import { SessionProvider } from '@/auth/context/SessionContext'
import { enableAuth } from '@/utils/miscelanea'

import Home from '@/pages/Home'
import ProductsPage from '@/pages/ProductsPage'
import ProductDetail from '@/pages/ProductDetail'
import NotFound from '@/pages/NotFound'
import AuthRoutes from '@/auth/AuthRoutes'

function App() {
  const appTitle = import.meta.env.VITE_APP_TITLE;
  if (appTitle) {
    useTitle(appTitle);
  }
  return (
    <ThemeProvider defaultTheme="dark" storageKey="timbal-theme" attribute="class">
      <SessionProvider>
        <Toaster position="top-right" duration={3000} />
        <BrowserRouter>
          <Routes>
            <Route index element={<AuthGuard requireAuth> <Home /> </AuthGuard>} />
            <Route path="/products" element={<AuthGuard requireAuth> <ProductsPage /> </AuthGuard>} />
            <Route path="products/:id" element={<AuthGuard requireAuth> <ProductDetail /> </AuthGuard>} />
            <Route path="*" element={<NotFound />} />
            {/* AUTH routes are only shown if authentication is enabled */}
            <Route path="/auth/*" element={<AuthGuard>
              {enableAuth ? <AuthRoutes /> : <Navigate to="/" />}
            </AuthGuard>} />
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </ThemeProvider>
  )
}

export default App
