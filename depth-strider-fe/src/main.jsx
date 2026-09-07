import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import Surveys from './pages/Surveys'
import SurveyDetail from './pages/SurveyDetail'
import SonarAnalysis from './pages/SonarAnalysis'
import DetectionDetail from './pages/DetectionDetail'
import './index.css'  

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="surveys" element={<Surveys />} />
          <Route path="surveys/:id" element={<SurveyDetail />} />
          <Route path="sonar/:detectionId" element={<SonarAnalysis />} />
          <Route path="detections" element={<DetectionDetail />} />
          <Route path="history" element={<div>History coming soon…</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
