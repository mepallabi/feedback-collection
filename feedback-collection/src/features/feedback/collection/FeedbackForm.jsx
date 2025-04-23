import { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import FeedbackSection from './FeedbackSection';
import { FEEDBACK_AREAS } from '../../../constants/feedbackConfig';
import { validateSubmitterInfo, validateFeedback } from '../../../utils/validationUtils';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState(
    FEEDBACK_AREAS.reduce((acc, area) => ({
      ...acc,
      [area.id]: { rating: 0, comment: '' },
    }), {})
  );
  const [submitterInfo, setSubmitterInfo] = useState({
    name: '',
    designation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleRatingChange = (areaId, newRating) => {
    setFeedback((prev) => ({
      ...prev,
      [areaId]: { ...prev[areaId], rating: newRating },
    }));
  };

  const handleCommentChange = (areaId, newComment) => {
    setFeedback((prev) => ({
      ...prev,
      [areaId]: { ...prev[areaId], comment: newComment },
    }));
  };

  const handleSubmitterInfoChange = (field, value) => {
    setSubmitterInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setError(null);

    try {
      // Validate submitter info and feedback
      const submitterError = validateSubmitterInfo(submitterInfo);
      if (submitterError) throw new Error(submitterError);

      const feedbackError = validateFeedback(feedback);
      if (feedbackError) throw new Error(feedbackError);

      const feedbackData = {
        submitter: submitterInfo,
        feedback: Object.entries(feedback).map(([areaId, data]) => ({
          areaId,
          ...data,
        })),
        submittedAt: new Date().toISOString(),
      };

      // Save to Firestore
      await addDoc(collection(db, 'feedback'), feedbackData);

      // Reset form
      setFeedback(
        FEEDBACK_AREAS.reduce((acc, area) => ({
          ...acc,
          [area.id]: { rating: 0, comment: '' },
        }), {})
      );
      setSubmitterInfo({
        name: '',
        designation: ''
      });

      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
      setError(error.message || 'An error occurred while submitting feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Pallabi's Performance Feedback</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Your thoughtful and constructive feedback helps me grow professionally. 
              Extra brownie points for specific examples and actionable suggestions! 🌟
            </p>
          </motion.div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Submitter Information Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "tween", duration: 0.2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-800/80 rounded-xl p-6 border border-gray-700 hover:border-gray-500 transition-colors duration-200 shadow-lg"
            >
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-semibold text-white tracking-wide">Your Information</h3>
                  <div className="h-0.5 w-12 bg-purple-500/50 mt-2 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={submitterInfo.name}
                      onChange={(e) => handleSubmitterInfoChange('name', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-colors duration-200
                        ${!submitterInfo.name.trim() && submitStatus === 'error' ? 'border-red-500' : 'border-gray-600'}"
                      placeholder="Enter your name"
                      required
                    />
                    {!submitterInfo.name.trim() && submitStatus === 'error' && (
                      <p className="mt-1 text-sm text-red-500">Please provide your name</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="designation" className="block text-sm font-medium text-gray-300 mb-1">
                      Designation/Role
                    </label>
                    <input
                      type="text"
                      id="designation"
                      value={submitterInfo.designation}
                      onChange={(e) => handleSubmitterInfoChange('designation', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-colors duration-200"
                      placeholder="Enter your designation or role"
                      required
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feedback Areas */}
            {FEEDBACK_AREAS.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <FeedbackSection
                  area={area}
                  rating={feedback[area.id].rating}
                  comment={feedback[area.id].comment}
                  onRatingChange={(rating) => handleRatingChange(area.id, rating)}
                  onCommentChange={(comment) => handleCommentChange(area.id, comment)}
                />
              </motion.div>
            ))}

            {/* Additional Comments Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "tween", duration: 0.2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-800/80 rounded-xl p-6 border border-gray-700 hover:border-gray-500 transition-colors duration-200 shadow-lg"
            >
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-semibold text-white tracking-wide">Additional Comments</h3>
                  <div className="h-0.5 w-12 bg-purple-500/50 mt-2 rounded-full"></div>
                </div>
                <textarea
                  className="w-full p-4 bg-gray-700/50 text-white rounded-lg border border-gray-600 
                    focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 placeholder-gray-400 
                    transition-colors duration-200 min-h-[120px] resize-y"
                  placeholder="Any other feedback or comments you'd like to share..."
                  value={submitterInfo.additionalComment || ''}
                  onChange={(e) => handleSubmitterInfoChange('additionalComment', e.target.value)}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col items-center space-y-4 pt-4"
            >
              {error && (
                <div className="text-red-400 text-sm text-center bg-red-500/10 px-4 py-2 rounded-lg">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 rounded-xl text-lg font-medium text-white 
                  bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800
                  transform hover:scale-105 transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  w-full sm:w-auto`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : 'Submit Feedback'}
              </button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Thank you for your valuable feedback!</span>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>There was an error submitting your feedback. Please try again.</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbackForm; 