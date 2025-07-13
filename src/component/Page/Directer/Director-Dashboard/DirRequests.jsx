import React, { useState, useEffect } from 'react';

const Icon = ({ name, className = "w-5 h-5", color = "currentColor" }) => {
  let path = "";
  switch (name) {
    case "FaSearch":
      path = "M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z";
      break;
    case "FaFilter":
      path = "M14 12v7.88c.04.3-.02.61-.23.83a1.002 1.002 0 01-1.41.2L9.4 18.9a1 1 0 01-.23-.83V12h-.03L4.21 4.79A1 1 0 015 3h14a1 1 0 01.79 1.79L14 12z";
      break;
    case "FaDownload":
      path = "M13 10V3L4 14h7v7l9-11h-7z";
      break;
    case "FaEdit":
      path = "M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z";
      break;
    case "FaCheck":
      path = "M9 12.7L4.3 8 3 9.3l6 6L21 4 19.7 2.7z";
      break;
    case "FaTimes":
      path = "M18 6L6 18M6 6l12 12";
      break;
    case "FaInfoCircle":
      path = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z";
      break;
    case "FaUser":
      path = "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z";
      break;
    case "FaBuilding":
      path = "M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v2H9V4zm4 0h2v2h-2V4zm4 0h2v2h-2V4zM9 8h2v2H9V8zm4 0h2v2h-2V8zm4 0h2v2h-2V8zM9 12h2v2H9v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM9 16h2v2H9v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z";
      break;
    case "FaCalendarAlt":
      path = "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM5 7V6h14v1H5z";
      break;
    case "FaClock":
      path = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.01 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-.22-13H11v6l5.25 3.15.75-1.23-4.5-2.7V7h-.01z";
      break;
    case "FaClipboardList":
      path = "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 14h-4v-2h4v2zm0-4h-4V9h4v2zm0-4h-4V5h4v2z";
      break;
    case "FaSortAlphaDown":
      path = "M19 15l-6 6-6-6h4V3h4v12h4z";
      break;
    case "FaSortAlphaUp":
      path = "M5 17l6-6 6 6h-4v6h-4v-6H5z";
      break;
    case "FaSpinner":
      path = "M12 4V2A10 10 0 002 12h2a8 8 0 018-8z";
      break;
    case "FaUsers":
      path = "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-4 0c1.66 0 2.99-1.34 2.99-3S13.66 5 12 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-4 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm8 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z";
      break;
    case "FaTools":
      path = "M7 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S4 3.34 4 5v6c0 1.66 1.34 3 3 3zm10 0c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3s-3 1.34-3 3v6c0 1.66 1.34 3 3 3zM7 16c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm10 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z";
      break;
    default:
      path = "";
  }

  return (
    <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d={path} />
    </svg>
  );
};

const DirectorRequests = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [editingRequestId, setEditingRequestId] = useState(null);
  const [editNotes, setEditNotes] = useState('');
  const [requestDetails, setRequestDetails] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  const dummyRequests = [
    {
      id: 1,
      user: 'Alice Johnson',
      venue: 'Auditorium A',
      date: '2025-07-12',
      time: '10:00 AM - 12:00 PM',
      purpose: 'Seminar on AI',
      capacity: 150,
      resources: 'Projector, Mic',
      status: 'Pending',
      notes: '',
      type: 'Seminar',
    },
    {
      id: 2,
      user: 'Bob Smith',
      venue: 'Conference Room B',
      date: '2025-07-13',
      time: '1:00 PM - 3:00 PM',
      purpose: 'Team Strategy Meeting',
      capacity: 25,
      resources: 'Whiteboard',
      status: 'Approved by Group Director',
      notes: 'Ensure projector is functional.',
      type: 'Meeting',
    },
    {
      id: 3,
      user: 'Carol Lee',
      venue: 'Lab 4',
      date: '2025-07-14',
      time: '9:00 AM - 11:00 AM',
      purpose: 'Workshop on Robotics',
      capacity: 30,
      resources: 'Computers, Internet',
      status: 'Rejected by Group Director',
      notes: 'Lab unavailable at requested time.',
      type: 'Workshop',
    },
    {
      id: 4,
      user: 'David Kim',
      venue: 'Auditorium B',
      date: '2025-07-15',
      time: '2:00 PM - 5:00 PM',
      purpose: 'Product Launch',
      capacity: 100,
      resources: 'Stage, Mic, Speakers',
      status: 'Pending',
      notes: '',
      type: 'Event',
    },
    {
      id: 5,
      user: 'Eva Martinez',
      venue: 'Room 201',
      date: '2025-07-16',
      time: '11:00 AM - 1:00 PM',
      purpose: 'Training Session',
      capacity: 20,
      resources: 'Projector',
      status: 'Pending',
      notes: '',
      type: 'Training',
    },
    {
      id: 6,
      user: 'Frank Wright',
      venue: 'Hall 3',
      date: '2025-07-17',
      time: '4:00 PM - 6:00 PM',
      purpose: 'Networking Event',
      capacity: 80,
      resources: 'Mic, Refreshments',
      status: 'Approved by Group Director',
      notes: '',
      type: 'Networking',
    },
    {
      id: 7,
      user: 'Grace Lee',
      venue: 'Room 101',
      date: '2025-07-18',
      time: '9:00 AM - 10:00 AM',
      purpose: 'One-on-One Coaching',
      capacity: 2,
      resources: 'Whiteboard',
      status: 'Pending',
      notes: '',
      type: 'Coaching',
    },
    {
      id: 8,
      user: 'Henry Adams',
      venue: 'Room 305',
      date: '2025-07-19',
      time: '3:00 PM - 4:30 PM',
      purpose: 'Coding Bootcamp',
      capacity: 35,
      resources: 'Laptops, Projector',
      status: 'Rejected by Group Director',
      notes: 'Capacity exceeded for this room.',
      type: 'Bootcamp',
    },
    {
      id: 9,
      user: 'Isabella Stone',
      venue: 'Lab 2',
      date: '2025-07-20',
      time: '1:00 PM - 3:00 PM',
      purpose: 'Cybersecurity Workshop',
      capacity: 25,
      resources: 'Computers',
      status: 'Pending',
      notes: '',
      type: 'Workshop',
    },
    {
      id: 10,
      user: 'Jack Taylor',
      venue: 'Auditorium A',
      date: '2025-07-21',
      time: '10:00 AM - 12:00 PM',
      purpose: 'Annual Review Meeting',
      capacity: 200,
      resources: 'Mic, Projector',
      status: 'Approved by Group Director',
      notes: 'VIP setup required.',
      type: 'Meeting',
    },
    ...Array.from({ length: 20 }, (_, i) => ({
      id: 11 + i,
      user: `User ${i + 1}`,
      venue: `Room ${100 + i}`,
      date: `2025-07-${22 + (i % 8)}`,
      time: `${8 + (i % 4)}:00 AM - ${10 + (i % 4)}:00 AM`,
      purpose: `Event ${i + 1} Purpose`,
      capacity: 10 + (i * 2),
      resources: i % 2 === 0 ? 'Projector, Mic' : 'Whiteboard',
      status:
        i % 3 === 0
          ? 'Pending'
          : i % 3 === 1
            ? 'Approved by Group Director'
            : 'Rejected by Group Director',
      notes:
        i % 4 === 0
          ? 'Requires special setup.'
          : i % 5 === 0
            ? 'Confirmed with venue.'
            : '',
      type: i % 2 === 0 ? 'Workshop' : 'Meeting',
    })),
  ];

  const [requests, setRequests] = useState(dummyRequests);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setRequests(dummyRequests);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const sortedRequests = [...requests].sort((a, b) => {
    if (sortConfig.key === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA;
    }
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredAndSortedRequests = sortedRequests.filter(req => {
    const matchesSearch = req.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || req.status.toLowerCase() === selectedStatus;
    const matchesType = selectedType === 'all' || req.type.toLowerCase() === selectedType.toLowerCase();

    const requestDate = new Date(req.date);
    const matchesStartDate = startDateFilter ? requestDate >= new Date(startDateFilter) : true;
    const matchesEndDate = endDateFilter ? requestDate <= new Date(endDateFilter) : true;

    return matchesSearch && matchesStatus && matchesType && matchesStartDate && matchesEndDate;
  });

  // Alert functions
  const showExportAlert = () => {
    alert('Export functionality would be implemented here. This would download all request data.');
  };

  const showApproveAlert = (request) => {
    alert(`Approving request:\n\nPurpose: ${request.purpose}\nUser: ${request.user}\nVenue: ${request.venue}\nDate: ${request.date}`);
  };

  const showRejectAlert = (request) => {
    alert(`Rejecting request:\n\nPurpose: ${request.purpose}\nUser: ${request.user}\nVenue: ${request.venue}\nDate: ${request.date}`);
  };

  const showNotesAlert = (request) => {
    alert(`Editing notes for request:\n\nPurpose: ${request.purpose}\nCurrent notes: ${request.notes || 'None'}`);
  };

  const showDetailsAlert = (request) => {
    alert(`Showing details for request:\n\nPurpose: ${request.purpose}\nUser: ${request.user}\nVenue: ${request.venue}\nDate: ${request.date}\nTime: ${request.time}\nStatus: ${request.status}\nNotes: ${request.notes || 'None'}`);
  };

  const showFiltersAlert = () => {
    alert('Applying filters:\n' + 
      `Status: ${selectedStatus}\n` +
      `Type: ${selectedType}\n` +
      `Date Range: ${startDateFilter || 'Any'} to ${endDateFilter || 'Any'}`);
  };

  const handleStatusChange = (id, status) => {
    const request = requests.find(r => r.id === id);
    if (status.includes('Approved')) {
      showApproveAlert(request);
    } else {
      showRejectAlert(request);
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setRequests(reqs => reqs.map(r => r.id === id ? { ...r, status } : r));
      setIsLoading(false);
    }, 300);
  };

  const handleEdit = (id) => {
    const request = requests.find(r => r.id === id);
    showNotesAlert(request);
    setEditingRequestId(id);
    setEditNotes(request?.notes || '');
  };

  const saveEdit = (id) => {
    setIsLoading(true);
    setTimeout(() => {
      setRequests(reqs => reqs.map(r => r.id === id ? { ...r, notes: editNotes } : r));
      setEditingRequestId(null);
      setEditNotes('');
      setIsLoading(false);
      alert('Notes saved successfully!');
    }, 300);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? <Icon name="FaSortAlphaUp" className="ml-1 text-gray-500" /> : <Icon name="FaSortAlphaDown" className="ml-1 text-gray-500" />;
  };

  const applyFilters = () => {
    showFiltersAlert();
    setIsFilterModalOpen(false);
  };

  const statusBadge = (status) => {
    const base = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide capitalize";
    switch (status) {
      case 'Approved by Group Director':
        return <span className={`${base} bg-green-100 text-green-800`}><Icon name="FaCheck" className="mr-1 text-sm" /> Approved</span>;
      case 'Rejected by Group Director':
        return <span className={`${base} bg-red-100 text-red-800`}><Icon name="FaTimes" className="mr-1 text-sm" /> Rejected</span>;
      default:
        return <span className={`${base} bg-yellow-100 text-yellow-800`}><Icon name="FaClock" className="mr-1 text-sm" /> Pending</span>;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-0 flex items-center">
            <Icon name="FaClipboardList" className="inline-block mr-3 text-blue-600 w-6 h-6 sm:w-8 sm:h-8" />
            Director Booking Requests
          </h1>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={showExportAlert}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-5 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition duration-200 ease-in-out shadow-md hover:shadow-md transform hover:-translate-y-0.5"
            >
              <Icon name="FaDownload" className="mr-2 w-4 h-4" /> Export Data
            </button>
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center bg-white border border-gray-300 px-4 py-2 sm:px-5 sm:py-2 rounded-lg text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 transition duration-200 ease-in-out shadow-md hover:shadow-md transform hover:-translate-y-0.5"
            >
              <Icon name="FaFilter" className="mr-2 w-4 h-4" /> More Filters
            </button>
          </div>
        </div>

        {/* Search and Quick Filter & Sort */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6 items-center">
          <div className="relative md:col-span-2">
            <Icon name="FaSearch" className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by user, venue, purpose, or type..."
              className="pl-10 pr-4 py-2 sm:py-2 border border-gray-300 rounded-lg w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 sm:py-2 text-sm sm:text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved by group director">Approved</option>
            <option value="rejected by group director">Rejected</option>
          </select>
          <select
            value={sortConfig.key}
            onChange={(e) => requestSort(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 sm:py-2 text-sm sm:text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm bg-white"
          >
            <option value="date">Sort by Date</option>
            <option value="user">Sort by User</option>
            <option value="venue">Sort by Venue</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center justify-center py-8 text-blue-600">
            <Icon name="FaSpinner" className="animate-spin w-6 h-6 sm:w-8 sm:h-8 mr-3" />
            <p className="text-base sm:text-lg font-medium">Loading requests...</p>
          </div>
        )}

        {/* Requests List */}
        {!isLoading && filteredAndSortedRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center mt-10 border border-gray-200">
            <p className="text-lg sm:text-xl text-gray-500 font-semibold">No requests found matching your criteria.</p>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Try adjusting your search or filters.</p>
          </div>
        ) : (
          !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAndSortedRequests.map(req => (
                <div key={req.id} className="bg-white rounded-lg shadow-md hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 ease-in-out p-4 sm:p-6 border border-gray-200 group">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex-grow pr-4">{req.purpose}</h3>
                    {statusBadge(req.status)}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-gray-700 text-sm sm:text-base mb-3 border-b pb-3 border-gray-100">
                    <p className="flex items-center"><Icon name="FaUser" className="mr-2 text-blue-500 w-4 h-4" /> <span className="font-medium">User:</span> {req.user}</p>
                    <p className="flex items-center"><Icon name="FaBuilding" className="mr-2 text-green-500 w-4 h-4" /> <span className="font-medium">Venue:</span> {req.venue}</p>
                    <p className="flex items-center"><Icon name="FaCalendarAlt" className="mr-2 text-purple-500 w-4 h-4" /> <span className="font-medium">Date:</span> {req.date}</p>
                    <p className="flex items-center"><Icon name="FaClock" className="mr-2 text-orange-500 w-4 h-4" /> <span className="font-medium">Time:</span> {req.time}</p>
                    <p className="flex items-center"><Icon name="FaUsers" className="mr-2 text-red-500 w-4 h-4" /> <span className="font-medium">Capacity:</span> {req.capacity}</p>
                    <p className="flex items-center"><Icon name="FaTools" className="mr-2 text-cyan-600 w-4 h-4" /> <span className="font-medium">Resources:</span> {req.resources}</p>
                  </div>

                  {editingRequestId === req.id ? (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200 animate-fadeIn">
                      <label htmlFor={`notes-${req.id}`} className="block text-sm font-medium text-gray-700 mb-1">Edit Notes:</label>
                      <textarea
                        id={`notes-${req.id}`}
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[60px]"
                        placeholder="Add or edit notes here..."
                        rows="3"
                      ></textarea>
                      <div className="flex justify-end mt-2 space-x-2">
                        <button
                          onClick={() => setEditingRequestId(null)}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition duration-200 ease-in-out"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => saveEdit(req.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition duration-200 ease-in-out"
                        >
                          Save Notes
                        </button>
                      </div>
                    </div>
                  ) : (
                    req.notes && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200 animate-fadeIn">
                        <p className="text-sm text-blue-800 font-medium">Notes:</p>
                        <p className="text-sm text-blue-700 mt-1">{req.notes}</p>
                      </div>
                    )
                  )}

                  <div className="flex flex-wrap gap-2 mt-4 justify-end">
                    <button
                      onClick={() => {
                        const request = filteredAndSortedRequests.find(r => r.id === req.id);
                        showApproveAlert(request);
                        handleStatusChange(req.id, 'Approved by Group Director');
                      }}
                      className="flex items-center bg-green-500 hover:bg-green-600 text-white px-3 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition duration-200 ease-in-out shadow-sm hover:shadow-sm"
                      disabled={isLoading}
                    >
                      <Icon name="FaCheck" className="mr-1 w-3 h-3 sm:w-4 sm:h-4" /> Approve
                    </button>
                   <button
  onClick={() => handleStatusChange(req.id, 'Rejected by Group Director')}
  className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition duration-200 ease-in-out shadow-sm hover:shadow-md"
  disabled={isLoading}
>
  {/* Solution 1: Add stroke-current */}
  <Icon name="FaTimes" className="mr-2 w-4 h-4 text-white stroke-current" />
  
  {/* OR Solution 2: Force SVG display */}
  <span className="inline-flex items-center">
    <Icon name="FaTimes" className="mr-2 w-4 h-4 text-white" style={{ display: 'inline-block' }} />
    Reject
  </span>
</button>
                    <button
                      onClick={() => {
                        const request = filteredAndSortedRequests.find(r => r.id === req.id);
                        showNotesAlert(request);
                        handleEdit(req.id);
                      }}
                      className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition duration-200 ease-in-out shadow-sm hover:shadow-sm"
                      disabled={isLoading}
                    >
                      <Icon name="FaEdit" className="mr-1 w-3 h-3 sm:w-4 sm:h-4" /> Notes
                    </button>
                    <button
                      onClick={() => {
                        const request = filteredAndSortedRequests.find(r => r.id === req.id);
                        showDetailsAlert(request);
                        setRequestDetails(req);
                      }}
                      className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition duration-200 ease-in-out shadow-sm hover:shadow-sm"
                      disabled={isLoading}
                    >
                      <Icon name="FaInfoCircle" className="mr-1 w-3 h-3 sm:w-4 sm:h-4" /> Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* Request Details Modal */}
        {requestDetails && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4 sm:p-6 animate-fadeIn">
            <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md sm:max-w-lg transform transition-all duration-300 ease-out scale-95 opacity-0 animate-scaleIn">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b pb-3 flex items-center">
                <Icon name="FaInfoCircle" className="mr-3 text-indigo-600 w-6 h-6 sm:w-8 sm:h-8" /> Request Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-sm sm:text-base text-gray-700">
                <p><strong className="text-gray-800">User:</strong> {requestDetails.user}</p>
                <p><strong className="text-gray-800">Type:</strong> {requestDetails.type}</p>
                <p><strong className="text-gray-800">Venue:</strong> {requestDetails.venue}</p>
                <p><strong className="text-gray-800">Date:</strong> {requestDetails.date}</p>
                <p><strong className="text-gray-800">Time:</strong> {requestDetails.time}</p>
                <p className="col-span-1 sm:col-span-2"><strong className="text-gray-800">Purpose:</strong> {requestDetails.purpose}</p>
                <p><strong className="text-gray-800">Capacity:</strong> {requestDetails.capacity}</p>
                <p><strong className="text-gray-800">Resources:</strong> {requestDetails.resources}</p>
                <p className="col-span-1 sm:col-span-2"><strong className="text-gray-800">Status:</strong> {statusBadge(requestDetails.status)}</p>
                <div className="col-span-1 sm:col-span-2">
                  <p><strong className="text-gray-800">Notes:</strong> {requestDetails.notes || 'None'}</p>
                </div>
              </div>
              <div className="mt-5 text-right">
                <button
                  onClick={() => setRequestDetails(null)}
                  className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition duration-200 ease-in-out shadow-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter Modal */}
        {isFilterModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4 sm:p-6 animate-fadeIn">
            <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md transform transition-all duration-300 ease-out scale-95 opacity-0 animate-scaleIn">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b pb-3 flex items-center">
                <Icon name="FaFilter" className="mr-3 text-blue-600 w-6 h-6 sm:w-8 sm:h-8" /> Advanced Filters
              </h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="status-filter-modal" className="block text-sm font-medium text-gray-700 mb-1">Filter by Status:</label>
                  <select
                    id="status-filter-modal"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved by group director">Approved</option>
                    <option value="rejected by group director">Rejected</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="request-type-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Type:</label>
                  <select
                    id="request-type-filter"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="all">All Types</option>
                    <option value="seminar">Seminar</option>
                    <option value="meeting">Meeting</option>
                    <option value="workshop">Workshop</option>
                    <option value="event">Event</option>
                    <option value="training">Training</option>
                    <option value="networking">Networking</option>
                    <option value="coaching">Coaching</option>
                    <option value="bootcamp">Bootcamp</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">Date Range:</label>
                  <input
                    type="date"
                    id="start-date"
                    value={startDateFilter}
                    onChange={(e) => setStartDateFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    id="end-date"
                    value={endDateFilter}
                    onChange={(e) => setEndDateFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base w-full mt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-5 flex justify-end space-x-3">
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition duration-200 ease-in-out"
                >
                  Close
                </button>
                <button
                  onClick={applyFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition duration-200 ease-in-out shadow-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectorRequests;