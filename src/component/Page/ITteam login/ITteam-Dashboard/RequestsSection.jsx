// RequestsSection.jsx
import React, { useState } from 'react';
import { FaCheck, FaTimes, FaSearch, FaFilter, FaEdit, FaTrashAlt, FaInfoCircle, FaUserShield, FaClock, FaExclamationTriangle, FaPlus } from 'react-icons/fa';

// Modal for adding/editing a request
const RequestModal = ({ onClose, onSave, initialRequest = null, adminUser }) => {
  const [userName, setUserName] = useState(initialRequest ? initialRequest.userName : '');
  const [eventName, setEventName] = useState(initialRequest ? initialRequest.eventName : '');
  const [date, setDate] = useState(initialRequest ? initialRequest.date : '');
  const [meetingTime, setMeetingTime] = useState(initialRequest ? initialRequest.meetingTime : '');
  const [venue, setVenue] = useState(initialRequest ? initialRequest.venue : '');
  const [contactInfo, setContactInfo] = useState(initialRequest ? initialRequest.contactInfo : '');
  const [resourcesNeeded, setResourcesNeeded] = useState(initialRequest ? initialRequest.resourcesNeeded : '');
  const [message, setMessage] = useState(initialRequest ? initialRequest.message : '');
  const [priority, setPriority] = useState(initialRequest ? initialRequest.priority : 'Medium'); // New state for priority

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName || !eventName || !date || !venue) {
      console.error("Please fill in all required fields: User Name, Event Name, Date, Venue.");
      return;
    }

    const requestData = {
      userName,
      eventName,
      date,
      meetingTime,
      venue,
      contactInfo,
      resourcesNeeded,
      message,
      priority, // Include priority
      status: initialRequest ? initialRequest.status : 'Pending',
      approvedBy: initialRequest ? initialRequest.approvedBy : null,
      rejectedBy: initialRequest ? initialRequest.rejectedBy : null,
      editedBy: initialRequest ? adminUser : null, // Set editedBy if it's an existing request
    };

    onSave(initialRequest ? { ...initialRequest, ...requestData } : { id: Date.now(), ...requestData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative transform transition-all duration-300 scale-100 opacity-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
          title="Close"
        >
          <FaTimes className="text-xl" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{initialRequest ? "Edit Request" : "Add New Request"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
            <input
              type="text"
              id="userName"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
            <input
              type="text"
              id="eventName"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              id="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="meetingTime" className="block text-sm font-medium text-gray-700 mb-1">Meeting Time (e.g., 10:00 AM)</label>
            <input
              type="text"
              id="meetingTime"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={meetingTime}
              onChange={(e) => setMeetingTime(e.target.value)}
              placeholder="e.g., 10:00 AM, 2:30 PM"
            />
          </div>
          <div>
            <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
            <input
              type="text"
              id="venue"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1">Contact Info</label>
            <input
              type="text"
              id="contactInfo"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="resourcesNeeded" className="block text-sm font-medium text-gray-700 mb-1">Resources Needed</label>
            <textarea
              id="resourcesNeeded"
              rows="2"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={resourcesNeeded}
              onChange={(e) => setResourcesNeeded(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              id="priority"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Admin Message</label>
            <textarea
              id="message"
              rows="2"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {initialRequest ? "Update Request" : "Add Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const RequestsSection = () => {
  // Sample request data with added fields
  const [requests, setRequests] = useState([
    {
      id: 1,
      userName: 'John Doe',
      eventName: 'Annual Conference',
      date: '2023-11-15',
      meetingTime: '10:00 AM',
      venue: 'Grand Hall',
      status: 'Pending',
      approvedBy: null,
      rejectedBy: null,
      message: '',
      contactInfo: 'john.doe@example.com',
      resourcesNeeded: 'Projector, Microphones (2)',
      priority: 'Medium', // Added priority
      editedBy: null, // Added editedBy
    },
    {
      id: 2,
      userName: 'Jane Smith',
      eventName: 'Product Launch',
      date: '2023-12-05',
      meetingTime: '02:30 PM',
      venue: 'Sky Lounge',
      status: 'Approved',
      approvedBy: 'Group Director',
      rejectedBy: null,
      message: 'Available with a capacity of 100. Catering confirmed.',
      contactInfo: 'jane.smith@example.com',
      resourcesNeeded: 'Sound system, Stage lighting',
      priority: 'High', // Added priority
      editedBy: null,
    },
    {
      id: 3,
      userName: 'Robert Johnson',
      eventName: 'Team Building',
      date: '2023-11-20',
      meetingTime: '09:00 AM',
      venue: 'Garden Terrace',
      status: 'Rejected',
      approvedBy: null,
      rejectedBy: 'Director Secretary',
      message: 'Not available on this date. Please choose another.',
      contactInfo: 'robert.j@example.com',
      resourcesNeeded: 'Outdoor seating, BBQ grill',
      priority: 'Low', // Added priority
      editedBy: null,
    },
    {
      id: 4,
      userName: 'Emily Davis',
      eventName: 'Training Session',
      date: '2023-12-10',
      meetingTime: '01:00 PM',
      venue: 'Meeting Room A',
      status: 'Pending',
      approvedBy: null,
      rejectedBy: null,
      message: '',
      contactInfo: 'emily.d@example.com',
      resourcesNeeded: 'Whiteboard, Markers, 20 Laptops',
      priority: 'Medium',
      editedBy: null,
    },
    {
      id: 5,
      userName: 'Michael Wilson',
      eventName: 'Client Meeting',
      date: '2023-11-25',
      meetingTime: '11:00 AM',
      venue: 'Board Room',
      status: 'Pending',
      approvedBy: null,
      rejectedBy: null,
      message: '',
      contactInfo: 'michael.w@example.com',
      resourcesNeeded: 'Video conferencing setup',
      priority: 'High',
      editedBy: null,
    },
    {
      id: 6,
      userName: 'Sarah Thompson',
      eventName: 'Workshop',
      date: '2023-12-15',
      meetingTime: '03:00 PM',
      venue: 'Training Center',
      status: 'Pending',
      approvedBy: null,
      rejectedBy: null,
      message: '',
      contactInfo: 'sarah.t@example.com',
      resourcesNeeded: 'Flip charts, Projector, Coffee machine',
      priority: 'Low',
      editedBy: null,
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All'); // New state for priority filter
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null); // For editing

  // State to hold the admin's name/role for approval/rejection
  const [adminActionUser, setAdminActionUser] = useState('Admin User'); // Default admin user

  // Function to get priority-specific Tailwind classes
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle approve action
  const handleApprove = (id) => {
    setRequests(requests.map(request =>
      request.id === id
        ? { ...request, status: 'Approved', approvedBy: adminActionUser, rejectedBy: null }
        : request
    ));
  };

  // Handle reject action
  const handleReject = (id) => {
    setRequests(requests.map(request =>
      request.id === id
        ? { ...request, status: 'Rejected', rejectedBy: adminActionUser, approvedBy: null }
        : request
    ));
  };

  // Handle adding or updating a request
  const handleSaveRequest = (newOrUpdatedRequest) => {
    setRequests(prevRequests => {
      if (newOrUpdatedRequest.id) { // Existing request (update)
        return prevRequests.map(req =>
          req.id === newOrUpdatedRequest.id ? { ...newOrUpdatedRequest, editedBy: adminActionUser } : req
        );
      } else { // New request (add)
        return [...prevRequests, { ...newOrUpdatedRequest, id: Date.now() }];
      }
    });
  };

  // Handle deleting a request
  const handleDeleteRequest = (id) => {
    setRequests(requests.filter(request => request.id !== id));
  };

  // Filter requests based on search term, status filter, and priority filter
  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (request.contactInfo && request.contactInfo.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (request.resourcesNeeded && request.resourcesNeeded.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (request.meetingTime && request.meetingTime.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'All' || request.status === filterStatus;
    const matchesPriority = filterPriority === 'All' || request.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-lg min-h-[60vh] flex flex-col">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        User Requests Management
      </h1>

      {/* Admin User Input and Search/Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-xl shadow-inner items-center">
        <div className="relative flex-1 min-w-[200px] w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name, event, venue, time..."
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
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <FaExclamationTriangle className="text-gray-500 text-base sm:text-lg" />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="flex-1 px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base cursor-pointer bg-white transition duration-150 outline-none appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] bg-[url('data:image/svg+xml,%3Csvg_xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27_viewBox%3D%270_0_24_24%27_fill%3D%27none%27_stroke%3D%27%2364748b%27_stroke-width%3D%272%27_stroke-linecap%3D%27round%27_stroke-linejoin%3D%27round%27%3E%3Cpolyline_points%3D%276_9_12_15_18_9%27%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="relative flex items-center w-full md:w-auto">
          <FaUserShield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
          <input
            type="text"
            placeholder="Your Admin Role (e.g., Group Director)"
            value={adminActionUser}
            onChange={(e) => setAdminActionUser(e.target.value)}
            className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 outline-none text-sm sm:text-base"
            title="Enter your name or role for approval/rejection logs"
          />
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <div key={request.id} className="border border-gray-200 rounded-xl p-4 sm:p-6 bg-white shadow-md relative transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">{request.eventName}</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-1"><strong>User:</strong> {request.userName}</p>
                <p className="text-sm sm:text-base text-gray-700 mb-1"><strong>Date:</strong> {request.date}</p>
                {request.meetingTime && (
                  <p className="text-sm sm:text-base text-gray-700 mb-1 flex items-center">
                    <FaClock className="mr-1 text-gray-500" /><strong>Time:</strong> {request.meetingTime}
                  </p>
                )}
                <p className="text-sm sm:text-base text-gray-700 mb-1"><strong>Venue:</strong> {request.venue}</p>
                {request.contactInfo && <p className="text-sm sm:text-base text-gray-700 mb-1"><strong>Contact:</strong> {request.contactInfo}</p>}
                {request.resourcesNeeded && <p className="text-sm sm:text-base text-gray-700 mb-3"><strong>Resources:</strong> {request.resourcesNeeded}</p>}

                <p className="text-sm sm:text-base text-gray-700 mb-2 flex items-center">
                  <strong>Status:</strong>
                  <span className={`font-semibold px-2 sm:px-3 py-1 rounded-md inline-block ml-2 text-xs sm:text-sm ${
                    request.status === 'Approved' ? 'bg-green-100 text-green-700' :
                    request.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {request.status}
                  </span>
                </p>
                <p className="text-sm sm:text-base text-gray-700 mb-2 flex items-center">
                  <strong>Priority:</strong>
                  <span className={`font-semibold px-2 sm:px-3 py-1 rounded-md inline-block ml-2 text-xs sm:text-sm ${getPriorityClass(request.priority)}`}>
                    {request.priority}
                  </span>
                </p>
                {request.approvedBy && (
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 flex items-center">
                    <FaCheck className="mr-1 text-green-500" /> Approved by: {request.approvedBy}
                  </p>
                )}
                {request.rejectedBy && (
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 flex items-center">
                    <FaTimes className="mr-1 text-red-500" /> Rejected by: {request.rejectedBy}
                  </p>
                )}
                {request.editedBy && (
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 flex items-center">
                    <FaEdit className="mr-1 text-blue-500" /> Edited by: {request.editedBy}
                  </p>
                )}

                {request.message && (
                  <div className="bg-gray-100 p-3 rounded-md text-xs sm:text-sm text-gray-700 mt-3 border-l-4 border-blue-400">
                    <strong className="flex items-center mb-1"><FaInfoCircle className="mr-2 text-blue-500" />Admin Message:</strong> {request.message}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap justify-end gap-2 sm:gap-3 mt-4">
                {request.status === 'Pending' ? (
                  <>
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-1 sm:gap-2 transition-all duration-300 outline-none shadow-md bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-lg text-xs sm:text-sm flex-grow md:flex-grow-0"
                    >
                      <FaCheck />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-1 sm:gap-2 transition-all duration-300 outline-none shadow-md bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-lg text-xs sm:text-sm flex-grow md:flex-grow-0"
                    >
                      <FaTimes />
                      Reject
                    </button>
                  </>
                ) : (
                  <div className="text-gray-600 italic text-xs sm:text-sm flex items-center justify-end gap-1 w-full md:w-auto">
                    Action completed for this request.
                  </div>
                )}
                <button
                  onClick={() => {
                    setSelectedRequest(request);
                    setShowRequestModal(true);
                  }}
                  className="p-2 rounded-full text-blue-500 hover:text-blue-700 hover:bg-blue-50 transition text-sm sm:text-base"
                  title="Edit Request"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteRequest(request.id)}
                  className="p-2 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 transition text-sm sm:text-base"
                  title="Delete Request"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="lg:col-span-3 p-8 text-center text-gray-500 text-lg italic bg-gray-50 rounded-xl shadow-inner">
            No requests found matching your criteria.
          </div>
        )}
      </div>

      {/* Request Modal (Add/Edit) */}
      {showRequestModal && (
        <RequestModal
          onClose={() => setShowRequestModal(false)}
          onSave={handleSaveRequest}
          initialRequest={selectedRequest}
          adminUser={adminActionUser} // Pass adminUser to the modal
        />
      )}
    </div>
  );
};

export default RequestsSection;
