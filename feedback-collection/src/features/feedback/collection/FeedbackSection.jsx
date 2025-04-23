import PropTypes from 'prop-types';
import StarRating from '../../shared/StarRating';
import { motion } from 'framer-motion';

const FeedbackSection = ({ area, rating, comment, onRatingChange, onCommentChange }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "tween", duration: 0.2 }}
      className="mb-6 bg-gradient-to-br from-gray-800 to-gray-800/80 rounded-xl p-6 border border-gray-700 hover:border-gray-500 transition-colors duration-200 shadow-lg"
    >
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-white tracking-wide">{area.title}</h3>
            <div className="h-0.5 w-12 bg-purple-500/50 mt-2 rounded-full"></div>
          </div>
          <div className="flex items-center gap-3 bg-gray-700/50 px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-300">Overall rating:</span>
            <StarRating rating={rating} onRatingChange={onRatingChange} />
          </div>
        </div>
        <textarea
          className="w-full p-4 bg-gray-700/50 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 placeholder-gray-400 transition-colors duration-200"
          rows="4"
          placeholder={area.placeholder}
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
        />
      </div>
    </motion.div>
  );
};

FeedbackSection.propTypes = {
  area: PropTypes.shape({
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
  }).isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
};

export default FeedbackSection; 