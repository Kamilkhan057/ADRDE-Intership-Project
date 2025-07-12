// UserReviewSection.jsx
import React, { useState, useMemo } from 'react';
import { FaReply, FaSearch, FaFilter, FaThumbsUp, FaSortAmountDown, FaSortAmountUp, FaCheckCircle, FaTimesCircle, FaStar, FaUser, FaCalendarAlt, FaTag, FaFileExport, FaChartPie, FaTrashAlt } from 'react-icons/fa';

// Confirmation Modal (reused from other components)
const ConfirmationModal = ({ onClose, onConfirm, message, title }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm relative rounded-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};


const UserReviewSection = () => {
  // Sample feedback data
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      from: 'John Doe',
      role: 'User',
      date: '2023-11-15 14:30',
      category: 'Venue Experience',
      rating: 4,
      message: 'The venue was great but the AC was not working properly in the afternoon. Could this be checked before our next event?',
      responses: [
        {
          id: 1,
          from: 'Admin User',
          date: '2023-11-16 09:15',
          message: 'Thank you for your feedback. We have scheduled maintenance for the AC system next week.'
        }
      ],
      resolved: false
    },
    {
      id: 2,
      from: 'Sarah Johnson',
      role: 'Director Secretary',
      date: '2023-12-05 11:20',
      category: 'Booking Process',
      rating: 3,
      message: 'The booking system needs improvement. The approval process takes too long and lacks transparency.',
      responses: [],
      resolved: false
    },
    {
      id: 3,
      from: 'Michael Brown',
      role: 'Group Director',
      date: '2023-12-10 16:45',
      category: 'Facility Management',
      rating: 5,
      message: 'Excellent job with the recent upgrades to the conference rooms. The new AV equipment is much appreciated.',
      responses: [
        {
          id: 1,
          from: 'Admin User',
          date: '2023-12-11 10:30',
          message: 'Thank you! We are glad you like the improvements. More upgrades are planned for Q1.'
        }
      ],
      resolved: true
    },
    {
      id: 4,
      from: 'Emily Wilson',
      role: 'User',
      date: '2023-12-12 09:10',
      category: 'Catering Service',
      rating: 2,
      message: 'The food quality at our last event was disappointing. The menu didn\'t match what was promised.',
      responses: [],
      resolved: false
    },
    {
      id: 5,
      from: 'David Miller',
      role: 'Group Director',
      date: '2023-12-15 14:15',
      category: 'Policy Concern',
      rating: 1,
      message: 'The new booking cancellation policy is too strict. We need more flexibility for last-minute changes.',
      responses: [],
      resolved: false
    },
    {
      id: 6,
      from: 'Olivia Davis',
      role: 'User',
      date: '2024-01-05 10:00',
      category: 'Technical Support',
      rating: 5,
      message: 'The IT support team was incredibly helpful with our presentation setup. Quick and efficient!',
      responses: [
        {
          id: 1,
          from: 'Admin User',
          date: '2024-01-06 11:00',
          message: 'Glad to hear! We strive for excellent technical support.'
        }
      ],
      resolved: true
    },
    {
      id: 7,
      from: 'Chris Evans',
      role: 'User',
      date: '2024-01-20 16:00',
      category: 'Venue Experience',
      rating: 3,
      message: 'The Wi-Fi signal was weak in the back of the hall during the conference. Needs improvement.',
      responses: [],
      resolved: false
    },
    {
      id: 8,
      from: 'Laura White',
      role: 'Director Secretary',
      date: '2024-02-01 09:30',
      category: 'Booking Process',
      rating: 4,
      message: 'The new online booking portal is much better, but encountered a small glitch when adding multiple dates.',
      responses: [
        {
          id: 1,
          from: 'Admin User',
          date: '2024-02-02 14:00',
          message: 'Thank you for reporting the glitch. Our development team is looking into it.'
        }
      ],
      resolved: false
    },
    {
      id: 9,
      from: 'Daniel Kim',
      role: 'User',
      date: '2024-02-15 13:00',
      category: 'Catering Service',
      rating: 5,
      message: 'Fantastic catering for the recent workshop! Everyone loved the variety and quality.',
      responses: [],
      resolved: true
    },
    {
      id: 10,
      from: 'Sophia Lee',
      role: 'Group Director',
      date: '2024-03-01 10:45',
      category: 'Facility Management',
      rating: 4,
      message: 'The cleanliness of the restrooms could be improved, especially during peak hours.',
      responses: [],
      resolved: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterRating, setFilterRating] = useState('All');
  const [filterResolution, setFilterResolution] = useState('All'); // New filter for resolution status
  const [sortBy, setSortBy] = useState('dateDesc');
  const [activeReply, setActiveReply] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [selectedFeedbackIds, setSelectedFeedbackIds] = useState([]); // State for selected feedback

  // Filter and Sort feedback using useMemo for performance
  const filteredAndSortedFeedback = useMemo(() => {
    return feedback
      .filter(item => {
        const matchesSearch =
          item.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'All' || item.role === filterRole;
        const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
        const matchesRating = filterRating === 'All' || item.rating === parseInt(filterRating);
        const matchesResolution = filterResolution === 'All' ||
                                  (filterResolution === 'Resolved' && item.resolved) ||
                                  (filterResolution === 'Unresolved' && !item.resolved);
        return matchesSearch && matchesRole && matchesCategory && matchesRating && matchesResolution;
      })
      .sort((a, b) => {
        if (sortBy === 'dateDesc') {
          return new Date(b.date) - new Date(a.date);
        } else if (sortBy === 'dateAsc') {
          return new Date(a.date) - new Date(b.date);
        } else if (sortBy === 'ratingDesc') {
          return b.rating - a.rating;
        } else if (sortBy === 'ratingAsc') {
          return a.rating - b.rating;
        }
        return 0;
      });
  }, [feedback, searchTerm, filterRole, filterCategory, filterRating, filterResolution, sortBy]);

  // Handle reply submission
  const handleReplySubmit = (feedbackId) => {
    if (!replyMessage.trim()) {
      // Optionally show a message that reply cannot be empty
      return;
    }

    const newResponse = {
      id: Date.now(), // Unique ID for the response
      from: 'Admin User', // Assuming admin is replying
      date: new Date().toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      message: replyMessage
    };

    setFeedback(prevFeedback => prevFeedback.map(item =>
      item.id === feedbackId
        ? { ...item, responses: [...item.responses, newResponse] }
        : item
    ));

    setReplyMessage('');
    setActiveReply(null);
  };

  // Handle marking feedback as resolved
  const handleMarkResolved = (feedbackId) => {
    setFeedback(prevFeedback => prevFeedback.map(item =>
      item.id === feedbackId
        ? { ...item, resolved: !item.resolved } // Toggle resolved status
        : item
    ));
  };

  const handleDeleteFeedback = (idToDelete) => {
    setFeedbackToDelete(idToDelete);
    setConfirmAction(() => () => {
      setFeedback(prevFeedback => prevFeedback.filter(item => item.id !== idToDelete));
      setFeedbackToDelete(null); // Clear item to delete after deletion
      setSelectedFeedbackIds(prev => prev.filter(id => id !== idToDelete)); // Deselect if deleted
    });
    setShowConfirmModal(true);
  };

  // Handle checkbox change for individual feedback items
  const handleCheckboxChange = (id) => {
    setSelectedFeedbackIds(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(item => item !== id)
        : [...prevSelected, id]
    );
  };

  // Handle select all/deselect all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedFeedbackIds(filteredAndSortedFeedback.map(item => item.id));
    } else {
      setSelectedFeedbackIds([]);
    }
  };

  // Batch actions
  const handleBatchMarkResolved = () => {
    if (selectedFeedbackIds.length === 0) return;
    setConfirmAction(() => () => {
      setFeedback(prevFeedback =>
        prevFeedback.map(item =>
          selectedFeedbackIds.includes(item.id) ? { ...item, resolved: true } : item
        )
      );
      setSelectedFeedbackIds([]);
    });
    setShowConfirmModal(true);
  };

  const handleBatchMarkUnresolved = () => {
    if (selectedFeedbackIds.length === 0) return;
    setConfirmAction(() => () => {
      setFeedback(prevFeedback =>
        prevFeedback.map(item =>
          selectedFeedbackIds.includes(item.id) ? { ...item, resolved: false } : item
        )
      );
      setSelectedFeedbackIds([]);
    });
    setShowConfirmModal(true);
  };

  const handleBatchDelete = () => {
    if (selectedFeedbackIds.length === 0) return;
    setConfirmAction(() => () => {
      setFeedback(prevFeedback =>
        prevFeedback.filter(item => !selectedFeedbackIds.includes(item.id))
      );
      setSelectedFeedbackIds([]);
    });
    setShowConfirmModal(true);
  };

  // Feedback Analytics
  const totalFeedback = feedback.length;
  const resolvedCount = feedback.filter(item => item.resolved).length;
  const unresolvedCount = totalFeedback - resolvedCount;
  const averageRating = totalFeedback > 0
    ? (feedback.reduce((sum, item) => sum + item.rating, 0) / totalFeedback).toFixed(1)
    : 0;

  // Export Data
  const handleExportData = () => {
    const dataToExport = filteredAndSortedFeedback.map(item => ({
      ID: item.id,
      From: item.from,
      Role: item.role,
      Date: item.date,
      Category: item.category,
      Rating: item.rating,
      Message: item.message.replace(/"/g, '""'), // Escape double quotes for CSV
      Responses: item.responses.map(res => `${res.from} (${res.date}): ${res.message.replace(/"/g, '""')}`).join('; '),
      Resolved: item.resolved ? 'Yes' : 'No'
    }));

    const csvHeader = Object.keys(dataToExport[0]).join(',');
    const csvRows = dataToExport.map(row => Object.values(row).map(value => `"${value}"`).join(','));
    const csvContent = [csvHeader, ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'user_feedback.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert("Feedback data exported successfully as CSV!");
  };


  return (
    <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-lg min-h-[60vh] flex flex-col">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        User Feedback & Reviews
      </h1>

      {/* Analytics Section */}
      <div className="bg-blue-50 p-4 rounded-xl shadow-inner mb-6 flex flex-wrap justify-around items-center gap-4 text-center">
        <div className="flex flex-col items-center">
          <FaChartPie className="text-blue-600 text-3xl mb-2" />
          <span className="text-gray-700 text-sm">Total Feedback</span>
          <span className="text-xl font-bold text-gray-900">{totalFeedback}</span>
        </div>
        <div className="flex flex-col items-center">
          <FaCheckCircle className="text-green-600 text-3xl mb-2" />
          <span className="text-gray-700 text-sm">Resolved</span>
          <span className="text-xl font-bold text-gray-900">{resolvedCount}</span>
        </div>
        <div className="flex flex-col items-center">
          <FaTimesCircle className="text-red-600 text-3xl mb-2" />
          <span className="text-gray-700 text-sm">Unresolved</span>
          <span className="text-xl font-bold text-gray-900">{unresolvedCount}</span>
        </div>
        <div className="flex flex-col items-center">
          <FaStar className="text-yellow-500 text-3xl mb-2" />
          <span className="text-gray-700 text-sm">Avg. Rating</span>
          <span className="text-xl font-bold text-gray-900">{averageRating}</span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-xl shadow-inner items-center">
        <div className="relative flex-1 min-w-[200px] w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name, message, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 outline-none text-sm sm:text-base"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <FaUser className="text-gray-500 text-base sm:text-lg" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="flex-1 px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
          >
            <option value="All">All Roles</option>
            <option value="User">User</option>
            <option value="Director Secretary">Director Secretary</option>
            <option value="Group Director">Group Director</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <FaTag className="text-gray-500 text-base sm:text-lg" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="flex-1 px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
          >
            <option value="All">All Categories</option>
            <option value="Venue Experience">Venue Experience</option>
            <option value="Booking Process">Booking Process</option>
            <option value="Facility Management">Facility Management</option>
            <option value="Catering Service">Catering Service</option>
            <option value="Technical Support">Technical Support</option>
            <option value="Policy Concern">Policy Concern</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <FaStar className="text-gray-500 text-base sm:text-lg" />
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="flex-1 px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
          >
            <option value="All">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <FaCheckCircle className="text-gray-500 text-base sm:text-lg" />
          <select
            value={filterResolution}
            onChange={(e) => setFilterResolution(e.target.value)}
            className="flex-1 px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
          >
            <option value="All">All Statuses</option>
            <option value="Resolved">Resolved</option>
            <option value="Unresolved">Unresolved</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <FaSortAmountDown className="text-gray-500 text-base sm:text-lg" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
          >
            <option value="dateDesc">Date (Newest First)</option>
            <option value="dateAsc">Date (Oldest First)</option>
            <option value="ratingDesc">Rating (High to Low)</option>
            <option value="ratingAsc">Rating (Low to High)</option>
          </select>
        </div>
      </div>

      {/* Batch Actions */}
      {filteredAndSortedFeedback.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-50 rounded-xl shadow-inner items-center justify-between">
          <label className="inline-flex items-center cursor-pointer text-gray-700 text-sm sm:text-base">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
              onChange={handleSelectAll}
              checked={selectedFeedbackIds.length === filteredAndSortedFeedback.length && filteredAndSortedFeedback.length > 0}
            />
            <span className="ml-2">Select All ({selectedFeedbackIds.length})</span>
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleBatchMarkResolved}
              disabled={selectedFeedbackIds.length === 0}
              className="px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 outline-none shadow-sm bg-green-500 text-white hover:bg-green-600 hover:shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaCheckCircle /> Mark Selected Resolved
            </button>
            <button
              onClick={handleBatchMarkUnresolved}
              disabled={selectedFeedbackIds.length === 0}
              className="px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 outline-none shadow-sm bg-orange-500 text-white hover:bg-orange-600 hover:shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaTimesCircle /> Mark Selected Unresolved
            </button>
            <button
              onClick={handleBatchDelete}
              disabled={selectedFeedbackIds.length === 0}
              className="px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 outline-none shadow-sm bg-red-500 text-white hover:bg-red-600 hover:shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaTrashAlt /> Delete Selected
            </button>
            <button
              onClick={handleExportData}
              className="px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 outline-none shadow-sm bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md text-sm"
            >
              <FaFileExport /> Export Data
            </button>
          </div>
        </div>
      )}


      {/* Feedback Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredAndSortedFeedback.length > 0 ? (
          filteredAndSortedFeedback.map((item) => (
            <div key={item.id} className={`border border-gray-200 rounded-xl p-4 sm:p-6 bg-white shadow-md relative transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col justify-between ${item.resolved ? 'border-l-4 border-green-500' : ''}`}>
              <div className="absolute top-3 left-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                  checked={selectedFeedbackIds.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </div>
              <div className="pl-8"> {/* Added padding to make space for checkbox */}
                <div className="flex justify-between items-start mb-2">
                  <div className="user-info">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">{item.from}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      <span className="font-semibold text-blue-600">{item.role}</span> • {item.date}
                    </p>
                  </div>
                  <div className="rating-display flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-base ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-700 mb-3 flex items-center">
                  <FaTag className="mr-2 text-gray-500" />
                  <span className="font-medium">{item.category}</span>
                </p>

                <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-800 mb-3">
                  <p>{item.message}</p>
                </div>

                {/* Responses */}
                {item.responses.length > 0 && (
                  <div className="responses-section mt-4 pt-3 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Replies:</h4>
                    {item.responses.map(response => (
                      <div key={response.id} className="bg-blue-50 p-3 rounded-lg mb-2 text-xs border border-blue-100">
                        <div className="flex justify-between items-center mb-1">
                          <strong className="text-blue-700">{response.from}</strong>
                          <span className="text-gray-500">{response.date}</span>
                        </div>
                        <p className="text-gray-700">{response.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="action-buttons mt-4 flex flex-col sm:flex-row justify-end gap-2">
                {activeReply === item.id ? (
                  <div className="w-full">
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your response..."
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm mb-2 resize-y min-h-[80px]"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => { setActiveReply(null); setReplyMessage(''); }}
                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleReplySubmit(item.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm flex items-center gap-1"
                      >
                        <FaReply /> Send
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setActiveReply(item.id)}
                      className="px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 outline-none shadow-sm bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md text-sm"
                      title="Reply to Feedback"
                    >
                      <FaReply /> Reply
                    </button>
                    <button
                      onClick={() => handleMarkResolved(item.id)}
                      className={`px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 outline-none shadow-sm ${item.resolved ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'} text-white hover:shadow-md text-sm`}
                      title={item.resolved ? 'Mark as Unresolved' : 'Mark as Resolved'}
                    >
                      {item.resolved ? <FaTimesCircle /> : <FaCheckCircle />}
                      {item.resolved ? 'Unresolve' : 'Resolve'}
                    </button>
                    <button
                      onClick={() => handleDeleteFeedback(item.id)}
                      className="px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 outline-none shadow-sm bg-red-500 text-white hover:bg-red-600 hover:shadow-md text-sm"
                      title="Delete Feedback"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="lg:col-span-3 p-8 text-center text-gray-500 text-lg italic bg-gray-50 rounded-xl shadow-inner">
            No feedback found matching your criteria.
          </div>
        )}
      </div>

      {showConfirmModal && (
        <ConfirmationModal
          onClose={() => setShowConfirmModal(false)}
          onConfirm={confirmAction}
          message={feedbackToDelete ? `Are you sure you want to delete this feedback? This action cannot be undone.` : `Are you sure you want to perform this batch action? This action cannot be undone.`}
          title={feedbackToDelete ? "Confirm Delete Feedback" : "Confirm Batch Action"}
        />
      )}
    </div>
  );
};

export default UserReviewSection;
