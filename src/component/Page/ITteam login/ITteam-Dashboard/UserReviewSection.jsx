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
  const [filterResolution, setFilterResolution] = useState('All');
  const [sortBy, setSortBy] = useState('dateDesc');
  const [activeReply, setActiveReply] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [selectedFeedbackIds, setSelectedFeedbackIds] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // State for mobile filters toggle

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
    if (!replyMessage.trim()) return;

    const newResponse = {
      id: Date.now(),
      from: 'Admin User',
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
        ? { ...item, resolved: !item.resolved }
        : item
    ));
  };

  const handleDeleteFeedback = (idToDelete) => {
    setFeedbackToDelete(idToDelete);
    setConfirmAction(() => () => {
      setFeedback(prevFeedback => prevFeedback.filter(item => item.id !== idToDelete));
      setFeedbackToDelete(null);
      setSelectedFeedbackIds(prev => prev.filter(id => id !== idToDelete));
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
      Message: item.message.replace(/"/g, '""'),
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
    <div className="p-2 sm:p-4 md:p-6 bg-white rounded-lg sm:rounded-2xl shadow-lg min-h-[60vh] flex flex-col">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        User Feedback & Reviews
      </h1>

      {/* Analytics Section */}
      <div className="bg-blue-50 p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-inner mb-4 sm:mb-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-center">
        <div className="flex flex-col items-center p-2">
          <FaChartPie className="text-blue-600 text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2" />
          <span className="text-xs sm:text-sm text-gray-700">Total</span>
          <span className="text-sm sm:text-lg md:text-xl font-bold text-gray-900">{totalFeedback}</span>
        </div>
        <div className="flex flex-col items-center p-2">
          <FaCheckCircle className="text-green-600 text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2" />
          <span className="text-xs sm:text-sm text-gray-700">Resolved</span>
          <span className="text-sm sm:text-lg md:text-xl font-bold text-gray-900">{resolvedCount}</span>
        </div>
        <div className="flex flex-col items-center p-2">
          <FaTimesCircle className="text-red-600 text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2" />
          <span className="text-xs sm:text-sm text-gray-700">Unresolved</span>
          <span className="text-sm sm:text-lg md:text-xl font-bold text-gray-900">{unresolvedCount}</span>
        </div>
        <div className="flex flex-col items-center p-2">
          <FaStar className="text-yellow-500 text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2" />
          <span className="text-xs sm:text-sm text-gray-700">Avg. Rating</span>
          <span className="text-sm sm:text-lg md:text-xl font-bold text-gray-900">{averageRating}</span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col gap-2 sm:gap-4 mb-4 sm:mb-6 p-2 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl shadow-inner">
        {/* Search Bar */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 outline-none text-xs sm:text-sm md:text-base"
          />
          <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-md text-xs font-medium"
        >
          <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Filters - Hidden on mobile unless toggled */}
        <div className={`${showFilters ? 'block' : 'hidden'} sm:block`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
            {/* Role Filter */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">Role</label>
              <div className="relative">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm cursor-pointer bg-white appearance-none"
                >
                  <option value="All">All Roles</option>
                  <option value="User">User</option>
                  <option value="Director Secretary">Director Secretary</option>
                  <option value="Group Director">Group Director</option>
                </select>
                <FaUser className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">Category</label>
              <div className="relative">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm cursor-pointer bg-white appearance-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Venue Experience">Venue Experience</option>
                  <option value="Booking Process">Booking Process</option>
                  <option value="Facility Management">Facility Management</option>
                  <option value="Catering Service">Catering Service</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Policy Concern">Policy Concern</option>
                </select>
                <FaTag className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">Rating</label>
              <div className="relative">
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm cursor-pointer bg-white appearance-none"
                >
                  <option value="All">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
                <FaStar className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
              </div>
            </div>

            {/* Resolution Filter */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">Status</label>
              <div className="relative">
                <select
                  value={filterResolution}
                  onChange={(e) => setFilterResolution(e.target.value)}
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm cursor-pointer bg-white appearance-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Unresolved">Unresolved</option>
                </select>
                <FaCheckCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
              </div>
            </div>

            {/* Sort By */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">Sort By</label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm cursor-pointer bg-white appearance-none"
                >
                  <option value="dateDesc">Newest First</option>
                  <option value="dateAsc">Oldest First</option>
                  <option value="ratingDesc">High Rating</option>
                  <option value="ratingAsc">Low Rating</option>
                </select>
                <FaSortAmountDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
              </div>
            </div>

            {/* Export Button */}
            <div className="flex items-end">
              <button
                onClick={handleExportData}
                className="w-full px-2 py-1 sm:px-3 sm:py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-xs sm:text-sm flex items-center justify-center gap-1"
              >
                <FaFileExport className="text-xs sm:text-sm" /> Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Batch Actions */}
      {filteredAndSortedFeedback.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6 p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl shadow-inner">
          <label className="inline-flex items-center cursor-pointer text-gray-700 text-xs sm:text-sm">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-blue-600 rounded"
              onChange={handleSelectAll}
              checked={selectedFeedbackIds.length === filteredAndSortedFeedback.length && filteredAndSortedFeedback.length > 0}
            />
            <span className="ml-2">Select All ({selectedFeedbackIds.length})</span>
          </label>
          
          <div className="flex flex-wrap gap-1 sm:gap-2">
            <button
              onClick={handleBatchMarkResolved}
              disabled={selectedFeedbackIds.length === 0}
              className="px-2 py-1 sm:px-3 sm:py-2 rounded-md font-medium cursor-pointer flex items-center gap-1 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed bg-green-500 hover:bg-green-600 text-white"
            >
              <FaCheckCircle className="text-xs sm:text-sm" /> Resolve
            </button>
            <button
              onClick={handleBatchMarkUnresolved}
              disabled={selectedFeedbackIds.length === 0}
              className="px-2 py-1 sm:px-3 sm:py-2 rounded-md font-medium cursor-pointer flex items-center gap-1 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed bg-orange-500 hover:bg-orange-600 text-white"
            >
              <FaTimesCircle className="text-xs sm:text-sm" /> Unresolve
            </button>
            <button
              onClick={handleBatchDelete}
              disabled={selectedFeedbackIds.length === 0}
              className="px-2 py-1 sm:px-3 sm:py-2 rounded-md font-medium cursor-pointer flex items-center gap-1 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed bg-red-500 hover:bg-red-600 text-white"
            >
              <FaTrashAlt className="text-xs sm:text-sm" /> Delete
            </button>
          </div>
        </div>
      )}

      {/* Feedback Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filteredAndSortedFeedback.length > 0 ? (
          filteredAndSortedFeedback.map((item) => (
            <div key={item.id} className={`border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300 ${item.resolved ? 'border-l-4 border-green-500' : ''}`}>
              <div className="absolute top-2 left-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-blue-600 rounded"
                  checked={selectedFeedbackIds.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </div>
              
              <div className="pl-6 sm:pl-8">
                <div className="flex justify-between items-start mb-1 sm:mb-2">
                  <div className="user-info">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 line-clamp-1">{item.from}</h3>
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold text-blue-600">{item.role}</span> • {item.date}
                    </p>
                  </div>
                  <div className="rating-display flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-xs sm:text-sm ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 mb-2 flex items-center">
                  <FaTag className="mr-1 text-gray-500 text-xs" />
                  <span className="font-medium">{item.category}</span>
                </p>

                <div className="bg-gray-100 p-2 rounded text-xs sm:text-sm text-gray-800 mb-2 sm:mb-3">
                  <p className="line-clamp-3">{item.message}</p>
                </div>

                {/* Responses */}
                {item.responses.length > 0 && (
                  <div className="responses-section mt-2 pt-2 border-t border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-700 mb-1">Replies:</h4>
                    {item.responses.map(response => (
                      <div key={response.id} className="bg-blue-50 p-2 rounded mb-1 text-xs border border-blue-100">
                        <div className="flex justify-between items-center mb-0.5">
                          <strong className="text-blue-700">{response.from}</strong>
                          <span className="text-gray-500 text-xxs">{response.date}</span>
                        </div>
                        <p className="text-gray-700">{response.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="action-buttons mt-3 flex flex-wrap justify-end gap-1 sm:gap-2">
                {activeReply === item.id ? (
                  <div className="w-full">
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your response..."
                      className="w-full p-1 sm:p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm mb-1 resize-y min-h-[60px] sm:min-h-[80px]"
                    />
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => { setActiveReply(null); setReplyMessage(''); }}
                        className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-xs sm:text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleReplySubmit(item.id)}
                        className="px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs sm:text-sm flex items-center gap-1"
                      >
                        <FaReply className="text-xs" /> Send
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setActiveReply(item.id)}
                      className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs sm:text-sm flex items-center gap-1"
                    >
                      <FaReply className="text-xs" /> Reply
                    </button>
                    <button
                      onClick={() => handleMarkResolved(item.id)}
                      className={`px-2 py-1 rounded-md text-xs sm:text-sm flex items-center gap-1 ${item.resolved ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    >
                      {item.resolved ? <FaTimesCircle className="text-xs" /> : <FaCheckCircle className="text-xs" />}
                      {item.resolved ? 'Unresolve' : 'Resolve'}
                    </button>
                    <button
                      onClick={() => handleDeleteFeedback(item.id)}
                      className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs sm:text-sm flex items-center gap-1"
                    >
                      <FaTrashAlt className="text-xs" /> Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-4 sm:p-6 text-center text-gray-500 text-sm sm:text-base italic bg-gray-50 rounded-lg sm:rounded-xl shadow-inner">
            No feedback found matching your criteria.
          </div>
        )}
      </div>

      {/* helllo */}

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