import React, { useState } from "react";

// Inline SVG for common icons
const Icon = ({ name, className = "w-4 h-4", color = "currentColor" }) => {
  let path = "";
  switch (name) {
    case "FaEdit":
      path = "M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z";
      break;
    case "FaTrash":
      path = "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z";
      break;
    case "FaCheck":
      path = "M9 12.7L4.3 8 3 9.3l6 6L21 4 19.7 2.7z";
      break;
    case "FaTimes":
      path = "M18 6L6 18M6 6l12 12";
      break;
    case "FaStickyNote":
      path = "M15 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9l-6-6zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z";
      break;
    case "FaChartBar":
      path = "M4 9h4v11H4zm6-4h4v15h-4zm6 6h4v9h-4z";
      break;
    case "FaCalendarAlt":
      path = "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM5 7V6h14v1H5z";
      break;
    case "FaUser":
      path = "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z";
      break;
    case "FaFilter":
      path = "M14 12v7.88c.04.3-.02.61-.23.83a1.002 1.002 0 01-1.41.2L9.4 18.9a1 1 0 01-.23-.83V12h-.03L4.21 4.79A1 1 0 015 3h14a1 1 0 01.79 1.79L14 12z";
      break;
    case "FaStar":
      path = "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";
      break;
    case "FaUsers":
      path = "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-4 0c1.66 0 2.99-1.34 2.99-3S13.66 5 12 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-4 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm8 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z";
      break;
    case "FaChartLine":
      path = "M16 18V6h-4v12h4zM9 18V2H5v16h4zM22 18V10h-4v8h4z";
      break;
    case "FaTags":
      path = "M20 10V8h-2V4h-4V2H8v2H4v4H2v4h2v6h4v2h4v-2h4v-6h2zm-4 0h-2V6h2v4z";
      break;
    case "FaPaperclip":
      path = "M16.5 6v10.5c0 1.93-1.57 3.5-3.5 3.5s-3.5-1.57-3.5-3.5V7c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v7c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55-.45-1-1-1s-1 .45-1 1v6.5c0 .55-.45 1-1 1s-1-.45-1-1V6H7v7.5c0 2.48 2.02 4.5 4.5 4.5s4.5-2.02 4.5-4.5V6h-1.5z";
      break;
    case "FaThumbsUp":
      path = "M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2.04c0-1.1-.9-2-2-2z";
      break;
    case "FaThumbsDown":
      path = "M19 3h-4V1h4v2zm-2 18c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V3c0-1.1-.9-2-2-2h-9c-.83 0-1.54.5-1.84 1.22L1 10.05c-.09.23-.14.47-.14.73v2.04c0 1.1.9 2 2 2h1.5z";
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

const initialRemarks = [
  { 
    id: 1, 
    text: "Meeting went well. Room was clean and prepared.", 
    date: "2025-06-20", 
    status: "resolved",
    venue: "Conference Room A",
    rating: 5,
    category: "positive",
    attachments: 0,
    assignedTo: "Sarah Johnson"
  },
  { 
    id: 2, 
    text: "Projector was not working. Needs maintenance.", 
    date: "2025-06-22", 
    status: "pending",
    venue: "Main Auditorium",
    rating: 2,
    category: "equipment",
    attachments: 2,
    assignedTo: "Michael Chen"
  },
  { 
    id: 3, 
    text: "Excellent service from the staff. Will book again!", 
    date: "2025-06-25", 
    status: "resolved",
    venue: "Seminar Hall",
    rating: 5,
    category: "positive",
    attachments: 0,
    assignedTo: "Admin Team"
  },
  { 
    id: 4, 
    text: "Room temperature was too cold throughout the meeting", 
    date: "2025-06-28", 
    status: "in-progress",
    venue: "Training Room B",
    rating: 3,
    category: "environment",
    attachments: 1,
    assignedTo: "Facilities Team"
  },
  { 
    id: 5, 
    text: "WiFi connectivity issues during the workshop", 
    date: "2025-07-01", 
    status: "pending",
    venue: "Conference Room C",
    rating: 2,
    category: "technology",
    attachments: 0,
    assignedTo: "IT Support"
  },
];

const venues = ["Conference Room A", "Main Auditorium", "Seminar Hall", "Training Room B", "Conference Room C"];
const categories = ["positive", "equipment", "environment", "technology", "staff", "other"];
const teamMembers = ["Admin Team", "Facilities Team", "IT Support", "Sarah Johnson", "Michael Chen", "Emma Rodriguez"];
const statusOptions = ["all", "pending", "in-progress", "resolved"];

const DirectorRemarks = () => {
  const [remarks, setRemarks] = useState(initialRemarks);
  const [newRemark, setNewRemark] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [rating, setRating] = useState(0);
  const [activeTab, setActiveTab] = useState("remarks");
  const [showStatistics, setShowStatistics] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const [newAttachment, setNewAttachment] = useState(null);

  // Statistics calculation
  const resolvedCount = remarks.filter(r => r.status === "resolved").length;
  const pendingCount = remarks.filter(r => r.status === "pending").length;
  const inProgressCount = remarks.filter(r => r.status === "in-progress").length;
  const positiveRemarks = remarks.filter(r => r.category === "positive").length;
  
  const averageRating = remarks.length > 0 
    ? (remarks.reduce((sum, remark) => sum + (remark.rating || 0), 0) / remarks.length).toFixed(1) 
    : 0;
  
  const venuePerformance = venues.map(venue => {
    const venueRemarks = remarks.filter(r => r.venue === venue);
    const venueRating = venueRemarks.length > 0 
      ? (venueRemarks.reduce((sum, r) => sum + r.rating, 0) / venueRemarks.length).toFixed(1)
      : 0;
    return { venue, rating: venueRating, count: venueRemarks.length };
  }).sort((a, b) => b.rating - a.rating);

  const categoryDistribution = categories.map(category => {
    const count = remarks.filter(r => r.category === category).length;
    return { category, count };
  }).filter(item => item.count > 0);

  const handleAddRemark = (e) => {
    e.preventDefault();
    if (newRemark.trim() === "") return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      const newEntry = {
        id: Date.now(),
        text: newRemark,
        date: new Date().toISOString().split("T")[0],
        status: "pending",
        venue: selectedVenue || "General",
        rating: rating,
        category: selectedCategory !== "all" ? selectedCategory : "other",
        attachments: newAttachment ? 1 : 0,
        assignedTo: "Unassigned"
      };

      setRemarks([newEntry, ...remarks]);
      setNewRemark("");
      setSelectedVenue("");
      setRating(0);
      setSelectedCategory("all");
      setNewAttachment(null);
      setIsSubmitting(false);
    }, 500);
  };

  const handleEditRemark = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id) => {
    setRemarks(remarks.map(remark => 
      remark.id === id ? { ...remark, text: editText } : remark
    ));
    setEditingId(null);
  };

  const handleDeleteRemark = (id) => {
    setRemarks(remarks.filter(remark => remark.id !== id));
  };

  const handleStatusChange = (id, status) => {
    setRemarks(remarks.map(remark => 
      remark.id === id ? { ...remark, status } : remark
    ));
  };

  const handleAssignTo = (id, assignee) => {
    setRemarks(remarks.map(remark => 
      remark.id === id ? { ...remark, assignedTo: assignee } : remark
    ));
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "resolved":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center">
          <Icon name="FaCheck" className="mr-1 w-3 h-3" /> Resolved
        </span>;
      case "pending":
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center">
          <Icon name="FaTimes" className="mr-1 w-3 h-3" /> Pending
        </span>;
      case "in-progress":
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium flex items-center">
          <Icon name="FaChartLine" className="mr-1 w-3 h-3" /> In Progress
        </span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Unknown</span>;
    }
  };

  const getCategoryBadge = (category) => {
    switch(category) {
      case "positive":
        return <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs flex items-center">
          <Icon name="FaThumbsUp" className="mr-1 w-3 h-3" /> Positive
        </span>;
      case "equipment":
        return <span className="px-2 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs">Equipment</span>;
      case "environment":
        return <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs">Environment</span>;
      case "technology":
        return <span className="px-2 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full text-xs">Technology</span>;
      case "staff":
        return <span className="px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs">Staff</span>;
      default:
        return <span className="px-2 py-1 bg-gray-50 text-gray-700 border border-gray-200 rounded-full text-xs">Other</span>;
    }
  };

  const filteredRemarks = remarks.filter(remark => {
    const venueMatch = selectedVenue ? remark.venue === selectedVenue : true;
    const statusMatch = selectedStatus === "all" || remark.status === selectedStatus;
    const categoryMatch = selectedCategory === "all" || remark.category === selectedCategory;
    return venueMatch && statusMatch && categoryMatch;
  });

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAttachment(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header with Tabs */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Icon name="FaStickyNote" className="text-white w-5 h-5 sm:w-6 sm:h-6 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-white">Director Remarks</h1>
              <p className="text-blue-100 mt-1">Comprehensive feedback management system</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowStatistics(!showStatistics)}
              className="flex items-center px-3 py-1 bg-blue-500 hover:bg-blue-400 rounded-lg text-white text-sm"
            >
              <Icon name="FaChartBar" className="mr-1 w-4 h-4" />
              {showStatistics ? "Hide Stats" : "Show Stats"}
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap border-b border-blue-500">
          {["remarks", "analytics", "categories", "team"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg mr-2 ${
                activeTab === tab 
                  ? "bg-white text-blue-700" 
                  : "text-blue-200 hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      {showStatistics && (
        <div className="bg-blue-50 border-b">
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Icon name="FaStickyNote" className="mr-1 w-4 h-4" /> Total Remarks
              </div>
              <div className="text-2xl font-bold text-blue-700">{remarks.length}</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Icon name="FaCheck" className="mr-1 w-4 h-4" /> Resolved
              </div>
              <div className="text-2xl font-bold text-green-700">{resolvedCount}</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-100">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Icon name="FaChartLine" className="mr-1 w-4 h-4" /> In Progress
              </div>
              <div className="text-2xl font-bold text-yellow-700">{inProgressCount}</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Icon name="FaStar" className="mr-1 w-4 h-4" /> Avg. Rating
              </div>
              <div className="flex items-center">
                <div className="text-2xl font-bold text-purple-700 mr-2">{averageRating}</div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Icon 
                      name="FaStar" 
                      key={i} 
                      className={`${i < averageRating ? "text-yellow-400" : "text-gray-300"} w-4 h-4`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6">
        {activeTab === "remarks" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Add Remark Form */}
            <div className="lg:col-span-1 bg-blue-50 p-5 rounded-lg border border-blue-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Icon name="FaStickyNote" className="mr-2 text-blue-600 w-5 h-5" />
                Add New Remark
              </h2>
              
              <form onSubmit={handleAddRemark}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Venue
                  </label>
                  <select
                    value={selectedVenue}
                    onChange={(e) => setSelectedVenue(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Venues</option>
                    {venues.map(venue => (
                      <option key={venue} value={venue}>{venue}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Rating
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-2xl focus:outline-none"
                      >
                        <Icon name="FaStar" className={`${star <= rating ? "text-yellow-400" : "text-gray-300"} w-5 h-5`} />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{rating}.0</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Director Remark
                  </label>
                  <textarea
                    value={newRemark}
                    onChange={(e) => setNewRemark(e.target.value)}
                    placeholder="Describe your experience, report issues, or provide suggestions..."
                    rows={4}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attachment
                  </label>
                  <div className="flex items-center">
                    <label className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200">
                      <Icon name="FaPaperclip" className="mr-2 w-4 h-4" />
                      {newAttachment ? newAttachment.name : "Attach File"}
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={handleAttachmentChange}
                      />
                    </label>
                    {newAttachment && (
                      <span className="ml-2 text-sm text-gray-600">{newAttachment.name}</span>
                    )}
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || newRemark.trim() === ""}
                  className={`w-full py-2 rounded-lg font-medium flex items-center justify-center ${
                    isSubmitting || newRemark.trim() === ""
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Remark"
                  )}
                </button>
              </form>
              
              <div className="mt-8">
                <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                  <Icon name="FaUser" className="mr-2 text-blue-600 w-5 h-5" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="text-sm p-3 bg-white rounded-lg border">
                    <p className="font-medium">You submitted a remark</p>
                    <p className="text-gray-600">Conference Room A • 2 hours ago</p>
                  </div>
                  <div className="text-sm p-3 bg-white rounded-lg border">
                    <p className="font-medium">Your remark was resolved</p>
                    <p className="text-gray-600">Seminar Hall • Yesterday</p>
                  </div>
                  <div className="text-sm p-3 bg-white rounded-lg border">
                    <p className="font-medium">You rated Main Auditorium</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon name="FaStar" key={i} className={`${i < 4 ? "text-yellow-400" : "text-gray-300"} w-4 h-4`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column - Remarks List */}
            <div className="lg:col-span-2">
              <div className="bg-white border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">
                    All Remarks ({filteredRemarks.length})
                  </h2>
                  
                  <div className="flex flex-wrap gap-2">
                    <div className="relative">
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="pl-8 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 appearance-none"
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>
                            {status === "all" ? "All Status" : status}
                          </option>
                        ))}
                      </select>
                      <Icon name="FaFilter" className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    </div>
                    
                    <div className="relative">
                      <select
                        value={selectedVenue}
                        onChange={(e) => setSelectedVenue(e.target.value)}
                        className="pl-8 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 appearance-none"
                      >
                        <option value="">All Venues</option>
                        {venues.map(venue => (
                          <option key={venue} value={venue}>{venue}</option>
                        ))}
                      </select>
                      <Icon name="FaCalendarAlt" className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    </div>
                    
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="pl-8 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 appearance-none"
                      >
                        <option value="all">All Categories</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      <Icon name="FaTags" className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    </div>
                  </div>
                </div>
                
                {filteredRemarks.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon name="FaStickyNote" className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No remarks found</h3>
                    <p className="mt-1 text-gray-500">
                      Try changing your filters or submit a new remark
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredRemarks.map((remark) => (
                      <div 
                        key={remark.id}
                        className={`p-4 rounded-lg border-l-4 ${
                          remark.status === "resolved" 
                            ? "border-green-500 bg-green-50" 
                            : remark.status === "pending"
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-blue-500 bg-blue-50"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-gray-800">{remark.venue}</h3>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Icon 
                                    name="FaStar" 
                                    key={i} 
                                    className={`text-sm ${i < remark.rating ? "text-yellow-400" : "text-gray-300"} w-3 h-3`} 
                                  />
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-2">
                              {getCategoryBadge(remark.category)}
                              {getStatusBadge(remark.status)}
                              {remark.attachments > 0 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-full text-xs flex items-center">
                                  <Icon name="FaPaperclip" className="mr-1 w-3 h-3" /> {remark.attachments} file
                                </span>
                              )}
                            </div>
                            
                            {editingId === remark.id ? (
                              <div className="mb-3">
                                <textarea
                                  value={editText}
                                  onChange={(e) => setEditText(e.target.value)}
                                  rows={2}
                                  className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                                />
                              </div>
                            ) : (
                              <p className="text-gray-700">{remark.text}</p>
                            )}
                            
                            <div className="flex flex-col sm:flex-row sm:items-center mt-3 text-sm text-gray-500">
                              <div className="flex items-center mb-1 sm:mb-0">
                                <Icon name="FaCalendarAlt" className="mr-1 text-gray-400 w-4 h-4" />
                                <span>{remark.date}</span>
                              </div>
                              <div className="sm:mx-3 hidden sm:block">•</div>
                              <div className="mt-1 sm:mt-0 flex items-center">
                                <Icon name="FaUser" className="mr-1 text-gray-400 w-4 h-4" />
                                <span>{remark.assignedTo}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 ml-3">
                            {editingId === remark.id ? (
                              <>
                                <button 
                                  onClick={() => handleSaveEdit(remark.id)}
                                  className="p-2 text-green-600 hover:bg-green-100 rounded-full"
                                  title="Save changes"
                                >
                                  <Icon name="FaCheck" className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => setEditingId(null)}
                                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                                  title="Cancel"
                                >
                                  <Icon name="FaTimes" className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button 
                                  onClick={() => handleEditRemark(remark.id, remark.text)}
                                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                                  title="Edit remark"
                                >
                                  <Icon name="FaEdit" className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteRemark(remark.id)}
                                  className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                                  title="Delete remark"
                                >
                                  <Icon name="FaTrash" className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap gap-2">
                          <select
                            value={remark.assignedTo}
                            onChange={(e) => handleAssignTo(remark.id, e.target.value)}
                            className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                          >
                            {teamMembers.map(member => (
                              <option key={member} value={member}>{member}</option>
                            ))}
                          </select>
                          
                          <button
                            onClick={() => handleStatusChange(remark.id, "pending")}
                            className={`px-2 py-1 text-xs rounded ${
                              remark.status === "pending" 
                                ? "bg-yellow-500 text-white" 
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            Mark Pending
                          </button>
                          <button
                            onClick={() => handleStatusChange(remark.id, "in-progress")}
                            className={`px-2 py-1 text-xs rounded ${
                              remark.status === "in-progress" 
                                ? "bg-blue-500 text-white" 
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            In Progress
                          </button>
                          <button
                            onClick={() => handleStatusChange(remark.id, "resolved")}
                            className={`px-2 py-1 text-xs rounded ${
                              remark.status === "resolved" 
                                ? "bg-green-500 text-white" 
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            Mark Resolved
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mt-6 bg-white border rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-3">Remark Guidelines</h3>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
                  <li><span className="font-medium">Be specific:</span> Mention venue names, equipment issues, and staff interactions</li>
                  <li><span className="font-medium">Include details:</span> Date, time, and location help us investigate</li>
                  <li><span className="font-medium">Suggest solutions:</span> We value your ideas for improvement</li>
                  <li><span className="font-medium">Rating system:</span> Rate your experience from 1 to 5 stars</li>
                  <li><span className="font-medium">Response time:</span> We aim to respond to all remarks within 48 hours</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Venue Performance */}
            <div className="bg-white border rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Icon name="FaChartBar" className="mr-2 text-blue-600 w-5 h-5" />
                Venue Performance
              </h2>
              
              <div className="space-y-4">
                {venuePerformance.map((venue, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-1/4 text-sm font-medium text-gray-700">{venue.venue}</div>
                    <div className="w-1/2 mx-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${(venue.rating / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-1/4 flex items-center">
                      <div className="text-sm font-medium text-gray-700 mr-2">{venue.rating}</div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Icon 
                            name="FaStar" 
                            key={i} 
                            className={`text-xs ${i < venue.rating ? "text-yellow-400" : "text-gray-300"} w-3 h-3`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white border rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Icon name="FaTags" className="mr-2 text-blue-600 w-5 h-5" />
                Category Distribution
              </h2>
              <div className="space-y-4">
                {categoryDistribution.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-1/3 text-sm font-medium text-gray-700 capitalize">{item.category}</div>
                    <div className="w-2/3 ml-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-purple-600 h-2.5 rounded-full" 
                          style={{ width: `${(item.count / remarks.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="ml-2 text-sm text-gray-700">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Overview */}
            <div className="bg-white border rounded-lg p-4 lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Icon name="FaChartLine" className="mr-2 text-blue-600 w-5 h-5" />
                Status Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm text-green-700">Resolved</p>
                  <p className="text-2xl font-bold text-green-800">{resolvedCount}</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                  <p className="text-sm text-yellow-700">Pending</p>
                  <p className="text-2xl font-bold text-yellow-800">{pendingCount}</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-700">In Progress</p>
                  <p className="text-2xl font-bold text-blue-800">{inProgressCount}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "categories" && (
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Icon name="FaTags" className="mr-2 text-blue-600 w-5 h-5" />
              Manage Categories
            </h2>
            <p className="text-gray-600 mb-4">Add or remove categories for remarks.</p>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Existing Categories:</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center">
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-2">Add New Category:</h3>
              <div className="flex">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter new category name"
                  className="flex-1 p-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                  disabled={newCategory.trim() === ""}
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Icon name="FaUsers" className="mr-2 text-blue-600 w-5 h-5" />
              Manage Team Members
            </h2>
            <p className="text-gray-600 mb-4">Assign remarks to relevant team members for resolution.</p>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Current Team Members:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {teamMembers.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-2">Assign Remarks:</h3>
              <p className="text-sm text-gray-600">This functionality is available directly on each remark card.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectorRemarks;