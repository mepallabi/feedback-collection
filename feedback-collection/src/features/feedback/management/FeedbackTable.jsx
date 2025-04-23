import PropTypes from 'prop-types';
import { formatDate } from '../../../utils/dateUtils';

const FeedbackTable = ({ feedback, onViewDetails, loading }) => {
  if (loading) {
    return <div className="text-center text-gray-400">Loading feedback...</div>;
  }

  if (feedback.length === 0) {
    return <div className="text-center text-gray-400">No feedback submissions yet.</div>;
  }

  return (
    <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-750">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Designation
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Submitted At
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {feedback.map((item) => (
              <tr key={item.id} className="hover:bg-gray-750">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {item.submitter.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {item.submitter.designation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {formatDate(item.submittedAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => onViewDetails(item)}
                    className="text-purple-400 hover:text-purple-300 focus:outline-none focus:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

FeedbackTable.propTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      submitter: PropTypes.shape({
        name: PropTypes.string.isRequired,
        designation: PropTypes.string.isRequired,
      }).isRequired,
      submittedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onViewDetails: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FeedbackTable; 