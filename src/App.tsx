import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Leads from './pages/Leads'
import LeadDetail from './pages/LeadDetail'
import { useTitle } from './hooks/use-title'

function App() {
  const appTitle = import.meta.env.VITE_APP_TITLE;
  if (appTitle) {
    useTitle(appTitle);
  }
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Leads />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/leads/:id" element={<LeadDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
