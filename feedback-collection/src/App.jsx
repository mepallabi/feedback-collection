import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeedbackForm from './features/feedback/collection/FeedbackForm';
import DashboardLayout from './features/feedback/management/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/admin" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
}

export default App; 