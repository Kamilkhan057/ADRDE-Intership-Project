// ActivityHistorySection.jsx
import React, { useState, useMemo } from 'react';
import { FaSearch, FaFilter, FaCheckCircle, FaTimesCircle, FaHistory, FaUser, FaCalendarAlt, FaMapMarkerAlt, FaCommentDots, FaUserShield, FaEye, FaTimes, FaTrashAlt } from 'react-icons/fa';

// Helper function to get Tailwind classes for status
const getStatusClass = (status) => {
  switch (status) {
    case 'Approved': return 'bg-green-100 text-green-800';
    case 'Rejected': return 'bg-red-100 text-red-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Helper function to get Tailwind classes for action type
const getActionTypeClass = (actionType) => {
  switch (actionType) {
    case 'Approved': return 'bg-green-500 text-white';
    case 'Rejected': return 'bg-red-500 text-white';
    case 'Created': return 'bg-blue-500 text-white';
    case 'Edited': return 'bg-purple-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

// Confirmation Modal
const ConfirmationModal = ({ onClose, onConfirm, message, title }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm relative">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal for displaying detailed meeting history
const MeetingDetailsModal = ({ meetingName, historyItems, onClose, onDeleteHistoryItem }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const confirmDelete = (item) => {
    setItemToDelete(item);
    setShowConfirmModal(true);
  };

  const executeDelete = () => {
    if (itemToDelete) {
      onDeleteHistoryItem(itemToDelete.id);
      setItemToDelete(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl relative transform transition-all duration-300 scale-100 opacity-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
          title="Close"
        >
          <FaTimes className="text-xl" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Details for: <span className="text-blue-600">{meetingName}</span>
        </h2>

        {historyItems.length > 0 ? (
          <div className="space-y-6">
            {historyItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold text-gray-800">{item.eventName}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getActionTypeClass(item.actionType)}`}>
                    {item.actionType}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mb-1 flex items-center"><FaUser className="mr-2 text-gray-500" /><strong>User:</strong> {item.userName}</p>
                <p className="text-sm text-gray-700 mb-1 flex items-center"><FaCalendarAlt className="mr-2 text-gray-500" /><strong>Date:</strong> {item.date}</p>
                <p className="text-sm text-gray-700 mb-1 flex items-center"><FaMapMarkerAlt className="mr-2 text-gray-500" /><strong>Venue:</strong> {item.venue}</p>

                <p className="text-sm text-gray-700 mb-2 flex items-center">
                  <strong>Request Status:</strong>
                  <span className={`font-semibold px-2 py-1 rounded-md inline-block ml-2 text-xs ${getStatusClass(item.status)}`}>
                    {item.status}
                  </span>
                </p>

                {item.actionBy && (
                  <p className="text-xs text-gray-600 mt-2 flex items-center">
                    <FaUserShield className="mr-1 text-blue-500" /> Action by: <span className="font-semibold ml-1">{item.actionBy}</span> (<span className="italic">{item.actionRole}</span>)
                  </p>
                )}
                {item.actionDate && (
                  <p className="text-xs text-gray-600 mt-1 flex items-center">
                    <FaCalendarAlt className="mr-1 text-gray-500" /> Action Date: <span className="font-semibold ml-1">{item.actionDate}</span>
                  </p>
                )}

                {item.message && (
                  <div className="bg-white p-3 rounded-md text-xs text-gray-700 mt-3 border-l-4 border-blue-400">
                    <strong className="flex items-center mb-1"><FaCommentDots className="mr-2 text-blue-500" />Message:</strong> {item.message}
                  </div>
                )}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => confirmDelete(item)}
                    className="p-2 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 transition text-sm sm:text-base"
                    title="Delete History Item"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 italic p-4">No detailed history found for this meeting.</div>
        )}
      </div>

      {showConfirmModal && (
        <ConfirmationModal
          onClose={() => setShowConfirmModal(false)}
          onConfirm={executeDelete}
          message={`Are you sure you want to delete this activity record for "${itemToDelete?.eventName}" by "${itemToDelete?.actionBy}"? This action cannot be undone.`}
          title="Confirm Delete Activity Record"
        />
      )}
    </div>
  );
};


const ActivityHistorySection = () => {
  // Sample history data with different action types and roles
  const [activityHistory, setActivityHistory] = useState([
    {
      id: 1,
      userName: 'John Doe',
      eventName: 'Annual Conference',
      date: '2023-11-15',
      venue: 'Grand Hall',
      status: 'Approved',
      actionType: 'Approved', // New field: Approved, Rejected, Created, Edited
      actionBy: 'Admin User',
      actionRole: 'Admin',
      actionDate: '2023-11-10 14:30',
      message: 'Approved with additional AV equipment for presentation.',
      relatedUserId: 1,
      relatedRequestId: 1,
    },
    {
      id: 2,
      userName: 'Jane Smith',
      eventName: 'Product Launch',
      date: '2023-12-05',
      venue: 'Sky Lounge',
      status: 'Rejected',
      actionType: 'Rejected',
      actionBy: 'Sarah Johnson',
      actionRole: 'Director Secretary',
      actionDate: '2023-12-01 10:15',
      message: 'Venue already booked for essential maintenance during requested period. Please select an alternative date.',
      relatedUserId: 2,
      relatedRequestId: 2,
    },
    {
      id: 3,
      userName: 'Robert Johnson',
      eventName: 'Team Building',
      date: '2023-11-20',
      venue: 'Garden Terrace',
      status: 'Rejected',
      actionType: 'Rejected',
      actionBy: 'Michael Brown',
      actionRole: 'Group Director',
      actionDate: '2023-11-18 16:45',
      message: 'Budget exceeds department limits for this type of event. Consider a smaller scale or alternative venue.',
      relatedUserId: 3,
      relatedRequestId: 3,
    },
    {
      id: 4,
      userName: 'Emily Davis',
      eventName: 'Training Session',
      date: '2023-12-10',
      venue: 'Meeting Room A',
      status: 'Approved',
      actionType: 'Approved',
      actionBy: 'Admin User',
      actionRole: 'Admin',
      actionDate: '2023-12-05 09:20',
      message: 'Approved with reduced attendee count to comply with room capacity regulations.',
      relatedUserId: 4,
      relatedRequestId: 4,
    },
    {
      id: 5,
      userName: 'Michael Wilson',
      eventName: 'Client Meeting',
      date: '2023-11-25',
      venue: 'Board Room',
      status: 'Rejected',
      actionType: 'Rejected',
      actionBy: 'Lisa Wong',
      actionRole: 'Director Secretary',
      actionDate: '2023-11-22 11:30',
      message: 'Insufficient notice period given for booking. Please submit requests at least 7 days in advance.',
      relatedUserId: 5,
      relatedRequestId: 5,
    },
    {
      id: 6,
      userName: 'Sarah Thompson',
      eventName: 'Workshop',
      date: '2023-12-15',
      venue: 'Training Center',
      status: 'Approved',
      actionType: 'Approved',
      actionBy: 'David Miller',
      actionRole: 'Group Director',
      actionDate: '2023-12-12 15:10',
      message: 'Approved with catering restrictions due to ongoing renovations in the kitchen area.',
      relatedUserId: 6,
      relatedRequestId: 6,
    },
    {
      id: 7,
      userName: 'Chris Evans',
      eventName: 'Strategy Session',
      date: '2024-01-20',
      venue: 'Conference Room B',
      status: 'Approved',
      actionType: 'Approved',
      actionBy: 'Admin User',
      actionRole: 'Admin',
      actionDate: '2024-01-10 11:00',
      message: 'All resources confirmed and ready for your session.',
      relatedUserId: 7,
      relatedRequestId: 7,
    },
    {
      id: 8,
      userName: 'Jessica Lee',
      eventName: 'Team Offsite',
      date: '2024-02-10',
      venue: 'Main Auditorium',
      status: 'Rejected',
      actionType: 'Rejected',
      actionBy: 'Sarah Johnson',
      actionRole: 'Director Secretary',
      actionDate: '2024-02-01 14:00',
      message: 'Main Auditorium is undergoing a major AV upgrade. Not available until March.',
      relatedUserId: 8,
      relatedRequestId: 8,
    },
    {
      id: 9,
      userName: 'Daniel Kim',
      eventName: 'Investor Pitch',
      date: '2024-03-01',
      venue: 'Meeting Pod 1',
      status: 'Approved',
      actionType: 'Approved',
      actionBy: 'Michael Brown',
      actionRole: 'Group Director',
      actionDate: '2024-02-25 09:00',
      message: 'Looks good. Ensure all presentation materials are ready.',
      relatedUserId: 9,
      relatedRequestId: 9,
    },
    {
      id: 10,
      userName: 'Laura Chen',
      eventName: 'New Hire Orientation',
      date: '2024-03-15',
      venue: 'Training Room',
      status: 'Pending',
      actionType: 'Created', // Represents initial creation
      actionBy: 'Laura Chen',
      actionRole: 'User',
      actionDate: '2024-03-10 10:00',
      message: 'New request submitted for review.',
      relatedUserId: 10,
      relatedRequestId: 10,
    },
    {
      id: 11,
      userName: 'Peter Jones',
      eventName: 'Board Meeting',
      date: '2024-04-01',
      venue: 'Board Room',
      status: 'Approved',
      actionType: 'Approved',
      actionBy: 'Admin User',
      actionRole: 'Admin',
      actionDate: '2024-03-28 10:00',
      message: 'Board Room confirmed. Catering details sent separately.',
      relatedUserId: 11,
      relatedRequestId: 11,
    },
    {
      id: 12,
      userName: 'Anna Garcia',
      eventName: 'Marketing Brainstorm',
      date: '2024-04-10',
      venue: 'Conference Room A',
      status: 'Rejected',
      actionType: 'Rejected',
      actionBy: 'Michael Brown',
      actionRole: 'Group Director',
      actionDate: '2024-04-05 11:45',
      message: 'Conference Room A is reserved for a critical project meeting. Please reschedule.',
      relatedUserId: 12,
      relatedRequestId: 12,
    },
    {
      id: 13,
      userName: 'Mark Lee',
      eventName: 'Developer Meetup',
      date: '2024-04-22',
      venue: 'Training Center',
      status: 'Approved',
      actionType: 'Approved',
      actionBy: 'Admin User',
      actionRole: 'Admin',
      actionDate: '2024-04-18 16:00',
      message: 'Training Center available. Projector and whiteboards arranged.',
      relatedUserId: 13,
      relatedRequestId: 13,
    },
    {
      id: 14,
      userName: 'Sophia Rodriguez',
      eventName: 'Client Demo',
      date: '2024-05-05',
      venue: 'Main Auditorium',
      status: 'Approved',
      actionType: 'Approved',
      actionBy: 'David Miller',
      actionRole: 'Group Director',
      actionDate: '2024-04-30 09:30',
      message: 'Main Auditorium approved. Ensure sound check is performed before the event.',
      relatedUserId: 14,
      relatedRequestId: 14,
    },
    {
      id: 15,
      userName: 'James Martinez',
      eventName: 'HR Policy Review',
      date: '2024-05-15',
      venue: 'Meeting Room B',
      status: 'Pending',
      actionType: 'Created',
      actionBy: 'James Martinez',
      actionRole: 'User',
      actionDate: '2024-05-10 14:00',
      message: 'Initial submission for HR policy review.',
      relatedUserId: 15,
      relatedRequestId: 15,
    },
    {
      id: 16,
      userName: 'Emily Davis',
      eventName: 'Training Session',
      date: '2023-12-10',
      venue: 'Meeting Room A',
      status: 'Approved',
      actionType: 'Edited', // Example of an edit action
      actionBy: 'Admin User',
      actionRole: 'Admin',
      actionDate: '2023-12-06 10:30',
      message: 'Updated resource list and added note for catering.',
      relatedUserId: 4,
      relatedRequestId: 4,
    },
    {
      id: 17,
      userName: 'John Doe',
      eventName: 'Annual Conference',
      date: '2023-11-15',
      venue: 'Grand Hall',
      status: 'Approved',
      actionType: 'Edited', // Another edit example
      actionBy: 'Group Director',
      actionRole: 'Group Director',
      actionDate: '2023-11-12 11:00',
      message: 'Adjusted meeting time by 30 minutes for better flow.',
      relatedUserId: 1,
      relatedRequestId: 1,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterRole, setFilterRole] = useState('All');
  const [filterActionType, setFilterActionType] = useState('All');

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMeetingName, setSelectedMeetingName] = useState(null);

  // Filter history based on search term, status, role, and action type
  const filteredHistory = activityHistory.filter(item => {
    const matchesSearch =
      item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.message && item.message.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.actionBy && item.actionBy.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchesRole = filterRole === 'All' || item.actionRole === filterRole;
    const matchesActionType = filterActionType === 'All' || item.actionType === filterActionType;

    return matchesSearch && matchesStatus && matchesRole && matchesActionType;
  });

  // Group filtered history by eventName for display in the main grid
  const groupedMeetings = useMemo(() => {
    const groups = {};
    filteredHistory.forEach(item => {
      if (!groups[item.eventName]) {
        groups[item.eventName] = {
          name: item.eventName,
          items: [],
          latestActionDate: '',
          latestStatus: '',
          totalActions: 0,
        };
      }
      groups[item.eventName].items.push(item);
      groups[item.eventName].totalActions++;

      // Update latest action date and status
      if (!groups[item.eventName].latestActionDate || item.actionDate > groups[item.eventName].latestActionDate) {
        groups[item.eventName].latestActionDate = item.actionDate;
        groups[item.eventName].latestStatus = item.status;
      }
    });

    // Sort meetings by latest action date (most recent first)
    return Object.values(groups).sort((a, b) => new Date(b.latestActionDate) - new Date(a.latestActionDate));
  }, [filteredHistory]);

  const handleViewDetails = (meetingName) => {
    setSelectedMeetingName(meetingName);
    setShowDetailsModal(true);
  };

  const handleDeleteHistoryItem = (idToDelete) => {
    setActivityHistory(prevHistory => prevHistory.filter(item => item.id !== idToDelete));
  };

  const getMeetingHistoryItems = (meetingName) => {
    return activityHistory.filter(item => item.eventName === meetingName)
                           .sort((a, b) => new Date(b.actionDate) - new Date(a.actionDate)); // Sort details by date
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-lg min-h-[60vh] flex flex-col">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        Activity History Log
      </h1>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-xl shadow-inner items-center">
        <div className="relative flex-1 min-w-[200px] w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by user, event, venue, message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 outline-none text-sm sm:text-base"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <FaFilter className="text-gray-500 text-base sm:text-lg" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
          >
            <option value="All">All Request Statuses</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <FaUserShield className="text-gray-500 text-base sm:text-lg" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="flex-1 px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
          >
            <option value="All">All Action Roles</option>
            <option value="Admin">Admin</option>
            <option value="Director Secretary">Director Secretary</option>
            <option value="Group Director">Group Director</option>
            <option value="User">User</option> {/* Users can create/edit requests */}
          </select>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <FaHistory className="text-gray-500 text-base sm:text-lg" />
          <select
            value={filterActionType}
            onChange={(e) => setFilterActionType(e.target.value)}
            className="flex-1 px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
          >
            <option value="All">All Action Types</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Created">Created</option>
            <option value="Edited">Edited</option>
          </select>
        </div>
      </div>

      {/* Grouped Meeting History Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {groupedMeetings.length > 0 ? (
          groupedMeetings.map((meeting) => (
            <div key={meeting.name} className="border border-gray-200 rounded-xl p-4 sm:p-6 bg-white shadow-md relative transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{meeting.name}</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-1">Total Actions: <span className="font-semibold">{meeting.totalActions}</span></p>
                <p className="text-sm sm:text-base text-gray-700 mb-2">
                  Latest Status:
                  <span className={`font-semibold px-2 py-1 rounded-md inline-block ml-2 text-xs ${getStatusClass(meeting.latestStatus)}`}>
                    {meeting.latestStatus}
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                  <FaCalendarAlt className="mr-1 text-gray-500" /> Last Activity: <span className="font-semibold ml-1">{meeting.latestActionDate}</span>
                </p>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleViewDetails(meeting.name)}
                  className="px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 outline-none shadow-md bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg text-sm"
                  title="View Details"
                >
                  <FaEye /> View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="lg:col-span-4 p-8 text-center text-gray-500 text-lg italic bg-gray-50 rounded-xl shadow-inner">
            No activity history found matching your criteria.
          </div>
        )}
      </div>

      {/* Meeting Details Modal */}
      {showDetailsModal && selectedMeetingName && (
        <MeetingDetailsModal
          meetingName={selectedMeetingName}
          historyItems={getMeetingHistoryItems(selectedMeetingName)}
          onClose={() => setShowDetailsModal(false)}
          onDeleteHistoryItem={handleDeleteHistoryItem}
        />
      )}
    </div>
  );
};

export default ActivityHistorySection;
