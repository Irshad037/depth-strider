import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import Surveys from './pages/Surveys'
import SurveyDetail from './pages/SurveyDetail'
import SonarAnalysis from './pages/SonarAnalysis'
import DetectionDetail from './pages/DetectionDetail'
import Upload from './pages/Upload'
import History from './pages/History'
import 'leaflet/dist/leaflet.css'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="surveys" element={<Surveys />} />
            <Route path="surveys/:id" element={<SurveyDetail />} />
            <Route path="upload" element={<Upload />} />
            <Route path="sonar/:detectionId" element={<SonarAnalysis />} />
            <Route path="detections" element={<DetectionDetail />} />
            <Route path="history" element={<History />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
