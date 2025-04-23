import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { getRelativeTime } from '../../../utils/dateUtils';

const FeedbackModal = ({ feedback, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Feedback Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-750 rounded-lg p-4 border border-gray-600">
            <h4 className="text-white font-medium mb-2">Submitter Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Name:</span>
                <span className="text-white ml-2">{feedback.submitter.name}</span>
              </div>
              <div>
                <span className="text-gray-400">Designation:</span>
                <span className="text-white ml-2">{feedback.submitter.designation}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400">Submitted:</span>
                <span className="text-white ml-2">{getRelativeTime(feedback.submittedAt)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-medium">Feedback Areas</h4>
            {feedback.feedback.map((area) => (
              <div key={area.areaId} className="bg-gray-750 rounded-lg p-4 border border-gray-600">
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <h5 className="text-white font-medium mb-3">
                      {area.areaId.charAt(0).toUpperCase() + area.areaId.slice(1)}
                    </h5>
                    {area.comment ? (
                      <p className="text-gray-300 text-base whitespace-pre-wrap leading-relaxed">
                        {area.comment}
                      </p>
                    ) : (
                      <p className="text-gray-500 italic text-sm">No comments provided</p>
                    )}
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className="flex items-center">
                      <span className="text-gray-400 text-xs mr-1">Rating:</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < area.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {feedback.submitter.additionalComment && (
            <div className="bg-gray-750 rounded-lg p-4 border border-gray-600 mt-6">
              <h4 className="text-white font-medium mb-3">Additional Comments</h4>
              <p className="text-gray-300 text-base whitespace-pre-wrap leading-relaxed">
                {feedback.submitter.additionalComment}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

FeedbackModal.propTypes = {
  feedback: PropTypes.shape({
    submitter: PropTypes.shape({
      name: PropTypes.string.isRequired,
      designation: PropTypes.string.isRequired,
      additionalComment: PropTypes.string,
    }).isRequired,
    feedback: PropTypes.arrayOf(
      PropTypes.shape({
        areaId: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FeedbackModal; 