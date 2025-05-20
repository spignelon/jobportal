import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnalyzerPage from './pages/AnalyzerPage';
import JobsPage from './pages/JobsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnalyzerPage />} />
        <Route path="/jobs" element={<JobsPage />} />
      </Routes>
    </Router>
  );
}

export default App;