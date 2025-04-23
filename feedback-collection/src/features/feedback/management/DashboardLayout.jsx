import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import LoginForm from '../../auth/LoginForm';
import FeedbackTable from './FeedbackTable';
import FeedbackModal from './FeedbackModal';

const DashboardLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      if (user) {
        fetchFeedback();
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = () => {
    fetchFeedback();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setFeedback([]);
    } catch (error) {
      setError('Error signing out');
    }
  };

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'feedback'), orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const feedbackData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFeedback(feedbackData);
    } catch (error) {
      setError('Error fetching feedback');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Feedback Dashboard</h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="text-red-400 text-sm text-center mb-4">{error}</div>
        )}

        <FeedbackTable
          feedback={feedback}
          loading={loading}
          onViewDetails={setSelectedFeedback}
        />

        {selectedFeedback && (
          <FeedbackModal
            feedback={selectedFeedback}
            onClose={() => setSelectedFeedback(null)}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardLayout; 