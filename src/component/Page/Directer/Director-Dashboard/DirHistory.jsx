import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DirHistory = () => {
  const [allBookings, setAllBookings] = useState([
    {
      id: 1,
      userId: "user123",
      userName: "John Doe",
      userEmail: "john@example.com",
      date: "2025-06-15",
      time: "10:00 AM",
      type: "Virtual",
      venue: "Conference Room A",
      status: "Approved",
      description: "Quarterly strategy meeting with remote team members",
      submittedAt: "2025-06-10T09:30:00",
      approvedAt: "2025-06-10T14:45:00",
      approvedBy: "director1"
    },
    {
      id: 2,
      userId: "user456",
      userName: "Jane Smith",
      userEmail: "jane@example.com",
      date: "2025-06-20",
      time: "2:00 PM",
      type: "Physical",
      venue: "Main Auditorium",
      status: "Rejected",
      description: "Annual company-wide conference with keynote speakers",
      submittedAt: "2025-06-15T11:20:00",
      rejectedAt: "2025-06-16T10:15:00",
      rejectedBy: "director1",
      rejectionReason: "Venue already booked for maintenance"
    },
    {
      id: 3,
      userId: "user789",
      userName: "Mike Johnson",
      userEmail: "mike@example.com",
      date: "2025-06-28",
      time: "11:00 AM",
      type: "Physical",
      venue: "Seminar Hall",
      status: "Pending",
      description: "Product launch event for new software platform",
      submittedAt: "2025-06-25T16:45:00"
    },
    {
      id: 4,
      userId: "user101",
      userName: "Sarah Williams",
      userEmail: "sarah@example.com",
      date: "2025-05-10",
      time: "9:30 AM",
      type: "Virtual",
      venue: "Zoom Meeting",
      status: "Approved",
      description: "Client onboarding session for new account",
      submittedAt: "2025-05-05T13:10:00",
      approvedAt: "2025-05-06T09:30:00",
      approvedBy: "director2"
    },
    {
      id: 5,
      userId: "user112",
      userName: "David Brown",
      userEmail: "david@example.com",
      date: "2025-07-05",
      time: "3:00 PM",
      type: "Physical",
      venue: "Training Room B",
      status: "Pending",
      description: "Team building workshop",
      submittedAt: "2025-06-30T10:20:00"
    }
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [action, setAction] = useState(null); // 'approve' or 'reject'
  const [rejectionReason, setRejectionReason] = useState("");

  // Load from localStorage on component mount
  useEffect(() => {
    const savedBookings = localStorage.getItem("allBookings");
    if (savedBookings) {
      setAllBookings(JSON.parse(savedBookings));
    }
  }, []);

  // Save to localStorage when bookings change
  useEffect(() => {
    localStorage.setItem("allBookings", JSON.stringify(allBookings));
  }, [allBookings]);

  const filteredBookings = allBookings.filter(booking => {
    const matchesFilter = filter === "all" || booking.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch = 
      booking.venue.toLowerCase().includes(searchTerm.toLowerCase()) || 
      booking.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const approveBooking = (id) => {
    setAllBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { 
          ...booking, 
          status: "Approved",
          approvedAt: new Date().toISOString(),
          approvedBy: "currentDirector" // Replace with actual director ID
        } : booking
      )
    );
    setSelectedBooking(null);
    setAction(null);
  };

  const rejectBooking = (id) => {
    if (!rejectionReason) return;
    
    setAllBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { 
          ...booking, 
          status: "Rejected",
          rejectedAt: new Date().toISOString(),
          rejectedBy: "currentDirector", // Replace with actual director ID
          rejectionReason 
        } : booking
      )
    );
    setSelectedBooking(null);
    setAction(null);
    setRejectionReason("");
  };

  const closeDetails = () => {
    setSelectedBooking(null);
    setSelectedUser(null);
    setAction(null);
    setRejectionReason("");
  };

  const getUserBookings = (userId) => {
    return allBookings.filter(booking => booking.userId === userId);
  };

  const getStatusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-medium";
    switch(status.toLowerCase()) {
      case "approved":
        return <span className={`${base} bg-green-100 text-green-800`}>Approved</span>;
      case "rejected":
        return <span className={`${base} bg-red-100 text-red-800`}>Rejected</span>;
      case "pending":
        return <span className={`${base} bg-yellow-100 text-yellow-800`}>Pending</span>;
      default:
        return <span className={`${base} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-[90%] max-w-[1800px] mx-auto py-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Search and Filters */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Booking Request History</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by user, venue, type or description..."
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute left-4 top-3.5 h-6 w-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    filter === "all" ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All Requests
                </button>
                <button
                  onClick={() => setFilter("approved")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    filter === "approved" ? 'bg-green-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Approved
                </button>
                <button
                  onClick={() => setFilter("pending")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    filter === "pending" ? 'bg-yellow-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter("rejected")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    filter === "rejected" ? 'bg-red-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Rejected
                </button>
              </div>
            </div>
          </div>

          {/* Bookings List */}
          <div className="divide-y divide-gray-200">
            {filteredBookings.length === 0 ? (
              <div className="p-12 text-center">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-xl font-medium text-gray-900">No booking requests found</h3>
                <p className="mt-2 text-gray-500 max-w-md mx-auto">
                  {searchTerm 
                    ? "No matching requests found. Try different keywords." 
                    : "There are no booking requests to display."}
                </p>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedBooking(booking)}
                >
                  <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center ${
                          booking.status === "Approved" ? "bg-green-100 text-green-800" :
                          booking.status === "Rejected" ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {booking.type === "Virtual" ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            )}
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-lg font-semibold text-gray-900">{booking.venue}</h3>
                            {getStatusBadge(booking.status)}
                          </div>
                          <p className="text-gray-600 mt-1 truncate">{booking.description}</p>
                          <div className="flex flex-wrap items-center mt-2 text-sm text-gray-500 gap-x-4 gap-y-2">
                            <span className="flex items-center">
                              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {booking.date} at {booking.time}
                            </span>
                            <span 
                              className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedUser({
                                  id: booking.userId,
                                  name: booking.userName,
                                  email: booking.userEmail
                                });
                              }}
                            >
                              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              {booking.userName}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button 
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBooking(booking);
                        }}
                      >
                        View Details
                      </button>
                      {booking.status === "Pending" && (
                        <>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBooking(booking);
                              setAction("approve");
                            }}
                            className="px-4 py-2 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 transition-colors"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBooking(booking);
                              setAction("reject");
                            }}
                            className="px-4 py-2 bg-red-600 rounded-lg text-sm font-medium text-white hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedBooking.venue}</h2>
                  <p className="text-gray-600 mt-1">{selectedBooking.description}</p>
                </div>
                <button 
                  onClick={closeDetails}
                  className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Booking Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{selectedBooking.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{selectedBooking.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedBooking.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      {getStatusBadge(selectedBooking.status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Submitted:</span>
                      <span className="font-medium">
                        {new Date(selectedBooking.submittedAt).toLocaleDateString()} at {' '}
                        {new Date(selectedBooking.submittedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    {selectedBooking.status === "Approved" && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Approved:</span>
                        <span className="font-medium">
                          {new Date(selectedBooking.approvedAt).toLocaleDateString()} at {' '}
                          {new Date(selectedBooking.approvedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    )}
                    {selectedBooking.status === "Rejected" && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rejected:</span>
                          <span className="font-medium">
                            {new Date(selectedBooking.rejectedAt).toLocaleDateString()} at {' '}
                            {new Date(selectedBooking.rejectedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reason:</span>
                          <span className="font-medium">{selectedBooking.rejectionReason}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">User Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 block mb-1">Name:</span>
                      <span className="font-medium">{selectedBooking.userName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">Email:</span>
                      <span className="font-medium">{selectedBooking.userEmail}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">Previous Bookings:</span>
                      <span className="font-medium">
                        {getUserBookings(selectedBooking.userId).length} total ({getUserBookings(selectedBooking.userId).filter(b => b.status === "Approved").length} approved)
                      </span>
                    </div>
                    <button 
                      className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={() => {
                        setSelectedUser({
                          id: selectedBooking.userId,
                          name: selectedBooking.userName,
                          email: selectedBooking.userEmail
                        });
                        setSelectedBooking(null);
                      }}
                    >
                      View all bookings by this user →
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">Venue Details</h3>
                <ul className="list-disc list-inside text-blue-700 space-y-1">
                  <li>
                    {selectedBooking.type === "Virtual" 
                      ? "Online meeting link will be shared with the user upon approval"
                      : "Physical venue details: " + selectedBooking.venue}
                  </li>
                  <li>
                    Capacity: {selectedBooking.type === "Virtual" ? "100 participants" : "50 participants"}
                  </li>
                  <li>
                    Equipment: {selectedBooking.type === "Virtual" 
                      ? "Video conferencing setup" 
                      : "Projector, microphone, whiteboard"}
                  </li>
                </ul>
              </div>

              {action === "approve" && (
                <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-medium text-green-800 mb-3">Confirm Approval</h3>
                  <p className="text-green-700 mb-4">Are you sure you want to approve this booking request?</p>
                  <div className="flex justify-end space-x-3">
                    <button 
                      onClick={closeDetails}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => approveBooking(selectedBooking.id)}
                      className="px-4 py-2 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 transition-colors"
                    >
                      Confirm Approval
                    </button>
                  </div>
                </div>
              )}

              {action === "reject" && (
                <div className="mt-6 bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="font-medium text-red-800 mb-3">Reject Booking Request</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-red-700 mb-1">
                      Reason for rejection (required):
                    </label>
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Please provide a reason for rejecting this booking request..."
                      rows={3}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button 
                      onClick={closeDetails}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => rejectBooking(selectedBooking.id)}
                      disabled={!rejectionReason}
                      className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
                        rejectionReason ? "bg-red-600 hover:bg-red-700" : "bg-red-400 cursor-not-allowed"
                      }`}
                    >
                      Confirm Rejection
                    </button>
                  </div>
                </div>
              )}

              {!action && (
                <div className="mt-6 flex justify-end space-x-3">
                  <button 
                    onClick={closeDetails}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Close
                  </button>
                  {selectedBooking.status === "Pending" && (
                    <>
                      <button 
                        onClick={() => setAction("approve")}
                        className="px-4 py-2 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 transition-colors"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => setAction("reject")}
                        className="px-4 py-2 bg-red-600 rounded-lg text-sm font-medium text-white hover:bg-red-700 transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* User Bookings Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h2>
                  <p className="text-gray-600 mt-1">{selectedUser.email}</p>
                </div>
                <button 
                  onClick={closeDetails}
                  className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-gray-900 mb-3">Booking History</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {getUserBookings(selectedUser.id).length === 0 ? (
                    <p className="text-gray-500">No previous bookings found for this user.</p>
                  ) : (
                    <div className="space-y-4">
                      {getUserBookings(selectedUser.id).map(booking => (
                        <div key={booking.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{booking.venue}</h4>
                              <p className="text-sm text-gray-600">{booking.date} at {booking.time}</p>
                            </div>
                            {getStatusBadge(booking.status)}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{booking.description}</p>
                          {booking.status === "Rejected" && booking.rejectionReason && (
                            <p className="text-sm text-red-500 mt-1">
                              <span className="font-medium">Reason: </span>{booking.rejectionReason}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button 
                  onClick={closeDetails}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DirHistory;